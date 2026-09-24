import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const PAPER = "#f1efea";
const INK = "#0d0d0d";
const MUTED = "#5b5852";
const ACCENT = "#ff4a1c";

/** The shared Open Graph card: a blueprint sheet with one big title. */
export function ogCard({ kicker, title, footer }: { kicker: string; title: string; footer: string }) {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: 64,
					background: PAPER,
					color: INK,
					backgroundImage: `linear-gradient(rgba(13,13,13,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.06) 1px, transparent 1px)`,
					backgroundSize: "80px 80px",
				}}
			>
				<div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 2, color: MUTED, textTransform: "uppercase" }}>
					<span>{kicker}</span>
					<span>Franklin Olisaemeka</span>
				</div>
				<div style={{ display: "flex", alignItems: "flex-end", fontSize: title.length > 18 ? 96 : 132, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4, textTransform: "uppercase" }}>
					{title}
					<span style={{ color: ACCENT }}>.</span>
				</div>
				<div style={{ display: "flex", borderTop: `2px solid ${INK}`, paddingTop: 20, fontSize: 26, color: MUTED }}>{footer}</div>
			</div>
		),
		OG_SIZE,
	);
}
