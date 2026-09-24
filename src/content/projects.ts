import type { Project, Tech } from "./types";

import gig1 from "../../public/images/49g1.png";
import gig2 from "../../public/images/49g2.png";
import gig3 from "../../public/images/49g3.png";
import gig4 from "../../public/images/49g4.png";
import gig5 from "../../public/images/49g5.png";
import gig6 from "../../public/images/49g6.png";
import tb1 from "../../public/images/tb1.png";
import tb2 from "../../public/images/tb2.png";
import tb3 from "../../public/images/tb3.png";
import tb4 from "../../public/images/tb4.png";
import nysc1 from "../../public/images/nysc1.png";
import nysc2 from "../../public/images/nysc2.png";
import nysc3 from "../../public/images/nysc3.png";
import nysc4 from "../../public/images/nysc4.png";
import nysc5 from "../../public/images/nysc5.png";
import nysc6 from "../../public/images/nysc6.png";
import hub from "../../public/images/hub.png";
import hub2 from "../../public/images/hub2.png";
import hub3 from "../../public/images/hub3.png";
import dishRiders from "../../public/images/dish-riders.png";
import dishRest from "../../public/images/dish-rest.png";
import cabwire from "../../public/images/cabwire.png";
import linkedcart from "../../public/images/linkedcart.png";
import benjalabs from "../../public/images/benjalabs.png";
import ohhfoundation from "../../public/images/ohhfoundation.png";
import pfhixtech from "../../public/images/pfhixtech.png";
import cresa from "../../public/images/cresa.png";
import saverlly from "../../public/images/saverlly-placeholder.svg";

