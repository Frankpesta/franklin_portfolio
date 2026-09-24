"use client";
import { DUR, PLAY_ONCE, STAGGER } from "@/motion/config";
import { gsap } from "@/motion/gsap";
import { motionSection } from "@/motion/motionSection";

/** Case-study page shell: meta rises in on arrival; key figures and engineering notes on scroll. */
export const CaseStudyMain = motionSection(
	"CaseStudyMain",
	({ reduce }) => {
		if (reduce) return;
		gsap.from(".cs-meta > *", { opacity: 0, y: 20, stagger: STAGGER.items, duration: DUR.md, delay: 0.25 });
		gsap.from(".cs-metric", {
			opacity: 0,
			y: 40,
			stagger: STAGGER.items,
			duration: DUR.lg,
			scrollTrigger: { trigger: ".cs-metrics", start: "top 88%", ...PLAY_ONCE },
		});
		gsap.from(".cs-note", {
			opacity: 0,
			y: 30,
			stagger: STAGGER.items,
			duration: DUR.md,
			scrollTrigger: { trigger: ".cs-notes", start: "top 85%", ...PLAY_ONCE },
		});
	},
	{ as: "main", defer: false },
);
