"use client";
import { type PointerEvent, useRef } from "react";
import type { ProjectImage as ProjectImageData } from "@/content/types";
import { ProjectImage } from "./ProjectImage";

/**
 * A horizontal strip of screenshots. Native overflow scrolling (touch,
 * trackpad, keyboard once focused), plus click-and-drag for mouse users.
 */
export function Gallery({ images, title }: { images: readonly ProjectImageData[]; title: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const drag = useRef<{ x: number; left: number } | null>(null);

	const down = (e: PointerEvent<HTMLDivElement>) => {
		if (e.pointerType !== "mouse" || !ref.current) return;
		drag.current = { x: e.clientX, left: ref.current.scrollLeft };
		ref.current.setPointerCapture(e.pointerId);
	};
	const move = (e: PointerEvent<HTMLDivElement>) => {
		const d = drag.current;
		if (!d || !ref.current) return;
		ref.current.scrollLeft = d.left - (e.clientX - d.x);
	};
	const up = () => {
		drag.current = null;
	};

	return (
		<div
			ref={ref}
			role="region"
			aria-label={`${title} screenshots`}
			tabIndex={0}
			data-cursor="drag"
			data-lenis-prevent
			onPointerDown={down}
			onPointerMove={move}
			onPointerUp={up}
			onPointerCancel={up}
			className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 select-none active:snap-none"
		>
			{images.map((img, i) => (
				<figure key={`${img.alt}-${i}`} className="w-[82vw] shrink-0 snap-start sm:w-[62vw] lg:w-[46vw]">
					<div className="aspect-[16/10] overflow-hidden bg-paper-2">
						<ProjectImage image={img} sizes="(min-width: 1024px) 46vw, 82vw" className="pointer-events-none" />
					</div>
					<figcaption className="t-label mt-3 text-muted">
						Fig. {String(i + 1).padStart(2, "0")} — {img.alt}
					</figcaption>
				</figure>
			))}
		</div>
	);
}
