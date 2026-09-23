import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // The page scrolls inside #scroll-container (see src/app/layout.tsx), not
  // the window, so ScrollTrigger must watch that element instead of its
  // window default or triggers below the fold never fire. Passed as an
  // element (not a selector string) because useGSAP's gsap.context() scopes
  // string selectors to descendants of the calling component, and
  // #scroll-container is an ancestor of every component using this default.
  const scroller = document.getElementById("scroll-container");
  if (scroller) {
    ScrollTrigger.defaults({ scroller });
  }
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };
