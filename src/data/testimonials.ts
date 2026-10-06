// Testimonials, shortened from AJ's LinkedIn recommendations and Jamie Windell's letter.
// Quotes keep the authors' own words; only trimmed for length (no rewording beyond punctuation).
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  relation: string;
  /** public/images/testimonials/<photo>.(webp|jpg|png); initials show until the file exists */
  photo: string;
}

export const featuredTestimonial: Testimonial = {
  quote: 'One of AJ’s biggest strengths is his ability to work quickly without sacrificing quality. He sees a problem, figures it out, and gets it done.',
  name: 'Jamie Windell',
  photo: 'jamie-windell',
  role: 'Founder & Creative Director, KHULA® Studio',
  relation: 'Worked together for 3 to 4 years',
};

export const testimonials: Testimonial[] = [
  {
    quote: 'AJ built our non-profit website on short notice and within budget. He was fast, easy to work with, and really captured what we were going for.',
    name: 'Carmen Villamor',
    photo: 'carmen-villamor',
    role: 'CEO, Greendoor',
    relation: 'Client',
  },
  {
    quote: 'A reliable and highly capable Webflow and Framer developer with a strong eye for detail. Dependable, proactive in solving issues, and committed to quality work.',
    name: 'Vanessa Granetin',
    photo: 'vanessa-granetin',
    role: 'Digital Project Coordinator',
    relation: 'Managed AJ directly',
  },
  {
    quote: 'His communication skills, organisation and respect for timelines are unsurpassed in his field. I trust AJ.',
    name: 'John Mac',
    photo: 'john-mac',
    role: 'Founder, Exit Evidence & OPENBATT',
    relation: 'Worked on the same team',
  },
  {
    quote: 'Very skilful and precise with his use of Figma. Very fast, punctual and understands his tasks very well.',
    name: 'George Dimitriou',
    photo: 'george-dimitriou',
    role: 'SaaS, E-Commerce & Product Management',
    relation: 'Client',
  },
  {
    quote: 'An exceptionally dedicated professional. His ability to comprehend instructions and execute them is truly impressive.',
    name: 'Jehcy Adorna',
    photo: 'jehcy-adorna',
    role: 'Former Technical Project Manager',
    relation: 'Managed AJ directly',
  },
  {
    quote: 'Angelico has been so great to work with. He didn’t fail to amaze me with his work and work ethic.',
    name: 'Lyle Tanciano',
    photo: 'lyle-tanciano',
    role: 'Websites for Montessori schools',
    relation: 'Worked on the same team',
  },
];
