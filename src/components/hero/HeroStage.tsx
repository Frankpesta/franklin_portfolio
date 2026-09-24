"use client";
import { type ReactNode, useRef } from "react";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { DUR, EASE, INTRO, SCRUB, STAGGER } from "@/motion/config";
import { gsap, SplitText } from "@/motion/gsap";
import { useMotion } from "@/motion/hooks";

/**
 * The hero's client shell: intro hand-off, line draw-in, the scrubbed exit and
 * the 3D core (which reads the same scroll progress). The copy inside is
 * server-rendered and passed in as children.
 */
export function HeroStage({ children }: { children: ReactNode }) {
	const rootRef = useRef<HTMLElement>(null);
	const progress = useRef(0);

	useMotion(
		({ reduce }) => {
			if (reduce) return;
			let cleanup: (() => void) | undefined;

			// Intro hand-off: only when the first-visit intro is covering the
			// page, hide the name and raise it as the sheet splits open. On every
			// other visit the name is simply there at first paint (good for LCP).
			if (document.documentElement.dataset.intro === "play") {
				// The h1 carries the aria-label and its lines are aria-hidden already.
				const split = SplitText.create(".hero-line", { type: "chars", mask: "chars", aria: "none" });
				gsap.set(split.chars, { yPercent: 115 });
				// Transform only, never opacity: the paragraph stays "painted" under
				// the intro so it counts for LCP at first paint, not after the intro.
				gsap.set(".hero-rise", { y: 32 });
				let played = false;
				const play = () => {
					if (played) return;
					played = true;
					window.clearTimeout(fallback);
					gsap
						.timeline()
						.to(split.chars, { yPercent: 0, duration: DUR.lg, stagger: STAGGER.chars, ease: EASE.out })
						.to(".hero-rise", { y: 0, duration: DUR.lg, stagger: STAGGER.items }, "-=0.9")
						.call(() => split.revert());
				};
				// Never let the name depend on the intro finishing: same ceiling as the
				// CSS failsafe that hides the intro overlay.
				const fallback = window.setTimeout(play, INTRO.failsafeMs);
				window.addEventListener(INTRO.exitEvent, play, { once: true });
				cleanup = () => {
					window.clearTimeout(fallback);
					window.removeEventListener(INTRO.exitEvent, play);
				};
			}

			// Blueprint furniture draws in on every visit.
			gsap.from(".hero-draw-x", { scaleX: 0, duration: DUR.xl, ease: EASE.inOut, stagger: 0.1 });
			gsap.from(".hero-draw-y", { scaleY: 0, duration: DUR.xl, ease: EASE.inOut });

			return cleanup;
		},
		{ scope: rootRef },
	);

	// Scrubbed exit: the name pulls apart, the grid and core drift at their own
	// depth. Nobody scrolls in the first moments, so this is set up when idle.
	useMotion(
		({ desktop, mobile, reduce }) => {
			if (reduce) return;
			const drift = desktop ? 1 : 0.45;
			gsap
				.timeline({
					defaults: { ease: EASE.scrub },
					scrollTrigger: {
						trigger: rootRef.current,
						start: "top top",
						end: "bottom top",
						scrub: SCRUB.loose,
						onUpdate: (self) => {
							progress.current = self.progress;
						},
					},
				})
				.to(".hero-line-1", { xPercent: -9 * drift }, 0)
				.to(".hero-line-2", { xPercent: 9 * drift }, 0)
				.to(".hero-grid", { yPercent: 18 }, 0)
				.to(".hero-visual", { yPercent: desktop ? 28 : 12, opacity: mobile ? 0.2 : 0.6 }, 0)
				.to(".hero-meta", { opacity: 0, y: -30 }, 0);
		},
		{ scope: rootRef, defer: true },
	);

	return (
		<section
			ref={rootRef}
			id="top"
			aria-labelledby="hero-title"
			className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-[var(--gutter)] pb-8 pt-[calc(var(--header-h)+1.25rem)]"
		>
			<div aria-hidden className="hero-grid blueprint-grid absolute inset-x-0 -top-[10%] -z-10 h-[120%]" />
			<HeroVisual
				progress={progress}
				className="hero-visual pointer-events-none absolute right-[-18vw] top-[14vh] -z-10 aspect-square w-[78vw] opacity-50 sm:right-[-6vw] sm:w-[52vw] lg:right-[3vw] lg:top-[12vh] lg:w-[38vw] lg:opacity-100"
			/>
			{children}
		</section>
	);
}
