"use client";
import { useRef } from "react";
import { ContactDialog, type ContactDialogHandle } from "@/components/ContactDialog";
import { LocalTime } from "@/components/LocalTime";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { site, socials } from "@/content/site";
import { useScroll } from "@/motion/SmoothScroll";

export function Contact() {
	const dialogRef = useRef<ContactDialogHandle>(null);
	const { scrollTo } = useScroll();

	const channels = [
		...socials,
		{ label: "Résumé", handle: "PDF", href: site.resume },
	];

	return (
		<>
			<section id="contact" aria-labelledby="contact-title" className="theme-invert relative overflow-hidden">
				<div aria-hidden className="blueprint-grid absolute inset-0" />
				<div className="relative px-[var(--gutter)] pb-8 pt-[clamp(6rem,12vw,10rem)]">
					<SectionLabel index="07" title="Contact" aside={site.availability} />

					{/* COPY: review */}
					<SplitReveal as="h2" id="contact-title" type="chars" className="t-display mt-12 max-w-[12ch] [font-stretch:100%]">
						Let&apos;s build something that works<span className="text-accent">.</span>
					</SplitReveal>

					<div className="mt-16 grid gap-14 lg:grid-cols-12 lg:items-end">
						<div className="lg:col-span-5">
							<Magnetic strength={0.45}>
								<button
									type="button"
									onClick={() => dialogRef.current?.open()}
									className="group relative flex aspect-square w-[min(15rem,60vw)] items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
								>
									<span className="t-label text-sm">
										Start a project
										<span aria-hidden className="mt-2 block text-center text-2xl transition-transform duration-500 group-hover:rotate-[-45deg]">
											→
										</span>
									</span>
								</button>
							</Magnetic>
							{/* COPY: review */}
							<p className="mt-8 max-w-[34ch] text-muted">
								{site.availability}. Tell me about the product, the timeline and where you&apos;re stuck. I usually reply within a day.
							</p>
						</div>

						<ul className="border-t border-line-strong lg:col-span-6 lg:col-start-7">
							{channels.map((c) => (
								<li key={c.label} className="border-b border-line">
									<a
										href={c.href}
										target="_blank"
										rel="noreferrer"
										className="group flex items-baseline justify-between gap-4 py-5"
									>
										<span className="t-h3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
											{c.label}
										</span>
										<span className="t-label flex items-center gap-3 text-muted">
											<span className="hidden sm:inline">{c.handle}</span>
											<span aria-hidden className="text-lg text-ink transition-transform duration-500 group-hover:-rotate-45 group-hover:text-accent">
												→
											</span>
										</span>
									</a>
								</li>
							))}
						</ul>
					</div>

					<footer className="t-label mt-[clamp(5rem,10vw,8rem)] flex flex-col gap-4 border-t border-line pt-6 text-muted sm:flex-row sm:items-center sm:justify-between">
						<p>
							© {new Date().getFullYear()} {site.name}
						</p>
						<LocalTime />
						<p className="hidden md:block">Designed &amp; built by me · Next.js · GSAP · Three.js</p>
						<button type="button" onClick={() => scrollTo(0)} className="w-fit text-ink">
							Back to top ↑
						</button>
					</footer>
				</div>
			</section>
			<ContactDialog ref={dialogRef} />
		</>
	);
}
