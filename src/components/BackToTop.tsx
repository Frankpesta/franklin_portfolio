"use client";
import { useScroll } from "@/motion/SmoothScroll";

/** Scrolls (through Lenis when it's active) back to the top of the page. */
export function BackToTop({ className }: { className?: string }) {
	const { scrollTo } = useScroll();
	return (
		<button type="button" onClick={() => scrollTo(0)} className={className}>
			Back to top ↑
		</button>
	);
}
