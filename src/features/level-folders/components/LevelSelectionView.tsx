import React from 'react';
import type { LevelInfo } from '../../../types';
import { MARUGOTO_LEVELS } from '../../../data';
import { LogoHeader } from '../../../components/ui';
import { FolderCard } from './FolderCard';

interface LevelSelectionViewProps {
  onSelectLevel: (level: LevelInfo) => void;
}

export const LevelSelectionView: React.FC<LevelSelectionViewProps> = ({
  onSelectLevel,
}) => {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden px-5 pt-6 pb-2 max-w-sm mx-auto w-full">
      {/* Header section with Logo and Playful Doodle Tagline */}
      <LogoHeader>
        <div className="flex flex-col items-center max-w-[320px]">
          <p className="font-handwritten font-bold text-base text-stone-600 tracking-wide flex items-center gap-1.5">
            <span className="text-stone-400 text-xs">✦</span>
            <span>Learn and Master</span>
            <span className="text-stone-400 text-xs">✦</span>
          </p>

          <h1 className="font-header font-extrabold text-xl text-stone-900 tracking-tight mt-1 flex items-center justify-center flex-wrap gap-1.5">
            <span className="inline-block px-2.5 py-0.5 bg-[#FEF08A] border-2 border-stone-900 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.18)] text-stone-900">
              Marugoto Kanji
            </span>
            <span className="font-handwritten font-bold text-lg text-stone-700">
              with KanjiGoto
            </span>
          </h1>
        </div>
      </LogoHeader>

      {/* Level Folder List: scrollable without scrollbar */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar min-h-0 space-y-5 max-w-sm mx-auto w-full pt-4 pb-4 px-2">
        {MARUGOTO_LEVELS.map((level) => (
          <FolderCard
            key={level.id}
            level={level}
            onSelect={onSelectLevel}
          />
        ))}
      </main>
    </div>
  );
};
