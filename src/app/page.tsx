import { Intro } from "@/components/Intro";
import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { Stack } from "@/components/sections/Stack";
import { WorkIndex } from "@/components/sections/WorkIndex";

export default function Home() {
	return (
		<>
			<Intro />
			<main id="main">
				<Hero />
				<Approach />
				<FeaturedWork />
				<WorkIndex />
				<Experience />
				<About />
				<Stack />
				<Contact />
			</main>
		</>
	);
}
