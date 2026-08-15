import React from 'react';
import type { KanjiItem } from '../../../types';

interface KanjiTile2ColProps {
  item: KanjiItem;
}

export const KanjiTile2Col: React.FC<KanjiTile2ColProps> = ({ item }) => {
  const furiganaText = item.furigana.join('・');
  const romajiText = item.romaji.join(', ');

  return (
    <div className="w-full bg-white border-2 border-stone-900 rounded-2xl p-[3px] shadow-doodle-sm transition-transform hover:-translate-y-0.5">
      <div className="w-full h-full border-2 border-dashed border-stone-300 rounded-[10px] p-2.5 flex flex-col items-center justify-between min-h-[115px] text-center">
        {/* Top: Furigana / Hiragana */}
        <div className="text-xs font-kanji font-medium text-stone-600 tracking-wider truncate max-w-full">
          {furiganaText}
        </div>

        {/* Center: Large Kanji */}
        <div className="my-0.5 text-3xl sm:text-4xl font-kanji font-bold text-stone-900 tracking-normal select-none">
          {item.kanji}
        </div>

        {/* Bottom: Romaji */}
        <div className="text-xs sm:text-sm font-handwritten font-bold text-stone-700 tracking-wide truncate max-w-full">
          {romajiText}
        </div>
      </div>
    </div>
  );
};
