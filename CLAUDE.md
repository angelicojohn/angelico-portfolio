# AJ Portfolio

Personal portfolio for AJ, a web designer & developer (Webflow, Framer, Astro). Built in **Astro** with plain CSS. Layouts come from **BYQ Supply** sections, motion comes from **Osmo Supply** resources, and everything is re-skinned to one **blue** brand.

The markup and class naming are kept Webflow-friendly (flat BEM-style global classes, no scoped styles, no Tailwind) so sections can later be moved into the Webflow Designer.

## Commands

```bash
npm run dev       # dev server (Astro 7 runs it in the background; first free port from 4321, currently :4323)
npx astro dev status | logs | stop
npm run build     # static build → dist/
npm run preview   # serve the build
npm run deploy    # build + publish dist/ to the gh-pages branch → https://angelicojohn.github.io/angelico-portfolio/
```

## Deploy (GitHub Pages)
- Repo: https://github.com/angelicojohn/angelico-portfolio (**public**, chosen by AJ). Pages serves the `gh-pages` branch.
- The site lives under the base `/angelico-portfolio` (`astro.config.mjs`). **Every internal link and image must go through `url()` from `src/lib/url.ts`.** A bare `"/images/…"` or `"/astro"` 404s on Pages. In dev the site is also served under `/angelico-portfolio/`.
- Deploy is `npm run deploy` (`scripts/deploy.sh`), not GitHub Actions: the gh login token has no `workflow` scope. `.nojekyll` keeps `_astro/` visible.
- `/osmo` (raw vendor vault code) and `/Full Page Screenshots` (raw client files) are git-ignored. Keep it that way, because the repo is public.

## Structure

```
src/
  layouts/Base.astro          # <head>, fonts, Loader, Nav, Footer, main.js
  pages/index.astro           # section order
  components/
    osmo/                     # Osmo markup (Loader, Nav)
    sections/                 # one file per BYQ-based section
    ui/                       # LinkArrow, PillButton
  data/work.ts                # Selected Work entries (edit here)
  styles/
    tokens.css                # brand tokens, the single source of colour/type
    global.css                # reset, layout primitives, buttons, imports
    osmo.css                  # Osmo resource CSS, re-skinned to tokens
    sections/*.css            # one stylesheet per section
  scripts/
    main.js                   # boot order: nav → loader → reveals
    osmo/*.js                 # Osmo scripts as ES modules
osmo/                         # RAW Osmo resources exactly as pasted (reference only, not imported)
public/images/                # local images (BYQ decorative assets, your photos)
```

## Section → source map (homepage)

