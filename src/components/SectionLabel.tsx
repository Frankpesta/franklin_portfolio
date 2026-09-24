import { Rule } from "./motion/Rule";

/** The "(01) — Approach" sheet label that opens every section. */
export function SectionLabel({ index, title, aside }: { index: string; title: string; aside?: string }) {
	return (
		<div aria-hidden>
			<div className="t-label flex items-baseline justify-between gap-4 text-muted">
				<span>
					({index}) — {title}
				</span>
				{aside && <span>{aside}</span>}
			</div>
			<Rule className="mt-3" />
		</div>
	);
}
