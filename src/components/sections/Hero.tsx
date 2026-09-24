"use client";
import { useRef } from "react";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { LocalTime } from "@/components/LocalTime";
import { Magnetic } from "@/components/motion/Magnetic";
import { TransitionLink } from "@/components/TransitionLink";
import { shippedCount } from "@/content/projects";
import { site } from "@/content/site";
import { DUR, EASE, INTRO, SCRUB, STAGGER } from "@/motion/config";
import { gsap, SplitText } from "@/motion/gsap";
import { useMotion } from "@/motion/hooks";

const STATS = [
	{ value: String(site.yearsOfExperience).padStart(2, "0"), label: "Years shipping production software" },
	{ value: String(shippedCount).padStart(2, "0"), label: "Products shipped for clients & teams" },
	{ value: "CTO", label: "Leading the build at 49GIG" },
];

export function Hero() {
	const rootRef = useRef<HTMLElement>(null);
	const progress = useRef(0);

	useMotion(
		({ desktop, mobile, reduce }) => {
			if (reduce) return;
			let cleanup: (() => void) | undefined;

			// Intro hand-off: only when the first-visit intro is covering the
			// page, hide the name and raise it as the sheet splits open. On every
			// other visit the name is simply there at first paint (good for LCP).
			if (document.documentElement.dataset.intro === "play") {
				const split = SplitText.create(".hero-line", { type: "chars", mask: "chars" });
				gsap.set(split.chars, { yPercent: 115 });
				gsap.set(".hero-rise", { opacity: 0, y: 24 });
				const play = () => {
					gsap
						.timeline()
						.to(split.chars, { yPercent: 0, duration: DUR.lg, stagger: STAGGER.chars, ease: EASE.out })
						.to(".hero-rise", { opacity: 1, y: 0, duration: DUR.md, stagger: STAGGER.items }, "-=0.7")
						.call(() => split.revert());
				};
				window.addEventListener(INTRO.exitEvent, play, { once: true });
				cleanup = () => window.removeEventListener(INTRO.exitEvent, play);
			}

			// Blueprint furniture draws in on every visit.
			gsap.from(".hero-draw-x", { scaleX: 0, duration: DUR.xl, ease: EASE.inOut, stagger: 0.1 });
			gsap.from(".hero-draw-y", { scaleY: 0, duration: DUR.xl, ease: EASE.inOut });

			// Scrubbed exit: the name pulls apart, the grid and core drift at their own depth.
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

			return cleanup;
		},
		{ scope: rootRef },
	);

	return (
		<section
			ref={rootRef}
			id="top"
			aria-labelledby="hero-title"
			className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-[var(--gutter)] pb-8 pt-[calc(var(--header-h)+1.25rem)]"
		>
			<div aria-hidden className="hero-grid blueprint-grid absolute inset-x-0 -top-[10%] -z-10 h-[120%]" />

			<div className="hero-meta flex items-start justify-between gap-4">
				<p className="t-label text-muted">(00) Index</p>
				<p className="t-label hidden text-muted sm:block">Portfolio — {new Date().getFullYear()}</p>
				<LocalTime className="t-label text-muted" />
			</div>

			<HeroVisual
				progress={progress}
				className="hero-visual pointer-events-none absolute right-[-18vw] top-[14vh] -z-10 aspect-square w-[78vw] opacity-50 sm:right-[-6vw] sm:w-[52vw] lg:right-[3vw] lg:top-[12vh] lg:w-[38vw] lg:opacity-100"
			/>

			<div className="mt-auto pt-[14vh]">
				<h1 id="hero-title" aria-label={site.name} className="t-display [font-stretch:105%]">
					<span aria-hidden className="hero-line hero-line-1 block">
						Franklin
					</span>
					<span aria-hidden className="hero-line hero-line-2 block lg:pl-[7vw]">
						Olisaemeka<span className="text-accent">.</span>
					</span>
				</h1>

				<div aria-hidden className="relative mt-5 flex items-center gap-3 text-muted">
					<span className="hero-draw-y h-3 w-px origin-center bg-line-strong" />
					<span className="hero-draw-x h-px flex-1 origin-left bg-line-strong" />
					<span className="t-label shrink-0">Full stack · end to end</span>
					<span className="hero-draw-x h-px flex-1 origin-right bg-line-strong" />
					<span className="hero-draw-y h-3 w-px origin-center bg-line-strong" />
				</div>

				<div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
					{/* COPY: review */}
					<p className="hero-rise t-lead max-w-[36ch] lg:col-span-5">
						I design and build products end to end: the data model, auth, payments and real-time systems
						underneath, and the interface people actually touch.
					</p>

					<dl className="hero-rise grid grid-cols-3 gap-4 border-t border-line pt-4 lg:col-span-4">
						{STATS.map((s) => (
							<div key={s.label} className="flex flex-col-reverse">
								<dt className="t-label mt-1 normal-case tracking-normal text-muted">{s.label}</dt>
								<dd className="text-3xl font-bold tracking-tight lg:text-4xl">{s.value}</dd>
							</div>
						))}
					</dl>

					<div className="hero-rise flex flex-wrap items-center gap-4 lg:col-span-3 lg:justify-end">
						<Magnetic>
							<TransitionLink
								href="/#work"
								className="t-label inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-paper transition-colors hover:bg-accent hover:text-on-accent"
							>
								See the work <span aria-hidden>↓</span>
							</TransitionLink>
						</Magnetic>
						<Magnetic>
							<TransitionLink
								href="/#contact"
								className="t-label inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 transition-colors hover:border-ink"
							>
								Start a project <span aria-hidden>→</span>
							</TransitionLink>
						</Magnetic>
					</div>
				</div>
			</div>
		</section>
	);
}
