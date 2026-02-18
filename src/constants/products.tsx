import React from "react";
import cabwire from "public/images/cabwire.png";
import linkedcart from "public/images/linkedcart.png";
import benjalabs from "public/images/benjalabs.png";
import ohhfoundation from "public/images/ohhfoundation.png";
import dishriders from "public/images/dish-riders.png";
import cresa from "public/images/cresa.png";
import dishrest from "public/images/dish-rest.png";
import pfhixtech from "public/images/pfhixtech.png";
import hub from "public/images/hub.png";
import hub2 from "public/images/hub2.png";
import hub3 from "public/images/hub3.png";
import gig1 from "public/images/49g1.png";
import gig2 from "public/images/49g2.png";
import gig3 from "public/images/49g3.png";
import gig4 from "public/images/49g4.png";
import gig5 from "public/images/49g5.png";
import gig6 from "public/images/49g6.png";
import tb1 from "public/images/tb1.png";
import tb2 from "public/images/tb2.png";
import tb3 from "public/images/tb3.png";
import tb4 from "public/images/tb4.png";
import nysc1 from "public/images/nysc1.png";
import nysc2 from "public/images/nysc2.png";
import nysc3 from "public/images/nysc3.png";
import nysc4 from "public/images/nysc4.png";
import nysc5 from "public/images/nysc5.png";
import nysc6 from "public/images/nysc6.png";

