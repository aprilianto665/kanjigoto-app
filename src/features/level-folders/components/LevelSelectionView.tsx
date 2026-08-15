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
    <div className="flex-1 flex flex-col px-5 pt-8 pb-4">
      {/* Header section with Logo and Tagline */}
      <header className="flex flex-col items-center text-center mb-6">
        <div className="w-full max-w-[270px] h-28 relative flex items-center justify-center mb-3">
          <img
            src="/kanjigoto_logo.png"
            alt="KanjiGoto Logo"
            className="w-full h-full object-contain drop-shadow-sm scale-115"
          />
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight max-w-[280px]">
          Learn and Master Marugoto Kanji with KanjiGoto
        </h1>
      </header>

      {/* Level Folder List */}
      <main className="flex-1 flex flex-col justify-start space-y-3 max-w-sm mx-auto w-full">
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
