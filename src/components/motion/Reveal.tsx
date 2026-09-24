"use client";
import { type ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { DUR, EASE, PLAY_ONCE } from "@/motion/config";
import { gsap } from "@/motion/gsap";
import { useMotion } from "@/motion/hooks";

type Props = {
	children: ReactNode;
	className?: string;
	/**
	 * "rise": fade + lift. "curtain": the block is uncovered from below using
	 * two counter-translated layers (transform only, no clip-path).
	 */
	variant?: "rise" | "curtain";
	delay?: number;
	start?: string;
};

export function Reveal({ children, className, variant = "rise", delay = 0, start = "top 88%" }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useMotion(
		({ reduce, mobile }) => {
			const el = ref.current;
			if (!el) return;
			const scrollTrigger = { trigger: el, start, ...PLAY_ONCE };

			if (reduce) {
				gsap.from(el, { opacity: 0, duration: DUR.sm, ease: "none", delay, scrollTrigger });
				return;
			}

			if (variant === "curtain") {
				const inner = el.firstElementChild;
				const content = inner?.firstElementChild;
				if (!inner || !content) return;
				gsap
					.timeline({ delay, scrollTrigger, defaults: { duration: mobile ? DUR.md : DUR.lg, ease: EASE.inOut } })
					.from(inner, { yPercent: 100 })
					.from(content, { yPercent: -100, scale: 1.15 }, 0);
				return;
			}

			gsap.from(el, { opacity: 0, y: mobile ? 24 : 48, duration: DUR.lg, delay, scrollTrigger });
		},
		{ scope: ref, defer: true },
	);

	if (variant === "curtain") {
		return (
			<div ref={ref} className={twMerge("overflow-hidden", className)}>
				<div className="h-full overflow-hidden">
					<div className="h-full">{children}</div>
				</div>
			</div>
		);
	}

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
