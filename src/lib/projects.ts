export interface TechTag {
  label: string;
  color: string;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  gradient: string;
  tags: TechTag[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    slug: 'netflix-chatgpt',
    name: 'Netflix-ChatGPT',
    description: 'AI-powered movie recommendation platform combining Netflix UX with OpenAI API suggestions.',
    longDescription:
      'A full-featured streaming discovery app that leverages OpenAI API to provide personalized movie and show recommendations. Built with React and TypeScript, it features a Netflix-inspired UI, real-time search, and an AI chat interface for natural language queries.',
    gradient: 'from-red-600 to-red-900',
    tags: [
      { label: 'React', color: 'bg-blue-500' },
      { label: 'TypeScript', color: 'bg-blue-700' },
      { label: 'OpenAI API', color: 'bg-green-600' },
      { label: 'Tailwind CSS', color: 'bg-cyan-600' },
    ],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    slug: 'ecommerce-dashboard',
    name: 'E-Commerce Dashboard',
    description: 'Full-stack admin dashboard with real-time analytics, inventory management, and order tracking.',
    longDescription:
      'A comprehensive e-commerce management system built with Next.js and Prisma. Features include real-time sales analytics with charts, inventory CRUD operations, order processing pipeline, and a responsive design using shadcn/ui components.',
    gradient: 'from-indigo-600 to-purple-800',
    tags: [
      { label: 'Next.js', color: 'bg-gray-800' },
      { label: 'Prisma', color: 'bg-teal-600' },
      { label: 'PostgreSQL', color: 'bg-blue-800' },
      { label: 'shadcn/ui', color: 'bg-zinc-700' },
    ],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    slug: 'realtime-chat',
    name: 'Real-time Chat',
    description: 'Scalable chat application with rooms, presence indicators, and message persistence.',
    longDescription:
      'A production-grade real-time chat application powered by Socket.io and Redis pub/sub for horizontal scaling. Features include multiple chat rooms, online presence indicators, message history with infinite scroll, file sharing, and Docker deployment.',
    gradient: 'from-yellow-500 to-orange-600',
    tags: [
      { label: 'Socket.io', color: 'bg-yellow-600' },
      { label: 'Redis', color: 'bg-red-600' },
      { label: 'Docker', color: 'bg-blue-600' },
      { label: 'Express', color: 'bg-gray-600' },
    ],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    slug: 'weather-app',
    name: 'Weather App',
    description: 'Beautiful weather dashboard with 7-day forecasts, interactive charts, and location search.',
    longDescription:
      'A feature-rich weather application built with React and TypeScript, consuming a REST weather API. Displays current conditions, hourly and 7-day forecasts, historical data charts with Recharts, geolocation support, and favorite locations management.',
    gradient: 'from-sky-400 to-blue-600',
    tags: [
      { label: 'React', color: 'bg-blue-500' },
      { label: 'TypeScript', color: 'bg-blue-700' },
      { label: 'REST API', color: 'bg-green-700' },
      { label: 'Recharts', color: 'bg-purple-600' },
    ],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
