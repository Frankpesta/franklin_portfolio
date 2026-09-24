"use client";
import { useRef, useState } from "react";
import { DUR, EASE } from "@/motion/config";
import { gsap, useGSAP } from "@/motion/gsap";
import { useFinePointer, useReducedMotion } from "@/motion/hooks";

type CursorState = "default" | "link" | "view" | "drag" | "hidden";

const LABELS: Partial<Record<CursorState, string>> = { view: "View", drag: "Drag" };
const SCALE: Record<CursorState, number> = { default: 1, link: 3.2, view: 7, drag: 7, hidden: 0 };

function stateFor(target: EventTarget | null): CursorState {
	if (!(target instanceof Element)) return "default";
	const tagged = target.closest<HTMLElement>("[data-cursor]");
	if (tagged) return (tagged.dataset.cursor as CursorState) ?? "default";
	if (target.closest("input, textarea, select, [contenteditable]")) return "hidden";
	if (target.closest("a, button, [role='button'], label, summary")) return "link";
	return "default";
}

/**
 * A dot that follows the pointer and changes state from context:
 * `data-cursor="view" | "drag" | "hidden"` on any element, links and buttons
 * get the ring. Not rendered for touch or reduced-motion visitors.
 */
export function Cursor() {
	const fine = useFinePointer();
	const reduce = useReducedMotion();
	const enabled = fine && !reduce;
	const rootRef = useRef<HTMLDivElement>(null);
	const dotRef = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<CursorState>("default");

	useGSAP(
		() => {
			const root = rootRef.current;
			if (!enabled || !root) return;
			document.documentElement.classList.add("has-cursor");
			gsap.set(root, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

			const xTo = gsap.quickTo(root, "x", { duration: DUR.xs, ease: EASE.follow });
			const yTo = gsap.quickTo(root, "y", { duration: DUR.xs, ease: EASE.follow });
			let visible = false;

			const move = (e: PointerEvent) => {
				if (e.pointerType !== "mouse") return;
				if (!visible) {
					gsap.set(root, { x: e.clientX, y: e.clientY });
					gsap.to(root, { autoAlpha: 1, duration: DUR.xs });
					visible = true;
				}
				xTo(e.clientX);
				yTo(e.clientY);
			};
			const over = (e: PointerEvent) => setState(stateFor(e.target));
			const leave = () => {
				gsap.to(root, { autoAlpha: 0, duration: DUR.xs });
				visible = false;
			};

			window.addEventListener("pointermove", move, { passive: true });
			document.addEventListener("pointerover", over, { passive: true });
			document.documentElement.addEventListener("pointerleave", leave);
			return () => {
				document.documentElement.classList.remove("has-cursor");
				window.removeEventListener("pointermove", move);
				document.removeEventListener("pointerover", over);
				document.documentElement.removeEventListener("pointerleave", leave);
			};
		},
		{ dependencies: [enabled] },
	);

	useGSAP(
		() => {
			if (!enabled) return;
			gsap.to(dotRef.current, { scale: SCALE[state], duration: DUR.sm, ease: EASE.out, overwrite: true });
		},
		{ dependencies: [state, enabled] },
	);

	if (!enabled) return null;

	const label = LABELS[state];
	return (
		<div ref={rootRef} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[120]">
			<div
				ref={dotRef}
				className={
					state === "link"
						? "h-3 w-3 rounded-full border border-ink/80 bg-transparent backdrop-invert-[0.08]"
						: "h-3 w-3 rounded-full bg-accent"
				}
			/>
			<span
				className="t-label absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-semibold text-on-accent transition-opacity duration-300"
				style={{ opacity: label ? 1 : 0 }}
			>
				{label}
			</span>
		</div>
	);
}