export const products = [
	{
		href: "https://49gig.com",
		title: "49GIG — Curated Freelance Marketplace",
		description:
			"A high-trust freelance marketplace where clients pre-fund projects and work only with fully vetted, verified talent.",
		thumbnail: gig1,
		images: [gig1, gig2, gig3, gig4, gig5, gig6],
		stack: [
			"Nextjs",
			"Tailwindcss",
			"shadcn/ui",
			"Typescript",
			"Convex",
			"Zustand",
			"Stripe",
		],
		slug: "49gig-freelance-marketplace",
		content: (
			<div>
				<p>
					I architected and implemented 49GIG, a high-trust freelance
					marketplace where clients pre-fund projects and are matched with fully
					vetted freelancers. Built with <b>Next.js (App Router)</b>,{" "}
					<b>TypeScript</b>, <b>Tailwind CSS</b>, <b>shadcn/ui</b>,{" "}
					<b>Convex</b>, and <b>Zustand</b>, the platform uses a{" "}
					<b>zero-trust, server-side authorization model</b> and real-time
					capabilities to keep all sensitive operations protected. Role-based
					dashboards give clients, freelancers, and admins tailored views of
					projects, payments, and verification status.
				</p>
				<p>
					I led the end-to-end architecture, from a 14-phase system design and a
					Convex data model (10+ core tables) to an 8+ domain Zustand store
					blueprint and a security model covering <b>RBAC</b>,{" "}
					<b>rate limiting</b>, and <b>CSRF</b>. A multi-layer freelancer
					verification pipeline enforces English proficiency, and skills
					assessments with weighted scoring and anti-fraud checks (IP/device/
					session analysis), blocking access until verification is complete.
					Payments are powered by <b>Flutterwave</b> with milestone-based escrow and
					webhooks, combined with real-time chat, dispute workflows, and
					comprehensive audit logging for all sensitive actions.
				</p>
			</div>
		),
	},
	{
		href: "https://affiliates.tubira.ai",
		title: "Tubira Affiliate Platform",
		description:
			"Affiliate platform for Tubira, a unified vacation and travel marketplace for flights, hotels, activities, and more in one checkout.",
		thumbnail: tb1,
		images: [tb1, tb2, tb3, tb4],
		stack: ["Nextjs", "Tailwindcss", "Typescript"],
		slug: "tubira-affiliate-platform",
		content: (
			<div>
				<p>
					I built the affiliate platform for <b>Tubira</b>, a global travel
					marketplace that unifies flights, hotels, resorts, activities, cars,
					cruises, and eSIM plans into a single booking experience (
					<a href="https://affiliates.tubira.ai" target="_blank" rel="noreferrer">
						https://affiliates.tubira.ai
					</a>
					). The platform enables affiliates to promote multiple travel products
					in one place, helping travelers book entire trips end-to-end while
					maintaining a smooth, secure checkout flow.
				</p>
				<p>
					On the partner side, I focused on building a clear, analytics-driven
					experience for affiliates to track referrals, commissions, and
					payouts. The system supports multi-product attach, high-value
					bookings, and multi-currency flows, with transparent, ethical
					monetization at its core. Affiliates benefit from configurable
					tracking windows, support for co-branded landing pages, and reliable
					commission adjustments when bookings are refunded, aligning with
					Tubira&apos;s goal of a trusted, long-term partner network.
				</p>
			</div>
		),
	},
	{
		href: "https://nyscakuresouthlg.com.ng",
		title: "NYSC CDS Attendance & Documentation System",
		description:
			"A QR-based attendance and documentation platform for NYSC CDS groups in Akure South LGA, replacing manual roll calls with real-time dashboards and reports.",
		thumbnail: nysc1,
		images: [nysc1, nysc2, nysc3, nysc4, nysc5, nysc6],
		stack: ["Nextjs", "Tailwindcss", "Typescript"],
		slug: "nysc-cds-attendance-system",
		content: (
			<div>
				<p>
					I designed and developed the <b>CDS Attendance System</b> for NYSC
					Akure South LGA, a web platform that modernizes attendance management
					for CDS groups by replacing paper roll calls with QR-based check-ins,{" "}
					<b>real-time dashboards</b>, and rich analytics (
					<a
						href="https://nyscakuresouthlg.com.ng"
						target="_blank"
						rel="noreferrer"
					>
						https://nyscakuresouthlg.com.ng
					</a>
					). Each member has a digital identity tied to a specific CDS group and
					role (member, leader, super admin), ensuring that all attendance data
					is consistently scoped and auditable.
				</p>
				<p>
					For every CDS meeting, the system generates a secure QR token that
					members scan to check in for that date and session, enforcing{" "}
					<b>one valid attendance per user per meeting/day</b>. Admins can still
					apply manual overrides for legitimate cases (technical issues, late
					arrivals) while the platform keeps strict rules around dates,
					uniqueness, and group membership. Dashboards surface live attendance
					status, trends over time, performance by group and role, and
					&quot;top groups&quot; by participation, while monthly and
					date-bounded reports give leadership fast insight without dealing with
					raw spreadsheets. This balances automation with human control, giving
					NYSC leadership a centralized, scalable, and trustworthy record of
					participation across dozens of groups and thousands of entries.
				</p>
			</div>
		),
	},
	{
		href: "https://pesta-ticketr.vercel.app",
		title: "Tickethub-Event Ticketing Platform",
		description:
			"A web app where users can create, manage, and purchase event tickets—with fast onboarding, secure payments, and automatic refunds.",
		thumbnail: hub2,
		images: [hub, hub2, hub3],
		stack: [
			"Nextjs",
			"Tailwindcss",
			"shadcn/ui",
			"Typescript",
			"Clerk",
			"Paystack",
			"Convex",
		],
		slug: "event-ticketing-platform",
		content: (
			<div>
				<p>
					I engineered the Event Ticketing Platform—a comprehensive application
					that simplifies event organization and ticket sales. Using{" "}
					<b>Next.js</b> and <b>TypeScript</b> for a robust frontend, the
					platform enables organizers to create, update, and monitor events
					through an intuitive dashboard. <b>Tailwind CSS</b> and{" "}
					<b>shadcn/ui</b> deliver a polished and responsive user interface.
					Authentication is secured via <b>Clerk</b>, ensuring attendee data
					protection.
				</p>

				<p>
					The platform automates payments and payouts using <b>Paystack</b>,
					with seamless seller onboarding for subaccount creation. Data storage
					and real-time updates run on <b>Convex</b>, ensuring reliability and
					performance at scale. Attendees can browse, purchase, and get instant
					confirmations for tickets, while organizers benefit from automated
					refund processing if events are cancelled. The application’s scalable
					architecture supports future feature integration and growing user
					demands.
				</p>

				<p>
					A strong focus on developer experience is reflected in clear project
					documentation, an organized codebase, and straightforward
					deployment—recommended via <b>Vercel</b>. All critical flows,
					including environment setup, onboarding, ticket buying, and refund
					processing, are carefully documented and tested. This project
					highlights the seamless integration of modern technologies and best
					development practices, resulting in a reliable, scalable, and
					user-friendly event management solution.
				</p>
			</div>
		),
	},
	{
		href: "https://cabwire.com",
		title: "Cabwire",
		description:
			"A smarter, fairer, and more human ride-hailing experience launching soon across North America.",
		thumbnail: cabwire,
		images: [cabwire, cabwire],
		stack: [
			"Nextjs",
			"Tailwindcss",
			"Shadcn",
			"Typescript",
			"NeonDb",
			"Drizzle",
		],
		slug: "cabwire",
		content: (
			<div>
				<p>
					I designed and developed the prelaunch landing page for Cabwire, a
					next-generation ride-hailing platform focused on delivering a smarter,
					fairer, and more human experience across North America. Built using
					Next.js with the App Router, TypeScript, and Tailwind CSS, the site
					features a clean, responsive design powered by ShadCN UI. The project
					emphasizes accessibility, performance, and a modern aesthetic,
					including full dark mode support. The interface was carefully crafted
					to create a strong first impression, clearly communicate Cabwire’s
					value proposition, and convert visitors into early adopters.
				</p>
				<p>
					A custom-built waitlist form captures interest from riders and
					drivers, using React Hook Form, Zod, and react-select for robust
					validation and conditional logic based on user type. Submissions are
					securely stored in a NeonDB PostgreSQL database, managed through
					Drizzle ORM for type-safe, scalable data access. This build not only
					sets the stage for Cabwire’s full product launch but also serves as a
					scalable, maintainable, and visually engaging foundation for future
					growth.
				</p>{" "}
			</div>
		),
	},
	{
		href: "https://linkedcart.com",
		title: "LinkedCart",
		description:
			"LinkedCart connects you to every store, mall, and restaurant in your city, all in one app. From clothing to groceries, gadgets to gourmet; if it's in your city, we'll get it to your doorstep.",
		thumbnail: linkedcart,
		images: [linkedcart, linkedcart],
		stack: [
			"Nextjs",
			"Tailwindcss",
			"Shadcn",
			"Typescript",
			"NeonDb",
			"Drizzle",
		],
		slug: "linkedcart",
		content: (
			<div>
				<p>
					I developed the landing page and prelaunch site for LinkedCart, a
					unified citywide shopping and delivery platform that connects users to
					every store, mall, and restaurant in their city—all in one app. Built
					with Next.js, TypeScript, and Tailwind CSS, the interface delivers a
					fast, intuitive user experience with a clean, responsive layout using
					ShadCN UI. The design reflects LinkedCart’s dynamic mission to bring
					convenience and discovery to urban shopping, while highlighting core
					features through a visually appealing, mobile-first interface. Full
					dark mode support ensures accessibility and modern UX across user
					preferences.
				</p>
				<p>
					To help LinkedCart build early momentum, I implemented a waitlist form
					that supports various user categories such as shoppers and merchants.
					Using React Hook Form, Zod, and react-select, the form handles dynamic
					fields and robust validation logic. Waitlist data is securely stored
					in a NeonDB PostgreSQL database, with Drizzle ORM providing type-safe,
					efficient backend interactions. The final product is a scalable,
					brand-aligned entry point that positions LinkedCart for a strong
					market debut and supports future expansion into app-driven services.
				</p>{" "}
			</div>
		),
	},
	{
		href: "https://benjafamilylabs.com",
		title: "BenjaFamily Labs",
		description:
			"A finance research and advisory firm that provides insights and analysis on the latest trends in the financial markets.",
		thumbnail: benjalabs,
		images: [benjalabs, benjalabs],
		stack: ["Nextjs", "Tailwindcss", "Shadcn", "Typescript", "GoogleCloud"],
		slug: "benjalabs",
		content: (
			<div>
				<p>
					I built the landing page for Benja Family Labs, a finance research and
					advisory firm offering expert insights into market trends, investment
					strategies, and economic developments. Developed using Next.js,
					TypeScript, Tailwind CSS, and ShadCN UI, the site delivers a clean,
					professional aesthetic with responsive design optimized for both
					desktop and mobile. The interface communicates the firm’s credibility
					and value proposition while inviting potential clients and
					collaborators to explore its services. Full dark mode support enhances
					user experience and accessibility.
				</p>
				<p>
					To streamline client engagement, I integrated Google Calendar and
					Google Meet directly into the platform, enabling seamless, real-time
					meeting scheduling. Users can instantly book consultations or advisory
					sessions via the embedded system, reducing friction and improving
					conversion. Data and scheduling logic are handled efficiently through
					the App Router structure, ensuring performance and scalability. The
					result is a polished, user-friendly gateway that enhances Benja Family
					Labs’ digital presence and facilitates high-quality client
					interactions.
				</p>{" "}
			</div>
		),
	},
	{
		href: "https://oderahelpinghandfoundation.org",
		title: "Odera Helping Hand Foundation",
		description:
			"A non-profit organization that provides support and resources to families in need.",
		thumbnail: ohhfoundation,
		images: [ohhfoundation, ohhfoundation],
		stack: [
			"Nextjs",
			"Tailwindcss",
			"Shadcn",
			"Typescript",
			"NeonDb",
			"Drizzle",
		],
		slug: "ohhfoundation",
		content: (
			<div>
				<p>
					I developed the landing and events platform for Odera Helping Hands
					Foundation, a nonprofit organization focused on community development,
					outreach, and empowerment. The site was built with Next.js,
					TypeScript, and Tailwind CSS, offering a modern, accessible interface
					with a focus on storytelling and impact. Three.js was used to
					introduce subtle, interactive 3D animations, adding a visually
					engaging layer to the user experience and emphasizing the foundation’s
					dynamic mission. The platform allows visitors to explore events,
					initiatives, and campaigns through a clean, responsive layout that
					reflects the foundation’s humanitarian values.
				</p>
				<p>
					To support event coordination and user interaction, I implemented full
					authentication using Kinde, ensuring a secure, seamless login
					experience for volunteers, donors, and organizers. Event data is
					managed using NeonDB and Drizzle ORM, while TanStack Query powers
					efficient and reactive data fetching across the application.
					Authenticated users can view, register for, and manage event
					participation directly on the platform. This build not only empowers
					Odera Helping Hands to scale their outreach but also showcases a
					thoughtful integration of tech to support real-world community impact.
				</p>{" "}
			</div>
		),
	},
	{
		href: "https://dishpatch-riders.vercel.app",
		title: "Dishpatch Riders Web App",
		description:
			"A web app for riders to manage their deliveries and track their earnings.",
		thumbnail: dishriders,
		images: [dishriders, dishriders],
		stack: ["Nextjs", "Tailwindcss", "Redux", "SocketIO", "googleMapsApi"],
		slug: "dishriders",
		content: (
			<div>
				<p>
					I built Dishpatch Riders, a real-time web application designed
					specifically for last-mile delivery riders. Developed with Next.js,
					Tailwind CSS, and Redux, the platform offers a clean, responsive
					interface optimized for quick decision-making and on-the-go access.
					The application serves as a centralized dashboard where riders can
					receive, manage, and complete delivery assignments efficiently. With a
					focus on usability and performance, the UI was designed to remain
					intuitive and functional, even under fast-paced delivery conditions.
				</p>
				<p>
					To ensure real-time communication and dynamic routing, I integrated
					Socket.IO for live updates and notifications, keeping riders instantly
					informed about new orders, route changes, and delivery statuses. I
					also incorporated the Google Maps API to provide precise, interactive
					navigation and route planning. The app consumes RESTful APIs to sync
					data across platforms, ensuring consistency between riders, customers,
					and dispatchers. The result is a robust, scalable delivery tool that
					enhances the speed, safety, and reliability of last-mile logistics.
				</p>
			</div>
		),
	},
	{
		href: "https://dishpatch-restaurants.vercel.app",
		title: "Dishpatch Restaurants Web App",
		description:
			"A web app for restaurants to manage their orders and track their earnings.",
		thumbnail: dishrest,
		images: [dishrest, dishrest],
		stack: ["Nextjs", "Tailwindcss", "Redux", "SocketIO", "googleMapsApi"],
		slug: "dishpatch-restaurant",
		content: (
			<div>
				<p>
					I developed Dishpatch Restaurant, a web application that empowers
					restaurants to manage incoming orders and monitor earnings with ease
					and accuracy. Using Next.js, Tailwind CSS, and Redux, the platform
					features a modern, intuitive dashboard interface tailored for
					restaurant operators. It enables real-time order processing, status
					management, and earnings tracking—all optimized for speed, clarity,
					and day-to-day reliability in fast-paced restaurant environments.
				</p>
				<p>
					To enhance customer interaction, I integrated Socket.IO to enable
					real-time communication between restaurants and customers. This allows
					restaurants to send live order updates, confirm changes, and respond
					to customer inquiries instantly, improving transparency and service
					quality. The app consumes backend APIs to handle order data, financial
					reports, and delivery details, while the Google Maps API supports
					location-based features like delivery tracking. With a focus on
					performance, scalability, and seamless communication, Dishpatch
					Restaurant bridges the gap between digital orders and real-world
					fulfillment.
				</p>{" "}
			</div>
		),
	},
	{
		href: "https://pfhixtech.com",
		title: "PfHix Technologies",
		description:
			"A technology company that provides security solutions for businesses and individuals.",
		thumbnail: pfhixtech,
		images: [pfhixtech, pfhixtech],
		stack: ["Nextjs", "Tailwindcss", "Shadcn", "Typescript", "GoogleApi"],
		slug: "pfhixtech",
		content: (
			<div>
				<p>
					I developed the landing page for PfHix Technologies, a
					forward-thinking technology company dedicated to delivering innovative
					solutions for businesses and individuals. Built with Next.js,
					TypeScript, and Tailwind CSS, the site features a clean, modern design
					that emphasizes user experience and accessibility. The responsive
					layout is powered by ShadCN UI, ensuring a seamless experience across
					devices. The design effectively communicates PfHix’s mission and
					services while inviting users to explore further.
				</p>
				<p>
					The platform includes integrated Google Calendar and Google Meet
					functionality, allowing users to schedule meetings directly through
					the site. This feature enhances user engagement and streamlines the
					process of connecting with the PfHix team. The application is built on
					a scalable architecture that supports future growth and additional
					functionality as the company expands its offerings. Overall, this
					project showcases a blend of modern design principles and practical
					solutions tailored to meet the needs of both the business and its
					customers.
				</p>{" "}
			</div>
		),
	},
	{
		href: "https://cresarepo.vercel.app",
		title: "Cresa Repo",
		description:
			"A web app for the department of Computer and Robotics Education University of Nigeria Nsukka to manage their projects and thesis.",
		thumbnail: cresa,
		images: [cresa, cresa],
		stack: [
			"Nextjs",
			"Tailwindcss",
			"Shadcn",
			"Typescript",
			"MongoDB",
			"Clerk",
		],
		slug: "cresa-repo",
		content: (
			<div>
				<p>
					I developed Cresa Repo, a web application designed for the Department
					of Computer and Robotics Education at the University of Nigeria Nsukka
					for my final year project work. This platform serves as a centralized
					repository for students to manage their projects and thesis
					submissions. Built with Next.js, TypeScript, and Tailwind CSS, the
					application features a clean, user-friendly interface that enhances
					the student experience and streamlines project management.
				</p>
				<p>
					The application is designed to facilitate easy project submission,
					management, and tracking. It includes features for students to upload
					their projects, view submission statuses, and receive feedback from
					faculty members. The platform is built on a scalable architecture that
					supports future enhancements and additional functionality as the
					department&apos;s needs evolve. Overall, Cresa Repo is a practical
					solution that enhances the academic experience for students and
					faculty alike.
				</p>{" "}
			</div>
		),
	},
];
