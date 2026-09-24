import type { Social } from "./types";

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
	name: "Franklin Olisaemeka",
	fullName: "Franklin Olisaemeka Enunwa",
	givenName: "Franklin",
	familyName: "Olisaemeka",
	role: "Full-stack product engineer",
	/** Shown as-is on the site. */
	experience: "04+",
	location: "Nigeria",
	timeZone: "Africa/Lagos",
	timeZoneLabel: "WAT · UTC+1",
	// COPY: review
	availability: "Open to contracts & full-time roles",
	// COPY: review — "digital nomad" dropped per your Phase 1 answer.
	description:
		"Franklin Olisaemeka is a full-stack product engineer based in Nigeria who designs and ships products end to end: data models, auth, payments, real-time systems and the interfaces on top. He works remotely with teams worldwide.",
	/** Put the PDF at public/resume.pdf. */
	resume: "/resume.pdf",
	url: process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "https://pesta-portfolio.vercel.app"),
	emailjs: {
		serviceId: "service_z5k4y5e",
		templateId: "template_l9mkmug",
		publicKey: "lyA_0fVUxcVWgBhVg",
	},
} as const;

export const socials: readonly Social[] = [
	{
		label: "WhatsApp",
		handle: "+234 815 505 0634",
		href: "https://wa.me/2348155050634",
	},
	{
		label: "LinkedIn",
		handle: "olisaemeka-franklin",
		href: "https://linkedin.com/in/olisaemeka-franklin-9a31a9215",
	},
	{ label: "GitHub", handle: "Frankpesta", href: "https://github.com/Frankpesta" },
	{ label: "X", handle: "@pesta_02", href: "https://x.com/pesta_02" },
];
