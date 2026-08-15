import React from 'react';
import { BookmarkIcon } from '@heroicons/react/24/outline';

interface ChapterBadgeProps {
  title: string;
  icon?: React.ReactNode;
  colorClass?: string;
  className?: string;
}

export const ChapterBadge: React.FC<ChapterBadgeProps> = ({
  title,
  icon,
  colorClass = 'bg-[#DDD6FE] text-purple-900 border-stone-900',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 font-handwritten font-bold text-base border-2 shadow-doodle-sm wobbly-badge ${colorClass} ${className}`}
    >
      {icon ? (
        <span className="inline-flex items-center">{icon}</span>
      ) : (
        <BookmarkIcon className="w-4 h-4 stroke-2" />
      )}
      <span className="tracking-wide">{title}</span>
    </div>
  );
};
