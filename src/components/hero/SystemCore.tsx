"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { THEME } from "@/motion/config";
import { ICOSA_EDGES, ICOSA_VERTICES } from "./icosahedron";

const RADIUS = Math.hypot(1, (1 + Math.sqrt(5)) / 2);
const PACKETS = 7;

type Palette = { ink: string; accent: string };

function readPalette(): Palette {
	const style = getComputedStyle(document.documentElement);
	return {
		ink: style.getPropertyValue("--ink").trim() || "#0d0d0d",
		accent: style.getPropertyValue("--accent").trim() || "#ff4a1c",
	};
}

function usePalette() {
	const [palette, setPalette] = useState<Palette>(readPalette);
	useEffect(() => {
		const update = () => setPalette(readPalette());
		const mql = window.matchMedia("(prefers-color-scheme: dark)");
		window.addEventListener(THEME.changeEvent, update);
		mql.addEventListener("change", update);
		return () => {
			window.removeEventListener(THEME.changeEvent, update);
			mql.removeEventListener("change", update);
		};
	}, []);
	return palette;
}

const unit = ICOSA_VERTICES.map(([x, y, z]) => new THREE.Vector3(x / RADIUS, y / RADIUS, z / RADIUS));

function edgeGeometry(scale: number) {
	const positions = new Float32Array(ICOSA_EDGES.length * 6);
	ICOSA_EDGES.forEach(([a, b], i) => {
		unit[a].toArray(positions, i * 6);
		unit[b].toArray(positions, i * 6 + 3);
	});
	const geo = new THREE.BufferGeometry();
	geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	geo.scale(scale, scale, scale);
	return geo;
}

/** Edges leaving each vertex, so packets can hop from edge to edge. */
const adjacency = unit.map((_, v) => ICOSA_EDGES.flatMap(([a, b]) => (a === v ? [b] : b === v ? [a] : [])));

type Packet = { from: number; to: number; t: number; speed: number };

function Core({
	progress,
	pointer,
	palette,
}: {
	progress: RefObject<number>;
	pointer: RefObject<{ x: number; y: number }>;
	palette: Palette;
}) {
	const group = useRef<THREE.Group>(null);
	const inner = useRef<THREE.LineSegments>(null);
	const packetPoints = useRef<THREE.Points>(null);

	const outerGeo = useMemo(() => edgeGeometry(1.5), []);
	const innerGeo = useMemo(() => edgeGeometry(0.6), []);
	const nodeGeo = useMemo(() => {
		const g = new THREE.BufferGeometry();
		g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(unit.flatMap((v) => v.clone().multiplyScalar(1.5).toArray())), 3));
		return g;
	}, []);
	const ringGeo = useMemo(() => {
		const pts = new THREE.EllipseCurve(0, 0, 2.1, 2.1).getPoints(128).map((p) => new THREE.Vector3(p.x, p.y, 0));
		return new THREE.BufferGeometry().setFromPoints(pts);
	}, []);
	const packets = useMemo<Packet[]>(
		() =>
			Array.from({ length: PACKETS }, (_, i) => {
				const [from, to] = ICOSA_EDGES[(i * 4) % ICOSA_EDGES.length];
				return { from, to, t: i / PACKETS, speed: 0.6 + (i % 3) * 0.25 };
			}),
		[],
	);
	const packetGeo = useMemo(() => {
		const g = new THREE.BufferGeometry();
		g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(PACKETS * 3), 3));
		return g;
	}, []);

	useEffect(
		() => () => {
			for (const g of [outerGeo, innerGeo, nodeGeo, ringGeo, packetGeo]) g.dispose();
		},
		[outerGeo, innerGeo, nodeGeo, ringGeo, packetGeo],
	);

	const tmp = useMemo(() => new THREE.Vector3(), []);

	useFrame((_, delta) => {
		const g = group.current;
		if (!g) return;
		const p = progress.current ?? 0;
		const { x, y } = pointer.current ?? { x: 0, y: 0 };
		const dt = Math.min(delta, 1 / 30);

		g.rotation.y += dt * (0.12 + p * 0.6);
		g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.35 + y * 0.35 + p * 0.8, 3, dt);
		g.rotation.z = THREE.MathUtils.damp(g.rotation.z, -x * 0.25, 3, dt);
		g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, 1 - p * 0.25, 4, dt));
		if (inner.current) {
			inner.current.rotation.y -= dt * 0.5;
			inner.current.rotation.x += dt * 0.2;
		}

		const attr = packetGeo.getAttribute("position") as THREE.BufferAttribute;
		packets.forEach((pk, i) => {
			pk.t += dt * pk.speed;
			if (pk.t >= 1) {
				const onward = adjacency[pk.to].filter((v) => v !== pk.from);
				pk.from = pk.to;
				pk.to = onward[Math.floor(Math.random() * onward.length)];
				pk.t = 0;
			}
			tmp.lerpVectors(unit[pk.from], unit[pk.to], pk.t).multiplyScalar(1.5);
			attr.setXYZ(i, tmp.x, tmp.y, tmp.z);
		});
		attr.needsUpdate = true;
		if (packetPoints.current) packetPoints.current.visible = true;
	});

	return (
		<group ref={group}>
			<lineSegments geometry={outerGeo}>
				<lineBasicMaterial color={palette.ink} transparent opacity={0.55} />
			</lineSegments>
			<lineSegments ref={inner} geometry={innerGeo}>
				<lineBasicMaterial color={palette.accent} />
			</lineSegments>
			<points geometry={nodeGeo}>
				<pointsMaterial color={palette.ink} size={0.045} sizeAttenuation />
			</points>
			<points ref={packetPoints} geometry={packetGeo} visible={false}>
				<pointsMaterial color={palette.accent} size={0.11} sizeAttenuation />
			</points>
			<lineLoop geometry={ringGeo} rotation={[Math.PI / 2.3, 0, 0]}>
				<lineBasicMaterial color={palette.ink} transparent opacity={0.18} />
			</lineLoop>
		</group>
	);
}

/**
 * The hero's one WebGL moment. `active` pauses the render loop entirely when
 * the hero is off-screen; `progress` is the hero's scroll progress (0..1).
 */
export default function SystemCore({
	active,
	progress,
	className,
}: {
	active: boolean;
	progress: RefObject<number>;
	className?: string;
}) {
	const palette = usePalette();
	const pointer = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const move = (e: PointerEvent) => {
			pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
			pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
		};
		window.addEventListener("pointermove", move, { passive: true });
		return () => window.removeEventListener("pointermove", move);
	}, []);

	return (
		<Canvas
			className={className}
			frameloop={active ? "always" : "never"}
			dpr={[1, 1.75]}
			camera={{ position: [0, 0, 5.4], fov: 40 }}
			gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
			aria-hidden
		>
			<Core progress={progress} pointer={pointer} palette={palette} />
		</Canvas>
	);
}
