"use client";
import { type ComponentProps, useRef } from "react";
import type { MotionConditions } from "./config";
import { useMotion } from "./hooks";

type Setup = (conditions: MotionConditions, root: HTMLElement) => void | (() => void);

/**
 * Wrap a GSAP setup in a client <section> (or <main>), so the section's markup can stay a
 * server component and only this thin shell hydrates. Selector strings in
 * `setup` resolve inside the section.
 */
export function motionSection(
	name: string,
	setup: Setup,
	{ defer = true, as: Tag = "section" }: { defer?: boolean; as?: "section" | "main" } = {},
) {
	function MotionSection({ children, ...props }: ComponentProps<"section">) {
		const ref = useRef<HTMLElement>(null);
		useMotion(
			(conditions) => {
				if (ref.current) return setup(conditions, ref.current);
			},
			{ scope: ref, defer },
		);
		return (
			<Tag ref={ref} {...props}>
				{children}
			</Tag>
		);
	}
	MotionSection.displayName = name;
	return MotionSection;
}
