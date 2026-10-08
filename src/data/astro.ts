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
  { num: '01', title: 'Audit', copy: 'You get a clear picture of everything on your current site (pages, CMS, forms, integrations and URLs) so nothing is missed.' },
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
    question: 'What is AEO, and do I need it?',
    answer: 'Answer Engine Optimisation helps AI tools like ChatGPT, Perplexity and Google’s AI Overviews understand and cite your business. It builds on good SEO, and it’s included in every Astro build.',
  },
  {
    question: 'Is Astro always the right choice?',
    answer: 'No. If your team wants to change layouts visually without a developer, Webflow or Framer may suit you better. Astro shines when speed, flexible integrations, code ownership and lower platform costs matter most. I’ll recommend what fits your business, even if that isn’t Astro.',
  },
  {
    question: 'How long does a migration take?',
    answer: 'It depends on the number of pages, how much CMS content needs to move, integrations and how quickly feedback comes back. You get a scoped timeline after the audit, and a working preview on staging early in the build.',
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
    'With a strong design background, I make sure your new site keeps the polish of the original, and comes out of the migration easier to grow.',
  ],
};

// ------------------------------------------------------------ Comparison
// Cell: [mark, note]. mark: 'yes' | 'part' | 'no'. Keep claims fair — include rows Astro loses.
type Mark = 'yes' | 'part' | 'no';
export const compareCols = ['Astro + Sanity', 'Webflow', 'Framer', 'WordPress', 'Wix'] as const;
export const compareRows: { label: string; cells: [Mark, string][] }[] = [
  { label: 'Fast by default', cells: [['yes', 'Ships HTML, minimal JS'], ['part', 'Good, platform-tuned'], ['part', 'Heavier JS runtime'], ['part', 'Depends on theme & plugins'], ['no', 'Heavier pages']] },
  { label: 'You own the code and can switch hosts', cells: [['yes', 'Yours, host anywhere'], ['no', 'Locked to platform'], ['no', 'Locked to platform'], ['yes', 'Open source'], ['no', 'Locked to platform']] },
  { label: 'No per-site builder plan', cells: [['yes', 'Free framework'], ['no', 'Site plan required'], ['no', 'Site plan required'], ['part', 'Hosting + paid plugins'], ['no', 'Plan required']] },
  { label: 'Your team edits content visually', cells: [['yes', 'With Sanity Studio'], ['yes', 'Editor'], ['yes', 'CMS'], ['yes', 'Admin'], ['yes', 'Editor']] },
  { label: 'Custom web app features', cells: [['yes', 'APIs, logins, payments'], ['part', 'Via embeds & apps'], ['part', 'Limited'], ['part', 'Via plugins'], ['part', 'Via Velo & apps']] },
  { label: 'Low security maintenance', cells: [['yes', 'Static by default'], ['yes', 'Managed'], ['yes', 'Managed'], ['no', 'Core & plugin updates'], ['yes', 'Managed']] },
  { label: 'Full control of SEO & AEO markup', cells: [['yes', 'Every tag & schema'], ['part', 'Mostly'], ['part', 'Limited'], ['yes', 'Via plugins'], ['part', 'Limited']] },
  { label: 'Design without writing code', cells: [['no', 'Developer-built'], ['yes', 'Visual builder'], ['yes', 'Visual builder'], ['part', 'Page builders'], ['yes', 'Visual builder']] },
];

export const whyNow = {
  title: 'Why businesses are moving to Astro now.',
  points: [
    { stat: 'Cloudflare', text: 'Astro joined Cloudflare in January 2026 and remains open source under the MIT licence, so it has long-term backing and stays free to use.', source: 'https://astro.build/blog/joining-cloudflare/' },
    { stat: '2× a year', text: 'Cloudflare reports that Astro adoption doubles every year, a fast-growing community of developers and tools behind your site.', source: 'https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/' },
    { stat: 'Built for AI', text: 'Astro runs an official docs server for AI coding agents like Claude Code, Cursor and GitHub Copilot, so AI-assisted work on your site follows current Astro practice, not outdated examples.', source: 'https://docs.astro.build/en/guides/build-with-ai/' },
    { stat: 'Big brands', text: 'Your site gets the same fast foundation that Unilever, Visa and NBC News use for their content-driven websites.', source: 'https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/' },
  ],
};

// ------------------------------------------------- Web app + automations
export const webApp = {
  features: [
    { image: 'portal', title: 'Client portals & logins', text: 'Give customers a private area for documents, orders or project updates, reducing back-and-forth emails.' },
    { image: 'booking', title: 'Booking & scheduling', text: 'Let visitors book calls, appointments or demos straight from the page they’re reading.' },
    { image: 'calculator', title: 'Quote calculators & smart forms', text: 'Turn pricing questions into qualified leads with forms that adapt to each answer.' },
    { image: 'payments', title: 'Payments & checkout', text: 'Take deposits, sell products or run subscriptions with Stripe built into your site.' },
    { image: 'search', title: 'Search & filtering', text: 'Help visitors find the right product, service or article in seconds.' },
    { image: 'assistant', title: 'AI assistants', text: 'Answer common questions with an assistant grounded in your own content, around the clock.' },
  ],
  automations: [
    { title: 'Leads straight into your CRM', text: 'Every form submission lands in HubSpot, Pipedrive or Airtable, tagged and ready to follow up.' },
    { title: 'Instant notifications', text: 'New leads, bookings and payments ping your team in Slack or email the moment they happen.' },
    { title: 'AI lead triage', text: 'Incoming enquiries are scored and sorted automatically, so the best opportunities reach you first.' },
    { title: 'Content that publishes itself', text: 'Publish in Sanity and your site rebuilds and goes live, with no developer in the loop.' },
    { title: 'Workflows with n8n, Zapier or Make', text: 'Connect your site to the tools you already use and remove repetitive admin.' },
  ],
};

// -------------------------------------------------------- AI-assisted speed
export const aiSpeed = {
  title: 'Marketing pages, shipped fast, without the AI look.',
  intro: 'AI-assisted development speeds up the repetitive work, so new landing pages, campaigns and content can go live sooner. Every page is still designed, refined and quality-checked by hand.',
  ai: [
    'Scaffolding pages and components',
    'Migrating and restructuring content',
    'Repetitive code and data tasks',
    'Drafting tests and catching bugs early',
  ],
  me: [
    'Typography, spacing and visual hierarchy',
    'Motion that feels considered, not generic',
    'Consistency with your brand and design system',
    'QA on every breakpoint before anything ships',
  ],
};

// --------------------------------------------------------------- SEO + AEO
export const seo = {
  title: ['Found on Google.', 'Cited by AI.'],
  intro: 'More people now get answers from Google’s AI Overviews, ChatGPT and Perplexity before they ever click a link. Every build includes the setup that helps your business show up in classic search results and in AI answers.',
  seo: ['Titles, meta descriptions and Open Graph', 'Clean URLs, canonicals and 301 redirect map', 'XML sitemap and robots.txt', 'Fast pages and strong Core Web Vitals', 'Semantic HTML, headings and alt text'],
  aeo: ['Structured data: Organization, Service, FAQ, Breadcrumbs', 'Question-led content with clear, direct answers', 'llms.txt so AI tools can read your key pages', 'Consistent business details across your site', 'Content structured for AI Overviews, ChatGPT and Perplexity'],
  note: 'This site uses the same setup.',
};
