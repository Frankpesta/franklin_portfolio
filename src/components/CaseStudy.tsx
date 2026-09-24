"use client";
import { useRef } from "react";
import { Gallery } from "@/components/Gallery";
import { Magnetic } from "@/components/motion/Magnetic";
import { Rule } from "@/components/motion/Rule";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ProjectImage } from "@/components/ProjectImage";
import { TransitionLink } from "@/components/TransitionLink";
import { nextProject, projects, sheetNumber } from "@/content/projects";
import type { Project } from "@/content/types";
import { DUR, PLAY_ONCE, STAGGER } from "@/motion/config";
import { gsap } from "@/motion/gsap";
import { useMotion } from "@/motion/hooks";

const total = String(projects.length).padStart(2, "0");

export function CaseStudy({ project }: { project: Project }) {
	const rootRef = useRef<HTMLElement>(null);
	const next = nextProject(project.slug);

	useMotion(
		({ reduce }) => {
			if (reduce) return;
			gsap.from(".cs-meta > *", { opacity: 0, y: 20, stagger: STAGGER.items, duration: DUR.md, delay: 0.25 });
			gsap.from(".cs-note", {
				opacity: 0,
				y: 30,
				stagger: STAGGER.items,
				duration: DUR.md,
				scrollTrigger: { trigger: ".cs-notes", start: "top 85%", ...PLAY_ONCE },
			});
		},
		{ scope: rootRef },
	);

	return (
		<main id="main" ref={rootRef}>
			<article aria-labelledby="cs-title">
				<header className="px-[var(--gutter)] pt-[calc(var(--header-h)+2.5rem)]">
					<div className="t-label flex items-center justify-between gap-4 text-muted">
						<TransitionLink href="/#index" className="group inline-flex items-center gap-2 text-ink">
							<span aria-hidden className="transition-transform duration-500 group-hover:-translate-x-1">
								←
							</span>
							All work
						</TransitionLink>
						<span>
							Sheet {sheetNumber(project.slug)} / {total} — {project.tier === "in-progress" ? "In progress" : "Case study"}
						</span>
					</div>
					<Rule className="mt-3" />

					<p className="t-label mt-12 text-accent-text">{project.category}</p>
					<SplitReveal as="h1" id="cs-title" trigger="mount" type="chars" className="t-h1 mt-4 max-w-[16ch]">
						{project.title}
					</SplitReveal>
					<SplitReveal as="p" trigger="mount" delay={0.2} className="t-lead mt-6 max-w-[40ch] text-muted">
						{project.tagline}
					</SplitReveal>

					<dl className="cs-meta t-label mt-12 grid grid-cols-2 gap-6 border-t border-line pt-5 md:grid-cols-4">
						<div>
							<dt className="text-muted">Role</dt>
							<dd className="mt-2">{project.role}</dd>
						</div>
						<div>
							<dt className="text-muted">Year</dt>
							<dd className="mt-2">{project.year ?? "—"}</dd>
						</div>
						<div>
							<dt className="text-muted">Stack</dt>
							<dd className="mt-2 normal-case tracking-normal">{project.stack.join(", ")}</dd>
						</div>
						<div>
							<dt className="text-muted">Live</dt>
							<dd className="mt-2 space-y-1">
								{project.links.length ? (
									project.links.map((l) => (
										<a
											key={l.href}
											href={l.href}
											target="_blank"
											rel="noreferrer"
											className="block w-fit normal-case tracking-normal underline decoration-line-strong underline-offset-4 hover:decoration-accent"
										>
											{l.label} ↗
										</a>
									))
								) : (
									<span className="text-muted">Coming soon</span>
								)}
							</dd>
						</div>
					</dl>
				</header>

				<figure className="mt-12 px-[var(--gutter)]">
					<div className="aspect-[16/10] overflow-hidden bg-paper-2">
						<ProjectImage image={project.cover} sizes="100vw" priority flipTarget={project.slug} />
					</div>
				</figure>

				<section aria-labelledby="cs-overview" className="grid gap-8 px-[var(--gutter)] py-[clamp(4rem,9vw,8rem)] lg:grid-cols-12">
					<h2 id="cs-overview" className="t-label text-muted lg:col-span-3">
						Overview
					</h2>
					<div className="space-y-6 lg:col-span-8 lg:col-start-5">
						<SplitReveal as="p" className="t-h3 font-medium">
							{project.summary}
						</SplitReveal>
						{project.body?.map((para) => (
							<p key={para} className="max-w-[62ch] text-muted">
								{para}
							</p>
						))}
					</div>
				</section>

				{project.highlights.length > 0 && (
					<section aria-labelledby="cs-notes" className="cs-notes grid gap-8 px-[var(--gutter)] pb-[clamp(4rem,9vw,8rem)] lg:grid-cols-12">
						<h2 id="cs-notes" className="t-label text-muted lg:col-span-3">
							Engineering notes
						</h2>
						<ol className="grid gap-8 md:grid-cols-3 lg:col-span-8 lg:col-start-5">
							{project.highlights.map((h, i) => (
								<li key={h} className="cs-note border-t border-line-strong pt-4">
									<span className="t-label text-accent-text">Note {String(i + 1).padStart(2, "0")}</span>
									<p className="mt-3">{h}</p>
								</li>
							))}
						</ol>
					</section>
				)}

				{project.gallery.length > 1 && (
					<section aria-labelledby="cs-gallery" className="pb-[clamp(4rem,9vw,8rem)]">
						<h2 id="cs-gallery" className="t-label mb-6 px-[var(--gutter)] text-muted">
							Screens — drag to explore
						</h2>
						<Gallery images={project.gallery} title={project.title} />
					</section>
				)}
			</article>

			<nav aria-label="Next project" className="theme-invert px-[var(--gutter)] py-[clamp(4rem,9vw,8rem)]">
				<p className="t-label text-muted">Next — Sheet {sheetNumber(next.slug)}</p>
				<TransitionLink href={`/projects/${next.slug}`} data-cursor="view" className="group mt-6 block">
					<span className="t-h1 block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4">
						{next.title} <span className="text-accent">→</span>
					</span>
					<span className="t-lead mt-4 block max-w-[40ch] text-muted">{next.tagline}</span>
				</TransitionLink>
				<div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
					<p className="t-label text-muted">Have something like this in mind?</p>
					<Magnetic>
						<TransitionLink
							href="/#contact"
							className="t-label inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-on-accent"
						>
							Start a project →
						</TransitionLink>
					</Magnetic>
				</div>
			</nav>
		</main>
	);
}
