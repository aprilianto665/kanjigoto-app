import React from 'react';
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
      className="w-full my-1.5"
    >
      <div className="p-5 flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            {level.title}
          </h2>
          {level.available && (
            <span className="text-xl text-stone-400 group-hover:text-stone-700 transition-colors">
              ➔
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center gap-1.5 font-handwritten text-base font-bold text-stone-600">
          {level.available ? (
            <>
              <span className="text-base">📖</span>
              <span>{level.subtitle}</span>
            </>
          ) : (
            <>
              <span className="text-base">🛠️</span>
              <span className="italic">{level.subtitle}</span>
            </>
          )}
        </div>
      </div>
    </WobblyCard>
  );
};
