import type { GitHubLanguages } from '@/lib/github';

const FRONTEND_LANGS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Less: '#1d365d',
  HTML: '#e34c26',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Astro: '#ff5a03',
  MDX: '#1b1f24',
};

interface LanguagesBarProps {
  languages: GitHubLanguages;
}

export function LanguagesBar({ languages }: LanguagesBarProps) {
  const frontend = Object.entries(languages).filter(([lang]) => lang in FRONTEND_LANGS);
  const filteredTotal = frontend.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (filteredTotal === 0) return null;

  const withPct = frontend
    .map(([lang, bytes]) => ({
      lang,
      pct: (bytes / filteredTotal) * 100,
      color: FRONTEND_LANGS[lang],
    }))
    .filter((e) => e.pct >= 0.5)
    .sort((a, b) => b.pct - a.pct);

  // Re-normalize so bar fills 100% after slivers are filtered out
  const sum = withPct.reduce((acc, e) => acc + e.pct, 0);
  const entries = withPct.map((e) => ({ ...e, pct: (e.pct / sum) * 100 }));

  return (
    <div className="space-y-2">
      <div className="flex h-2 rounded-full overflow-hidden gap-px">
        {entries.map(({ lang, pct, color }) => (
          <div
            key={lang}
            title={`${lang} ${pct.toFixed(1)}%`}
            style={{ width: `${pct}%`, backgroundColor: color }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {entries.map(({ lang, pct, color }) => (
          <span key={lang} className="flex items-center gap-1 text-xs text-muted">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
            {lang}
            <span className="text-muted/60">{pct.toFixed(1)}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}
