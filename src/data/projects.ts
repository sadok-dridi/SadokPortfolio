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
    slug: 'infrasight',
    title: 'InfraSight',
    subtitle: 'AI-Powered Infrastructure Dashboard',
    description: 'Real-time monitoring and AI-driven insights for modern infrastructure management.',
    longDescription: 'InfraSight is a comprehensive infrastructure monitoring solution that leverages AI to provide predictive analytics, automated alerting, and intelligent resource optimization. Built for teams managing complex cloud-native environments.',
    category: 'Infrastructure',
    year: '2024',
    role: 'Full Stack Developer',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Ollama', 'n8n'],
    thumbnail: '/projects/infrasight-thumb.jpg',
    images: [
      '/radarx-1.png',
      '/radarx-2.png',
      '/radarx-3.png',
    ],
    video: '/projects/infrasight-demo.mp4',
    liveUrl: 'https://infrasight.demo',
    githubUrl: 'https://github.com/sadok/infrasight',
    featured: true,
    color: '#06b6d4',
    challenges: [
      'Managing real-time data streams from multiple infrastructure sources',
      'Implementing AI-powered anomaly detection with low latency',
      'Creating an intuitive dashboard for complex metrics visualization',
    ],
    solutions: [
      'Built a custom WebSocket-based data pipeline for real-time updates',
      'Integrated Ollama for on-premise AI inference with optimized models',
      'Designed a modular component system for flexible dashboard layouts',
    ],
    results: [
      '60% reduction in mean time to detect incidents',
      '40% improvement in resource utilization',
      'Deployed across 3 enterprise clients',
    ],
  },
  {
    id: '2',
    slug: 'radarx',
    title: 'radarX',
    subtitle: 'Hybrid-Cloud Opportunity Router',
    description: 'Intelligent lead routing system with real-time scoring and automated workflows.',
    longDescription: 'radarX revolutionizes how sales teams handle incoming opportunities by using machine learning to score, route, and prioritize leads in real-time across hybrid cloud infrastructure.',
    category: 'Backend',
    year: '2024',
    role: 'Backend Engineer',
    technologies: ['Python', 'FastAPI', 'Redis', 'Kubernetes', 'TensorFlow'],
    thumbnail: '/projects/radarx-thumb.jpg',
    images: [
      '/radarx-1.png',
      '/radarx-2.png',
      '/radarx-3.png',
      '/radarx-4.png',
      '/radarx-5.png',
    ],
    githubUrl: 'https://github.com/sadok/radarx',
    featured: true,
    color: '#8b5cf6',
    challenges: [
      'Processing thousands of leads per minute with sub-second routing',
      'Training ML models on sensitive customer data securely',
      'Ensuring high availability across multiple cloud providers',
    ],
    solutions: [
      'Implemented event-driven architecture with Redis Streams',
      'Built federated learning pipeline for privacy-preserving ML',
      'Designed multi-region Kubernetes deployment with automatic failover',
    ],
    results: [
      '3x faster lead response time',
      '25% increase in conversion rates',
      '99.9% uptime SLA achieved',
    ],
  },
  {
    id: '3',
    slug: 'finhub-tn',
    title: 'FinHub-TN',
    subtitle: 'Secure Escrow Platform',
    description: 'Digital escrow service for secure financial transactions in Tunisia.',
    longDescription: 'FinHub-TN provides a trusted escrow platform for peer-to-peer and business transactions, featuring bank-grade security, automated compliance, and seamless integration with local payment systems.',
    category: 'Fintech',
    year: '2023',
    role: 'Full Stack Developer',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    thumbnail: '/projects/finhub-thumb.jpg',
    images: [
      '/radarx-1.png',
      '/radarx-2.png',
    ],
    liveUrl: 'https://finhub.tn',
    featured: true,
    color: '#10b981',
    challenges: [
      'Meeting strict financial regulatory requirements',
      'Building trust in a market unfamiliar with digital escrow',
      'Integrating with legacy banking infrastructure',
    ],
    solutions: [
      'Implemented comprehensive audit logging and compliance checks',
      'Created educational onboarding flow with transparent fee structure',
      'Built custom banking API adapters for local institutions',
    ],
    results: [
      '€2M+ in transactions processed securely',
      '4.8/5 average user trust rating',
      'Zero security incidents since launch',
    ],
  },
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);

export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);

export const getAllProjectSlugs = () => projects.map(p => p.slug);
