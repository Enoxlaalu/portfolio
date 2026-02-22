'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" aria-hidden="true" />;
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
