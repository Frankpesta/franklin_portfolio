"use client";
import { type ReactNode, useRef } from "react";
import { DUR, EASE, PLAY_ONCE, STAGGER } from "@/motion/config";
import { gsap, SplitText } from "@/motion/gsap";
import { useMotion } from "@/motion/hooks";

type SplitKind = "lines" | "words" | "chars";

/** Satisfies the ref type of every tag `as` allows. */
type SplitElement = HTMLHeadingElement & HTMLParagraphElement & HTMLDivElement & HTMLSpanElement;

type Props = {
	as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
	/** Unit that rises out of the line masks. Chars degrade to words on mobile. */
	type?: SplitKind;
	/** "scroll" waits for the element to enter; "mount" plays immediately. */
	trigger?: "scroll" | "mount";
	delay?: number;
	start?: string;
	className?: string;
	id?: string;
	children: ReactNode;
};

/**
 * Masked SplitText reveal. SplitText keeps the original text available to
 * screen readers (aria: "auto") and re-splits on resize and font load.
 */
export function SplitReveal({
	as = "div",
	type = "lines",
	trigger = "scroll",
	delay = 0,
	start = "top 88%",
	className,
	id,
	children,
}: Props) {
	const ref = useRef<SplitElement>(null);

	useMotion(
		({ reduce, mobile }) => {
			const el = ref.current;
			if (!el) return;
			const scrollTrigger = trigger === "scroll" ? { trigger: el, start, ...PLAY_ONCE } : undefined;

			if (reduce) {
				gsap.from(el, { opacity: 0, duration: DUR.sm, ease: "none", delay, scrollTrigger });
				return;
			}

			const unit: SplitKind = mobile && type === "chars" ? "words" : type;
			let split: SplitText | undefined;
			// SplitText returns the onSplit animation to itself, so reverting the
			// split also kills the tween and its ScrollTrigger.
			const build = () => {
				split ??= SplitText.create(el, {
					type: unit === "lines" ? "lines" : `lines,${unit}`,
					mask: "lines",
					linesClass: "split-line",
					autoSplit: true,
					// Lines and words still read naturally; only character splits need
					// an aria-label (and only headings may carry one, which is where we use chars).
					aria: unit === "chars" ? "auto" : "none",
					onSplit: (self) =>
						gsap.from(self[unit], {
							yPercent: 115,
							duration: DUR.lg,
							stagger: STAGGER[unit],
							ease: EASE.out,
							delay,
							scrollTrigger,
						}),
				});
			};

			if (trigger === "mount") {
				build();
				return () => split?.revert();
			}

			// Split lazily, half a screen before the text arrives: splitting every
			// heading at hydration was a large share of mobile main-thread time.
			const io = new IntersectionObserver(
				([entry]) => {
					if (!entry.isIntersecting) return;
					io.disconnect();
					build();
				},
				{ rootMargin: "0px 0px 50% 0px" },
			);
			io.observe(el);
			return () => {
				io.disconnect();
				split?.revert();
			};
		},
		{ scope: ref, defer: trigger === "scroll" },
	);

	const Tag = as;
	return (
		<Tag ref={ref} id={id} className={className}>
			{children}
		</Tag>
	);
}
