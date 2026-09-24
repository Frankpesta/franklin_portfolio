"use client";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { DUR, EASE, PLAY_ONCE } from "@/motion/config";
import { gsap } from "@/motion/gsap";
import { useMotion } from "@/motion/hooks";

/** A hairline that draws itself in when it scrolls into view. */
export function Rule({
	className,
	vertical = false,
	delay = 0,
}: {
	className?: string;
	vertical?: boolean;
	delay?: number;
}) {
	const ref = useRef<HTMLSpanElement>(null);

	useMotion(
		({ reduce }) => {
			if (reduce || !ref.current) return;
			gsap.from(ref.current, {
				[vertical ? "scaleY" : "scaleX"]: 0,
				duration: DUR.xl,
				ease: EASE.inOut,
				delay,
				scrollTrigger: { trigger: ref.current, start: "top 92%", ...PLAY_ONCE },
			});
		},
		{ scope: ref },
	);

	return (
		<span
			ref={ref}
			aria-hidden
			className={twMerge(
				"block bg-line-strong",
				vertical ? "h-full w-px origin-top" : "h-px w-full origin-left",
				className,
			)}
		/>
	);
}
