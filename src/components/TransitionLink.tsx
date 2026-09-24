"use client";
import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { type FlipSource, useTransitionNavigate } from "@/motion/PageTransition";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
	href: string;
	/** Returns the image to morph into the destination hero, if any. */
	flipSource?: () => FlipSource | null;
};

/** A next/link that routes through the page-transition system. */
export function TransitionLink({ href, flipSource, onClick, ...rest }: Props) {
	const navigate = useTransitionNavigate();

	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		onClick?.(e);
		if (
			e.defaultPrevented ||
			e.button !== 0 ||
			e.metaKey ||
			e.ctrlKey ||
			e.shiftKey ||
			e.altKey ||
			rest.target === "_blank"
		) {
			return;
		}
		e.preventDefault();
		navigate(href, flipSource?.() ?? undefined);
	};

	return <Link href={href} onClick={handleClick} {...rest} />;
}
