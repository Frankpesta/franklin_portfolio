import type { StaticImageData } from "next/image";

export type Tech =
	| "Next.js"
	| "TypeScript"
	| "Tailwind CSS"
	| "shadcn/ui"
	| "Convex"
	| "Zustand"
	| "TanStack Query"
	| "Redux"
	| "Flutterwave"
	| "Stripe"
	| "Paystack"
	| "Clerk"
	| "Kinde"
	| "Neon Postgres"
	| "Drizzle ORM"
	| "MongoDB"
	| "React Hook Form"
	| "Zod"
	| "Socket.IO"
	| "Google Maps API"
	| "Google Calendar API"
	| "Google Cloud"
	| "Three.js"
	| "NestJS"
	| "Stripe Connect"
	| "Chrome Extension (MV3)"
	| "OpenAPI"
	| "Cloudflare"
	| "Vercel";

/** featured = full case study panel; selected/lab = index rows; in-progress = teased, no live link yet. */
export type ProjectTier = "featured" | "selected" | "lab" | "in-progress";

export type ProjectImage = {
	src: StaticImageData;
	alt: string;
};

/** A figure worth leading with. Only ever sourced from Franklin's own material. */
export type ProjectMetric = {
	value: string;
	label: string;
};

export type ProjectLink = {
	label: string;
	href: string;
};

export type Project = {
	slug: string;
	/** Old URLs that should redirect to this project. */
	legacySlugs?: readonly string[];
	title: string;
	tier: ProjectTier;
	category: string;
	role: string;
	year?: string;
	/** One line, shown in lists and panels. */
	tagline: string;
	/** Two or three sentences, the lead of the case study. */
	summary: string;
	/** Engineering decisions worth calling out, drawn as annotations. */
	highlights: readonly string[];
	/** Extra case-study paragraphs. */
	body?: readonly string[];
	/** Headline figures for the case study (one to three). */
	metrics?: readonly ProjectMetric[];
	stack: readonly Tech[];
	links: readonly ProjectLink[];
	cover: ProjectImage;
	gallery: readonly ProjectImage[];
};

export type Role = {
	company: string;
	title: string;
	period: string;
	summary: string;
	points: readonly string[];
	/** Slug of the related project, if any. */
	project?: string;
};

export type Social = {
	label: string;
	href: string;
	handle: string;
};
