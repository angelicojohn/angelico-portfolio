// Selected Work — edit these entries. Images go in /public/images/work/.
// Describe what YOU were responsible for, not the client's business.
export interface WorkItem {
  title: string;
  url?: string;
  image?: string;       // FULL-PAGE screenshot, e.g. '/images/work/project-01.webp' (1440px wide, any height)
  role: string;
  contribution: string[];
  description: string;
}

const defaultContribution = [
  'Figma → Webflow',
  'Responsive Development',
  'CMS',
  'Interactions',
  'Custom Code',
  'QA',
];

export const work: WorkItem[] = [
  {
    title: 'Project Name 01',
    role: 'Webflow Development',
    contribution: defaultContribution,
    description: 'TODO: 1–2 sentences on what you were responsible for on this build.',
  },
  {
    title: 'Project Name 02',
    role: 'Webflow Development',
    contribution: defaultContribution,
    description: 'TODO: 1–2 sentences on what you were responsible for on this build.',
  },
  {
    title: 'Project Name 03',
    role: 'Webflow Development',
    contribution: defaultContribution,
    description: 'TODO: 1–2 sentences on what you were responsible for on this build.',
  },
  {
    title: 'Project Name 04',
    role: 'Webflow Development',
    contribution: defaultContribution,
    description: 'TODO: 1–2 sentences on what you were responsible for on this build.',
  },
];
