import { SectionLabel } from "@/components/SectionLabel";
import { stackByUsage } from "@/content/projects";
import { StackSection } from "./motion";

const half = Math.ceil(stackByUsage.length / 2);
const ROWS = [stackByUsage.slice(0, half), stackByUsage.slice(half)] as const;

/**
 * The stack, derived from the projects themselves (most-used first). Two
 * marquees drift in opposite directions; scroll speed pushes them faster and
 * skews them, then they settle. Reduced motion shows a plain wrapped list.
 */
export function Stack() {
	return (
		<StackSection id="stack" aria-labelledby="stack-title" className="overflow-hidden py-[clamp(5rem,10vw,8rem)]">
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
		</StackSection>
	);
}
