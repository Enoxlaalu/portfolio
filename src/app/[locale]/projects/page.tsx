import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { projects } from '@/lib/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('projects');

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-foreground mb-2">{t('title')}</h1>
      <p className="text-muted mb-10">{t('subtitle')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
