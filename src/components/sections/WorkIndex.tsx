"use client";
import { useRef, useState } from "react";
import { flipSourceFor, ProjectImage } from "@/components/ProjectImage";
import { SectionLabel } from "@/components/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { TransitionLink } from "@/components/TransitionLink";
import { projects, sheetNumber } from "@/content/projects";
import { DUR, EASE, MQ, PLAY_ONCE, STAGGER } from "@/motion/config";
import { gsap, useGSAP } from "@/motion/gsap";
import { useMotion } from "@/motion/hooks";

/**
 * Every project as a line in an index. On a fine pointer a preview of the
 * hovered project trails the cursor; clicking morphs that preview into the
 * case-study hero (Flip). Touch and keyboard get the plain list.
 */
export function WorkIndex() {
	const rootRef = useRef<HTMLElement>(null);
	const previewRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState<number | null>(null);

	useMotion(
		({ reduce }) => {
			if (reduce) return;
			gsap.from(".index-row", {
				opacity: 0,
				y: 30,
				stagger: STAGGER.items,
				duration: DUR.md,
				scrollTrigger: { trigger: ".index-list", start: "top 85%", ...PLAY_ONCE },
			});
		},
		{ scope: rootRef },
	);

	// Cursor-trailing preview.
	useGSAP(
		(_, contextSafe) => {
			const root = rootRef.current;
			const preview = previewRef.current;
			if (!root || !preview || !contextSafe) return;
			const enabled = () =>
				window.matchMedia(MQ.finePointer).matches && window.matchMedia(MQ.motion).matches;

			gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0 });
			const xTo = gsap.quickTo(preview, "x", { duration: DUR.md, ease: EASE.follow });
			const yTo = gsap.quickTo(preview, "y", { duration: DUR.md, ease: EASE.follow });
			const list = root.querySelector<HTMLElement>(".index-list");
			if (!list) return;

			const move = contextSafe((e: PointerEvent) => {
				if (!enabled()) return;
				xTo(e.clientX);
				yTo(e.clientY);
			});
			const enter = contextSafe((e: PointerEvent) => {
				if (!enabled()) return;
				gsap.set(preview, { x: e.clientX, y: e.clientY });
				gsap.to(preview, { scale: 1, duration: DUR.md, ease: EASE.out });
			});
			const leave = contextSafe(() => {
				gsap.to(preview, { scale: 0, duration: DUR.sm, ease: EASE.out });
				setActive(null);
			});

			list.addEventListener("pointermove", move);
			list.addEventListener("pointerenter", enter);
			list.addEventListener("pointerleave", leave);
			return () => {
				list.removeEventListener("pointermove", move);
				list.removeEventListener("pointerenter", enter);
				list.removeEventListener("pointerleave", leave);
			};
		},
		{ scope: rootRef },
	);

	// Cross-fade between previews as the hovered row changes.
	useGSAP(
		() => {
			gsap.to(".preview-slide", {
				opacity: (i: number) => (i === active ? 1 : 0),
				scale: (i: number) => (i === active ? 1 : 1.08),
				duration: DUR.sm,
				ease: EASE.out,
				overwrite: true,
			});
		},
		{ scope: previewRef, dependencies: [active] },
	);

	return (
		<section ref={rootRef} id="index" aria-labelledby="index-title" className="px-[var(--gutter)] py-[clamp(6rem,12vw,10rem)]">
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

			<ul className="index-list border-t border-line-strong md:mt-0 mt-10">
				{projects.map((p, i) => (
					<li key={p.slug} className="index-row border-b border-line">
						<TransitionLink
							href={`/projects/${p.slug}`}
							flipSource={flipSourceFor(`index-${p.slug}`, p.slug)}
							data-cursor="view"
							onPointerEnter={() => setActive(i)}
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

			<div
				ref={previewRef}
				aria-hidden
				className="pointer-events-none fixed left-0 top-0 z-[60] hidden aspect-[16/10] w-[min(26rem,32vw)] overflow-hidden bg-paper-2 lg:block"
			>
				{projects.map((p) => (
					<div key={p.slug} className="preview-slide absolute inset-0 opacity-0">
						<ProjectImage image={p.cover} sizes="26rem" flipKey={`index-${p.slug}`} />
					</div>
				))}
			</div>
		</section>
	);
}
