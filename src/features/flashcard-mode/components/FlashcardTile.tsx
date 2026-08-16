import React from 'react';
import type { KanjiItem } from '../../../types';

interface FlashcardTileProps {
  item: KanjiItem;
  isFlipped: boolean;
  onFlip: () => void;
}

export const FlashcardTile: React.FC<FlashcardTileProps> = ({
  item,
  isFlipped,
  onFlip,
}) => {
  // Dynamically calculate font size based on text length to prevent overflow
  const getKanjiFontSizeClass = (text: string) => {
    const len = text.length;
    if (len <= 1) return 'text-7xl sm:text-8xl';
    if (len === 2) return 'text-5xl sm:text-6xl';
    if (len === 3) return 'text-4xl sm:text-5xl';
    if (len === 4) return 'text-3xl sm:text-4xl';
    if (len <= 6) return 'text-2xl sm:text-3xl';
    return 'text-xl sm:text-2xl';
  };

  const furiganaText = item.furigana.join(' / ');
  const getFuriganaFontSizeClass = (text: string) => {
    const len = text.length;
    if (len <= 4) return 'text-4xl';
    if (len <= 8) return 'text-3xl';
    if (len <= 12) return 'text-2xl';
    return 'text-xl';
  };

  return (
    <div
      onClick={onFlip}
      className="relative w-full max-w-[280px] max-h-[45dvh] max-h-[45vh] aspect-[3/4] mx-auto cursor-pointer select-none transition-transform duration-200 active:scale-[0.98]"
    >
      {/* Outer Card with solid border & soft shadow */}
      <div className="w-full h-full bg-white border-2 border-stone-900 rounded-3xl p-3 flex flex-col items-center justify-between shadow-[2px_4px_0px_0px_rgba(0,0,0,0.18)]">
        {/* Inner Dashed Border Container */}
        <div className="w-full h-full border-2 border-dashed border-stone-300 rounded-2xl flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-hidden bg-white">
          {!isFlipped ? (
            /* FRONT: Adaptive Sized Kanji Character */
            <>
              <div className="my-auto w-full flex flex-col items-center justify-center px-2">
                <span
                  className={`font-kanji ${getKanjiFontSizeClass(
                    item.kanji
                  )} font-medium text-stone-900 tracking-normal drop-shadow-sm select-none text-center leading-tight break-words`}
                >
                  {item.kanji}
                </span>
              </div>

              <div className="w-full text-center">
                <span className="font-handwritten text-sm text-stone-400 font-bold tracking-wider">
                  Tap to flip
                </span>
              </div>
            </>
          ) : (
            /* BACK: Furigana, Romaji & Kanji Mini Details */
            <>
              {/* Mini Kanji reminder at top */}
              <div className="w-full flex items-center justify-between">
                <span className="font-kanji text-2xl font-bold text-stone-700">
                  {item.kanji}
                </span>
                <span className="text-xs font-handwritten font-bold text-stone-400">
                  Ch. {item.chapter}
                </span>
              </div>

              {/* Reading details in center */}
              <div className="my-auto w-full flex flex-col items-center justify-center gap-3 text-center px-1">
                <div className="space-y-1 w-full">
                  <p className="text-xs uppercase tracking-widest font-bold text-stone-400">
                    Furigana
                  </p>
                  <p
                    className={`font-kanji ${getFuriganaFontSizeClass(
                      furiganaText
                    )} font-bold text-stone-900 break-words leading-tight`}
                  >
                    {furiganaText}
                  </p>
                </div>

                <div className="w-12 h-0.5 bg-stone-200 rounded-full" />

                <div className="space-y-0.5 w-full">
                  <p className="text-xs uppercase tracking-widest font-bold text-stone-400">
                    Romaji
                  </p>
                  <p className="font-handwritten text-2xl font-bold text-stone-700 tracking-wide break-words leading-snug">
                    {item.romaji.join(', ')}
                  </p>
                </div>
              </div>

              <div className="w-full text-center">
                <span className="font-handwritten text-sm text-stone-400 font-bold tracking-wider">
                  Tap to flip
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
