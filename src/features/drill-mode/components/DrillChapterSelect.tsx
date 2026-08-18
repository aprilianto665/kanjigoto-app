import React, { useMemo } from 'react';
import {
  BookmarkIcon,
  PlusIcon,
  MinusIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline';
import type { LevelInfo, KanjiItem } from '../../../types';
import { getKanjiByLevel, groupKanjiByChapter } from '../../../data';

interface DrillChapterSelectProps {
  level: LevelInfo;
  selectedKanjiIds: Set<string>;
  onToggleChapter: (chapterItems: KanjiItem[]) => void;
  onToggleAllInLevel: (levelItems: KanjiItem[]) => void;
}

export const DrillChapterSelect: React.FC<DrillChapterSelectProps> = ({
  level,
  selectedKanjiIds,
  onToggleChapter,
  onToggleAllInLevel,
}) => {
  const kanjiList = useMemo(() => getKanjiByLevel(level.id), [level.id]);
  const chapterGroups = useMemo(
    () => groupKanjiByChapter(kanjiList, level.id),
    [kanjiList, level.id]
  );

  const selectedInLevelCount = useMemo(() => {
    return kanjiList.filter((item) => selectedKanjiIds.has(item.id)).length;
  }, [kanjiList, selectedKanjiIds]);

  const areAllSelected = kanjiList.length > 0 && selectedInLevelCount === kanjiList.length;

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden px-5 pt-6 pb-2 max-w-sm mx-auto w-full">
      {/* Header with Level Title & Selected Counter */}
      <header className="shrink-0 text-center mb-3">
        <h1 className="font-header font-extrabold text-2xl text-stone-900 tracking-tight">
          Level: {level.title}
        </h1>
        <p className="font-handwritten text-base text-stone-600 font-bold mt-0.5">
          {selectedInLevelCount} Kanji Selected
        </p>
      </header>

      {/* Add / Remove All Chapters Button */}
      <div className="shrink-0 mb-4">
        <button
          type="button"
          onClick={() => onToggleAllInLevel(kanjiList)}
          className="w-full relative inline-flex items-center justify-center p-[3px] bg-[#8BB4F8] border-2 border-stone-900 rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.18)] cursor-pointer select-none active:scale-[0.98] transition-all"
        >
          <div className="w-full h-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-[#5C8CE0] rounded-[10px]">
            {areAllSelected ? (
              <>
                <MinusCircleIcon className="w-5 h-5 text-stone-900 stroke-2" />
                <span className="font-handwritten text-lg font-bold text-stone-900 tracking-wide">
                  Remove All Chapters
                </span>
              </>
            ) : (
              <>
                <PlusCircleIcon className="w-5 h-5 text-stone-900 stroke-2" />
                <span className="font-handwritten text-lg font-bold text-stone-900 tracking-wide">
                  Add All Chapters
                </span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Scrollable Chapter Cards List */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar min-h-0 space-y-3.5 pt-1 pb-4 px-1">
        {chapterGroups.map((group) => {
          const isChapterFullySelected =
            group.items.length > 0 &&
            group.items.every((item) => selectedKanjiIds.has(item.id));

          return (
            <div
              key={group.chapter}
              className="w-full relative p-[3px] bg-white border-2 border-stone-900 rounded-2xl shadow-[2px_3px_0px_0px_rgba(0,0,0,0.18)] transition-all"
            >
              <div className="w-full h-full border-2 border-dashed border-stone-300 rounded-[10px] p-3.5 flex flex-col gap-2">
                {/* Chapter Title & Action Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookmarkIcon className="w-4 h-4 text-pink-400 stroke-2" />
                    <span className="font-handwritten font-bold text-lg text-stone-800 tracking-wide">
                      {group.title}
                    </span>
                  </div>

                  {/* Plus / Minus Toggle Button */}
                  <button
                    type="button"
                    onClick={() => onToggleChapter(group.items)}
                    className={`w-7 h-7 flex items-center justify-center border-2 border-stone-900 rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.18)] cursor-pointer select-none active:scale-95 transition-all ${
                      isChapterFullySelected
                        ? 'bg-[#FEC2C7] text-stone-900'
                        : 'bg-[#BBF7D0] text-stone-900'
                    }`}
                  >
                    {isChapterFullySelected ? (
                      <MinusIcon className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <PlusIcon className="w-4 h-4 stroke-[3]" />
                    )}
                  </button>
                </div>

                {/* Preview of Kanji in Chapter */}
                <div className="flex flex-wrap items-center gap-y-1 pt-1">
                  {group.items.map((item, idx) => {
                    const isSelected = selectedKanjiIds.has(item.id);
                    return (
                      <React.Fragment key={item.id}>
                        <span
                          className={`font-kanji text-2xl font-medium tracking-normal select-none transition-colors ${
                            isSelected
                              ? 'text-stone-900 font-bold'
                              : 'text-stone-800'
                          }`}
                        >
                          {item.kanji}
                        </span>
                        {idx < group.items.length - 1 && (
                          <span className="font-kanji text-xl font-medium text-stone-400 select-none mr-2">
                            ,
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};
