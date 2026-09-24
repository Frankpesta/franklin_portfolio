# Franklin Olisaemeka — portfolio

Personal site of Franklin Olisaemeka, full-stack product engineer. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, GSAP + Lenis, and a single React Three Fiber scene.

## Scripts

```bash
npm run dev     # local dev server
npm run build   # production build (also type-checks)
npm run lint    # eslint
```

## Where things live

| What | Where |
| --- | --- |
| Projects (single source of truth) | `src/content/projects.ts` |
| Work history | `src/content/experience.ts` |
| Name, availability, socials, EmailJS ids | `src/content/site.ts` |
| Motion tokens (eases, durations, staggers, breakpoints) | `src/motion/config.ts` |
| Smooth scroll, page transitions, `useMotion` hook | `src/motion/` |
| Home page sections (server components) | `src/components/sections/*.tsx` |
| Their client-side motion shells | `src/components/sections/motion.tsx` |
| Colour tokens and type scale | `src/app/globals.css` |

### Adding a project

Add an entry to `projects` in `src/content/projects.ts`. Save screenshots to `public/images` as WebP (about 1920px wide, quality ~80) and import them there so Next.js knows their size. `tier` controls where the project appears: `featured` projects get a case-study panel on the home page, and every project appears in the index and gets its own `/projects/<slug>` page.

### Résumé

The site links to `/resume.pdf`. Put the file at `public/resume.pdf`.

## Motion and accessibility

- Every animation goes through `useMotion` (a `gsap.matchMedia()` wrapper) with `desktop`, `mobile`, `pin` and `reduce` branches.
- Section markup is rendered on the server. Motion lives in thin client shells made with `motionSection(name, setup)`, so only those shells hydrate.
- Anything below the fold passes `defer: true`, so it's set up when the browser is idle. `flushDeferredMotion()` runs pending setups early. Anchor jumps call it first so they land correctly.
- With `prefers-reduced-motion`, smooth scrolling, pinning, scrubbing, the intro, the custom cursor and WebGL are all off. Content fades in instead.
- The 3D hero scene loads only on capable desktop devices, after the hero is visible, and stops rendering off-screen. Everyone else sees the static SVG version.
- The work index hover preview gets a WebGL distortion layer (`PreviewDistort`) on capable desktops, loaded on first hover. Everyone else gets the plain cross-fade underneath.
