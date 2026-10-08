// Curved 3D showcase (after weichie.com's hero carousel). Cards link to project pages.
// PLACEHOLDER images: existing project mockups. To use your own, drop files in
// public/images/showcase/ and point `src` at them (portrait ~5:6 works best).
import { projects, img } from './projects';

export const showcase = projects.map((p) => ({
  src: img(p, p.mockups?.length ? 'mockup-1.webp' : 'cover.webp'),
  alt: `${p.name} website`,
  href: `/projects/${p.slug}`,
}));

// Icons: Recraft vector (private brand style d1c43333-…), white background stripped, viewBox cropped.
export const showcaseLabels = [
  { label: 'Astro websites', icon: '/images/icons/astro.svg' },
  { label: 'Migrations', icon: '/images/icons/migrations.svg' },
  { label: 'Sanity CMS', icon: '/images/icons/cms.svg' },
  { label: 'Integrations & automation', icon: '/images/icons/integrations.svg' },
  { label: 'SEO & AEO', icon: '/images/icons/seo.svg' },
];
