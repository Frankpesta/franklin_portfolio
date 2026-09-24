import type { Role } from "./types";

// COPY: review — condensed from the résumé (public/resume.pdf), two points per role at most.
export const experience: readonly Role[] = [
	{
		company: "Saverlly",
		title: "Full-stack developer (contract, US · remote)",
		period: "Aug 2026 – now",
		summary: "Architecting a multi-tenant SaaS platform that brings automatic coupon savings to US internet kiosks.",
		points: [
			"NestJS backend, two Next.js dashboards, a Chrome extension and a Windows fleet agent in one monorepo.",
			"Per-order commission tracking with per-kiosk revenue shares and Stripe Connect payouts.",
		],
		project: "saverlly",
	},
	{
		company: "49GIG",
		title: "Chief Technology Officer",
		period: "2025 – now",
		summary: "Leading technical strategy, architecture and engineering for a high-trust freelance marketplace.",
		points: [
			"Designed a zero-trust, server-side authorization model with role-based dashboards and real-time collaboration.",
			"Shipped multi-layer freelancer verification and Flutterwave milestone escrow, with disputes and audit logging.",
		],
		project: "49gig-freelance-marketplace",
	},
	{
		company: "Helen's Beauty Secret",
		title: "Full-stack developer (contract)",
		period: "2026",
		summary: "Built the e-commerce platform for a certified-organic skincare brand.",
		points: [
			"Catalogue, cart, checkout, payments and order management for direct-to-consumer sales.",
			"SEO with structured data and image optimisation for beauty and skincare search.",
		],
		project: "helens-beauty-secret",
	},
	{
		company: "Aztran Global Investments",
		title: "Full-stack developer (contract)",
		period: "2026",
		summary: "Designed and built the institutional website for an SEC-licensed investment firm.",
		points: [
			"CMS-driven insights section for macro reports, desk briefs and market commentary.",
			"Cloudflare DNS and CDN with Vercel deployment for production-grade delivery.",
		],
		project: "aztran-global-investments",
	},
	{
		company: "Tubira",
		title: "Full-stack developer (contract)",
		period: "2025",
		summary: "Built the affiliate platform for a unified travel booking marketplace.",
		points: [
			"Partner features for referrals, commissions and multi-currency payouts, on Stripe and Convex.",
			"Affiliate analytics built to support 1,000+ partners across 50+ countries.",
		],
		project: "tubira-affiliate-platform",
	},
	{
		company: "Dishpatch",
		title: "Full-stack developer (contract)",
		period: "2024",
		summary: "Built the rider and restaurant portals of a food delivery platform.",
		points: [
			"Real-time order status and live rider tracking with Socket.IO and the Google Maps API.",
			"Redux state management for complex multi-step order flows across both portals.",
		],
		project: "dishpatch-global",
	},
	{
		company: "Cabwire",
		title: "Full-stack developer (contract, North America)",
		period: "2024",
		summary: "Web platform for a ride-hailing startup launching across North America.",
		points: ["Neon Postgres + Drizzle schema designed for a multi-city launch; rider and driver flows."],
		project: "cabwire",
	},
	{
		company: "LinkedCart",
		title: "Full-stack developer (contract)",
		period: "2024",
		summary: "Citywide multi-vendor shopping and delivery platform.",
		points: ["Next.js, Neon and Drizzle, with a mobile-first UI for fast browsing and ordering."],
		project: "linkedcart",
	},
	{
		company: "BenjaFamily Labs",
		title: "Full-stack developer (contract)",
		period: "2024",
		summary: "Finance research and advisory platform.",
		points: ["Google Cloud integration and built-in consultation booking."],
		project: "benjalabs",
	},
	{
		company: "Odera Helping Hand Foundation",
		title: "Full-stack developer (contract)",
		period: "2024",
		summary: "Web platform for a nonprofit supporting families in need.",
		points: ["Events and outreach flows on Next.js, Neon and Drizzle."],
		project: "ohhfoundation",
	},
	{
		company: "PfHix Technologies",
		title: "Frontend developer (full-time)",
		period: "2022 – 2023",
		summary: "Built and maintained the public web platform for a security-solutions company.",
		points: ["Cut page load times by 40% with image optimisation, lazy loading and bundle splitting."],
		project: "pfhixtech",
	},
];
