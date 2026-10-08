// Curved 3D showcase (after weichie.com's hero carousel). Cards link to project pages.
// PLACEHOLDER images: existing project mockups. To use your own, drop files in
// public/images/showcase/ and point `src` at them (portrait ~5:6 works best).
import { projects, img } from './projects';

export const showcase = projects.map((p) => ({
  src: img(p, p.mockups?.length ? 'mockup-1.webp' : 'cover.webp'),
  alt: `${p.name} website`,
  href: `/projects/${p.slug}`,
}));

export const showcaseLabels = ['Web design', 'Web development', 'Redesigns', 'Integrations & automation', 'Ongoing support'];
