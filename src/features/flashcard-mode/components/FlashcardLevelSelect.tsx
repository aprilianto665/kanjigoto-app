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
import { LogoHeader } from '../../../components/ui';

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
      {/* Reusable LogoHeader with Kanji Selection Title */}
      <LogoHeader>
        <h1 className="font-header font-extrabold text-2xl text-stone-900 tracking-tight">
          Kanji Selection
        </h1>
      </LogoHeader>

      {/* Level Folder List: simple solid border outside, dashed inside, soft shadow */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar min-h-0 space-y-3.5 pt-1 pb-3 px-1">
        {MARUGOTO_LEVELS.map((level) => {
          const selectedCount = getSelectedCountForLevel(level);

          return (
            <div
              key={level.id}
              onClick={() => level.available && onSelectLevel(level)}
              className={`w-full relative p-[3px] bg-white border-2 border-stone-900 rounded-2xl shadow-[2px_3px_0px_0px_rgba(0,0,0,0.18)] transition-all ${
                level.available
                  ? 'cursor-pointer select-none active:scale-[0.98]'
                  : 'opacity-50 cursor-not-allowed bg-stone-50'
              }`}
            >
              {/* Inner Dashed Border Container */}
              <div className="w-full h-full border-2 border-dashed border-stone-300 rounded-[10px] px-4 py-3.5 flex flex-col justify-center gap-1.5">
                {/* Top Row: Title + Colored Folder Icon */}
                <div className="flex items-center justify-between">
                  <h2 className="font-header font-bold text-lg text-stone-900 tracking-tight">
                    {level.title}
                  </h2>

                  {/* Folder Icon outline with level accent color */}
                  <FolderIcon
                    className="w-6 h-6 stroke-2"
                    style={{ color: level.accentColor }}
                  />
                </div>

                {/* Bottom Row: Kanji count and Selected count */}
                <div className="flex items-center gap-2 font-handwritten text-base font-bold text-stone-600">
                  {level.available ? (
                    <>
                      <div className="flex items-center gap-1.5">
                        <BookOpenIcon className="w-4 h-4 text-stone-700 stroke-2" />
                        <span>{level.kanjiCount} Kanji</span>
                      </div>
                      <span className="text-stone-300 font-normal">|</span>
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
            </div>
          );
        })}
      </main>

      {/* Bottom Action Area: Counter + Clear + START button */}
      <div className="shrink-0 flex flex-col gap-2.5 pt-2 pb-1">
        {/* Selection Status Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Green Counter Pill with inner dashed border */}
          <div className="flex-1 relative p-[3px] bg-[#BBF7D0] border-2 border-stone-900 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.18)]">
            <div className="w-full h-full flex items-center justify-center gap-1.5 px-3 py-1.5 border-2 border-dashed border-emerald-400 rounded-[7px]">
              <Bars3BottomLeftIcon className="w-4 h-4 text-stone-900 stroke-2" />
              <span className="font-handwritten text-base font-bold text-stone-900 tracking-wide">
                {totalSelectedCount} Kanji Selected
              </span>
            </div>
          </div>

          {/* Red Clear Button with inner dashed border */}
          <button
            type="button"
            onClick={onClearSelection}
            disabled={totalSelectedCount === 0}
            className={`relative p-[3px] bg-[#FEC2C7] border-2 border-stone-900 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.18)] cursor-pointer transition-all active:scale-95 ${
              totalSelectedCount === 0 ? 'opacity-40 cursor-not-allowed shadow-none' : ''
            }`}
          >
            <div className="w-full h-full flex items-center justify-center gap-1 px-3 py-1.5 border-2 border-dashed border-[#F472B6] rounded-[7px] text-red-900 font-handwritten text-base font-bold">
              <XMarkIcon className="w-4 h-4 text-red-900 stroke-2" />
              <span>Clear</span>
            </div>
          </button>
        </div>

        {/* Big Blue START Button with inner dashed border */}
        <button
          type="button"
          onClick={onStartFlashcard}
          className="w-full relative p-[3px] bg-[#8BB4F8] border-2 border-stone-900 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.22)] cursor-pointer transition-all active:scale-[0.98] select-none"
        >
          <div className="w-full h-full flex items-center justify-center py-2.5 px-4 border-2 border-dashed border-[#5C8CE0] rounded-[10px]">
            <span className="font-header font-black text-xl text-stone-900 tracking-wider uppercase">
              START
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
