# angelico-portfolio

Portfolio for AJ, Webflow Developer. Built with **Astro**, plain CSS and GSAP. Layouts are adapted from BYQ Supply sections, motion from Osmo Supply resources, all re-skinned to one blue brand.

## Pages
- `/`: home (hero, about, services, AI workflow, selected work, experience, contact)
- `/astro`: Astro development and migrations from Webflow, Framer, WordPress and Wix, plus Sanity

## Develop
```bash
npm install
npm run dev     # http://localhost:4321 (or the next free port)
npm run build   # static output in dist/
```

Content lives in `src/data/` (`site.ts`, `work.ts`, `astro.ts`). Brand tokens are in `src/styles/tokens.css`. See `CLAUDE.md` for the architecture and rules.
