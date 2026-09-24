import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { CUSTOM_EASES, DUR, EASE } from "./config";

if (typeof window !== "undefined") {
	gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip, CustomEase);
	CustomEase.create("ink", CUSTOM_EASES.ink);
	CustomEase.create("inkInOut", CUSTOM_EASES.inkInOut);
	gsap.defaults({ ease: EASE.out, duration: DUR.md });
	ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };
