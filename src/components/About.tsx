"use client";
import { Paragraph } from "@/components/Paragraph";
import Image from "next/image";

import { motion } from "framer-motion";

export default function About() {
	const images = [
		"https://images.unsplash.com/photo-1692544350322-ac70cfd63614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
		"https://images.unsplash.com/photo-1692374227159-2d3592f274c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
		"https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
		"https://images.unsplash.com/photo-1692445381633-7999ebc03730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
	];
	return (
		<div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-10 my-10">
				{images.map((image, index) => (
					<motion.div
						key={image}
						initial={{
							opacity: 0,
							y: -50,
							rotate: 0,
						}}
						animate={{
							opacity: 1,
							y: 0,
							rotate: index % 2 === 0 ? 3 : -3,
						}}
						transition={{ duration: 0.2, delay: index * 0.1 }}>
						<Image
							src={image}
							width={200}
							height={400}
							alt="about"
							className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200"
						/>
					</motion.div>
				))}
			</div>

			<div className="max-w-4xl">
				<Paragraph className=" mt-4">
					Hey there, I’m Franklin Olisaemeka Enunwa — a dedicated Next.js
					developer with a B.Sc. in Computer and Robotics Education. I’m
					passionate about building performant, accessible, and beautifully
					designed web applications that deliver real value to users. With every
					project, my goal is to craft experiences that blend seamless
					functionality with thoughtful design—where engineering precision meets
					user-centered thinking.
				</Paragraph>
				<Paragraph className=" mt-4">
					I specialize in modern web technologies including Next.js, TypeScript,
					Tailwind CSS, Drizzle ORM, and NeonDB, and have built dynamic,
					full-stack applications across a range of industries—from ride-hailing
					and retail to nonprofits and finance. I’m also skilled in integrating
					tools like React Hook Form, Zod, ShadCN UI, and TanStack Query to
					ensure robust form handling, type safety, and efficient data fetching.
					For secure, user-friendly authentication, I’ve worked with providers
					like Kinde, and I bring in creative touches like Three.js to add
					motion and interactivity where it matters.
				</Paragraph>

				<Paragraph className=" mt-4">
					Beyond the frontend, I&apos;m deeply interested in the future of the
					web. I’m currently learning Web3 and Blockchain Development, expanding
					my toolkit to include decentralized applications, smart contracts, and
					trustless systems that push the boundaries of traditional software
					architecture. I believe in staying curious, always learning, and
					building things that matter.
				</Paragraph>
				<Paragraph className=" mt-4">
					As a software engineer, I bring with me not just technical skills, but
					the full spectrum of qualities needed to thrive in today&rsquo;s
					fast-moving tech world: – Problem-solving mindset: I see every
					challenge as an opportunity to grow. – Attention to detail: From
					pixel-perfect UIs to well-structured codebases, I sweat the small
					stuff. – Strong communication: I break down technical concepts
					clearly—for teammates, clients, and non-technical stakeholders. – Team
					collaboration: Whether pair programming or reviewing PRs, I enjoy
					working in teams and contributing to shared goals. – Adaptability:
					I&rsquo;m quick to pick up new tools, frameworks, and project needs. –
					Ownership and accountability: I take pride in my work and strive to
					see things through to completion. – Continuous learning: I actively
					seek feedback, stay updated with industry trends, and love
					experimenting with new technologies. – Empathy and user-focus: At the
					core of everything I build is the human experience—how users feel,
					interact, and benefit.
				</Paragraph>
				<Paragraph className=" mt-4">
					Outside of coding, I’m naturally curious and love to write, explore
					ideas, and think about how technology intersects with education,
					society, and innovation. I see every line of code as part of a bigger
					picture—a tool for solving real-world problems, empowering people, and
					shaping the future.
				</Paragraph>
				<Paragraph className=" mt-4">
					Thanks for stopping by my digital space. Whether you&apos;re a fellow
					developer, potential collaborator, or someone who just appreciates
					great software—I’m glad you&apos;re here. Let&apos;s connect and build
					something meaningful together.
				</Paragraph>
			</div>
		</div>
	);
}
