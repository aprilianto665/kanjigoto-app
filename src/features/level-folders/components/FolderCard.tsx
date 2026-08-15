import React from 'react';
import { BookOpenIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import type { LevelInfo } from '../../../types';
import { WobblyCard } from '../../../components/ui/WobblyCard';

interface FolderCardProps {
  level: LevelInfo;
  onSelect: (level: LevelInfo) => void;
}

export const FolderCard: React.FC<FolderCardProps> = ({ level, onSelect }) => {
  return (
    <WobblyCard
      backplateColor={level.accentColor}
      disabled={!level.available}
      onClick={() => level.available && onSelect(level)}
      className="w-full"
    >
      <div className="px-5 py-4 flex flex-col justify-center">
        <h2 className="font-header font-bold text-xl text-stone-900 tracking-tight">
          {level.title}
        </h2>

        <div className="mt-1 flex items-center gap-1.5 font-handwritten text-base font-bold text-stone-600">
          {level.available ? (
            <>
              <BookOpenIcon className="w-4 h-4 text-stone-700 stroke-2" />
              <span>{level.subtitle}</span>
            </>
          ) : (
            <>
              <WrenchScrewdriverIcon className="w-4 h-4 text-stone-500 stroke-2" />
              <span className="italic">{level.subtitle}</span>
            </>
          )}
        </div>
      </div>
    </WobblyCard>
  );
};
