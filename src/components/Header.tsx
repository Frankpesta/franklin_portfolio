"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { DUR, EASE, STAGGER } from "@/motion/config";
import { gsap, ScrollTrigger, useGSAP } from "@/motion/gsap";
import { useMotion } from "@/motion/hooks";
import { useScroll } from "@/motion/SmoothScroll";
import { ThemeToggle } from "./ThemeToggle";
import { TransitionLink } from "./TransitionLink";

const NAV = [
	{ label: "Work", href: "/#work" },
	{ label: "Experience", href: "/#experience" },
	{ label: "About", href: "/#about" },
	{ label: "Contact", href: "/#contact" },
] as const;

export function Header() {
	const headerRef = useRef<HTMLElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);
	const [open, setOpen] = useState(false);
	const { lock, unlock } = useScroll();

	// Slide away while reading down, return on any upward scroll.
	useMotion(
		() => {
			const header = headerRef.current;
			if (!header) return;
			const show = gsap.quickTo(header, "yPercent", { duration: DUR.sm, ease: EASE.out });
			ScrollTrigger.create({
				start: 0,
				end: "max",
				onUpdate: (self) => show(self.direction === 1 && self.scroll() > 160 ? -110 : 0),
			});
		},
		{ scope: headerRef, defer: true },
	);

	useGSAP(
		() => {
			const menu = menuRef.current;
			if (!menu) return;
			const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			if (open) {
				gsap.set(menu, { visibility: "visible" });
				if (reduce) return;
				gsap
					.timeline({ defaults: { ease: EASE.inOut } })
					.fromTo(menu, { yPercent: -100 }, { yPercent: 0, duration: DUR.md })
					.from(".menu-link", { yPercent: 110, stagger: STAGGER.items, duration: DUR.md, ease: EASE.out }, "-=0.35");
			} else {
				gsap.to(menu, {
					yPercent: reduce ? 0 : -100,
					duration: reduce ? 0 : DUR.sm,
					ease: EASE.inOut,
					onComplete: () => {
						gsap.set(menu, { visibility: "hidden" });
					},
				});
			}
		},
		{ scope: menuRef, dependencies: [open] },
	);

	useEffect(() => {
		if (!open) return;
		lock();
		menuRef.current?.querySelector<HTMLElement>("a")?.focus();
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		const toggle = toggleRef.current;
		return () => {
			window.removeEventListener("keydown", onKey);
			unlock();
			toggle?.focus();
		};
	}, [open, lock, unlock]);

	const close = () => setOpen(false);

	return (
		<>
			<header
				ref={headerRef}
				className="fixed inset-x-0 top-0 z-[80] border-b border-line bg-paper/85 backdrop-blur-md"
			>
				<div className="flex h-[var(--header-h)] items-center justify-between gap-6 px-[var(--gutter)]">
					<TransitionLink href="/" className="group flex items-baseline gap-3 py-2">
						<span className="text-lg font-extrabold uppercase tracking-tight">
							Franklin<span className="text-accent">.</span>
							<span className="sr-only"> Olisaemeka, home</span>
						</span>
						<span className="t-label hidden text-muted xl:inline">{site.role}</span>
					</TransitionLink>

					<nav aria-label="Primary" className="hidden lg:block">
						<ul className="flex items-center gap-8">
							{NAV.map((item) => (
								<li key={item.href}>
									<TransitionLink
										href={item.href}
										className="t-label relative inline-block py-3 after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
									>
										{item.label}
									</TransitionLink>
								</li>
							))}
						</ul>
					</nav>

					<div className="flex items-center gap-5">
						<p className="t-label hidden items-center gap-2 md:flex">
							<span aria-hidden className="relative flex h-2 w-2">
								<span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
								<span className="relative h-2 w-2 rounded-full bg-accent" />
							</span>
							{site.availability}
						</p>
						<ThemeToggle className="hidden items-center gap-2 sm:flex" />
						<a href={site.resume} className="t-label hidden py-3 lg:inline" target="_blank" rel="noreferrer">
							Résumé ↗
						</a>
						<button
							ref={toggleRef}
							type="button"
							className="t-label -my-2 py-4 lg:hidden"
							aria-expanded={open}
							aria-controls="mobile-menu"
							onClick={() => setOpen((o) => !o)}
						>
							{open ? "Close" : "Menu"}
						</button>
					</div>
				</div>
			</header>

			<div
				ref={menuRef}
				id="mobile-menu"
				className="invisible fixed inset-0 z-[75] flex flex-col justify-between bg-paper px-[var(--gutter)] pb-8 pt-[calc(var(--header-h)+2rem)] lg:hidden"
				inert={!open}
			>
				<nav aria-label="Mobile">
					<ul className="space-y-1">
						{NAV.map((item, i) => (
							<li key={item.href} className="overflow-hidden border-b border-line">
								<TransitionLink
									href={item.href}
									onClick={close}
									className="menu-link flex items-baseline justify-between py-3"
								>
									<span className="t-h2">{item.label}</span>
									<span className="t-label text-muted">0{i + 1}</span>
								</TransitionLink>
							</li>
						))}
					</ul>
				</nav>
				<div className="flex items-end justify-between gap-4">
					<div className="space-y-2">
						<p className="t-label text-muted">{site.availability}</p>
						<a href={site.resume} target="_blank" rel="noreferrer" className="t-label block">
							Résumé (PDF) ↗
						</a>
					</div>
					<ThemeToggle className="flex items-center gap-2" />
				</div>
			</div>
		</>
	);
}