// COPY: review — every tagline, summary, highlight and body line below was
// rewritten from the old long-form project descriptions.
export const projects: readonly Project[] = [
	{
		slug: "49gig-freelance-marketplace",
		title: "49GIG",
		tier: "featured",
		category: "Marketplace",
		role: "CTO · architecture & full-stack build",
		year: "2025 – now",
		tagline:
			"A high-trust freelance marketplace where clients pre-fund the work and hire only vetted talent.",
		summary:
			"49GIG connects clients with fully vetted African freelancers. Every project is pre-funded, and nobody touches client work until they've cleared verification. I lead the architecture and built the platform end to end.",
		highlights: [
			"Zero-trust authorization: every sensitive operation is checked on the server, behind role-based dashboards for clients, freelancers and admins.",
			"Multi-layer verification covering identity, English and skills, with weighted scoring and IP, device and session anti-fraud checks.",
			"Milestone escrow on Flutterwave with webhooks, plus disputes, real-time chat and an audit log for every sensitive action.",
		],
		body: [
			"I planned it as a 14-phase system design before writing product code: a Convex data model with 10+ core tables, an 8-domain Zustand store blueprint, and a security model with RBAC, rate limiting and CSRF protection from day one.",
			"Freelancers are blocked from the marketplace until verification is complete, so the trust guarantee holds in the data layer, not only in the UI.",
		],
		stack: [
			"Next.js",
			"TypeScript",
			"Convex",
			"Zustand",
			"Flutterwave",
			"Tailwind CSS",
			"shadcn/ui",
		],
		links: [{ label: "49gig.com", href: "https://49gig.com" }],
		cover: { src: gig1, alt: "49GIG home page: Hire world-class African talent, faster." },
		gallery: [
			{ src: gig1, alt: "49GIG landing page hero" },
			{ src: gig2, alt: "49GIG marketing section" },
			{ src: gig3, alt: "49GIG talent section" },
			{ src: gig4, alt: "49GIG interface detail" },
			{ src: gig5, alt: "49GIG product screen" },
			{ src: gig6, alt: "49GIG product screen" },
		],
	},
	{
		slug: "tubira-affiliate-platform",
		title: "Tubira Affiliates",
		tier: "featured",
		category: "Travel · affiliate",
		role: "Full-stack developer (contract)",
		year: "2025",
		tagline:
			"The partner platform for a travel marketplace that sells flights, hotels, activities and eSIMs in one checkout.",
		summary:
			"Tubira bundles an entire trip (flights, hotels, resorts, cars, cruises, activities, eSIMs) into one booking. I built the affiliate platform that lets partners promote all of it from one place and see exactly what they earn.",
		highlights: [
			"Referral, commission and payout tracking across multi-product, multi-currency bookings.",
			"Configurable tracking windows, with commissions adjusted automatically when a booking is refunded.",
			"Co-branded landing pages and analytics designed for a long-term partner network.",
		],
		stack: ["Next.js", "TypeScript", "Convex", "Zustand", "Stripe", "Tailwind CSS"],
		links: [{ label: "affiliates.tubira.ai", href: "https://affiliates.tubira.ai" }],
		cover: { src: tb1, alt: "Tubira affiliate platform landing page" },
		gallery: [
			{ src: tb1, alt: "Tubira affiliates landing page" },
			{ src: tb2, alt: "Tubira affiliates feature section" },
			{ src: tb3, alt: "Tubira affiliates partner section" },
			{ src: tb4, alt: "Tubira affiliates interface detail" },
		],
	},
	{
		slug: "nysc-cds-attendance-system",
		title: "NYSC CDS Attendance",
		tier: "featured",
		category: "Civic · operations",
		role: "Design & full-stack build",
		tagline:
			"QR check-ins and live dashboards that replaced paper roll calls for NYSC CDS groups in Akure South.",
		summary:
			"CDS attendance used to mean paper registers and end-of-month spreadsheets. I designed and built the system that replaced them: members scan a QR code to check in, and leadership sees attendance across every group as it happens.",
		highlights: [
			"A secure QR token for each meeting enforces one valid check-in per member, per meeting, per day.",
			"Scoped roles (member, group leader, super admin), with auditable manual overrides for legitimate edge cases.",
			"Live dashboards, trends, top-group rankings and date-bounded reports across dozens of groups and thousands of entries.",
		],
		stack: [
			"Next.js",
			"TypeScript",
			"Convex",
			"Zustand",
			"TanStack Query",
			"Tailwind CSS",
		],
		links: [
			{ label: "nyscakuresouthlg.com.ng", href: "https://nyscakuresouthlg.com.ng" },
		],
		cover: { src: nysc1, alt: "NYSC CDS attendance system home screen" },
		gallery: [
			{ src: nysc1, alt: "NYSC CDS attendance home" },
			{ src: nysc2, alt: "NYSC CDS attendance dashboard" },
			{ src: nysc3, alt: "NYSC CDS attendance analytics" },
			{ src: nysc4, alt: "NYSC CDS attendance group view" },
			{ src: nysc5, alt: "NYSC CDS attendance reports" },
			{ src: nysc6, alt: "NYSC CDS attendance QR check-in" },
		],
	},
	{
		slug: "event-ticketing-platform",
		title: "Tickethub",
		tier: "featured",
		category: "Events · payments",
		role: "Full-stack developer",
		tagline:
			"Event ticketing with seller onboarding, automated Paystack payouts and automatic refunds.",
		summary:
			"Organizers create and run events from one dashboard, attendees buy tickets and get instant confirmation, and the money moves on its own: payouts to sellers, refunds to buyers if an event is cancelled.",
		highlights: [
			"Seller onboarding creates Paystack subaccounts, so payouts are split and settled automatically.",
			"Cancelling an event triggers refunds to every ticket holder with no manual step.",
			"Real-time availability and confirmations on Convex, with Clerk handling authentication.",
		],
		stack: [
			"Next.js",
			"TypeScript",
			"Convex",
			"Paystack",
			"Clerk",
			"Tailwind CSS",
			"shadcn/ui",
		],
		links: [{ label: "pesta-ticketr.vercel.app", href: "https://pesta-ticketr.vercel.app" }],
		cover: { src: hub2, alt: "Tickethub event listing page" },
		gallery: [
			{ src: hub, alt: "Tickethub landing page" },
			{ src: hub2, alt: "Tickethub event listing" },
			{ src: hub3, alt: "Tickethub event details" },
		],
	},
	{
		slug: "dishpatch-global",
		legacySlugs: ["dishriders", "dishpatch-restaurant"],
		title: "Dishpatch",
		tier: "featured",
		category: "Logistics · real-time",
		role: "Full-stack Next.js developer",
		year: "2024 – now",
		tagline:
			"A real-time delivery platform: rider, restaurant and admin apps running on one live data flow.",
		summary:
			"Dishpatch Global runs last-mile food delivery across three roles. I built the rider app, the restaurant app and the admin dashboard, keeping all three in sync in real time.",
		highlights: [
			"Socket.IO pushes new orders, route changes and status updates to riders and restaurants the moment they happen.",
			"Google Maps powers rider navigation, route planning and live delivery tracking.",
			"One set of REST contracts shared by all three apps keeps riders, restaurants and dispatch consistent.",
		],
		body: [
			"Riders: a dashboard built for speed on the road, to receive, manage and complete deliveries and track earnings.",
			"Restaurants: real-time order processing, status management, customer messaging and earnings reports.",
			"Admin: users, dispatch operations and financial analytics across the whole platform.",
		],
		stack: [
			"Next.js",
			"Redux",
			"Socket.IO",
			"Google Maps API",
			"Tailwind CSS",
		],
		links: [
			{ label: "Rider app", href: "https://dishpatch-riders.vercel.app" },
			{ label: "Restaurant app", href: "https://dishpatch-restaurants.vercel.app" },
		],
		cover: { src: dishRiders, alt: "Dishpatch rider web app" },
		gallery: [
			{ src: dishRiders, alt: "Dishpatch rider web app" },
			{ src: dishRest, alt: "Dishpatch restaurant web app" },
		],
	},
	{
		slug: "cabwire",
		title: "Cabwire",
		tier: "selected",
		category: "Mobility · launch",
		role: "Frontend engineer (contract)",
		year: "2025",
		tagline:
			"Pre-launch site and waitlist for a ride-hailing platform launching across North America.",
		summary:
			"Cabwire's first impression before launch: a fast, accessible site that explains why it's fairer than the alternatives and turns visitors into early riders and drivers.",
		highlights: [
			"A waitlist whose fields change for riders and drivers, validated with React Hook Form and Zod.",
			"Sign-ups stored in Neon Postgres through Drizzle ORM for type-safe access.",
			"Tuned for performance and SEO ahead of launch, with full dark mode.",
		],
		stack: [
			"Next.js",
			"TypeScript",
			"Neon Postgres",
			"Drizzle ORM",
			"React Hook Form",
			"Zod",
			"Tailwind CSS",
		],
		links: [{ label: "cabwire.com", href: "https://cabwire.com" }],
		cover: { src: cabwire, alt: "Cabwire pre-launch landing page" },
		gallery: [{ src: cabwire, alt: "Cabwire pre-launch landing page" }],
	},
	{
		slug: "linkedcart",
		title: "LinkedCart",
		tier: "selected",
		category: "Commerce · launch",
		role: "Frontend engineer (contract)",
		year: "2025",
		tagline:
			"Pre-launch site and waitlist for an app that delivers from every store, mall and restaurant in a city.",
		summary:
			"A mobile-first launch site for a citywide shopping and delivery app, built to build momentum with shoppers and merchants before the app ships.",
		highlights: [
			"A waitlist for both shoppers and merchants, with dynamic fields and validation.",
			"Data stored in Neon Postgres through Drizzle ORM.",
			"Mobile-first layout and full dark mode.",
		],
		stack: [
			"Next.js",
			"TypeScript",
			"Neon Postgres",
			"Drizzle ORM",
			"React Hook Form",
			"Zod",
			"Tailwind CSS",
		],
		links: [{ label: "linkedcart.com", href: "https://linkedcart.com" }],
		cover: { src: linkedcart, alt: "LinkedCart pre-launch landing page" },
		gallery: [{ src: linkedcart, alt: "LinkedCart pre-launch landing page" }],
	},
	{
		slug: "benjalabs",
		title: "BenjaFamily Labs",
		tier: "selected",
		category: "Finance · advisory",
		role: "Full-stack developer (contract)",
		year: "2025",
		tagline:
			"A site for a finance research and advisory firm, with consultations booked straight into Google Calendar and Meet.",
		summary:
			"A clean, credible home for a finance research firm, with booking built in: visitors pick a slot and get a Google Meet invite without leaving the site.",
		highlights: [
			"Google Calendar and Meet integration for instant consultation booking.",
			"Responsive and dark-mode ready on desktop and mobile.",
		],
		stack: ["Next.js", "TypeScript", "Google Cloud", "Tailwind CSS", "shadcn/ui"],
		links: [{ label: "benjafamilylabs.com", href: "https://benjafamilylabs.com" }],
		cover: { src: benjalabs, alt: "BenjaFamily Labs landing page" },
		gallery: [{ src: benjalabs, alt: "BenjaFamily Labs landing page" }],
	},
	{
		slug: "ohhfoundation",
		title: "Odera Helping Hands Foundation",
		tier: "selected",
		category: "Nonprofit · events",
		role: "Full-stack developer (contract)",
		year: "2025",
		tagline:
			"An events and outreach platform for a nonprofit, with accounts for volunteers, donors and organizers.",
		summary:
			"A storytelling-first site for a community nonprofit where signed-in volunteers and donors can find, register for and manage events.",
		highlights: [
			"Kinde authentication for volunteers, donors and organizers.",
			"Event data in Neon Postgres via Drizzle, fetched reactively with TanStack Query.",
			"Subtle Three.js scenes that support the story without getting in its way.",
		],
		stack: [
			"Next.js",
			"TypeScript",
			"Kinde",
			"Neon Postgres",
			"Drizzle ORM",
			"TanStack Query",
			"Three.js",
		],
		links: [
			{
				label: "oderahelpinghandfoundation.org",
				href: "https://oderahelpinghandfoundation.org",
			},
		],
		cover: { src: ohhfoundation, alt: "Odera Helping Hands Foundation home page" },
		gallery: [{ src: ohhfoundation, alt: "Odera Helping Hands Foundation home page" }],
	},
	{
		slug: "pfhixtech",
		title: "PfHix Technologies",
		tier: "selected",
		category: "Company site",
		role: "Frontend developer (contract)",
		year: "2025",
		tagline:
			"A company site for a technology firm, with meetings booked directly through Google Calendar and Meet.",
		summary:
			"A modular, maintainable company site built with shadcn/ui components, with meeting booking built in.",
		highlights: [
			"Google Calendar and Meet scheduling built into the site.",
			"Modular UI components and refactors that made the codebase easier to extend.",
		],
		stack: ["Next.js", "TypeScript", "Google Calendar API", "Tailwind CSS", "shadcn/ui"],
		links: [{ label: "pfhixtech.com", href: "https://pfhixtech.com" }],
		cover: { src: pfhixtech, alt: "PfHix Technologies landing page" },
		gallery: [{ src: pfhixtech, alt: "PfHix Technologies landing page" }],
	},
	{
		slug: "cresa-repo",
		title: "Cresa Repo",
		tier: "lab",
		category: "Academic · final-year project",
		role: "Final-year project",
		tagline:
			"A project and thesis repository for the Department of Computer and Robotics Education, UNN.",
		summary:
			"My final-year project: a central place where students submit projects and theses, track their status and get feedback from faculty.",
		highlights: [
			"Submission, status tracking and faculty feedback in one place.",
			"Clerk authentication and MongoDB storage.",
		],
		stack: ["Next.js", "TypeScript", "MongoDB", "Clerk", "Tailwind CSS", "shadcn/ui"],
		links: [{ label: "cresarepo.vercel.app", href: "https://cresarepo.vercel.app" }],
		cover: { src: cresa, alt: "Cresa Repo home page" },
		gallery: [{ src: cresa, alt: "Cresa Repo home page" }],
	},
	{
		// TODO: add Saverlly's live link, full write-up and screenshots.
		slug: "saverlly",
		title: "Saverlly",
		tier: "in-progress",
		category: "Fintech · savings",
		role: "Product & engineering",
		tagline:
			"A savings app that helps people build consistent habits and reach their goals faster.",
		summary:
			"Saverlly is a savings and personal finance product I'm building now. The full case study, screenshots and a live link are on the way.",
		highlights: [],
		stack: ["Next.js", "TypeScript", "Tailwind CSS"],
		links: [],
		cover: { src: saverlly, alt: "Saverlly placeholder artwork" },
		gallery: [],
	},
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Index position as a zero-padded sheet number, e.g. "03". */
export const sheetNumber = (slug: string) =>
	String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");

export const nextProject = (slug: string) => {
	const i = projects.findIndex((p) => p.slug === slug);
	return projects[(i + 1) % projects.length];
};

export const shippedCount = projects.filter((p) => p.tier !== "in-progress").length;

/** Every technology used, ordered by how many projects use it. */
export const stackByUsage: readonly Tech[] = (() => {
	const counts = new Map<Tech, number>();
	for (const p of projects) for (const t of p.stack) counts.set(t, (counts.get(t) ?? 0) + 1);
	return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
})();
