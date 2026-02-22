'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { TechTag } from '@/components/projects/TechTag';
import { Dropdown } from '@/components/ui/Dropdown';
import { projects } from '@/lib/projects';

export function ProjectsDropdown() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <Dropdown
      open={open}
      onClose={handleClose}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={handleClose}
      trigger={
        <button
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="true"
          aria-expanded={open}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-foreground hover:bg-surface transition-colors text-sm font-medium"
        >
          {t('projects')}
          <Icon name="chevron-down" className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      }
    >
      <div className="bg-background border border-border rounded-xl shadow-xl w-80 py-2 overflow-hidden">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="flex flex-col gap-2 px-4 py-3 hover:bg-surface transition-colors"
            onClick={() => setOpen(false)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{project.name}</span>
              <Icon name="arrow-right" className="w-3.5 h-3.5 text-muted" />
            </div>
            <p className="text-xs text-muted line-clamp-1">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag) => (
                <TechTag key={tag.label} tag={tag} />
              ))}
            </div>
          </Link>
        ))}
        <div className="border-t border-border mt-1 pt-1">
          <Link
            href="/projects"
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-accent hover:bg-surface transition-colors"
            onClick={() => setOpen(false)}
            aria-label={t('viewAllProjects')}
          >
            {t('viewAllProjects')}
          </Link>
        </div>
      </div>
    </Dropdown>
  );
}
