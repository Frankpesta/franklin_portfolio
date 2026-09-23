import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Reveal } from "@/components/Reveal";
import { TechStack } from "@/components/TechStack";

export default function Home() {
	return (
		<Container>
			<Hero />
			<Reveal>
				<Heading
					as="h2"
					className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4">
					What I&apos;ve been working on
				</Heading>
			</Reveal>
			<Products />
			<Reveal>
				<TechStack />
			</Reveal>
		</Container>
	);
}
