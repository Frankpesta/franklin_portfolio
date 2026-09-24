"use client";
import { type RefObject, useSyncExternalStore } from "react";
import { gsap, useGSAP } from "./gsap";
import { MOTION_CONDITIONS, MQ, type MotionConditions } from "./config";

export function useMediaQuery(query: string, serverValue = false) {
	return useSyncExternalStore(
		(onChange) => {
			const mql = window.matchMedia(query);
			mql.addEventListener("change", onChange);
			return () => mql.removeEventListener("change", onChange);
		},
		() => window.matchMedia(query).matches,
		() => serverValue,
	);
}

export const useReducedMotion = () => useMediaQuery(MQ.reduce);

export const useFinePointer = () => useMediaQuery(MQ.finePointer);

type MotionSetup = (conditions: MotionConditions) => void | (() => void);

/** Run `fn` when the main thread is idle (with a ceiling), or soon after in Safari. */
function whenIdle(fn: () => void) {
	if (typeof window.requestIdleCallback === "function") {
		const id = window.requestIdleCallback(fn, { timeout: 1200 });
		return () => window.cancelIdleCallback(id);
	}
	const id = window.setTimeout(fn, 150);
	return () => window.clearTimeout(id);
}

/**
 * The one way sections build animation: a gsap.matchMedia() scoped to a
 * component, branching on desktop / mobile / reduce / pin, reverted on
 * unmount. Selector strings resolve inside `scope`.
 *
 * `defer` postpones setup until the browser is idle. Use it for anything that
 * starts below the fold: creating dozens of ScrollTriggers and splits inside
 * the hydration task was the largest block of main-thread time on mobile.
 */
export function useMotion(
	setup: MotionSetup,
	{
		scope,
		dependencies = [],
		defer = false,
	}: { scope: RefObject<HTMLElement | null>; dependencies?: unknown[]; defer?: boolean },
) {
	useGSAP(
		() => {
			let mm: gsap.MatchMedia | undefined;
			const run = () => {
				mm = gsap.matchMedia();
				mm.add(
					MOTION_CONDITIONS,
					(ctx) => setup(ctx.conditions as MotionConditions),
					scope.current ?? undefined,
				);
			};
			if (!defer) {
				run();
				return () => mm?.revert();
			}
			const cancel = whenIdle(run);
			return () => {
				cancel();
				mm?.revert();
			};
		},
		{ scope, dependencies, revertOnUpdate: true },
	);
}
