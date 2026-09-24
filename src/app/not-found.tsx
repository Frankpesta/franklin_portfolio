import { TransitionLink } from "@/components/TransitionLink";

export default function NotFound() {
	return (
		<main id="main" className="blueprint-grid flex min-h-[100svh] flex-col justify-end px-[var(--gutter)] pb-16 pt-[var(--header-h)]">
			<p className="t-label text-muted">Error 404 — sheet missing</p>
			<h1 className="t-display mt-6">
				Not found<span className="text-accent">.</span>
			</h1>
			<p className="t-lead mt-8 max-w-[36ch] text-muted">This page isn&apos;t in the drawings. The work is still where it was.</p>
			<TransitionLink
				href="/#index"
				className="t-label mt-10 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-ink px-6 text-paper hover:bg-accent hover:text-on-accent"
			>
				See all work →
			</TransitionLink>
		</main>
	);
}
