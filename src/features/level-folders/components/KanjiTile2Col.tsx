import React from 'react';
import type { KanjiItem } from '../../../types';

interface KanjiTile2ColProps {
  item: KanjiItem;
  isActive?: boolean;
  onClick?: () => void;
}

export const KanjiTile2Col: React.FC<KanjiTile2ColProps> = ({
  item,
  isActive = false,
  onClick,
}) => {
  const furiganaText = item.furigana.join('・');
  const romajiText = item.romaji.join(', ');

  // Auto-scaled font size for Kanji characters to prevent awkward line breaks
  const getKanjiFontSizeClass = (text: string) => {
    const len = text.length;
    if (len <= 1) return 'text-4xl';
    if (len === 2) return 'text-3xl';
    if (len === 3) return 'text-2xl';
    if (len === 4) return 'text-xl';
    if (len === 5) return 'text-lg';
    return 'text-base';
  };

  return (
    <div
      onClick={onClick}
      className={`w-full border-2 border-stone-900 rounded-2xl p-[3px] cursor-pointer transition-colors duration-150 select-none ${
        isActive
          ? 'bg-[#F0EFF4]'
          : 'bg-white hover:bg-[#F0EFF4] active:bg-[#E5E4EB]'
      }`}
      style={{
        boxShadow: '2.5px 2.5px 0px 0px rgba(0, 0, 0, 0.22)',
      }}
    >
      <div className="w-full h-full border-2 border-dashed border-stone-300 rounded-[10px] p-2 flex flex-col items-center justify-between min-h-[115px] text-center pointer-events-none">
        {/* Top: Furigana / Hiragana */}
        <div className="text-xs font-kanji font-medium text-stone-600 tracking-wider truncate max-w-full px-1">
          {furiganaText}
        </div>

        {/* Center: Large Kanji with Auto-Scaled Font */}
        <div className="my-auto w-full flex items-center justify-center px-1">
          <span
            className={`font-kanji ${getKanjiFontSizeClass(
              item.kanji
            )} font-bold text-stone-900 tracking-normal select-none whitespace-nowrap leading-tight`}
          >
            {item.kanji}
          </span>
        </div>

        {/* Bottom: Romaji */}
        <div className="text-xs sm:text-sm font-handwritten font-bold text-stone-700 tracking-wide truncate max-w-full px-1">
          {romajiText}
        </div>
      </div>
    </div>
  );
};
