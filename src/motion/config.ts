/**
 * The single source of motion truth. Every tween on the site reads its ease,
 * duration and stagger from here so the whole thing moves as one system.
 */

/** Custom curves registered with CustomEase in ./gsap.ts. */
export const CUSTOM_EASES = {
	/** Fast departure, long settle. The house ease for reveals. */
	ink: "M0,0 C0.16,1 0.3,1 1,1",
	/** Symmetric, weighty. For wipes, pins and things that cross the screen. */
	inkInOut: "M0,0 C0.76,0 0.24,1 1,1",
} as const;

export const EASE = {
	out: "ink",
	inOut: "inkInOut",
	/** Scrubbed timelines: ScrollTrigger supplies the easing via scrub smoothing. */
	scrub: "none",
	/** Follow-the-pointer elements: cursor, magnets, hover previews. */
	follow: "power3.out",
} as const;

export const DUR = {
	xs: 0.2,
	sm: 0.45,
	md: 0.8,
	lg: 1.15,
	xl: 1.6,
} as const;

export const STAGGER = {
	chars: 0.022,
	words: 0.035,
	lines: 0.09,
	items: 0.07,
} as const;

/**
 * Reveal-once behaviour for ScrollTriggers. Deliberately not `once: true`:
 * a `once` trigger kills itself when it fires, and if that happens while
 * another trigger is refreshing (a page mounting mid-scroll) ScrollTrigger's
 * trigger list shrinks under it and throws.
 */
export const PLAY_ONCE = { toggleActions: "play none none none" } as const;

/** ScrollTrigger scrub smoothing, in seconds. */
export const SCRUB = {
	tight: 0.4,
	loose: 1,
} as const;

export const MQ = {
	desktop: "(min-width: 1024px)",
	mobile: "(max-width: 1023.98px)",
	motion: "(prefers-reduced-motion: no-preference)",
	reduce: "(prefers-reduced-motion: reduce)",
	finePointer: "(hover: hover) and (pointer: fine)",
	/** Tall enough for a pinned full-height panel. Mirrors the `pin:` variant in globals.css. */
	pinnable: "(min-width: 1024px) and (min-height: 720px)",
} as const;

/** Conditions passed to every gsap.matchMedia() on the site. */
export const MOTION_CONDITIONS = {
	desktop: `${MQ.desktop} and ${MQ.motion}`,
	mobile: `${MQ.mobile} and ${MQ.motion}`,
	reduce: MQ.reduce,
	pin: `${MQ.pinnable} and ${MQ.motion}`,
} as const;

export type MotionConditions = Record<keyof typeof MOTION_CONDITIONS, boolean>;

export const INTRO = {
	storageKey: "fo-intro-seen",
	exitEvent: "fo:intro-exit",
	/** Hard ceiling; matches the `intro-failsafe` animation delay in globals.css. */
	failsafeMs: 5000,
	/** Counter run time; the whole intro stays under 2.5s. */
	countDuration: 1.25,
} as const;

export const THEME = {
	storageKey: "fo-theme",
	changeEvent: "fo:theme-change",
} as const;
