import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Cursor } from "@/components/Cursor";
import { Header } from "@/components/Header";
import { projects } from "@/content/projects";
import { site, socials } from "@/content/site";
import { INTRO, THEME } from "@/motion/config";
import { PageTransition } from "@/motion/PageTransition";
import { SmoothScroll } from "@/motion/SmoothScroll";
import "./globals.css";

// Default width only: the wdth axis nearly doubled the file and no fallback can
// mimic stretched metrics, so the swap re-wrapped the hero (CLS + late LCP).
const archivo = Archivo({
	subsets: ["latin"],
	variable: "--font-archivo",
	display: "swap",
});

// Labels only; not worth competing with the display face for early bandwidth.
const jetbrains = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains",
	display: "swap",
	preload: false,
});

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: `${site.name} · ${site.role}`,
		template: `%s · ${site.name}`,
	},
	description: site.description,
	applicationName: site.name,
	authors: [{ name: site.fullName, url: site.url }],
	creator: site.fullName,
	keywords: [
		"Franklin Olisaemeka",
		"full-stack engineer",
		"Next.js developer",
		"TypeScript",
		"product engineer",
		"Nigeria",
		"contract developer",
	],
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		siteName: site.name,
		title: `${site.name} · ${site.role}`,
		description: site.description,
		url: "/",
		locale: "en",
	},
	twitter: {
		card: "summary_large_image",
		creator: "@pesta_02",
	},
	icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f1efea" },
		{ media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
	],
};

/**
 * Runs before first paint: applies a saved theme, and decides whether the
 * first-visit intro should play (home page only, motion allowed, not seen yet).
 */
const bootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem(${JSON.stringify(
	THEME.storageKey,
)});if(t==="light"||t==="dark")d.dataset.theme=t;if(location.pathname==="/"&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!localStorage.getItem(${JSON.stringify(
	INTRO.storageKey,
)}))d.dataset.intro="play";}catch(e){}})();`;

const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: site.fullName,
	alternateName: site.name,
	givenName: site.givenName,
	familyName: site.familyName,
	jobTitle: site.role,
	description: site.description,
	url: site.url,
	image: `${site.url}/pesta2.jpeg`,
	address: { "@type": "PostalAddress", addressCountry: "NG" },
	alumniOf: { "@type": "CollegeOrUniversity", name: "University of Nigeria, Nsukka" },
	sameAs: socials.filter((s) => s.label !== "WhatsApp").map((s) => s.href),
	knowsAbout: [...new Set(projects.flatMap((p) => p.stack))],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning className={`${archivo.variable} ${jetbrains.variable}`}>
			<head>
				<script dangerouslySetInnerHTML={{ __html: bootScript }} />
			</head>
			<body>
				<a href="#main" className="skip-link t-label">
					Skip to content
				</a>
				<SmoothScroll>
					<PageTransition>
						<Header />
						{children}
					</PageTransition>
				</SmoothScroll>
				<Cursor />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
				/>
			</body>
		</html>
	);
}
