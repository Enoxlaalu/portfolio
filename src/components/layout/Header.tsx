import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ProjectsDropdown } from './ProjectsDropdown';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const t = useTranslations('nav');

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-foreground hover:text-accent transition-colors">
          &lt;Dev /&gt;
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-2 rounded-lg text-foreground hover:bg-surface transition-colors text-sm font-medium"
          >
            {t('home')}
          </Link>
          <ProjectsDropdown />
          <Link
            href="/about"
            className="px-3 py-2 rounded-lg text-foreground hover:bg-surface transition-colors text-sm font-medium"
          >
            {t('about')}
          </Link>
          <Link
            href="/contacts"
            className="px-3 py-2 rounded-lg text-foreground hover:bg-surface transition-colors text-sm font-medium"
          >
            {t('contacts')}
          </Link>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
