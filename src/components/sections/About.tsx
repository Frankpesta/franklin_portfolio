import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import portrait from "../../../public/pesta2.jpeg";
import { AboutSection } from "./motion";

// COPY: review — condensed from the old About page.
const PARAGRAPHS = [
	"I'm a full-stack engineer with a B.Sc. in Computer and Robotics Education from the University of Nigeria, Nsukka. For more than four years I've been building products where the hard parts are invisible: who is allowed to do what, where the money goes, and what happens when something changes in real time.",
	"I care about the details people feel, like speed, accessibility and clarity, and the ones they never see: clean data models, typed boundaries and systems that are easy to change. I'm based in Nigeria and work remotely with teams worldwide, on contracts or as part of the team.",
];

export function About() {
	return (
		<AboutSection id="about" aria-labelledby="about-title" className="px-[var(--gutter)] py-[clamp(6rem,12vw,10rem)]">
			<SectionLabel index="05" title="About" />
			<div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
				<figure className="lg:col-span-5">
					<div className="about-frame relative aspect-[4/5] overflow-hidden bg-paper-2">
						<Image
							src={portrait}
							alt="Portrait of Franklin Olisaemeka smiling, in a white T-shirt against a grey studio backdrop"
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
		</AboutSection>
	);
}
