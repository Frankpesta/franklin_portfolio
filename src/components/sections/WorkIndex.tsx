import { SplitReveal } from "@/components/motion/SplitReveal";
import { ProjectImage } from "@/components/ProjectImage";
import { SectionLabel } from "@/components/SectionLabel";
import { TransitionLink } from "@/components/TransitionLink";
import { projects, sheetNumber } from "@/content/projects";
import { IndexPreview } from "./IndexPreview";
import { IndexSection } from "./motion";

/**
 * Every project as a line in an index. On a fine pointer a preview of the
 * hovered project trails the cursor; clicking morphs that preview into the
 * case-study hero (Flip). Touch and keyboard get the plain list.
 */
export function WorkIndex() {
	const slides = projects.map((p) => (
		<div key={p.slug} className="preview-slide absolute inset-0 opacity-0">
			<ProjectImage image={p.cover} sizes="26rem" flipKey={`index-${p.slug}`} />
		</div>
	));

	return (
		<IndexSection id="index" aria-labelledby="index-title" className="px-[var(--gutter)] py-[clamp(6rem,12vw,10rem)]">
			<SectionLabel index="03" title="Index" aside={`${projects.length} entries`} />
			<SplitReveal as="h2" id="index-title" className="t-h1 mt-10">
				All work
			</SplitReveal>

			<div className="t-label mt-12 hidden grid-cols-12 gap-4 pb-3 text-muted md:grid" aria-hidden>
				<span className="col-span-1">No.</span>
				<span className="col-span-5">Project</span>
				<span className="col-span-3">Category</span>
				<span className="col-span-2">Year</span>
			</div>

			<IndexPreview slides={slides}>
				<ul className="index-list mt-10 border-t border-line-strong md:mt-0">
					{projects.map((p, i) => (
						<li key={p.slug} className="index-row border-b border-line">
							<TransitionLink
								href={`/projects/${p.slug}`}
								flip={{ key: `index-${p.slug}`, slug: p.slug }}
								data-cursor="view"
								data-index={i}
								className="group relative isolate grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-5 md:grid-cols-12 md:py-6"
							>
								<span
									aria-hidden
									className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-paper-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
								/>
								<span className="t-label text-muted md:col-span-1">{sheetNumber(p.slug)}</span>
								<span className="md:col-span-5">
									<span className="t-h3 block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
										{p.title}
										{p.tier === "in-progress" && (
											<span className="t-label ml-3 align-middle text-accent-text">In progress</span>
										)}
										{p.tier === "featured" && <span className="sr-only"> (case study)</span>}
									</span>
									<span className="t-label mt-1 block text-muted md:hidden">{p.category}</span>
								</span>
								<span className="t-label hidden text-muted md:col-span-3 md:block">{p.category}</span>
								<span className="t-label hidden text-muted md:col-span-2 md:block">{p.year ?? "—"}</span>
								<span
									aria-hidden
									className="text-right text-xl transition-transform duration-500 group-hover:-rotate-45 group-hover:text-accent md:col-span-1"
								>
									→
								</span>
							</TransitionLink>
						</li>
					))}
				</ul>
			</IndexPreview>
		</IndexSection>
	);
}
