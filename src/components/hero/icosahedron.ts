/** Geometry shared by the static SVG core and (as a reference) the WebGL core. */

type Vec3 = readonly [number, number, number];

const PHI = (1 + Math.sqrt(5)) / 2;

export const ICOSA_VERTICES: readonly Vec3[] = [
	[-1, PHI, 0],
	[1, PHI, 0],
	[-1, -PHI, 0],
	[1, -PHI, 0],
	[0, -1, PHI],
	[0, 1, PHI],
	[0, -1, -PHI],
	[0, 1, -PHI],
	[PHI, 0, -1],
	[PHI, 0, 1],
	[-PHI, 0, -1],
	[-PHI, 0, 1],
];

/** Every vertex pair at edge length 2: the 30 edges of the icosahedron. */
export const ICOSA_EDGES: readonly (readonly [number, number])[] = (() => {
	const edges: [number, number][] = [];
	for (let i = 0; i < ICOSA_VERTICES.length; i++) {
		for (let j = i + 1; j < ICOSA_VERTICES.length; j++) {
			const [ax, ay, az] = ICOSA_VERTICES[i];
			const [bx, by, bz] = ICOSA_VERTICES[j];
			const d = Math.hypot(ax - bx, ay - by, az - bz);
			if (Math.abs(d - 2) < 1e-6) edges.push([i, j]);
		}
	}
	return edges;
})();

/** Rotate around X then Y and project orthographically to 2D. */
export function project([x, y, z]: Vec3, rx: number, ry: number): [number, number, number] {
	const cy = Math.cos(rx);
	const sy = Math.sin(rx);
	const y1 = y * cy - z * sy;
	const z1 = y * sy + z * cy;
	const cx = Math.cos(ry);
	const sx = Math.sin(ry);
	const x2 = x * cx + z1 * sx;
	const z2 = -x * sx + z1 * cx;
	return [x2, y1, z2];
}
