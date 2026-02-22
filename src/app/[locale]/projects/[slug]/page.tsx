import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { projects, getProjectBySlug } from '@/lib/projects';
import { routing } from '@/i18n/routing';
import { TechTag } from '@/components/projects/TechTag';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations('projects');

  return (
    <div className="min-h-screen">
      {/* Gradient hero */}
      <div className={`h-72 md:h-96 bg-gradient-to-br ${project.gradient} flex items-end`}>
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors"
          >
            <Icon name="arrow-left" className="w-4 h-4" />
            {t('backToProjects')}
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">{project.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl">
          <p className="text-lg text-foreground mb-8">{project.longDescription}</p>

          {/* Tech stack */}
          <h2 className="text-xl font-semibold text-foreground mb-4">{t('techStack')}</h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <TechTag key={tag.label} tag={tag} />
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg font-medium hover:opacity-80 transition-opacity"
              >
                <Icon name="github" className="w-5 h-5" />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg font-medium hover:opacity-80 transition-opacity"
              >
                <Icon name="external-link" className="w-5 h-5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
