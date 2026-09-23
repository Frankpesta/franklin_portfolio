"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { Highlight } from "./Highlight";
import { Circles } from "./Circles";
import { Lines } from "./Lines";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".hero-wave",
          { opacity: 0, y: -20, rotate: -20, transformOrigin: "70% 70%" },
          { opacity: 1, y: 0, rotate: 0, duration: 0.6 }
        )
        .fromTo(
          ".hero-heading",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          ".hero-paragraph",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          "-=0.4"
        );

      gsap.to(".hero-wave", {
        rotate: 14,
        duration: 0.4,
        repeat: 3,
        yoyo: true,
        delay: 0.9,
        transformOrigin: "70% 70%",
        ease: "power1.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-40">
        <Circles />
        <Lines />
      </div>

      <div className="relative z-10">
        <span ref={waveRef} className="hero-wave inline-block text-4xl">
          👋
        </span>
        <Heading className="hero-heading font-black">
          Hello there! I&apos;m Franklin
        </Heading>
        <Paragraph className="hero-paragraph max-w-xl mt-4">
          I&apos;m a NextJs developer that loves{" "}
          <Highlight>building products</Highlight> and web apps that can
          impact millions of lives
        </Paragraph>
        <Paragraph className="hero-paragraph max-w-xl mt-4">
          I&apos;m a mid-level software engineer with{" "}
          <Highlight>4 years of experience</Highlight> building scalable web
          apps that are performance optimized and good looking.
        </Paragraph>
      </div>
    </div>
  );
};
