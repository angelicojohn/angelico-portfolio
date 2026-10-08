// Pricing, monthly options, care plans and the "where the return comes from" section.
// DRAFT copy by Claude from AJ's pricing brief + the subscription advice AJ chose to test ("Both").
// All prices are STARTING prices in USD, not quotes. No guaranteed rankings, leads or revenue.

export interface Package {
  id: string;           // value preselected in the contact form
  name: string;
  badge?: string;
  price: string;
  priceNote: string;
  bestFor: string;
  listLabel: string;
  items: string[];
  timeline: string;
  cta: string;
  featured?: boolean;
}

export const pricing = {
  title: 'Websites built for your business, not just your budget.',
  intro: 'From a professional online presence to a complete digital growth system, choose the option that fits your business. Every website is custom-designed, responsive, secure by design and built with performance in mind.',
  note: 'Prices in USD. These are starting prices, not fixed quotes: final pricing depends on requirements, integrations, complexity and scope. You get a clear written proposal before any work begins.',
  packages: [
    {
      id: 'Custom Website',
      name: 'Custom Website',
      price: '$1,500',
      priceNote: 'One-time project, starting at',
      bestFor: 'Small businesses that need a professional, modern website.',
      listLabel: 'Includes',
      items: ['Custom website design', '1-3 pages', 'Responsive, mobile-first development', 'Performance optimisation', 'Technical SEO foundations', 'Contact form', 'Basic analytics setup', 'Basic integrations', '1 revision round', 'Launch assistance'],
      timeline: '1-2 weeks after requirements and assets are confirmed.',
      cta: 'Let’s Build Your Website',
    },
    {
      id: 'Growth Website',
      name: 'Growth Website',
      badge: 'Most popular',
      price: '$3,000',
      priceNote: 'One-time project, starting at',
      bestFor: 'Established businesses that want a website designed to attract visitors and convert enquiries.',
      listLabel: 'Includes',
      items: ['Custom website design', 'Up to 5 pages', 'Conversion-focused page structure', 'Responsive, mobile-first development', 'Performance optimisation', 'Technical SEO and AEO foundations', 'Lead capture and qualification forms', 'Analytics and conversion tracking', 'One defined third-party integration', '2 revision rounds', 'Launch assistance'],
      timeline: '2-4 weeks, depending on complexity and content readiness.',
      cta: 'Let’s Grow Your Business',
      featured: true,
    },
    {
      id: 'Custom Digital Solutions',
      name: 'Custom Digital Solutions',
      price: '$5,000',
      priceNote: 'Custom quotation, starting at',
      bestFor: 'Businesses that need advanced functionality, integrations or workflow improvements.',
      listLabel: 'Possible solutions',
      items: ['Custom websites', 'Web applications', 'CRM integrations', 'Customer portals', 'Advanced booking systems', 'Business process automation', 'Automated lead management', 'API integrations', 'Custom dashboards'],
      timeline: 'Scope, timeline and revisions are agreed during discovery.',
      cta: 'Discuss Your Project',
    },
  ] as Package[],
  monthly: {
    title: 'Prefer to pay monthly?',
    intro: 'Spread the investment with a 12-month website subscription: your custom website plus ongoing care, with a one-time setup fee.',
    plans: [
      { id: 'Essential Subscription', name: 'Essential Subscription', price: '$199', setup: '$499 setup', items: ['Custom website, up to 3 pages', 'SEO foundations and contact form', 'Hosting arranged for you', 'Minor monthly updates'] },
      { id: 'Growth Subscription', name: 'Growth Subscription', price: '$399', setup: '$999 setup', items: ['Custom website, up to 5 pages', 'Conversion-focused structure and lead capture', 'Analytics plus one simple automation', 'A defined monthly improvement allowance'] },
    ],
    note: 'A 12-month contracted subscription, not cancel-anytime. Ownership, handover and what happens after the term are set out clearly in your agreement.',
    cta: 'Ask About Monthly Plans',
  },
};

export const care = {
  title: 'Your website should keep working after launch.',
  intro: 'Launching your website is just the beginning. Keep it maintained, improve its performance and make it more useful to your business with optional monthly support.',
  plans: [
    { id: 'Website Care', name: 'Website Care', price: '$99', items: ['Website health monitoring', 'Basic technical maintenance', 'Minor content updates within agreed limits', 'Broken-link checks', 'Basic performance monitoring', 'Technical support within agreed scope'], cta: 'Get Website Care' },
    { id: 'Website Growth', name: 'Website Growth', badge: 'Recommended', price: '$299', lead: 'Everything in Website Care, plus:', items: ['Monthly analytics review', 'Conversion improvement recommendations', 'Performance optimisation checks', 'Limited landing page and content improvements', 'SEO technical monitoring', 'Monthly performance summary', 'Priority support within agreed scope'], cta: 'Keep Growing', featured: true },
    { id: 'Growth & Automation', name: 'Growth & Automation', price: '$599', lead: 'Everything in Website Growth, plus:', items: ['Automation workflow monitoring', 'CRM and lead-capture integration maintenance', 'Automated follow-up workflow support', 'Workflow improvements within agreed limits', 'Integration troubleshooting', 'Monthly optimisation review'], cta: 'Automate Your Growth' },
  ],
  note: 'Optional, and separate from any website subscription or project payment. Each plan’s deliverables and limits are set out in your proposal. Third-party subscriptions, API usage, paid advertising and major new development aren’t included, and no plan guarantees rankings, leads or sales.',
};

export const roi = {
  title: 'Where the return comes from.',
  intro: 'A website is an investment. This is how the approach is designed to pay you back, without promising numbers nobody can guarantee.',
  items: [
    { title: 'A lower build cost', text: 'AI-assisted production cuts repetitive hours, so more of your budget goes into design, features and testing.', href: '#cost', link: 'How the cost comes down' },
    { title: 'Lower running costs', text: 'Astro sites don’t need a per-site builder plan, and the code is yours to host where it costs least.', href: '#compare', link: 'Compare platforms' },
    { title: 'More visitors who get in touch', text: 'Fast pages, search and AI visibility foundations and clear paths to contact are built to help more visitors become enquiries.', href: '#seo', link: 'SEO and AEO setup' },
    { title: 'Time back for your team', text: 'Your team updates content in Sanity, and automations route leads and notifications, so less time goes on admin.', href: '#web-apps', link: 'Features and automations' },
    { title: 'No forced rebuilds', text: 'You own the code and content, so a platform changing its plans or prices never forces you to start again.', href: '#sanity', link: 'Astro + Sanity' },
  ],
  note: 'Results depend on your market, content and marketing. Analytics and conversion tracking are set up from day one, so you can see what your website is doing for you.',
};

// Options for the contact form's "Interested in" field (values match the ids above)
export const interestOptions = [
  ...pricing.packages.map((p) => p.id),
  ...pricing.monthly.plans.map((p) => p.id),
  ...care.plans.map((p) => p.id),
  'Improve my existing website',
  'Not sure yet',
];
