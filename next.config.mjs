/** @type {import('next').NextConfig} */
const nextConfig = {
	agentRules: false,
	images: {
		formats: ["image/avif", "image/webp"],
	},
	async redirects() {
		// Old routes from the previous site, folded into the one-page flow.
		return [
			{ source: "/about", destination: "/#about", permanent: true },
			{ source: "/contact", destination: "/#contact", permanent: true },
			{ source: "/resume", destination: "/#experience", permanent: true },
			{ source: "/projects", destination: "/#index", permanent: true },
			{ source: "/blog", destination: "/", permanent: true },
			{ source: "/blog/:path*", destination: "/", permanent: true },
		];
	},
};

export default nextConfig;
