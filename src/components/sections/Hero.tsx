import { HeroStage } from "@/components/hero/HeroStage";
import { LocalTime } from "@/components/LocalTime";
import { Magnetic } from "@/components/motion/Magnetic";
import { TransitionLink } from "@/components/TransitionLink";
import { site } from "@/content/site";

const STATS = [
	{ value: site.experience, label: "Years shipping production software" },
	{ value: "CTO", label: "Leading the build at 49GIG" },
];

export function Hero() {
	return (
		<HeroStage>
			<div className="hero-meta flex items-start justify-between gap-4">
				<p className="t-label text-muted">(00) Index</p>
				<p className="t-label hidden text-muted sm:block">Portfolio — {new Date().getFullYear()}</p>
				<LocalTime className="t-label text-muted" />
			</div>

			{/* Top-anchored on phones: a bottom-anchored block moves as a whole whenever
			    anything inside it changes height (e.g. a font swap), which read as CLS. */}
			<div className="pt-[18vh] lg:mt-auto lg:pt-[14vh]">
				<h1 id="hero-title" aria-label={site.name} className="t-display">
					<span aria-hidden className="hero-line hero-line-1 block">
						Franklin
					</span>
					<span aria-hidden className="hero-line hero-line-2 block lg:pl-[7vw]">
						Olisaemeka<span className="text-accent">.</span>
					</span>
				</h1>

				<div aria-hidden className="relative mt-5 flex items-center gap-3 text-muted">
					<span className="hero-draw-y h-3 w-px origin-center bg-line-strong" />
					<span className="hero-draw-x h-px flex-1 origin-left bg-line-strong" />
					<span className="t-label shrink-0">Full stack · end to end</span>
					<span className="hero-draw-x h-px flex-1 origin-right bg-line-strong" />
					<span className="hero-draw-y h-3 w-px origin-center bg-line-strong" />
				</div>

				<div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
					{/* COPY: review */}
					<p className="hero-rise t-lead max-w-[36ch] lg:col-span-5">
						I design and build products end to end: the data model, auth, payments and real-time systems
						underneath, and the interface people actually touch.
					</p>

					<dl className="hero-rise grid grid-cols-2 gap-4 border-t border-line pt-4 lg:col-span-4">
						{STATS.map((s) => (
							<div key={s.label} className="flex flex-col">
								<dt className="t-label mt-1 normal-case tracking-normal text-muted">{s.label}</dt>
								<dd className="order-first text-3xl font-bold tracking-tight lg:text-4xl">{s.value}</dd>
							</div>
						))}
					</dl>

					<div className="hero-rise flex flex-wrap items-center gap-4 lg:col-span-3 lg:justify-end">
						<Magnetic>
							<TransitionLink
								href="/#work"
								className="t-label inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-paper transition-colors hover:bg-accent hover:text-on-accent"
							>
								See the work <span aria-hidden>↓</span>
							</TransitionLink>
						</Magnetic>
						<Magnetic>
							<TransitionLink
								href="/#contact"
								className="t-label inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 transition-colors hover:border-ink"
							>
								Start a project <span aria-hidden>→</span>
							</TransitionLink>
						</Magnetic>
					</div>
				</div>
			</div>
		</HeroStage>
	);
}
