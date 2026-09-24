"use client";
import { useRouter } from "next/navigation";
import { createContext, type ReactNode, useCallback, useContext, useRef, useState } from "react";
import { DUR, EASE } from "./config";
import { Flip, gsap, ScrollTrigger } from "./gsap";
import { useReducedMotion } from "./hooks";
import { useScroll } from "./SmoothScroll";

/** An image on the current page that should morph into the next page's hero. */
export type FlipSource = { slug: string; image: HTMLImageElement };

type Ghost = { src: string; left: number; top: number; width: number; height: number };

const TransitionContext = createContext<((href: string, flip?: FlipSource) => void) | null>(null);

export function useTransitionNavigate() {
	const navigate = useContext(TransitionContext);
	if (!navigate) throw new Error("useTransitionNavigate must be used inside <PageTransition>");
	return navigate;
}

/** Next keeps visited routes mounted but hidden, so "the page" is the visible <main>. */
const visibleMain = () =>
	Array.from(document.querySelectorAll("main")).find((m) => m.checkVisibility()) ?? null;

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

/** Resolve once the router has committed `pathname` and a fresh <main> is on screen. */
async function waitForRoute(pathname: string, oldMain: HTMLElement | null, timeout = 10_000) {
	const start = performance.now();
	while (performance.now() - start < timeout) {
		const main = visibleMain();
		if (window.location.pathname === pathname && main && main !== oldMain) return main;
		await nextFrame();
	}
	return visibleMain();
}

/**
 * Route transitions for the App Router, run as one explicit sequence:
 * cover → jump to top → push → wait for the new page → reveal.
 * - wipe: an ink panel rises over the page and exits upward on the new one.
 * - flip: the clicked project image is lifted into a fixed "ghost", the page
 *   fades, and the ghost is Flip.fit() onto [data-flip-target="<slug>"].
 * Reduced motion, modified clicks and browser back/forward navigate instantly.
 */
export function PageTransition({ children }: { children: ReactNode }) {
	const router = useRouter();
	const reduce = useReducedMotion();
	const { scrollTo, lock, unlock } = useScroll();
	const panelRef = useRef<HTMLDivElement>(null);
	const ghostRef = useRef<HTMLDivElement>(null);
	const busy = useRef(false);
	const [ghost, setGhost] = useState<Ghost | null>(null);

	const navigate = useCallback(
		async (href: string, flip?: FlipSource) => {
			const url = new URL(href, window.location.href);
			if (url.pathname === window.location.pathname) {
				scrollTo(url.hash || 0);
				return;
			}
			if (reduce || busy.current) {
				router.push(href, { scroll: !url.hash });
				return;
			}

			busy.current = true;
			lock();
			const oldMain = visibleMain();
			const panel = panelRef.current;

			// 1. Cover.
			if (flip) {
				const r = flip.image.getBoundingClientRect();
				setGhost({ src: flip.image.currentSrc, left: r.left, top: r.top, width: r.width, height: r.height });
				await gsap.to(oldMain, { opacity: 0, duration: DUR.sm, ease: EASE.out });
			} else {
				await gsap.fromTo(
					panel,
					{ scaleY: 0, transformOrigin: "50% 100%" },
					{ scaleY: 1, duration: DUR.md, ease: EASE.inOut },
				);
			}

			// 2. Swap. Jump to the top first so the new route mounts its
			//    ScrollTriggers at scroll 0, not half-way down the old page.
			scrollTo(0, { immediate: true });
			router.push(href, { scroll: false });
			const newMain = await waitForRoute(url.pathname, oldMain);
			if (oldMain) gsap.set(oldMain, { clearProps: "opacity" });
			await nextFrame();

			// 3. Settle scroll on the new page.
			unlock();
			ScrollTrigger.refresh();
			if (url.hash) scrollTo(url.hash, { immediate: true });

			// 4. Reveal.
			if (!flip) {
				await gsap.fromTo(
					panel,
					{ scaleY: 1, transformOrigin: "50% 0%" },
					{ scaleY: 0, duration: DUR.md, ease: EASE.inOut },
				);
				busy.current = false;
				return;
			}

			const target = newMain?.querySelector<HTMLElement>(`[data-flip-target="${flip.slug}"]`);
			const ghostEl = ghostRef.current;
			if (newMain) gsap.from(newMain, { opacity: 0, duration: DUR.md, ease: EASE.out, delay: DUR.sm, clearProps: "opacity" });
			if (target && ghostEl) {
				gsap.set(target, { opacity: 0 });
				await Flip.fit(ghostEl, target, { scale: true, duration: DUR.lg, ease: EASE.inOut });
				gsap.set(target, { clearProps: "opacity" });
			}
			setGhost(null);
			busy.current = false;
		},
		[reduce, router, scrollTo, lock, unlock],
	);

	const navigateSync = useCallback(
		(href: string, flip?: FlipSource) => {
			void navigate(href, flip);
		},
		[navigate],
	);

	return (
		<TransitionContext.Provider value={navigateSync}>
			{children}
			<div
				ref={panelRef}
				aria-hidden
				className="pointer-events-none fixed inset-0 z-[90] origin-bottom scale-y-0 bg-ink"
			/>
			{ghost && (
				<div
					ref={ghostRef}
					aria-hidden
					className="pointer-events-none fixed z-[95] overflow-hidden"
					style={{ left: ghost.left, top: ghost.top, width: ghost.width, height: ghost.height }}
				>
					{/* eslint-disable-next-line @next/next/no-img-element -- reuses the already-loaded optimized src */}
					<img src={ghost.src} alt="" className="h-full w-full object-cover object-top" />
				</div>
			)}
		</TransitionContext.Provider>
	);
}
