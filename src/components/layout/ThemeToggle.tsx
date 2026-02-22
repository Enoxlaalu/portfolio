'use client';

import { useTheme } from 'next-themes';
import { Icon } from '@/components/ui/Icon';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg text-foreground hover:bg-surface transition-colors"
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <Icon name="sun" className="w-5 h-5" />
      ) : (
        <Icon name="moon" className="w-5 h-5" />
      )}
    </button>
  );
}
