import React from 'react';

interface ChapterBadgeProps {
  title: string;
  icon?: string;
  colorClass?: string;
  className?: string;
}

export const ChapterBadge: React.FC<ChapterBadgeProps> = ({
  title,
  icon = '🔖',
  colorClass = 'bg-[#DDD6FE] text-purple-900 border-stone-800',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 font-handwritten font-bold text-base border-2 shadow-doodle-sm wobbly-badge ${colorClass} ${className}`}
    >
      {icon && <span className="text-lg leading-none">{icon}</span>}
      <span className="tracking-wide">{title}</span>
    </div>
  );
};
