"use client";
/**
 * Client-side motion for the home sections. Each export is a <section> shell
 * (see motionSection) whose markup is rendered by a server component.
 */
import { DUR, EASE, PLAY_ONCE, SCRUB, STAGGER } from "@/motion/config";
import { gsap, ScrollTrigger, SplitText } from "@/motion/gsap";
import { motionSection } from "@/motion/motionSection";

const all = (root: HTMLElement, selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));

/** The statement is "read in": each word darkens as the scroll passes it. */
export const ApproachSection = motionSection("ApproachSection", ({ reduce, mobile }) => {
	if (reduce) return;
	const split = SplitText.create(".approach-statement", { type: "words", aria: "none" });
	gsap.fromTo(
		split.words,
		{ opacity: 0.2 },
		{
			opacity: 1,
			stagger: STAGGER.words,
			ease: EASE.scrub,
			scrollTrigger: {
				trigger: ".approach-statement",
				start: mobile ? "top 85%" : "top 75%",
				end: mobile ? "bottom 55%" : "bottom 45%",
				scrub: SCRUB.tight,
			},
		},
	);
	gsap.from(".capability", {
		y: 40,
		opacity: 0,
		stagger: STAGGER.items * 2,
		scrollTrigger: { trigger: ".capabilities", start: "top 85%", ...PLAY_ONCE },
	});
	return () => split.revert();
});

/**
 * The centerpiece. On desktops tall enough to hold a full sheet, the section
 * pins and the case-study sheets travel sideways under a scrubbed timeline,
 * each screenshot parallaxing inside its frame. Everywhere else the sheets
 * stack and reveal one by one.
 */
export const WorkSection = motionSection("WorkSection", ({ pin, reduce }, root) => {
	const track = root.querySelector<HTMLElement>(".work-track");
	const pinEl = root.querySelector<HTMLElement>(".work-pin");
	const panels = all(root, ".work-panel");
	if (!track || !pinEl) return;

	if (pin) {
		const distance = () => track.scrollWidth - window.innerWidth;
		const travel = gsap.to(track, {
			x: () => -distance(),
			ease: EASE.scrub,
			scrollTrigger: {
				trigger: pinEl,
				pin: true,
				start: "top top",
				end: () => `+=${distance()}`,
				scrub: SCRUB.tight,
				invalidateOnRefresh: true,
				anticipatePin: 1,
			},
		});
		gsap.to(".work-progress", {
			scaleX: 1,
			ease: EASE.scrub,
			scrollTrigger: { trigger: pinEl, start: "top top", end: () => `+=${distance()}`, scrub: true },
		});
		for (const panel of panels) {
			gsap.fromTo(
				panel.querySelector(".work-image"),
				{ xPercent: -5, scale: 1.12 },
				{
					xPercent: 5,
					scale: 1.12,
					ease: EASE.scrub,
					scrollTrigger: { containerAnimation: travel, trigger: panel, start: "left right", end: "right left", scrub: true },
				},
			);
		}
		return;
	}

	if (reduce) return;
	for (const panel of panels) {
		const frame = panel.querySelector(".work-frame");
		const image = panel.querySelector(".work-image");
		if (!frame || !image) continue;
		gsap
			.timeline({
				scrollTrigger: { trigger: frame, start: "top 85%", ...PLAY_ONCE },
				defaults: { duration: DUR.lg, ease: EASE.inOut },
			})
			.from(frame, { yPercent: 12, opacity: 0 })
			.from(image, { scale: 1.2 }, 0)
			.from(panel.querySelectorAll(".work-note"), { opacity: 0, y: 24, stagger: STAGGER.items }, "-=0.6");
	}
});

/** Rows of the index rise in as the list arrives. */
export const IndexSection = motionSection("IndexSection", ({ reduce }) => {
	if (reduce) return;
	gsap.from(".index-row", {
		opacity: 0,
		y: 30,
		stagger: STAGGER.items,
		duration: DUR.md,
		scrollTrigger: { trigger: ".index-list", start: "top 85%", ...PLAY_ONCE },
	});
});

/**
 * A hairline fills down the timeline with scroll, and each role's marker
 * lights up as the fill reaches it.
 */
export const ExperienceSection = motionSection("ExperienceSection", ({ reduce }, root) => {
	if (reduce) return;
	gsap.fromTo(
		".exp-progress",
		{ scaleY: 0 },
		{
			scaleY: 1,
			ease: EASE.scrub,
			scrollTrigger: { trigger: ".exp-list", start: "top 60%", end: "bottom 60%", scrub: true },
		},
	);
	for (const role of all(root, ".exp-role")) {
		gsap
			.timeline({ scrollTrigger: { trigger: role, start: "top 60%", toggleActions: "play none none reverse" } })
			.to(role.querySelector(".exp-marker"), { scale: 1, backgroundColor: "var(--accent)", duration: DUR.sm })
			.from(role.querySelectorAll(".exp-reveal"), { opacity: 0.35, duration: DUR.sm }, 0);
	}
});

/** Depth: the photo drifts slower than the page, its frame faster. */
export const AboutSection = motionSection("AboutSection", ({ reduce, desktop }, root) => {
	if (reduce) return;
	gsap.fromTo(
		".about-photo",
		{ yPercent: -10, scale: 1.15 },
		{
			yPercent: 10,
			scale: 1.15,
			ease: EASE.scrub,
			scrollTrigger: { trigger: ".about-frame", start: "top bottom", end: "bottom top", scrub: SCRUB.loose },
		},
	);
	if (desktop) {
		gsap.fromTo(
			".about-frame",
			{ y: 80 },
			{ y: -80, ease: EASE.scrub, scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: SCRUB.loose } },
		);
	}
	gsap.from(".about-frame", {
		yPercent: 8,
		opacity: 0,
		duration: DUR.lg,
		scrollTrigger: { trigger: ".about-frame", start: "top 85%", ...PLAY_ONCE },
	});
});

/**
 * Two marquees drift in opposite directions; scroll speed pushes them faster
 * and skews them, then they settle. Paused while off-screen.
 */
export const StackSection = motionSection("StackSection", ({ reduce, mobile }, root) => {
	if (reduce) return;
	const loops = all(root, ".marquee-track").map((track, i) =>
		gsap.fromTo(
			track,
			{ xPercent: i % 2 ? -50 : 0 },
			{ xPercent: i % 2 ? 0 : -50, duration: mobile ? 28 : 40, ease: EASE.scrub, repeat: -1, paused: true },
		),
	);
	// Park the loops far from time 0 so a negative timeScale (scrolling up) can run backwards forever.
	for (const loop of loops) loop.totalTime(loop.duration() * 1000);
	const skewTo = gsap.quickTo(".marquee-track", "skewX", { duration: DUR.md, ease: EASE.follow });

	ScrollTrigger.create({
		trigger: root,
		start: "top bottom",
		end: "bottom top",
		onUpdate: (self) => {
			const velocity = self.getVelocity();
			const boost = 1 + Math.min(Math.abs(velocity) / 250, 5);
			for (const loop of loops) {
				gsap.to(loop, { timeScale: self.direction * boost, duration: DUR.xs, overwrite: true });
				gsap.to(loop, { timeScale: self.direction, duration: DUR.lg, delay: DUR.xs, ease: EASE.out });
			}
			skewTo(gsap.utils.clamp(-8, 8, velocity / -300));
		},
		onToggle: (self) => {
			for (const loop of loops) {
				if (self.isActive) loop.play();
				else loop.pause();
			}
		},
	});
});
