import type { TechTag as TechTagType } from '@/lib/projects';
import { getColorClass } from '@/lib/projects';

export function TechTag({ tag }: { tag: TechTagType }) {
  return (
    <span className={`${getColorClass(tag.color)} text-white px-2 py-1 text-xs rounded font-medium`}>
      {tag.label}
    </span>
  );
}
