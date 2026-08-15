import React from 'react';
import type { KanjiItem } from '../../../types';

interface KanjiTile2ColProps {
  item: KanjiItem;
}

export const KanjiTile2Col: React.FC<KanjiTile2ColProps> = ({ item }) => {
  const furiganaText = item.furigana.join('・');
  const romajiText = item.romaji.join(', ');

  return (
    <div className="relative group">
      <div className="w-full min-h-[120px] bg-white border-2 border-stone-800 shadow-doodle-sm wobbly-tile p-3 flex flex-col items-center justify-between text-center transition-transform hover:-translate-y-0.5 hover:shadow-doodle">
        {/* Top: Furigana / Hiragana */}
        <div className="text-xs sm:text-sm font-kanji font-medium text-stone-600 tracking-wider truncate max-w-full">
          {furiganaText}
        </div>

        {/* Center: Large Kanji */}
        <div className="my-1 text-3xl sm:text-4xl font-kanji font-bold text-stone-900 tracking-normal select-none">
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
