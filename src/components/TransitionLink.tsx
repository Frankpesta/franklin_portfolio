"use client";
import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useTransitionNavigate } from "@/motion/PageTransition";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
	href: string;
	/**
	 * Morph an image into the destination's hero: `key` names the source image
	 * (its data-flip-source), `slug` the target (its data-flip-target). Plain
	 * data, so server components can pass it.
	 */
	flip?: { key: string; slug: string };
};

function flipSource(flip: { key: string; slug: string }) {
	const image = document.querySelector<HTMLImageElement>(`img[data-flip-source="${flip.key}"]`);
	return image && image.getBoundingClientRect().width > 0 ? { slug: flip.slug, image } : undefined;
}

/** A next/link that routes through the page-transition system. */
export function TransitionLink({ href, flip, onClick, ...rest }: Props) {
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
		navigate(href, flip ? flipSource(flip) : undefined);
	};

	return <Link href={href} onClick={handleClick} {...rest} />;
}
