"use client";
import { useRef } from "react";
import { site } from "@/content/site";
import { DUR, EASE, INTRO } from "@/motion/config";
import { gsap, useGSAP } from "@/motion/gsap";
import { useScroll } from "@/motion/SmoothScroll";

/**
 * First-visit intro: crosshairs draw, a counter runs to 100, the sheet splits
 * open. About 2.2s. Any click or key skips it; it never plays again in this
 * browser. The boot script in layout.tsx decides whether it shows at all, so
 * the page underneath is always server-rendered and never waits on it.
 */
export function Intro() {
	const rootRef = useRef<HTMLDivElement>(null);
	const countRef = useRef<HTMLSpanElement>(null);
	const { lock, unlock } = useScroll();

	useGSAP(
		(_, contextSafe) => {
			const root = document.documentElement;
			if (root.dataset.intro !== "play" || !contextSafe) return;

			const finish = () => {
				try {
					localStorage.setItem(INTRO.storageKey, "1");
				} catch {
					// Storage blocked: the intro may replay next time, which is harmless.
				}
				root.dataset.intro = "done";
				unlock();
			};

			// Hydrated too late to be worth playing (slow network, CPU).
			if (performance.now() > 3500) {
				window.dispatchEvent(new Event(INTRO.exitEvent));
				finish();
				return;
			}

			lock();
			const counter = { value: 0 };
			const tl = gsap.timeline({ onComplete: finish });
			tl.from(".intro-rule-x", { scaleX: 0, duration: DUR.md, ease: EASE.inOut })
				.from(".intro-rule-y", { scaleY: 0, duration: DUR.md, ease: EASE.inOut }, "<0.1")
				.from(".intro-meta", { opacity: 0, y: 12, stagger: 0.06, duration: DUR.sm }, "<0.2")
				.to(
					counter,
					{
						value: 100,
						duration: INTRO.countDuration,
						ease: "power2.inOut",
						onUpdate: () => {
							if (countRef.current) countRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
						},
					},
					0.15,
				)
				.addLabel("exit")
				.to(".intro-content", { yPercent: -30, opacity: 0, duration: DUR.sm, ease: EASE.inOut }, "exit")
				.call(() => window.dispatchEvent(new Event(INTRO.exitEvent)), undefined, "exit+=0.15")
				.to(".intro-top", { yPercent: -100, duration: DUR.md, ease: EASE.inOut }, "exit+=0.1")
				.to(".intro-bottom", { yPercent: 100, duration: DUR.md, ease: EASE.inOut }, "<");

			const skip = contextSafe(() => {
				if (tl.time() < tl.labels.exit) tl.seek("exit");
				tl.timeScale(1.6);
			});
			window.addEventListener("keydown", skip, { once: true });
			window.addEventListener("pointerdown", skip, { once: true });
			return () => {
				window.removeEventListener("keydown", skip);
				window.removeEventListener("pointerdown", skip);
			};
		},
		{ scope: rootRef },
	);

	return (
		<div ref={rootRef} className="intro fixed inset-0 z-[110]" aria-hidden>
			<div className="intro-top absolute inset-x-0 top-0 h-1/2 bg-ink" />
			<div className="intro-bottom absolute inset-x-0 bottom-0 h-1/2 bg-ink" />
			<div className="intro-content absolute inset-0 text-paper">
				<span className="intro-rule-x absolute left-0 top-1/2 h-px w-full origin-left bg-paper/25" />
				<span className="intro-rule-y absolute left-1/2 top-0 h-full w-px origin-top bg-paper/25" />
				<p className="intro-meta t-label absolute left-[var(--gutter)] top-6">{site.name}</p>
				<p className="intro-meta t-label absolute right-[var(--gutter)] top-6">Portfolio · Sheet 00</p>
				<p className="intro-meta t-label absolute bottom-6 right-[var(--gutter)]">Click or press any key to skip</p>
				<span
					ref={countRef}
					className="absolute bottom-3 left-[var(--gutter)] font-mono text-[clamp(4rem,16vw,12rem)] leading-none tracking-tighter tabular-nums"
				>
					000
				</span>
				<span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
			</div>
		</div>
	);
}
