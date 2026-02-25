export interface GitHubRepo {
  language: string | null;
  topics: string[];
  updatedAt: string;
}

export type GitHubLanguages = Record<string, number>;

const BASE = 'https://api.github.com';

interface GitHubRepoResponse {
  language: string | null;
  topics: string[];
  updated_at: string;
}

function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchRepo(repo: string): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(`${BASE}/repos/${repo}`, {
      headers: headers(),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data: GitHubRepoResponse = await res.json();
    return {
      language: data.language ?? null,
      topics: data.topics ?? [],
      updatedAt: data.updated_at ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export async function fetchReadmeHtml(repo: string): Promise<string | null> {
  try {
    const res = await fetch(`${BASE}/repos/${repo}/readme`, {
      headers: {
        ...headers(),
        // GitHub returns the README pre-rendered as safe HTML — no client sanitization needed
        // as long as githubRepo values are hardcoded in projects.ts and never user-supplied
        Accept: 'application/vnd.github.html+json',
      },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return res.text();
  } catch {
    return null;
  }
}

export async function fetchLanguages(repo: string): Promise<GitHubLanguages | null> {
  try {
    const res = await fetch(`${BASE}/repos/${repo}/languages`, {
      headers: headers(),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
