import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

const SKILLS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS',
  'Node.js', 'PostgreSQL', 'Docker', 'GraphQL', 'REST APIs',
  'Git', 'CI/CD', 'Figma', 'Testing', 'Performance',
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-10">{t('title')}</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Bio */}
          <div>
            {/* Avatar placeholder */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-purple-500 mb-6 flex items-center justify-center text-4xl">
              👨‍💻
            </div>
            <p className="text-foreground text-base leading-relaxed mb-6">{t('bio')}</p>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: t('yearsExp'), icon: '🚀' },
                { label: t('projectsDone'), icon: '✅' },
                { label: t('happyClients'), icon: '😊' },
              ].map(({ label, icon }) => (
                <div key={label} className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-border">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-foreground font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Skills */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">{t('skills')}</h2>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-surface border border-border rounded-full text-sm text-foreground font-medium hover:border-accent transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
