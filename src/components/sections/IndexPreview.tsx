"use client";
import dynamic from "next/dynamic";
import { type ReactNode, useRef, useState } from "react";
import { isCapableDevice } from "@/motion/capability";
import { DUR, EASE, MQ } from "@/motion/config";
import { gsap, useGSAP } from "@/motion/gsap";
import type { PreviewSignal } from "./PreviewDistort";

const PreviewDistort = dynamic(() => import("./PreviewDistort"), { ssr: false });

/**
 * Cursor-trailing preview for the work index. Rows are server-rendered and
 * carry `data-index`; this wrapper finds the hovered row by delegation and
 * cross-fades the matching `.preview-slide`. Fine pointers only.
 *
 * On capable devices the first hover also loads a WebGL layer that bends and
 * RGB-splits the screenshot with cursor speed; everyone else keeps the plain
 * cross-fade underneath it.
 */
export function IndexPreview({ children, slides }: { children: ReactNode; slides: ReactNode }) {
	const listRef = useRef<HTMLDivElement>(null);
	const previewRef = useRef<HTMLDivElement>(null);
	const signal = useRef<PreviewSignal>({ active: -1, vx: 0, vy: 0, at: 0 });
	const [webglImages, setWebglImages] = useState<HTMLImageElement[] | null>(null);
	const [running, setRunning] = useState(false);

	useGSAP(
		(_, contextSafe) => {
			const list = listRef.current;
			const preview = previewRef.current;
			if (!list || !preview || !contextSafe) return;
			const enabled = () =>
				window.matchMedia(MQ.finePointer).matches && window.matchMedia(MQ.motion).matches;
			const slideEls = Array.from(preview.querySelectorAll<HTMLElement>(".preview-slide"));

			gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0 });
			const xTo = gsap.quickTo(preview, "x", { duration: DUR.md, ease: EASE.follow });
			const yTo = gsap.quickTo(preview, "y", { duration: DUR.md, ease: EASE.follow });
			let active = -1;
			let lastX = 0;
			let lastY = 0;

			const show = (index: number) => {
				if (index === active) return;
				active = index;
				if (index >= 0) signal.current.active = index;
				slideEls.forEach((slide, i) =>
					gsap.to(slide, {
						opacity: i === index ? 1 : 0,
						scale: i === index ? 1 : 1.08,
						duration: DUR.sm,
						ease: EASE.out,
						overwrite: true,
					}),
				);
			};

			const move = contextSafe((e: PointerEvent) => {
				if (!enabled()) return;
				xTo(e.clientX);
				yTo(e.clientY);
				signal.current.vx = e.clientX - lastX;
				signal.current.vy = e.clientY - lastY;
				signal.current.at = performance.now();
				lastX = e.clientX;
				lastY = e.clientY;
				const row = (e.target as Element).closest<HTMLElement>("[data-index]");
				if (row) show(Number(row.dataset.index));
			});
			const enter = contextSafe((e: PointerEvent) => {
				if (!enabled()) return;
				lastX = e.clientX;
				lastY = e.clientY;
				gsap.set(preview, { x: e.clientX, y: e.clientY });
				gsap.to(preview, { scale: 1, duration: DUR.md, ease: EASE.out });
				setRunning(true);
				setWebglImages((current) =>
					current ?? (isCapableDevice() ? Array.from(preview.querySelectorAll<HTMLImageElement>(".preview-slide img")) : null),
				);
			});
			const leave = contextSafe(() => {
				gsap.to(preview, { scale: 0, duration: DUR.sm, ease: EASE.out, onComplete: () => setRunning(false) });
				show(-1);
			});

			list.addEventListener("pointermove", move);
			list.addEventListener("pointerenter", enter);
			list.addEventListener("pointerleave", leave);
			return () => {
				list.removeEventListener("pointermove", move);
				list.removeEventListener("pointerenter", enter);
				list.removeEventListener("pointerleave", leave);
			};
		},
		{ scope: listRef },
	);

	return (
		<>
			<div ref={listRef}>{children}</div>
			<div
				ref={previewRef}
				aria-hidden
				className="pointer-events-none fixed left-0 top-0 z-[60] hidden aspect-[16/10] w-[min(26rem,32vw)] overflow-hidden bg-paper-2 lg:block"
			>
				{slides}
				{webglImages && <PreviewDistort images={webglImages} signal={signal} running={running} />}
			</div>
		</>
	);
}
