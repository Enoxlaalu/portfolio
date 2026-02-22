const GRADIENT_MAP = {
  red: 'from-red-600 to-red-900',
  indigo: 'from-indigo-600 to-purple-800',
  yellow: 'from-yellow-500 to-orange-600',
  sky: 'from-sky-400 to-blue-600',
} as const;

const COLOR_MAP = {
  'blue-500': 'bg-blue-500',
  'blue-600': 'bg-blue-600',
  'blue-700': 'bg-blue-700',
  'blue-800': 'bg-blue-800',
  'green-600': 'bg-green-600',
  'green-700': 'bg-green-700',
  'cyan-600': 'bg-cyan-600',
  'gray-600': 'bg-gray-600',
  'gray-800': 'bg-gray-800',
  'teal-600': 'bg-teal-600',
  'zinc-700': 'bg-zinc-700',
  'yellow-600': 'bg-yellow-600',
  'red-600': 'bg-red-600',
  'purple-600': 'bg-purple-600',
} as const;

export type GradientKey = keyof typeof GRADIENT_MAP;
export type ColorKey = keyof typeof COLOR_MAP;

export function getGradientClass(key: GradientKey): string {
  return GRADIENT_MAP[key];
}

export function getColorClass(key: ColorKey): string {
  return COLOR_MAP[key];
}

export interface TechTag {
  label: string;
  color: ColorKey;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  gradient: GradientKey;
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
    gradient: 'red',
    tags: [
      { label: 'React', color: 'blue-500' },
      { label: 'TypeScript', color: 'blue-700' },
      { label: 'OpenAI API', color: 'green-600' },
      { label: 'Tailwind CSS', color: 'cyan-600' },
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
    gradient: 'indigo',
    tags: [
      { label: 'Next.js', color: 'gray-800' },
      { label: 'Prisma', color: 'teal-600' },
      { label: 'PostgreSQL', color: 'blue-800' },
      { label: 'shadcn/ui', color: 'zinc-700' },
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
    gradient: 'yellow',
    tags: [
      { label: 'Socket.io', color: 'yellow-600' },
      { label: 'Redis', color: 'red-600' },
      { label: 'Docker', color: 'blue-600' },
      { label: 'Express', color: 'gray-600' },
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
    gradient: 'sky',
    tags: [
      { label: 'React', color: 'blue-500' },
      { label: 'TypeScript', color: 'blue-700' },
      { label: 'REST API', color: 'green-700' },
      { label: 'Recharts', color: 'purple-600' },
    ],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
