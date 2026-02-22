'use client';

import { useState, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { Dropdown } from '@/components/ui/Dropdown';
import type { Locale } from '@/i18n/routing';

const LOCALES = [
  { code: 'en' as Locale, label: 'English', flag: '🇺🇸' },
  { code: 'ru' as Locale, label: 'Русский', flag: '🇷🇺' },
  { code: 'es' as Locale, label: 'Español', flag: '🇪🇸' },
];

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
  const handleClose = useCallback(() => setOpen(false), []);

  function switchLocale(code: Locale) {
    router.replace(pathname, { locale: code });
    setOpen(false);
  }

  return (
    <Dropdown
      open={open}
      onClose={handleClose}
      align="right"
      trigger={
        <button
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-foreground hover:bg-surface transition-colors text-sm"
        >
          <span>{current.flag}</span>
          <span className="hidden sm:inline">{current.label}</span>
          <Icon name="chevron-down" className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      }
    >
      <div
        role="listbox"
        aria-label="Select language"
        className="bg-background border border-border rounded-lg shadow-lg min-w-[140px] py-1 overflow-hidden"
      >
        {LOCALES.map((loc) => (
          <button
            key={loc.code}
            role="option"
            aria-selected={loc.code === locale}
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
    </Dropdown>
  );
}
