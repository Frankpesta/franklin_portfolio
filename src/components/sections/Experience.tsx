"use client";
import { useRef } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { TransitionLink } from "@/components/TransitionLink";
import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { DUR, EASE } from "@/motion/config";
import { gsap } from "@/motion/gsap";
import { useMotion } from "@/motion/hooks";

/**
 * A sticky summary on the left while the roles scroll past on the right.
 * A hairline fills down the timeline with scroll, and each role's marker
 * lights up as the fill reaches it.
 */
export function Experience() {
	const rootRef = useRef<HTMLElement>(null);

	useMotion(
		({ reduce }) => {
			if (reduce) return;
			gsap.fromTo(
				".exp-progress",
				{ scaleY: 0 },
				{
					scaleY: 1,
					ease: EASE.scrub,
					scrollTrigger: { trigger: ".exp-list", start: "top 60%", end: "bottom 60%", scrub: true },
				},
			);
			gsap.utils.toArray<HTMLElement>(".exp-role").forEach((role) => {
				gsap
					.timeline({ scrollTrigger: { trigger: role, start: "top 60%", toggleActions: "play none none reverse" } })
					.to(role.querySelector(".exp-marker"), { scale: 1, backgroundColor: "var(--accent)", duration: DUR.sm })
					.from(role.querySelectorAll(".exp-reveal"), { opacity: 0.35, duration: DUR.sm }, 0);
			});
		},
		{ scope: rootRef },
	);

	return (
		<section ref={rootRef} id="experience" aria-labelledby="experience-title" className="px-[var(--gutter)] py-[clamp(6rem,12vw,10rem)]">
			<SectionLabel index="04" title="Experience" aside={`${experience.length} roles`} />

			<div className="mt-10 grid gap-12 lg:grid-cols-12">
				<div className="lg:col-span-4">
					<div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
						<SplitReveal as="h2" id="experience-title" className="t-h1">
							Experience
						</SplitReveal>
						<p className="mt-8 flex items-baseline gap-3">
							<span className="text-[clamp(4rem,9vw,8rem)] font-extrabold leading-none tracking-tighter">
								{String(site.yearsOfExperience).padStart(2, "0")}
							</span>
							<span className="t-label text-muted">Years building for startups, agencies & organisations</span>
						</p>
						<a
							href={site.resume}
							target="_blank"
							rel="noreferrer"
							className="t-label mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 transition-colors hover:border-ink"
						>
							Download résumé (PDF) <span aria-hidden>↗</span>
						</a>
					</div>
				</div>

				<div className="relative lg:col-span-8">
					<div aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-line">
						<div className="exp-progress h-full w-full origin-top bg-accent" />
					</div>
					<ol className="exp-list space-y-14 pl-10">
						{experience.map((role) => (
							<li key={role.company} className="exp-role relative">
								<span
									aria-hidden
									className="exp-marker absolute -left-10 top-1.5 h-[11px] w-[11px] scale-75 rounded-full border border-line-strong bg-paper"
								/>
								<p className="exp-reveal t-label text-muted">{role.period}</p>
								<h3 className="exp-reveal t-h3 mt-2">
									{role.company}
									<span className="mt-1 block text-base font-normal tracking-normal text-muted">{role.title}</span>
								</h3>
								<p className="exp-reveal mt-4 max-w-[52ch]">{role.summary}</p>
								<ul className="exp-reveal mt-3 max-w-[60ch] space-y-1.5 text-sm text-muted">
									{role.points.map((pt) => (
										<li key={pt} className="flex gap-3">
											<span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-line-strong" />
											{pt}
										</li>
									))}
								</ul>
								{role.project && (
									<TransitionLink
										href={`/projects/${role.project}`}
										className="exp-reveal t-label mt-4 inline-block underline decoration-line-strong underline-offset-4 hover:decoration-accent"
									>
										See the project →
									</TransitionLink>
								)}
							</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	);
}
