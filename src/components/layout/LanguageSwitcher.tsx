'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';

const LOCALES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
] as const;

type Locale = 'en' | 'ru' | 'es';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  function switchLocale(code: Locale) {
    router.replace(pathname, { locale: code });
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-foreground hover:bg-surface transition-colors text-sm"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <Icon name="chevron-down" className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 bg-background border border-border rounded-lg shadow-lg min-w-[140px] py-1 overflow-hidden">
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                onClick={() => switchLocale(loc.code)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface transition-colors ${
                  loc.code === locale ? 'text-accent font-medium' : 'text-foreground'
                }`}
              >
                <span>{loc.flag}</span>
                <span>{loc.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
