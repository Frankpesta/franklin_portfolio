"use client";
import Image from "next/image";
import { useRef } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { DUR, EASE, PLAY_ONCE, SCRUB } from "@/motion/config";
import { gsap } from "@/motion/gsap";
import { useMotion } from "@/motion/hooks";
import portrait from "../../../public/pesta2.jpeg";

// COPY: review — condensed from the old About page.
const PARAGRAPHS = [
	"I'm a full-stack engineer with a B.Sc. in Computer and Robotics Education from the University of Nigeria, Nsukka. For four years I've been building products where the hard parts are invisible: who is allowed to do what, where the money goes, and what happens when something changes in real time.",
	"I care about the details people feel, like speed, accessibility and clarity, and the ones they never see: clean data models, typed boundaries and systems that are easy to change. I'm based in Nigeria and work remotely with teams worldwide, on contracts or as part of the team.",
];

export function About() {
	const rootRef = useRef<HTMLElement>(null);

	useMotion(
		({ reduce, desktop }) => {
			if (reduce) return;
			// Depth: the photo drifts slower than the page, its frame faster.
			gsap.fromTo(
				".about-photo",
				{ yPercent: -10, scale: 1.15 },
				{
					yPercent: 10,
					scale: 1.15,
					ease: EASE.scrub,
					scrollTrigger: { trigger: ".about-frame", start: "top bottom", end: "bottom top", scrub: SCRUB.loose },
				},
			);
			if (desktop) {
				gsap.fromTo(
					".about-frame",
					{ y: 80 },
					{ y: -80, ease: EASE.scrub, scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: SCRUB.loose } },
				);
			}
			gsap.from(".about-frame", {
				yPercent: 8,
				opacity: 0,
				duration: DUR.lg,
				scrollTrigger: { trigger: ".about-frame", start: "top 85%", ...PLAY_ONCE },
			});
		},
		{ scope: rootRef },
	);

	return (
		<section ref={rootRef} id="about" aria-labelledby="about-title" className="px-[var(--gutter)] py-[clamp(6rem,12vw,10rem)]">
			<SectionLabel index="05" title="About" />
			<div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
				<figure className="lg:col-span-5">
					<div className="about-frame relative aspect-[4/5] overflow-hidden bg-paper-2">
						<Image
							src={portrait}
							alt="Portrait of Franklin Olisaemeka in a black T-shirt, photographed outdoors in black and white"
							sizes="(min-width: 1024px) 38vw, 100vw"
							placeholder="blur"
							className="about-photo h-full w-full object-cover object-[50%_30%] grayscale"
						/>
					</div>
					<figcaption className="t-label mt-3 flex justify-between text-muted">
						<span>Fig. — Franklin, Nigeria</span>
						<span>B&amp;W</span>
					</figcaption>
				</figure>

				<div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
					<SplitReveal as="h2" id="about-title" className="t-h1">
						Hi, I&apos;m Franklin.
					</SplitReveal>
					{PARAGRAPHS.map((p, i) => (
						<SplitReveal key={i} as="p" className="t-lead mt-8 text-muted first-of-type:text-ink" delay={i * 0.1}>
							{p}
						</SplitReveal>
					))}
				</div>
			</div>
		</section>
	);
}
