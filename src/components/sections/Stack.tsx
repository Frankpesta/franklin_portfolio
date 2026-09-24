"use client";
import { useRef } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { stackByUsage } from "@/content/projects";
import { DUR, EASE } from "@/motion/config";
import { gsap, ScrollTrigger } from "@/motion/gsap";
import { useMotion } from "@/motion/hooks";

const half = Math.ceil(stackByUsage.length / 2);
const ROWS = [stackByUsage.slice(0, half), stackByUsage.slice(half)] as const;

/**
 * The stack, derived from the projects themselves (most-used first). Two
 * marquees drift in opposite directions; scroll speed pushes them faster and
 * skews them, then they settle. Reduced motion shows a plain wrapped list.
 */
export function Stack() {
	const rootRef = useRef<HTMLElement>(null);

	useMotion(
		({ reduce, mobile }) => {
			if (reduce) return;
			const loops = gsap.utils.toArray<HTMLElement>(".marquee-track").map((track, i) =>
				gsap.fromTo(
					track,
					{ xPercent: i % 2 ? -50 : 0 },
					{ xPercent: i % 2 ? 0 : -50, duration: mobile ? 28 : 40, ease: EASE.scrub, repeat: -1, paused: true },
				),
			);
			// Park the loops far from time 0 so a negative timeScale (scrolling up) can run backwards forever.
			for (const loop of loops) loop.totalTime(loop.duration() * 1000);
			const skewTo = gsap.quickTo(".marquee-track", "skewX", { duration: DUR.md, ease: EASE.follow });

			ScrollTrigger.create({
				trigger: rootRef.current,
				start: "top bottom",
				end: "bottom top",
				onUpdate: (self) => {
					const velocity = self.getVelocity();
					const direction = self.direction;
					const boost = 1 + Math.min(Math.abs(velocity) / 250, 5);
					for (const loop of loops) {
						gsap.to(loop, { timeScale: direction * boost, duration: DUR.xs, overwrite: true });
						gsap.to(loop, { timeScale: direction, duration: DUR.lg, delay: DUR.xs, ease: EASE.out });
					}
					skewTo(gsap.utils.clamp(-8, 8, velocity / -300));
				},
				onToggle: (self) => {
					for (const loop of loops) {
						if (self.isActive) loop.play();
						else loop.pause();
					}
				},
			});
		},
		{ scope: rootRef },
	);

	return (
		<section ref={rootRef} id="stack" aria-labelledby="stack-title" className="overflow-hidden py-[clamp(5rem,10vw,8rem)]">
			<div className="px-[var(--gutter)]">
				<SectionLabel index="06" title="Stack" aside="Ordered by how often I ship with it" />
				<h2 id="stack-title" className="sr-only">
					Stack
				</h2>
			</div>

			<ul className="sr-only">
				{stackByUsage.map((t) => (
					<li key={t}>{t}</li>
				))}
			</ul>

			<div aria-hidden className="mt-12 space-y-2 motion-reduce:hidden">
				{ROWS.map((row, i) => (
					<div key={i} className="flex whitespace-nowrap">
						<div className="marquee-track flex shrink-0 will-change-transform">
							{[...row, ...row].map((t, j) => (
								<span key={`${t}-${j}`} className="t-h1 flex items-center">
									<span className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_var(--ink)]" : ""}>{t}</span>
									<span className="mx-[0.35em] text-accent">/</span>
								</span>
							))}
						</div>
					</div>
				))}
			</div>

			<ul aria-hidden className="t-h3 mt-10 hidden flex-wrap gap-x-4 gap-y-2 px-[var(--gutter)] motion-reduce:flex">
				{stackByUsage.map((t) => (
					<li key={t}>
						{t}
						<span className="ml-4 text-accent">/</span>
					</li>
				))}
			</ul>
		</section>
	);
}