Positioning (Oct 2026): client benefits first ("Custom websites. Faster delivery. Smarter costs."), tools second. All homepage copy lives in `src/data/home.ts` (DRAFT by Claude from AJ's repositioning brief; Jev-checked for over-promises). Timelines there are proposed **targets**, not guarantees.

| Section | Layout source | Motion |
|---|---|---|
| Loader | — | Welcoming Words Loader |
| Nav | — | Bold Full Screen Navigation + Burger Menu Button |
| Hero | seven-nine-hero-1 | Masked Text Reveal, Text Scramble (load) |
| Showcase (inside Hero, under the display heading) | curved 3D carousel after weichie.com: outward cylinder, cards cut into slices along the arc, radius capped to the stage width (`src/data/showcase.ts`, placeholder project mockups) | GSAP ticker auto-spin + drag inertia |
| Value (4 benefits) | open 4-col list | Masked Text Reveal |
| Intro / About (philosophy) | seven-nine-intro-text-1 | Highlight Marker, Highlight Text on Scroll |
| Custom | 7/5 split + blue checklist | Highlight Marker |
| Workflow (traditional vs modern) | two flow rows | Masked Text Reveal |
| Timelines (targets + stages) | 4 cards + 3-stage line | Masked Text Reveal |
| Cost | reuses /astro AiSpeed split | Masked Text Reveal |
| Process (5 steps) | kelvin-process-1 (`Process` props) | line fill |
| AI-Assisted | nextwell-intro-text-5 + principles row | Highlight Text on Scroll |
| Editing & ownership | reuses blue SeoAeo cards | Masked Text Reveal |
| Services (4 outcome services) | offthegrid-value-features-4 | Masked Text Reveal |
| Selected Work | strobe-cms-grid-5 | Masked Text Reveal + cursor follower |
| Testimonials | BYQ nextwell-testimonials-3 slider (scroll-snap + buttons in main.js; photo or brand-colour fallback) | Masked Text Reveal |
| Tools | Platforms card grid | Masked Text Reveal |
| Experience | consult-ai-hero-4 | Masked Text Reveal (chars) |
| FAQ | babka-faq-1 (`Faq` props) + FAQPage schema | — |
| Final CTA | consult-ai-cta-section-1 (defaults from home.ts) | scroll zoom |

### /astro — Astro Development & Migrations (Webflow, Framer, WordPress, Wix)
Content lives in `src/data/astro.ts` (DRAFT copy by Claude, awaiting AJ's approval; Jev-checked for invented claims and over-promises).

| Section | BYQ layout | Motion |
|---|---|---|
| PageHero | seven-nine-hero-1 (no image) | Masked Text Reveal |
| Platforms | offthegrid-value-features-4 cards, 2×2 | Masked Text Reveal |
| Benefits | nextwell-intro-text-5 panel | Highlight Text on Scroll |
| Stack (Astro + Sanity) | consult-ai-hero-4 layout, blue | Masked Text Reveal |
| Compare + Why now | kelvin-value-features-6 table (light), sticky first column, swipe on mobile; facts only from Astro/Cloudflare official sources, with links | Masked Text Reveal |
| WebApp | offthegrid card grid + automation list; card graphics are Recraft SVGs (`public/images/webapp/*.svg`, private Recraft style `d1c43333-7aee-4562-8eab-beb7403423e4`, white bg stripped, viewBox cropped) | Masked Text Reveal |
| AiSpeed | split: AI speeds up / AJ makes sure of | Highlight Text on Scroll |
| SeoAeo | consult-ai blue, SEO + AEO checklists | Masked Text Reveal |
| Process | kelvin-process-1 (picked by Claude; Jev leaned Sparkles at 0.52) | line fill + Masked Text Reveal |
| AboutAstro | seven-nine-intro-text-1 | Highlight Marker |
| AstroProjects | Astro builds only (`platform: 'Astro'`), bento of 3 Recraft mockup variations per project (`mockup-1..3.webp`, nano_banana_pro from live 2x screenshots, on-brand blue scenes), sides alternate | Masked Text Reveal |
| Testimonials | BYQ nextwell-testimonials-3 slider (`src/data/testimonials.ts`, shared with home) | Masked Text Reveal |
| Faq | babka-faq-1 layout as native `<details name="faq">` accordion (one open at a time) | Masked Text Reveal |
| Cta | consult-ai-cta-section-1 (props: title/text/label) | scroll zoom |

Copy is outcome-led: headings were chosen by Jev composite score (outcome 50%, positive 30%, minus over-promise penalty). Logos: `src/components/ui/Logo.astro` (Simple Icons SVGs in `public/images/logos/`, monochrome currentColor to stay on-brand).

Nav links are root-relative (`/#work`) so they work from any page; `is--current` follows `Astro.url.pathname`.

### /projects — Projects
- Data: `src/data/projects.ts` is the single source for the homepage Selected Work (the `featured` projects), `/projects` (all, filterable by Astro, Webflow or Framer) and `/projects/[slug]` (detail pages).
- Images: `node scripts/optimize-projects.mjs` turns the git-ignored `Full Page Screenshots/<Name> — <Platform>/` into `public/images/work/<slug>/` (`cover|desktop|mobile.webp` 1600w, `fullpage-desktop.jpg` 1440w, `fullpage-mobile.jpg` 390w). Full pages are JPEG because WebP caps at 16383px tall. Chilliwack Connect uses its homepage shots, not the tallest inner page.
- Card: `src/components/ui/ProjectCard.astro`. Full-page scroll on hover, falling back to the cover when there's no desktop full page (Winston Moore).
- Detail: hero, cover mockup, scrollable desktop + phone viewers, desktop/mobile mockups, next project, CTA.
- Project `description` is empty until AJ writes what they were responsible for. Framer projects use "Figma → Framer" in Contribution.

## Rules

### Branding
- **All colour comes from `src/styles/tokens.css`.** Never hardcode hex in components or section CSS; use `var(--*)`.
- Core brand blue is `--blue-500` (`#2f54ff`). Vendor colours (Osmo's pink marker, lime accent, green nav; BYQ's mint, cream, Consult blue) are always replaced by tokens.
- Fonts: `--font-display` (Inter Tight), `--font-body` (Inter), `--font-mono` (JetBrains Mono).

### Osmo resources
- Keep every `data-` attribute and the animation logic intact. Only colours, fonts and the module wrapper change.
- Raw originals live in `/osmo/<resource>/` and are the reference. Ported modules live in `src/scripts/osmo/`.
- Known deliberate deviations, and only these:
  - Each script imports GSAP from npm and exports its `init*` function; `main.js` calls them, so there are no `DOMContentLoaded` listeners.
  - `welcoming-words-loader.js` returns its timeline, so reveals start when the loader finishes.
  - `burger-menu-button.js` returns `{ open, close }` and doesn't attach its own click handler. `main.js` syncs it to `[data-navigation-status]`, so ESC and link clicks close both.
  - `masked-text-reveal.js` adds the FOUC `gsap.set(heading, { autoAlpha: 1 })` from Osmo's own notes, plus an optional `data-split-start` override. Above-the-fold headings use `"top bottom"`, because the clamped `top 80%` resolves to 0 and never fires at scroll 0.
- Highlight Marker colour comes from the token: `data-marker-theme="--marker-color"`.
- Reduced motion: loader hidden, reveals skipped, content visible.

### BYQ sections
- BYQ references are React/Tailwind. Port them to `.astro` + plain CSS, keep layout, spacing and interactions, and drop their colours and fonts.
- Fetch with the BYQ MCP (`get_byq_component <id>`) when changing a section.

### SEO / AEO on this site
- `@astrojs/sitemap` → `sitemap-index.xml`; `public/robots.txt`, `public/llms.txt`; canonical + og:url in `Base.astro`.
- JSON-LD via `src/components/SchemaOrg.astro`: site-wide `ProfessionalService` (Base), plus `Service` + `FAQPage` on /astro (built from `faqs`). Pages pass extra schema with `<Base schema={[…]}>`.
- robots.txt/llms.txt only take full effect at a domain root (not under the GitHub Pages sub-path), so move to a custom domain to get the full benefit.

### Gotchas fixed (don't regress)
- Masked headings: `.line-mask` gets extra padding-block with matching negative margins (osmo.css) so tight line-heights don't clip descenders.
- Burger: keep Osmo's line geometry (2em × .1875em, .1875em gap); scale the button with font-size. The open-state transforms assume those exact sizes.
- Menu logo: the Astro logo in the nav is .68em (cap height) with a drop-shadow copy for the hover roll.
- `.ai--on-bg`: the Why Astro panel sits on the Compare section's surface (no seam).

### Layout
- No horizontal scroll: `html, body { overflow-x: clip }`. Full-bleed `.divider` uses 100vw, which includes the scrollbar width. Don't switch it to `hidden`, because that breaks `position: sticky`.

### Content
- Copy comes from the user's brief and shouldn't be reworded without asking.
- Projects live in `src/data/projects.ts` (see /projects above). Images are **full-page screenshots** (1440px wide, any height) in `public/images/work/`. The card shows the top in a 16:10 frame and scrolls to the bottom on hover; `main.js` measures distance and duration per image.
- AJ's photos replace `.media-placeholder` elements in Hero and About.

## Jev (decisions) — "Jev decides, Claude writes"
Use the `jev` skill (`~/.claude/skills/jev`) for any sort, classify, score or yes/no call in this project, e.g. checking copy against the brief, triaging QA feedback, or picking between candidate sections or effects. Claude writes the code and copy. When Jev's confidence is under about 0.7, Claude decides and says so. Ask the user before sending anything private (client names, emails, contracts). Public site copy is fine.

## Open TODOs
- [x] Real projects + full-page screenshots (`src/data/projects.ts`)
- [ ] AJ: 1–2 sentences per project on what they were responsible for
- [ ] Approve copy written by Claude (not in brief): hero words "Figma. Webflow. Shipped.", label "Hi, I'm AJ", What I Do intro line
- [ ] AJ's photo (Hero) + secondary image (About)
- [ ] Contact email + LinkedIn in `src/data/site.ts`
- [ ] Remaining Osmo resources: Lenis, Curved Wipe transition, Magnetic Cursor, Marquee, Number Odometer, Footer Parallax
- [ ] Decide deploy target: Astro on Webflow Cloud vs. convert into Webflow Designer
