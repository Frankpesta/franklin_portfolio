"use client";
import dynamic from "next/dynamic";
import { type RefObject, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { twMerge } from "tailwind-merge";
import { DUR, MQ } from "@/motion/config";
import { gsap } from "@/motion/gsap";
import { useFinePointer, useMediaQuery, useReducedMotion } from "@/motion/hooks";
import { CoreFallback } from "./CoreFallback";

const SystemCore = dynamic(() => import("./SystemCore"), { ssr: false });

type NavigatorWithHints = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };

const noop = () => () => {};

/** Hardware hints only exist in the browser; the server assumes "not capable". */
function isCapable() {
	const nav = navigator as NavigatorWithHints;
	if (nav.connection?.saveData) return false;
	if ((nav.hardwareConcurrency ?? 8) <= 4) return false;
	if ((nav.deviceMemory ?? 8) <= 4) return false;
	return true;
}

/**
 * The SVG core renders first (and stays for reduced motion, touch, small or
 * low-power devices). On capable desktops the WebGL core is fetched once the
 * hero is visible, then cross-fades in over the SVG.
 */
export function HeroVisual({ progress, className }: { progress: RefObject<number>; className?: string }) {
	const rootRef = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const fine = useFinePointer();
	const desktop = useMediaQuery(MQ.desktop);
	const capable = useSyncExternalStore(noop, isCapable, () => false);
	const [inView, setInView] = useState(false);
	const [seen, setSeen] = useState(false);

	useEffect(() => {
		const el = rootRef.current;
		if (!el) return;
		const io = new IntersectionObserver(([entry]) => {
			setInView(entry.isIntersecting);
			if (entry.isIntersecting) setSeen(true);
		});
		io.observe(el);
		return () => io.disconnect();
	}, []);

	const webgl = capable && fine && desktop && !reduce && seen;

	useEffect(() => {
		if (!webgl || !rootRef.current) return;
		const canvasWrap = rootRef.current.querySelector(".core-webgl");
		const svg = rootRef.current.querySelector(".core-svg");
		const tween = gsap
			.timeline({ delay: 0.3 })
			.fromTo(canvasWrap, { opacity: 0 }, { opacity: 1, duration: DUR.lg })
			.to(svg, { opacity: 0, duration: DUR.md }, "<");
		return () => {
			tween.kill();
			gsap.set(svg, { opacity: 1 });
		};
	}, [webgl]);

	return (
		<div ref={rootRef} className={twMerge("relative", className)} aria-hidden>
			<CoreFallback className="core-svg absolute inset-0 h-full w-full" />
			{webgl && (
				<div className="core-webgl absolute inset-0 opacity-0">
					<SystemCore active={inView} progress={progress} />
				</div>
			)}
		</div>
	);
}
