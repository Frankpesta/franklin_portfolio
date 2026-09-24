import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { CUSTOM_EASES, DUR, EASE } from "./config";

if (typeof window !== "undefined") {
	gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);
	CustomEase.create("ink", CUSTOM_EASES.ink);
	CustomEase.create("inkInOut", CUSTOM_EASES.inkInOut);
	gsap.defaults({ ease: EASE.out, duration: DUR.md });
	ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Flip is only needed when a project is clicked, so it loads on demand. */
export async function loadFlip() {
	const { Flip } = await import("gsap/Flip");
	gsap.registerPlugin(Flip);
	return Flip;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
