"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type RefObject, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Written by IndexPreview on pointer events, only read here: the hovered
 * row, and the latest pointer delta with its timestamp.
 */
export type PreviewSignal = { active: number; vx: number; vy: number; at: number };

const vertex = /* glsl */ `
varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

// Two textures cross-fade; cursor velocity bends the UVs and splits RGB.
const fragment = /* glsl */ `
uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform vec2 uFromScale;
uniform vec2 uToScale;
uniform float uMix;
uniform vec2 uVel;
uniform float uTime;
varying vec2 vUv;

// object-fit: cover, anchored to the top like the CSS version.
vec2 cover(vec2 uv, vec2 scale) {
	return vec2((uv.x - 0.5) * scale.x + 0.5, 1.0 - (1.0 - uv.y) * scale.y);
}

vec3 sampleRgb(sampler2D tex, vec2 uv, vec2 scale, vec2 shift) {
	return vec3(
		texture2D(tex, cover(uv + shift, scale)).r,
		texture2D(tex, cover(uv, scale)).g,
		texture2D(tex, cover(uv - shift, scale)).b
	);
}

void main() {
	vec2 uv = vUv;
	float speed = length(uVel);
	uv.x += sin(uv.y * 9.0 + uTime * 2.0) * uVel.x * 0.035;
	uv.y += sin(uv.x * 7.0 + uTime * 1.6) * uVel.y * 0.035;
	vec2 shift = uVel * 0.012;
	vec3 a = sampleRgb(uFrom, uv, uFromScale, shift);
	vec3 b = sampleRgb(uTo, uv, uToScale, shift);
	gl_FragColor = vec4(mix(a, b, uMix), 1.0);
	#include <colorspace_fragment>
}`;

function coverScale(img: HTMLImageElement, aspect: number) {
	const imgAspect = img.naturalWidth / img.naturalHeight || aspect;
	return imgAspect > aspect ? new THREE.Vector2(aspect / imgAspect, 1) : new THREE.Vector2(1, imgAspect / aspect);
}

function Plane({ images, signal }: { images: HTMLImageElement[]; signal: RefObject<PreviewSignal> }) {
	const size = useThree((s) => s.size);
	const aspect = size.width / size.height;
	const textures = useMemo(
		() =>
			images.map((img) => {
				// A detached copy of the (already cached) optimised file: three sizes the
				// texture from image.width, which for an in-page <img> is its rendered
				// width, not its pixel width, and the upload overflows.
				const source = new Image();
				const t = new THREE.Texture(source);
				t.colorSpace = THREE.SRGBColorSpace;
				t.minFilter = THREE.LinearFilter;
				t.generateMipmaps = false;
				source.addEventListener("load", () => (t.needsUpdate = true), { once: true });
				source.src = img.currentSrc || img.src;
				return t;
			}),
		[images],
	);
	// Created once per texture set; mutated only through the material ref below.
	const initialUniforms = useMemo(
		() => ({
			uFrom: { value: textures[0] },
			uTo: { value: textures[0] },
			uFromScale: { value: new THREE.Vector2(1, 1) },
			uToScale: { value: new THREE.Vector2(1, 1) },
			uMix: { value: 1 },
			uVel: { value: new THREE.Vector2() },
			uTime: { value: 0 },
		}),
		[textures],
	);
	const material = useRef<THREE.ShaderMaterial>(null);
	const shown = useRef(-1);

	useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);

	useFrame((_, delta) => {
		const s = signal.current;
		const u = material.current?.uniforms;
		if (!s || !u) return;
		const dt = Math.min(delta, 1 / 30);
		if (s.active >= 0 && s.active !== shown.current && textures[s.active]) {
			// Start a cross-fade from whatever is on screen now.
			const settled = u.uMix.value > 0.5;
			u.uFrom.value = settled ? u.uTo.value : u.uFrom.value;
			u.uFromScale.value.copy(settled ? u.uToScale.value : u.uFromScale.value);
			u.uTo.value = textures[s.active];
			u.uToScale.value.copy(coverScale(images[s.active], aspect));
			u.uMix.value = shown.current < 0 ? 1 : 0;
			shown.current = s.active;
		}
		u.uMix.value = Math.min(1, u.uMix.value + dt * 4);
		u.uTime.value += dt;
		// Chase the latest pointer delta while it's fresh, then relax to still.
		const fresh = performance.now() - s.at < 80;
		const tx = fresh ? THREE.MathUtils.clamp(s.vx / 25, -1, 1) : 0;
		const ty = fresh ? THREE.MathUtils.clamp(s.vy / 25, -1, 1) : 0;
		u.uVel.value.x = THREE.MathUtils.damp(u.uVel.value.x, tx, 8, dt);
		u.uVel.value.y = THREE.MathUtils.damp(u.uVel.value.y, ty, 8, dt);
	});

	return (
		<mesh frustumCulled={false}>
			<planeGeometry args={[2, 2]} />
			<shaderMaterial ref={material} vertexShader={vertex} fragmentShader={fragment} uniforms={initialUniforms} />
		</mesh>
	);
}

/**
 * WebGL layer over the index preview. `running` stops the render loop
 * whenever the preview is hidden.
 */
export default function PreviewDistort({
	images,
	signal,
	running,
}: {
	images: HTMLImageElement[];
	signal: RefObject<PreviewSignal>;
	running: boolean;
}) {
	return (
		<Canvas
			className="!absolute inset-0"
			// Never take the pointer: the index list underneath must keep receiving moves.
			style={{ pointerEvents: "none" }}
			// Measure layout size, not the bounding box: the preview scales in, and a
			// transformed measurement would size the canvas mid-animation.
			resize={{ offsetSize: true }}
			frameloop={running ? "always" : "never"}
			dpr={[1, 1.5]}
			gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
			aria-hidden
		>
			<Plane images={images} signal={signal} />
		</Canvas>
	);
}
