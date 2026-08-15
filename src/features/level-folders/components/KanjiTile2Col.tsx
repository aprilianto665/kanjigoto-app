import React from 'react';
import type { KanjiItem } from '../../../types';

interface KanjiTile2ColProps {
  item: KanjiItem;
}

export const KanjiTile2Col: React.FC<KanjiTile2ColProps> = ({ item }) => {
  const furiganaText = item.furigana.join('・');
  const romajiText = item.romaji.join(', ');

  return (
    <div
      className="w-full bg-white hover:bg-[#F0EFF4] active:bg-[#E5E4EB] border-2 border-stone-900 rounded-2xl p-[3px] cursor-pointer transition-colors duration-150"
      style={{
        boxShadow: '2.5px 2.5px 0px 0px rgba(0, 0, 0, 0.22)',
      }}
    >
      <div className="w-full h-full border-2 border-dashed border-stone-300 rounded-[10px] p-2.5 flex flex-col items-center justify-between min-h-[115px] text-center pointer-events-none">
        {/* Top: Furigana / Hiragana */}
        <div className="text-xs font-kanji font-medium text-stone-600 tracking-wider truncate max-w-full">
          {furiganaText}
        </div>

        {/* Center: Large Kanji (Clean Standard Japanese Gothic / Sans) */}
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
