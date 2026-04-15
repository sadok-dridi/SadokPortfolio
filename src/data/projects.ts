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
    slug: 'radarx',
    title: 'radarX',
    subtitle: 'Hybrid-Cloud AI Intelligence Platform',
    description: 'A hybrid-cloud opportunity routing system using Next.js and PostgreSQL, with self-hosted AI inference via Ollama and automated n8n workflows.',
    longDescription: 'radarX is a hybrid-cloud intelligence platform that revolutionizes how sales teams handle incoming opportunities. It uses self-hosted AI models via Ollama for on-premise inference, automated data ingestion through n8n workflows, and a secure Next.js dashboard with JWT authentication and RBAC — all containerized with Docker and deployed on a VPS with Nginx.',
    category: 'Full Stack',
    year: '2024',
    role: 'Full Stack Engineer',
    technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'n8n', 'Ollama', 'Docker', 'SSH Tunneling'],
    thumbnail: '/projects/radarx/landingPage.png',
    images: [
      '/projects/radarx/landingPage.png',
      '/projects/radarx/1.png',
      '/projects/radarx/2.png',
      '/projects/radarx/3.png',
      '/projects/radarx/4.png',
    ],
    githubUrl: 'https://github.com/sadok-dridi/radarx',
    featured: true,
    color: '#8b5cf6',
    challenges: [
      'Running AI inference on a low-budget VPS with limited GPU resources',
      'Automating data ingestion from multiple sources reliably',
      'Securing internal dashboards with robust authentication and RBAC',
    ],
    solutions: [
      'Reduced AI API costs by ~90% using reverse SSH tunnels to offload LLM processing to a local machine running Ollama',
      'Built automated n8n workflows for real-time data ingestion and processing',
      'Implemented stateless JWT auth (jose, bcryptjs) with Role-Based Access Control',
    ],
    results: [
      '~90% reduction in AI API costs',
      'Fully automated data pipeline with zero manual intervention',
      'Production-ready deployment with Docker + Nginx SSL termination',
    ],
  },
  {
    id: '2',
    slug: 'finhub-tn',
    title: 'FinHub-TN',
    subtitle: 'Secure Escrow & Trading Engine',
    description: 'A fintech escrow platform with hash-chained ledger security, automated wallet management, and real-time Telegram alerts.',
    longDescription: 'FinHub-TN is a secure fintech escrow platform that separates core ledger logic (Symfony REST APIs) from the client terminal (JavaFX). It features hash-chained ledger integrity verification, automated wallet management, and real-time transaction alerts via self-hosted n8n and a custom Telegram bot — simulating enterprise banking architectures.',
    category: 'Fintech',
    year: '2024',
    role: 'Full Stack Developer',
    technologies: ['JavaFX', 'Symfony', 'Webhooks', 'Telegram API', 'n8n', 'Ledger Security'],
    thumbnail: '/projects/finhub-tn/landingPage.png',
    images: [
      '/projects/finhub-tn/landingPage.png',
      '/projects/finhub-tn/1.png',
      '/projects/finhub-tn/2.png',
      '/projects/finhub-tn/3.png',
      '/projects/finhub-tn/4.png',
    ],
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
