import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) return {};
	return {
		title: project.title,
		description: project.tagline,
		alternates: { canonical: `/projects/${project.slug}` },
		openGraph: {
			type: "article",
			title: `${project.title} · ${site.name}`,
			description: project.tagline,
			url: `/projects/${project.slug}`,
		},
	};
}

export default async function ProjectPage({ params }: Props) {
	const { slug } = await params;
	const project = getProject(slug);

	if (!project) {
		const merged = projects.find((p) => p.legacySlugs?.includes(slug));
		if (merged) permanentRedirect(`/projects/${merged.slug}`);
		notFound();
	}

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: project.title,
		description: project.summary,
		url: `${site.url}/projects/${project.slug}`,
		creator: { "@type": "Person", name: site.fullName, url: site.url },
		keywords: project.stack.join(", "),
		...(project.year ? { dateCreated: project.year.slice(0, 4) } : {}),
	};

	return (
		<>
			<CaseStudy key={project.slug} project={project} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
		</>
	);
}
