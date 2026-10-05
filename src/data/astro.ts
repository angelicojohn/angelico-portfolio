// /astro page content — DRAFT copy by Claude (outcome-led), Jev-checked. Awaiting AJ's approval.
export const platforms = [
  {
    name: 'Webflow',
    from: 'Webflow → Astro',
    description: 'Keep the design your team loves and drop the plan fees and editor limits. Your pages, CMS and interactions come across to a site that loads faster and is cheaper to host.',
  },
  {
    name: 'Framer',
    from: 'Framer → Astro',
    description: 'Keep your layouts and animations, and gain clean code you can take anywhere, on a site search engines can read with ease.',
  },
  {
    name: 'WordPress',
    from: 'WordPress → Astro',
    description: 'Say goodbye to plugin updates, security patches and slow page builders. Your posts and pages move to a fast, low-maintenance site.',
  },
  {
    name: 'Wix',
    from: 'Wix → Astro',
    description: 'Grow beyond templates and platform limits with a site you fully own: faster pages, portable code and the freedom to host anywhere.',
  },
];

export const benefits = [
  { title: 'Pages that load fast', text: 'Astro sends plain HTML and only adds JavaScript where it’s needed, so visitors see your content sooner.' },
  { title: 'No platform lock-in', text: 'Your pages and content live in code you own. Change hosts, agencies or editors whenever you like.' },
  { title: 'Lower running costs', text: 'Host on Netlify, Vercel, Cloudflare or Webflow Cloud, with no per-site builder plan to pay for.' },
  { title: 'Your search presence, kept', text: 'URLs, metadata, redirects and structured data are carried over, so the visibility you’ve built comes with you.' },
];

export const steps = [
  { num: '01', title: 'Audit', copy: 'You get a clear picture of everything on your current site — pages, CMS, forms, integrations and URLs — so nothing is missed.' },
  { num: '02', title: 'Plan', copy: 'You approve the structure, content model and redirect map up front, so there are no surprises later.' },
  { num: '03', title: 'Build', copy: 'You review your new site on a private staging link while your content and interactions are brought across.' },
  { num: '04', title: 'Launch', copy: 'Your new site goes live after full QA, with redirects in place and your old site kept as a safety net.' },
];

export const faqs = [
  {
    question: 'Will my site look the same after the migration?',
    answer: 'Exactly the same, or better: your choice. A migration is a great moment to fix design and structure issues, and nothing goes live until you’ve approved it on staging.',
  },
  {
    question: 'What happens to my SEO?',
    answer: 'It comes with you. URLs stay the same wherever possible, every changed URL gets a 301 redirect, and titles, descriptions, alt text and structured data are checked before launch.',
  },
  {
    question: 'How will I edit content afterwards?',
    answer: 'In whatever way suits your team best: simple Markdown files, Astro content collections, or a headless CMS with a visual editor. We’ll choose together during planning.',
  },
  {
    question: 'Do you still build in Webflow?',
    answer: 'Yes. If Webflow is the better fit for your goals, I’ll tell you and build it there. The aim is the right site for your business, not a particular tool.',
  },
];

export const stack = {
  title: 'Your team updates the site. Your site stays fast.',
  intro: [
    'Astro gives you a fast, lightweight front end. Sanity gives your team a clean, flexible place to manage content. Together, marketing can publish on its own schedule without waiting on a developer.',
  ],
  items: [
    { title: 'Publish without a developer', text: 'Your team edits pages, posts and products in Sanity Studio, an editor shaped around your content, so updates go live in minutes, not tickets.' },
    { title: 'Write once, use everywhere', text: 'Content is stored as structured data, so the same case study, product or FAQ can power your website, landing pages and future channels.' },
    { title: 'Collaborate in real time', text: 'Several people can work in Sanity at once and see each other’s changes live, so reviews and launches move faster.' },
    { title: 'Images handled for you', text: 'Sanity’s image pipeline resizes and crops images on demand, so your pages stay light without anyone resizing files by hand.' },
  ],
};

export const about = {
  title: 'A developer who builds for the business, not just the brief.',
  paragraphs: [
    'I’m AJ, a developer with 3+ years of professional agency experience and 40+ websites worked on for agencies and international businesses.',
    'Whether your site lives in Webflow or Astro, I think about how it will scale, how your team will manage it, and what needs to happen before it’s ready for production.',
    'With a strong design background, I make sure your new site keeps the polish of the original — and comes out of the migration easier to grow.',
  ],
};
