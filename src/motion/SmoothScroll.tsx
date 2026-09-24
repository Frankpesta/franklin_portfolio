"use client";
import Lenis from "lenis";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { DUR } from "./config";
import { gsap, ScrollTrigger } from "./gsap";
import { useReducedMotion } from "./hooks";

type ScrollApi = {
	/** Scroll to an element, selector ("#work") or y offset. */
	scrollTo: (target: string | number | HTMLElement, opts?: { immediate?: boolean }) => void;
	/** Freeze and resume scrolling (intro, dialogs, page transitions). */
	lock: () => void;
	unlock: () => void;
};

const ScrollContext = createContext<ScrollApi | null>(null);

export function useScroll() {
	const api = useContext(ScrollContext);
	if (!api) throw new Error("useScroll must be used inside <SmoothScroll>");
	return api;
}

/**
 * Lenis drives the scroll position; GSAP's ticker drives Lenis, and every
 * Lenis frame updates ScrollTrigger, so there is exactly one rAF loop and no
 * scroll listeners of our own. Reduced motion falls back to native scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
	const reduce = useReducedMotion();
	const lenisRef = useRef<Lenis | null>(null);
	const locks = useRef(0);

	useEffect(() => {
		if (reduce) return;

		const lenis = new Lenis({
			autoRaf: false,
			lerp: 0.11,
			anchors: { offset: 0, duration: DUR.xl },
			prevent: (node) => node.closest("[data-lenis-prevent], dialog") !== null,
		});
		lenisRef.current = lenis;

		const tick = (time: number) => lenis.raf(time * 1000);
		lenis.on("scroll", ScrollTrigger.update);
		gsap.ticker.add(tick);
		gsap.ticker.lagSmoothing(0);

		if (locks.current > 0) lenis.stop();

		return () => {
			gsap.ticker.remove(tick);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, [reduce]);

	const scrollTo = useCallback<ScrollApi["scrollTo"]>((target, opts) => {
		const lenis = lenisRef.current;
		if (lenis) {
			// Lenis caches the scroll limit; after a route change it still holds the old page's height.
			lenis.resize();
			lenis.scrollTo(target, { immediate: opts?.immediate, duration: DUR.xl, force: true });
			return;
		}
		const el = typeof target === "string" ? document.querySelector(target) : target;
		if (typeof el === "number") window.scrollTo({ top: el, behavior: "instant" });
		else el?.scrollIntoView({ behavior: "instant", block: "start" });
	}, []);

	const lock = useCallback(() => {
		locks.current += 1;
		lenisRef.current?.stop();
	}, []);

	const unlock = useCallback(() => {
		locks.current = Math.max(0, locks.current - 1);
		if (locks.current === 0) lenisRef.current?.start();
	}, []);

	const api = useMemo(() => ({ scrollTo, lock, unlock }), [scrollTo, lock, unlock]);

	return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}
