import { getProject, projects, sheetNumber } from "@/content/projects";
import { site } from "@/content/site";
import { OG_SIZE, ogCard } from "../../og-card";

export const alt = `A case study by ${site.name}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
	return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) return ogCard({ kicker: "Portfolio", title: site.name, footer: site.role });
	return ogCard({
		kicker: `Sheet ${sheetNumber(slug)} · ${project.category}`,
		title: project.title,
		footer: project.tagline,
	});
}
