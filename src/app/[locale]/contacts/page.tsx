import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Icon } from '@/components/ui/Icon';

const CONTACTS = [
  {
    key: 'email' as const,
    icon: 'mail' as const,
    href: 'mailto:enoxlaalu@gmail.com',
    value: 'enoxlaalu@gmail.com',
    color: 'from-blue-500 to-blue-600',
  },
  {
    key: 'github' as const,
    icon: 'github' as const,
    href: 'https://github.com/enoxlaalu',
    value: 'github.com/enoxlaalu',
    color: 'from-gray-700 to-gray-900',
  },
  {
    key: 'linkedin' as const,
    icon: 'linkedin' as const,
    href: 'https://www.linkedin.com/in/aleksandr-cherkasov-76ab69a6/',
    value: 'linkedin.com/in/aleksandr-cherkasov-76ab69a6',
    color: 'from-blue-600 to-blue-800',
  },
  {
    key: 'telegram' as const,
    icon: 'send' as const,
    href: 'https://t.me/cherkasovalexander',
    value: '@cherkasovalexander',
    color: 'from-sky-500 to-sky-600',
  },
];

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contacts');

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          {t('title')}
        </h1>
        <p className="text-muted mb-12 text-lg">{t('subtitle')}</p>

        <div className="grid gap-4">
          {CONTACTS.map(({ key, icon, href, value, color }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-surface border border-border rounded-xl hover:border-accent transition-colors group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}
              >
                <Icon name={icon} className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted capitalize">{t(key)}</p>
                <p className="text-foreground font-medium group-hover:text-accent transition-colors">
                  {value}
                </p>
              </div>
              <Icon
                name="arrow-right"
                className="w-5 h-5 text-muted ml-auto group-hover:text-accent transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
