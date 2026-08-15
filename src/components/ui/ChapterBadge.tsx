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
      className={`inline-flex items-center gap-1.5 px-3.5 py-1 font-header font-bold text-sm sm:text-base border-2 rounded-[10px] ${colorClass} ${className}`}
      style={{
        boxShadow: '2.5px 2.5px 0px 0px rgba(0, 0, 0, 0.22)',
      }}
    >
      {icon ? (
        <span className="inline-flex items-center">{icon}</span>
      ) : (
        <BookmarkIcon className="w-4 h-4 stroke-[2.5]" />
      )}
      <span className="tracking-wide">{title}</span>
    </div>
  );
};
