import type { Role } from "./types";

// COPY: review — condensed from the old work-history page, two points per role.
export const experience: readonly Role[] = [
	{
		company: "49GIG",
		title: "CTO & full-stack developer",
		period: "Dec 2025 – now",
		summary:
			"Leading the architecture and build of a high-trust freelance marketplace.",
		points: [
			"Designed a zero-trust, server-side authorization model with role-based dashboards and real-time collaboration.",
			"Shipped multi-layer freelancer verification and Flutterwave milestone escrow, with disputes and audit logging.",
		],
		project: "49gig-freelance-marketplace",
	},
	{
		company: "Dishpatch Global",
		title: "Full-stack Next.js developer",
		period: "2024 – now",
		summary: "Building a real-time, multi-role delivery logistics platform.",
		points: [
			"Built the rider app, restaurant app and admin dashboard on shared REST contracts.",
			"Real-time orders and messaging with Socket.IO, and routing with the Google Maps API.",
		],
		project: "dishpatch-global",
	},
	{
		company: "Tubira.ai",
		title: "Full-stack developer (contract)",
		period: "Nov 2025",
		summary: "Built the affiliate platform for a unified travel booking marketplace.",
		points: [
			"Partner features for referrals, commissions and multi-currency payouts.",
			"Affiliate analytics built to support 1,000+ partners across 50+ countries.",
		],
		project: "tubira-affiliate-platform",
	},
	{
		company: "Cabwire Technologies",
		title: "Frontend engineer (contract)",
		period: "2025",
		summary: "Pre-launch site and waitlist for a ride-hailing platform.",
		points: ["Rider and driver waitlist with conditional validation.", "Performance and SEO tuned for launch."],
		project: "cabwire",
	},
	{
		company: "LinkedCart Tech",
		title: "Frontend engineer (contract)",
		period: "2025",
		summary: "Launch site for a citywide shopping and delivery app.",
		points: ["Mobile-first, fast-loading site and merchant/shopper waitlist."],
		project: "linkedcart",
	},
	{
		company: "Odera Helping Hands Foundation",
		title: "Full-stack developer (contract)",
		period: "2025",
		summary: "Events and outreach platform for a nonprofit.",
		points: ["Kinde auth, Drizzle + Neon data layer, and Three.js touches."],
		project: "ohhfoundation",
	},
	{
		company: "BenjaFamily Labs",
		title: "Full-stack developer (contract)",
		period: "2025",
		summary: "Advisory firm site with built-in consultation booking.",
		points: ["Google Calendar and Meet integration for instant booking."],
		project: "benjalabs",
	},
	{
		company: "PfHix Tech",
		title: "Frontend developer (contract)",
		period: "2025",
		summary: "Frontend work for a technology startup.",
		points: ["Modular UI components and maintainability refactors."],
		project: "pfhixtech",
	},
];
