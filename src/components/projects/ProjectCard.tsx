import type { Project } from '@/lib/projects';
import { Link } from '@/i18n/navigation';
import { TechTag } from './TechTag';
import { Icon } from '@/components/ui/Icon';
import { useTranslations } from 'next-intl';

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations('projects');

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-surface shadow-sm hover:shadow-md transition-shadow">
      {/* Gradient header */}
      <div className={`h-40 bg-gradient-to-br ${project.gradient}`} />

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2">{project.name}</h3>
        <p className="text-muted text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <TechTag key={tag.label} tag={tag} />
          ))}
        </div>

        {/* Link */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:underline"
        >
          {t('viewProject')}
          <Icon name="arrow-right" className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
