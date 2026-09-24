"use client";
import { useRef } from "react";
import { Rule } from "@/components/motion/Rule";
import { SectionLabel } from "@/components/SectionLabel";
import { TransitionLink } from "@/components/TransitionLink";
import { getProject } from "@/content/projects";
import { PLAY_ONCE, SCRUB, STAGGER } from "@/motion/config";
import { gsap, SplitText } from "@/motion/gsap";
import { useMotion } from "@/motion/hooks";

// COPY: review
const STATEMENT =
	"Most of what I build moves money, people or data in real time. I own it end to end: the architecture, the security model, and the interface on top, so nothing gets lost between the layers.";

// COPY: review
const CAPABILITIES = [
	{
		title: "Product architecture",
		body: "System design, data modelling and security from day one: RBAC, rate limiting, audit trails, typed boundaries.",
		proof: ["49gig-freelance-marketplace", "nysc-cds-attendance-system"],
	},
	{
		title: "Payments & real-time",
		body: "Escrow, payouts, refunds and webhooks. Live dashboards, chat and dispatch that stay in sync across every role.",
		proof: ["tubira-affiliate-platform", "event-ticketing-platform", "dishpatch-global"],
	},
	{
		title: "Interfaces that convert",
		body: "Fast, accessible front ends and launch sites that make a product's value obvious and turn visitors into users.",
		proof: ["cabwire", "linkedcart"],
	},
] as const;

export function Approach() {
	const rootRef = useRef<HTMLElement>(null);

	useMotion(
		({ reduce, mobile }) => {
			if (reduce) return;
			// The statement is "read in": each word darkens as the scroll passes it.
			const split = SplitText.create(".approach-statement", { type: "words" });
			gsap.fromTo(
				split.words,
				{ opacity: 0.14 },
				{
					opacity: 1,
					stagger: STAGGER.words,
					ease: "none",
					scrollTrigger: {
						trigger: ".approach-statement",
						start: mobile ? "top 85%" : "top 75%",
						end: mobile ? "bottom 55%" : "bottom 45%",
						scrub: SCRUB.tight,
					},
				},
			);
			gsap.from(".capability", {
				y: 40,
				opacity: 0,
				stagger: STAGGER.items * 2,
				scrollTrigger: { trigger: ".capabilities", start: "top 85%", ...PLAY_ONCE },
			});
			return () => split.revert();
		},
		{ scope: rootRef },
	);

	return (
		<section ref={rootRef} id="approach" aria-labelledby="approach-title" className="px-[var(--gutter)] py-[clamp(6rem,14vw,12rem)]">
			<SectionLabel index="01" title="Approach" />
			<h2 id="approach-title" className="sr-only">
				Approach
			</h2>
			<p className="approach-statement t-h2 mt-10 max-w-[22ch] lg:ml-[16.66%]">{STATEMENT}</p>

			<ol className="capabilities mt-[clamp(4rem,8vw,7rem)] grid gap-10 md:grid-cols-3 md:gap-6">
				{CAPABILITIES.map((c, i) => (
					<li key={c.title} className="capability flex flex-col">
						<Rule delay={i * 0.1} />
						<span className="t-label mt-4 text-accent-text">0{i + 1}</span>
						<h3 className="t-h3 mt-3">{c.title}</h3>
						<p className="mt-3 max-w-[38ch] text-muted">{c.body}</p>
						<p className="t-label mt-5 flex flex-wrap gap-x-3 gap-y-1">
							<span className="text-muted">Seen in</span>
							{c.proof.map((slug) => {
								const p = getProject(slug);
								return p ? (
									<TransitionLink key={slug} href={`/projects/${slug}`} className="underline decoration-line-strong underline-offset-4 hover:decoration-accent">
										{p.title}
									</TransitionLink>
								) : null;
							})}
						</p>
					</li>
				))}
			</ol>
		</section>
	);
}
