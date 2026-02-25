import type { GitHubRepo } from '@/lib/github';

interface GitHubStatsProps {
  repo: GitHubRepo;
  locale: string;
}

export function GitHubStats({ repo, locale }: GitHubStatsProps) {
  const date = new Date(repo.updatedAt);
  const updated = isNaN(date.getTime())
    ? null
    : date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
      {repo.language && (
        <div className="flex items-center gap-2 text-sm text-foreground">
          <span className="w-3 h-3 rounded-full bg-accent shrink-0" />
          <span className="font-medium">{repo.language}</span>
        </div>
      )}

      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.map((topic) => (
            <span
              key={topic}
              className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {updated && <p className="text-xs text-muted">Updated {updated}</p>}
    </div>
  );
}
