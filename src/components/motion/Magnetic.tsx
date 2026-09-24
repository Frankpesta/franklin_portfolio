"use client";
import { type ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { DUR, EASE, MQ } from "@/motion/config";
import { gsap, useGSAP } from "@/motion/gsap";

/**
 * Pulls its child toward the pointer and springs back on release. Inert on
 * touch devices and under reduced motion.
 */
export function Magnetic({
	children,
	strength = 0.35,
	className,
}: {
	children: ReactNode;
	strength?: number;
	className?: string;
}) {
	const ref = useRef<HTMLSpanElement>(null);

	useGSAP(
		(_, contextSafe) => {
			const el = ref.current;
			if (!el || !contextSafe) return;
			const active = () =>
				window.matchMedia(MQ.finePointer).matches && window.matchMedia(MQ.motion).matches;
			const xTo = gsap.quickTo(el, "x", { duration: DUR.sm, ease: EASE.follow });
			const yTo = gsap.quickTo(el, "y", { duration: DUR.sm, ease: EASE.follow });

			// Measured on enter, not per move: the element's own offset would
			// otherwise feed back into the next reading.
			let cx = 0;
			let cy = 0;
			const enter = () => {
				const r = el.getBoundingClientRect();
				cx = r.left + r.width / 2 - Number(gsap.getProperty(el, "x"));
				cy = r.top + r.height / 2 - Number(gsap.getProperty(el, "y"));
			};
			const move = contextSafe((e: PointerEvent) => {
				if (!active()) return;
				xTo((e.clientX - cx) * strength);
				yTo((e.clientY - cy) * strength);
			});
			const leave = contextSafe(() => {
				xTo(0);
				yTo(0);
			});

			el.addEventListener("pointerenter", enter);
			el.addEventListener("pointermove", move);
			el.addEventListener("pointerleave", leave);
			return () => {
				el.removeEventListener("pointerenter", enter);
				el.removeEventListener("pointermove", move);
				el.removeEventListener("pointerleave", leave);
			};
		},
		{ scope: ref },
	);

	return (
		<span ref={ref} className={twMerge("inline-block will-change-transform", className)}>
			{children}
		</span>
	);
}
