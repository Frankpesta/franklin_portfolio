import { ICOSA_EDGES, ICOSA_VERTICES, project } from "./icosahedron";

const RX = 0.42;
const RY = 0.58;
const R = 38;

const round = (n: number) => Math.round(n * 100) / 100;

const outer = ICOSA_VERTICES.map((v) => project(v, RX, RY));
const inner = ICOSA_VERTICES.map((v) => project(v, -RX * 0.8, RY + 0.9));

/**
 * The static "system core": a projected wireframe icosahedron drawn in SVG.
 * Server-rendered, so it is the first paint, the reduced-motion version and
 * the low-power fallback for the WebGL core.
 */
export function CoreFallback({ className }: { className?: string }) {
	return (
		<svg viewBox="-50 -50 100 100" className={className} aria-hidden fill="none">
			<circle r="46" stroke="var(--line-strong)" strokeWidth="0.2" strokeDasharray="0.6 1.4" />
			<circle r="31" stroke="var(--line)" strokeWidth="0.2" />
			<line x1="-50" y1="0" x2="50" y2="0" stroke="var(--line)" strokeWidth="0.15" />
			<line x1="0" y1="-50" x2="0" y2="50" stroke="var(--line)" strokeWidth="0.15" />
			{ICOSA_EDGES.map(([a, b]) => {
				const back = outer[a][2] + outer[b][2] < 0;
				return (
					<line
						key={`o${a}-${b}`}
						x1={round((outer[a][0] * R) / 1.9)}
						y1={round((outer[a][1] * R) / 1.9)}
						x2={round((outer[b][0] * R) / 1.9)}
						y2={round((outer[b][1] * R) / 1.9)}
						stroke="var(--ink)"
						strokeOpacity={back ? 0.22 : 0.7}
						strokeWidth="0.3"
					/>
				);
			})}
			{ICOSA_EDGES.map(([a, b]) => (
				<line
					key={`i${a}-${b}`}
					x1={round((inner[a][0] * R * 0.4) / 1.9)}
					y1={round((inner[a][1] * R * 0.4) / 1.9)}
					x2={round((inner[b][0] * R * 0.4) / 1.9)}
					y2={round((inner[b][1] * R * 0.4) / 1.9)}
					stroke="var(--accent)"
					strokeWidth="0.35"
				/>
			))}
			{outer.map(([x, y, z], i) => (
				<circle
					key={`n${i}`}
					cx={round((x * R) / 1.9)}
					cy={round((y * R) / 1.9)}
					r={z > 0 ? 0.9 : 0.5}
					fill={z > 0 ? "var(--accent)" : "var(--ink)"}
				/>
			))}
		</svg>
	);
}
