const GRADIENT_MAP = {
    red: 'from-red-600 to-red-900',
    indigo: 'from-indigo-600 to-purple-800',
    yellow: 'from-yellow-500 to-orange-600',
    sky: 'from-sky-400 to-blue-600',
    green: 'from-green-500 to-emerald-700',
    orange: 'from-orange-400 to-amber-600',
    teal: 'from-teal-500 to-cyan-800',
    slate: 'from-slate-500 to-gray-800',
} as const

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
    'orange-500': 'bg-orange-500',
    'emerald-700': 'bg-emerald-700',
} as const

export type GradientKey = keyof typeof GRADIENT_MAP
export type ColorKey = keyof typeof COLOR_MAP

export function getGradientClass(key: GradientKey): string {
    return GRADIENT_MAP[key]
}

export function getColorClass(key: ColorKey): string {
    return COLOR_MAP[key]
}

export interface TechTag {
    label: string
    color: ColorKey
}

export interface Project {
    slug: string
    name: string
    description: string
    longDescription: string
    gradient: GradientKey
    tags: TechTag[]
    github?: string
    demo?: string
    githubRepo?: string
    embedUrl?: string
}

export const projects: Project[] = [
    {
        slug: 'netflix-chatgpt',
        name: 'Netflix-ChatGPT',
        description:
            'AI-powered movie recommendation platform combining Netflix UX with OpenAI API suggestions.',
        longDescription:
            'A full-featured streaming discovery app that leverages OpenAI API to provide personalized movie and show recommendations. Built with React and TypeScript, it features a Netflix-inspired UI, real-time search, and an AI chat interface for natural language queries.',
        gradient: 'red',
        tags: [
            { label: 'React', color: 'blue-500' },
            { label: 'TypeScript', color: 'blue-700' },
            { label: 'OpenAI API', color: 'green-600' },
            { label: 'Tailwind CSS', color: 'cyan-600' },
        ],
        github: 'https://github.com/enoxlaalu/netflix-chatGPT',
        githubRepo: 'enoxlaalu/netflix-chatGPT',
        embedUrl: 'https://fascinating-panda-cffe64.netlify.app/',
    },
    {
        slug: 'spotify-clone',
        name: 'Spotify Clone',
        description:
            'Full-stack music streaming platform with a Next.js frontend and NestJS + MongoDB backend.',
        longDescription:
            'A full-stack music streaming app with a Next.js + Redux Toolkit frontend and a NestJS + MongoDB backend. Features a polished Material-UI interface, server-side rendering, client-side state management, and a RESTful API with file upload support for track management. Client and server are deployed independently.',
        gradient: 'green',
        tags: [
            { label: 'Next.js', color: 'gray-800' },
            { label: 'NestJS', color: 'red-600' },
            { label: 'MongoDB', color: 'green-600' },
            { label: 'Redux Toolkit', color: 'purple-600' },
        ],
        github: 'https://github.com/enoxlaalu/spotify-nextjs-nestjs',
        githubRepo: 'enoxlaalu/spotify-nextjs-nestjs',
    },
    {
        slug: 'timberhub',
        name: 'Timberhub',
        description:
            'Wood products catalog with server-side search, pagination, and product management — test assignment.',
        longDescription:
            'A timber products catalog and inventory system built as a test assignment for Timberhub. Users can browse and search wood listings by species, dimensions, drying method, and grade. Implements server-side search with pagination, product creation and editing forms, and Suspense boundaries for optimised data loading. Built with Next.js 13 App Router and SCSS.',
        gradient: 'teal',
        tags: [
            { label: 'Next.js', color: 'gray-800' },
            { label: 'TypeScript', color: 'blue-700' },
            { label: 'SCSS', color: 'purple-600' },
            { label: 'App Router', color: 'gray-600' },
        ],
        github: 'https://github.com/enoxlaalu/timberhub',
        githubRepo: 'enoxlaalu/timberhub',
    },
    {
        slug: 'mozio',
        name: 'Mozio Travel',
        description:
            'Travel route search app with dynamic forms and URL state persistence — test assignment.',
        longDescription:
            'A travel route search application built as a test assignment for Mozio. Users specify origin and destination cities, passenger count, and travel date to find available transport options. Features dynamic multi-field forms with React Hook Form, URL query parameter state persistence, MUI date pickers, and end-to-end test coverage with Cypress.',
        gradient: 'orange',
        tags: [
            { label: 'React', color: 'blue-500' },
            { label: 'TypeScript', color: 'blue-700' },
            { label: 'MUI', color: 'blue-600' },
            { label: 'Cypress', color: 'emerald-700' },
        ],
        github: 'https://github.com/enoxlaalu/mozio',
        githubRepo: 'enoxlaalu/mozio',
        embedUrl: 'https://visionary-gingersnap-1fcbec.netlify.app',
    },
    {
        slug: 'react-chess',
        name: 'Chess (OOP)',
        description:
            'Fully functional chess game built from scratch with object-oriented architecture and no external game engines.',
        longDescription:
            'A fully functional chess game implemented entirely from scratch using object-oriented programming. Includes a complete class hierarchy — Cell, Board, Figure, Pawn, Knight, Bishop, Rook, Queen, King — with full move validation for every piece type. Features turn management, lost figures tracking, and a countdown timer. No external game engines used.',
        gradient: 'slate',
        tags: [
            { label: 'React', color: 'blue-500' },
            { label: 'TypeScript', color: 'blue-700' },
            { label: 'OOP', color: 'gray-600' },
            { label: 'Vite', color: 'yellow-600' },
        ],
        github: 'https://github.com/enoxlaalu/react-chess-oop',
        githubRepo: 'enoxlaalu/react-chess-oop',
    },
]

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug)
}
