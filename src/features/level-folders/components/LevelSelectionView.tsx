import React from 'react';
import type { LevelInfo } from '../../../types';
import { MARUGOTO_LEVELS } from '../../../data';
import { FolderCard } from './FolderCard';

interface LevelSelectionViewProps {
  onSelectLevel: (level: LevelInfo) => void;
}

export const LevelSelectionView: React.FC<LevelSelectionViewProps> = ({
  onSelectLevel,
}) => {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden px-5 pt-6 pb-2">
      {/* Header section with Logo and Tagline (fixed at top) */}
      <header className="shrink-0 flex flex-col items-center text-center mb-3">
        <div className="w-full max-w-[260px] h-24 relative flex items-center justify-center mb-1">
          <img
            src="/kanjigoto_logo.png"
            alt="KanjiGoto Logo"
            className="w-full h-full object-contain drop-shadow-sm scale-110"
          />
        </div>
        <h1 className="font-header font-bold text-lg sm:text-xl text-stone-900 leading-snug max-w-[320px]">
          Learn and Master Marugoto Kanji with KanjiGoto
        </h1>
      </header>

      {/* Level Folder List: scrollable container without visible scrollbar */}
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
