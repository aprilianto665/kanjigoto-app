import React from 'react';
import {
  Bars3BottomLeftIcon,
  XMarkIcon,
  BookOpenIcon,
  FolderIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import type { LevelInfo } from '../../../types';
import { MARUGOTO_LEVELS, getKanjiByLevel } from '../../../data';
import { WobblyCard } from '../../../components/ui/WobblyCard';

interface FlashcardLevelSelectProps {
  selectedKanjiIds: Set<string>;
  onSelectLevel: (level: LevelInfo) => void;
  onClearSelection: () => void;
  onStartFlashcard: () => void;
}

export const FlashcardLevelSelect: React.FC<FlashcardLevelSelectProps> = ({
  selectedKanjiIds,
  onSelectLevel,
  onClearSelection,
  onStartFlashcard,
}) => {
  const totalSelectedCount = selectedKanjiIds.size;

  const getSelectedCountForLevel = (level: LevelInfo) => {
    if (!level.available) return 0;
    const kanjiList = getKanjiByLevel(level.id);
    return kanjiList.filter((k) => selectedKanjiIds.has(k.id)).length;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden px-5 pt-6 pb-2 max-w-sm mx-auto w-full">
      {/* Header section with Logo and Title */}
      <header className="shrink-0 flex flex-col items-center text-center mb-4">
        <div className="w-24 h-24 relative flex items-center justify-center mb-1">
          <img
            src="/kanjigoto_icon.png"
            alt="KanjiGoto Logo"
            className="w-full h-full object-contain drop-shadow-sm"
          />
        </div>

        <h1 className="font-header font-extrabold text-2xl text-stone-900 tracking-tight">
          Kanji Selection
        </h1>
      </header>

      {/* Level Folder List: scrollable without scrollbar */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar min-h-0 space-y-4 pt-1 pb-3 px-1">
        {MARUGOTO_LEVELS.map((level) => {
          const selectedCount = getSelectedCountForLevel(level);

          return (
            <WobblyCard
              key={level.id}
              backplateColor={level.accentColor}
              disabled={!level.available}
              onClick={() => level.available && onSelectLevel(level)}
              className="w-full"
            >
              <div className="px-5 py-4 flex items-center justify-between">
                <div className="flex flex-col justify-center">
                  <h2 className="font-header font-bold text-xl text-stone-900 tracking-tight">
                    {level.title}
                  </h2>

                  <div className="mt-1 flex items-center gap-3 font-handwritten text-base font-bold text-stone-600">
                    {level.available ? (
                      <>
                        <div className="flex items-center gap-1.5">
                          <BookOpenIcon className="w-4 h-4 text-stone-700 stroke-2" />
                          <span>{level.kanjiCount} Kanji</span>
                        </div>
                        <span className="text-stone-400">•</span>
                        <span className={selectedCount > 0 ? 'text-blue-600' : 'text-stone-500'}>
                          {selectedCount} Selected
                        </span>
                      </>
                    ) : (
                      <>
                        <WrenchScrewdriverIcon className="w-4 h-4 text-stone-500 stroke-2" />
                        <span className="italic">{level.subtitle}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Folder icon on right */}
                <div className="shrink-0 pl-3">
                  <FolderIcon className="w-6 h-6 text-stone-400 stroke-2" />
                </div>
              </div>
            </WobblyCard>
          );
        })}
      </main>

      {/* Bottom Action Area: Counter + Clear + START button */}
      <div className="shrink-0 flex flex-col gap-2.5 pt-2 pb-1">
        {/* Selection Status Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Green Counter Pill */}
          <div className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#BBF7D0] border-2 border-stone-900 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]">
            <Bars3BottomLeftIcon className="w-4 h-4 text-stone-900 stroke-2" />
            <span className="font-handwritten text-base font-bold text-stone-900 tracking-wide">
              {totalSelectedCount} Kanji Selected
            </span>
          </div>

          {/* Red Clear Button */}
          <button
            type="button"
            onClick={onClearSelection}
            disabled={totalSelectedCount === 0}
            className={`inline-flex items-center justify-center gap-1 px-3.5 py-1.5 bg-[#FEC2C7] border-2 border-stone-900 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] font-handwritten text-base font-bold text-red-900 cursor-pointer transition-all active:scale-95 ${
              totalSelectedCount === 0 ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            <XMarkIcon className="w-4 h-4 text-red-900 stroke-2" />
            <span>Clear</span>
          </button>
        </div>

        {/* Big Blue START Button */}
        <button
          type="button"
          onClick={onStartFlashcard}
          className="w-full py-3 bg-[#8BB4F8] border-2 border-stone-900 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] font-header font-black text-xl text-stone-900 tracking-wider cursor-pointer transition-all active:scale-[0.98] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] select-none uppercase"
        >
          START
        </button>
      </div>
    </div>
  );
};
