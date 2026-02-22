import type { TechTag as TechTagType } from '@/lib/projects';

export function TechTag({ tag }: { tag: TechTagType }) {
  return (
    <span
      className={`${tag.color} text-white px-2 py-1 text-xs rounded font-medium`}
    >
      {tag.label}
    </span>
  );
}
