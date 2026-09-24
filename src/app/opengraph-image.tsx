import { site } from "@/content/site";
import { OG_SIZE, ogCard } from "./og-card";

export const alt = `${site.name}, ${site.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
	return ogCard({ kicker: "Portfolio", title: site.name, footer: `${site.role} · ${site.availability}` });
}
