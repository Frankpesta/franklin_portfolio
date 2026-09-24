"use client";
import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { flipSourceFor, ProjectImage } from "@/components/ProjectImage";
import { SectionLabel } from "@/components/SectionLabel";
import { TransitionLink } from "@/components/TransitionLink";
import { featuredProjects, projects, sheetNumber } from "@/content/projects";
import type { Project } from "@/content/types";
import { DUR, EASE, PLAY_ONCE, SCRUB, STAGGER } from "@/motion/config";
import { gsap } from "@/motion/gsap";
import { useMotion } from "@/motion/hooks";

const total = String(projects.length).padStart(2, "0");

function Panel({ project }: { project: Project }) {
	const href = `/projects/${project.slug}`;
	const flipKey = `featured-${project.slug}`;
	return (
		<article
			aria-labelledby={`featured-${project.slug}-title`}
			className="work-panel grid shrink-0 gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-10 pin:h-full pin:w-[86vw] pin:border-l pin:border-t-0 pin:py-0 pin:pl-10 pin:pr-4"
		>
			<div className="flex flex-col lg:col-span-5 lg:justify-center">
				<p className="t-label flex justify-between text-muted">
					<span>
						Sheet {sheetNumber(project.slug)} / {total}
					</span>
					<span>{project.category}</span>
				</p>
				<h3 id={`featured-${project.slug}-title`} className="t-h1 mt-6">
					{project.title}
				</h3>
				<p className="t-lead mt-5 max-w-[34ch] text-muted">{project.tagline}</p>

				<dl className="t-label mt-8 grid grid-cols-[6rem_1fr] gap-y-2 border-t border-line pt-4">
					<dt className="text-muted">Role</dt>
					<dd>{project.role}</dd>
					{project.year && (
						<>
							<dt className="text-muted">Year</dt>
							<dd>{project.year}</dd>
						</>
					)}
					<dt className="text-muted">Stack</dt>
					<dd className="normal-case tracking-normal">{project.stack.join(" · ")}</dd>
				</dl>

				<TransitionLink
					href={href}
					flipSource={flipSourceFor(flipKey, project.slug)}
					data-cursor="view"
					className="group t-label mt-8 inline-flex w-fit items-center gap-3"
				>
					<span className="relative">
						Read the case study
						<span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-100 bg-ink transition-transform duration-500 group-hover:origin-right group-hover:scale-x-0" />
					</span>
					<span aria-hidden className="text-accent transition-transform duration-500 group-hover:translate-x-1">
						→
					</span>
				</TransitionLink>
			</div>

			<div className="flex flex-col justify-center lg:col-span-7">
				<TransitionLink
					href={href}
					flipSource={flipSourceFor(flipKey, project.slug)}
					data-cursor="view"
					tabIndex={-1}
					aria-hidden
					className="relative block"
				>
					{/* crop marks */}
					<span aria-hidden className="absolute -left-3 -top-3 h-3 w-3 border-l border-t border-line-strong" />
					<span aria-hidden className="absolute -right-3 -top-3 h-3 w-3 border-r border-t border-line-strong" />
					<span aria-hidden className="absolute -bottom-3 -left-3 h-3 w-3 border-b border-l border-line-strong" />
					<span aria-hidden className="absolute -bottom-3 -right-3 h-3 w-3 border-b border-r border-line-strong" />
					<span className="work-frame block aspect-[16/10] overflow-hidden bg-paper-2">
						<span className="work-image block h-full w-full">
							<ProjectImage image={project.cover} sizes="(min-width: 1024px) 55vw, 100vw" flipKey={flipKey} />
						</span>
					</span>
				</TransitionLink>

				<ol className="mt-8 grid gap-4 sm:grid-cols-3 pin:hidden">
					{project.highlights.map((h, i) => (
						<li key={h} className="work-note border-t border-line pt-3 text-sm leading-snug text-muted">
							<span className="t-label mb-2 block text-accent-text">Note {String(i + 1).padStart(2, "0")}</span>
							{h}
						</li>
					))}
				</ol>
			</div>
		</article>
	);
}

/**
 * The centerpiece. On desktops tall enough to hold a full sheet, the section
 * pins and the case-study sheets travel sideways under a scrubbed timeline,
 * each screenshot parallaxing inside its frame. Everywhere else the sheets
 * stack and reveal one by one.
 */
export function FeaturedWork() {
	const rootRef = useRef<HTMLElement>(null);

	useMotion(
		({ pin, reduce }) => {
			const root = rootRef.current;
			if (!root) return;
			const track = root.querySelector<HTMLElement>(".work-track");
			const pinEl = root.querySelector<HTMLElement>(".work-pin");
			const panels = gsap.utils.toArray<HTMLElement>(".work-panel");
			if (!track || !pinEl) return;

			if (pin) {
				const distance = () => track.scrollWidth - window.innerWidth;
				const travel = gsap.to(track, {
					x: () => -distance(),
					ease: EASE.scrub,
					scrollTrigger: {
						trigger: pinEl,
						pin: true,
						start: "top top",
						end: () => `+=${distance()}`,
						scrub: SCRUB.tight,
						invalidateOnRefresh: true,
						anticipatePin: 1,
					},
				});
				gsap.to(".work-progress", {
					scaleX: 1,
					ease: EASE.scrub,
					scrollTrigger: { trigger: pinEl, start: "top top", end: () => `+=${distance()}`, scrub: true },
				});
				panels.forEach((panel) => {
					gsap.fromTo(
						panel.querySelector(".work-image"),
						{ xPercent: -5, scale: 1.12 },
						{
							xPercent: 5,
							scale: 1.12,
							ease: EASE.scrub,
							scrollTrigger: { containerAnimation: travel, trigger: panel, start: "left right", end: "right left", scrub: true },
						},
					);
				});
			}

			if (!pin && !reduce) {
				panels.forEach((panel) => {
					const frame = panel.querySelector(".work-frame");
					const image = panel.querySelector(".work-image");
					if (!frame || !image) return;
					gsap
						.timeline({
							scrollTrigger: { trigger: frame, start: "top 85%", ...PLAY_ONCE },
							defaults: { duration: DUR.lg, ease: EASE.inOut },
						})
						.from(frame, { yPercent: 12, opacity: 0 })
						.from(image, { scale: 1.2 }, 0)
						.from(panel.querySelectorAll(".work-note"), { opacity: 0, y: 24, stagger: STAGGER.items }, "-=0.6");
				});
			}
		},
		{ scope: rootRef, defer: true },
	);

	return (
		<section ref={rootRef} id="work" aria-labelledby="work-title" className="relative">
			<div className="px-[var(--gutter)] pt-[clamp(4rem,8vw,7rem)]">
				<SectionLabel index="02" title="Selected work" aside={`${String(featuredProjects.length).padStart(2, "0")} case studies`} />
				<SplitReveal as="h2" id="work-title" className="t-h1 mt-10 max-w-[14ch]">
					Case studies
				</SplitReveal>
			</div>

			<div className="work-pin relative overflow-hidden pin:h-[100svh] pin:pt-[var(--header-h)]">
				<div className="work-track flex flex-col px-[var(--gutter)] pin:h-full pin:w-max pin:flex-row pin:py-10">
					{featuredProjects.map((p) => (
						<Panel key={p.slug} project={p} />
					))}
				</div>
				<div aria-hidden className="absolute inset-x-[var(--gutter)] bottom-6 hidden h-px bg-line pin:block">
					<div className="work-progress h-full origin-left scale-x-0 bg-accent" />
				</div>
			</div>
		</section>
	);
}
