export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  category: string;
  year: string;
  role: string;
  technologies: string[];
  thumbnail: string;
  images: string[];
  video?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  color: string;
  challenges?: string[];
  solutions?: string[];
  results?: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'paragon',
    title: 'Paragon',
    subtitle: 'Automated Opportunity Scraper & Market Analytics',
    description: 'An intelligent scraper + analyzer that finds opportunities matching your profile and tells you what the market needs, so you can invest your time in the right skills.',
    longDescription: 'Paragon is a personal intelligence engine that continuously monitors the internet for opportunities — job postings, freelance gigs, and paid tasks. Custom Python scrapers run in Docker containers alongside automated n8n workflows for flexible multi-source ingestion. Raw listings get filtered and ranked by self-hosted AI against your profile, surfacing only the ones worth your time. Beyond matching, it aggregates everything into market analytics: trending technologies, in-demand skills, and gaps in the market — so you decide what to learn next with data, not guesswork.',
    category: 'Full Stack',
    year: '2026',
    role: 'AI & Automation Developer',
    technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'n8n', 'Ollama', 'Docker', 'Python', 'SSH Tunneling'],
    thumbnail: '/projects/paragon/paragon.png',
    images: [
      '/projects/radarx/1.png',
      '/projects/radarx/2.png',
      '/projects/radarx/3.png',
      '/projects/radarx/4.png',
    ],
    githubUrl: 'https://github.com/sadok-dridi/radarx',
    liveUrl: 'https://radarx.mooo.com/',
    featured: true,
    color: '#06b6d4',
    challenges: [
      'Running real-time AI filtering on a low-budget VPS with no dedicated GPU',
      'Normalizing messy, unstructured listings from dozens of different sources',
      'Keeping the opportunity feed fresh without burning through API credits',
    ],
    solutions: [
      'Offloaded LLM inference to a local machine via reverse SSH tunnel, cutting cloud AI costs by 100%',
      'Built automated n8n pipelines with deduplication and enrichment for clean, consistent data',
      'Implemented stateless JWT auth (jose, bcryptjs) with RBAC for secure dashboard access',
    ],
    results: [
      '100% reduction in AI inference costs through hybrid-cloud tunneling',
      'Fully automated pipeline processing hundreds of listings daily with zero manual work',
      'Production-grade Docker deployment with Nginx SSL termination',
    ],
  },
  {
    id: '2',
    slug: 'finhub-tn',
    title: 'FinHub-TN',
    subtitle: 'Secure Escrow & Trading Engine',
    description: 'A fintech escrow platform with hash-chained ledger security, automated wallet management, and real-time Telegram alerts.',
    longDescription: 'FinHub-TN is a secure fintech escrow platform that separates core ledger logic (Symfony REST APIs) from the client terminal (JavaFX). It features hash-chained ledger integrity verification, automated wallet management, and real-time transaction alerts via self-hosted n8n and a custom Telegram bot — designed with enterprise banking architecture patterns.',
    category: 'Fintech',
    year: '2026',
    role: 'AI & Automation Developer',
    technologies: ['JavaFX', 'Symfony', 'Webhooks', 'Telegram API', 'n8n', 'Ledger Security'],
    thumbnail: '/projects/finhub-tn/landingPage.png',
    images: [
      '/projects/finhub-tn/landingPage.png',
      '/projects/finhub-tn/1.png',
      '/projects/finhub-tn/2.png',
      '/projects/finhub-tn/3.png',
      '/projects/finhub-tn/4.png',
    ],
    liveUrl: 'https://www.finhub.tn/',
    featured: true,
    color: '#10b981',
    challenges: [
      'Meeting strict financial security requirements for escrow transactions',
      'Preventing financial discrepancies in concurrent peer-to-peer transactions',
      'Building real-time alerting across multiple communication channels',
    ],
    solutions: [
      'Implemented hash-chained ledger integrity verification mimicking enterprise banking systems',
      'Designed atomic state changes to prevent concurrent transaction conflicts',
      'Integrated self-hosted n8n with custom Telegram bot for real-time transaction alerts',
    ],
    results: [
      'Zero financial discrepancies across all test transactions',
      'Real-time alerts delivered under 2 seconds via Telegram',
      'Full audit trail with hash-chained ledger verification',
    ],
  },
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);

export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);

export const getAllProjectSlugs = () => projects.map(p => p.slug);
