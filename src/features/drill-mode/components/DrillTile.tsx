import React from 'react';
import type { KanjiItem } from '../../../types';

interface DrillTileProps {
  item: KanjiItem;
}

export const DrillTile: React.FC<DrillTileProps> = ({ item }) => {
  const getKanjiFontSizeClass = (text: string) => {
    const len = text.length;
    if (len <= 1) return 'text-7xl sm:text-8xl';
    if (len === 2) return 'text-5xl sm:text-6xl';
    if (len === 3) return 'text-4xl sm:text-5xl';
    if (len === 4) return 'text-3xl sm:text-4xl';
    if (len <= 6) return 'text-2xl sm:text-3xl';
    return 'text-xl sm:text-2xl';
  };

  return (
    <div className="relative w-full max-w-[280px] max-h-[38dvh] max-h-[38vh] aspect-[4/4] mx-auto select-none">
      {/* Outer Card with solid border & soft shadow */}
      <div className="w-full h-full bg-white border-2 border-stone-900 rounded-3xl p-3 flex flex-col items-center justify-between shadow-[2px_4px_0px_0px_rgba(0,0,0,0.18)]">
        {/* Inner Dashed Border Container */}
        <div className="w-full h-full border-2 border-dashed border-stone-300 rounded-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden bg-white">
          {/* Large Kanji Character */}
          <div className="my-auto w-full flex flex-col items-center justify-center px-2">
            <span
              className={`font-kanji ${getKanjiFontSizeClass(
                item.kanji
              )} font-medium text-stone-900 tracking-normal drop-shadow-sm select-none text-center leading-tight break-words`}
            >
              {item.kanji}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
