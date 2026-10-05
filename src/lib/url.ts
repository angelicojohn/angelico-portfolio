// Prefix root-relative paths with the deploy base (GitHub Pages serves under /angelico-portfolio/).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => `${base}${path.startsWith('/') ? path : `/${path}`}`;
/** Current pathname without the base, e.g. '/' or '/astro'. */
export const stripBase = (pathname: string) => (pathname.startsWith(base) ? pathname.slice(base.length) : pathname).replace(/\/$/, '') || '/';
