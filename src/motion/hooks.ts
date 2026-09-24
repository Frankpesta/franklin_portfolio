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

/**
 * The one way sections build animation: a gsap.matchMedia() scoped to a
 * component, branching on desktop / mobile / reduced motion, reverted on
 * unmount. Selector strings resolve inside `scope`.
 */
export function useMotion(
	setup: MotionSetup,
	{ scope, dependencies = [] }: { scope: RefObject<HTMLElement | null>; dependencies?: unknown[] },
) {
	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add(
				MOTION_CONDITIONS,
				(ctx) => setup(ctx.conditions as MotionConditions),
				scope.current ?? undefined,
			);
			return () => mm.revert();
		},
		{ scope, dependencies, revertOnUpdate: true },
	);
}
