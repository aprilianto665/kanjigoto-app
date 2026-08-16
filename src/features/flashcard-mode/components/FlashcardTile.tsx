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
  return (
    <div
      onClick={onFlip}
      className="relative w-full max-w-xs mx-auto aspect-[3/4] cursor-pointer select-none transition-transform duration-200 active:scale-[0.98]"
    >
      {/* Outer Card with solid border & soft shadow */}
      <div className="w-full h-full bg-white border-2 border-stone-900 rounded-3xl p-3 flex flex-col items-center justify-between shadow-[2px_4px_0px_0px_rgba(0,0,0,0.18)]">
        {/* Inner Dashed Border Container */}
        <div className="w-full h-full border-2 border-dashed border-stone-300 rounded-2xl flex flex-col items-center justify-between p-6 relative overflow-hidden bg-white">
          {!isFlipped ? (
            /* FRONT: Big Kanji Character */
            <>
              <div className="w-full flex justify-end">
                <span className="text-xs font-handwritten font-bold text-stone-400">
                  Ch. {item.chapter}
                </span>
              </div>

              <div className="my-auto flex flex-col items-center justify-center">
                <span className="font-kanji text-8xl font-medium text-stone-900 tracking-normal drop-shadow-sm select-none">
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
                <span className="text-xs font-handwritten font-bold px-2 py-0.5 bg-amber-100 border border-amber-300 rounded-md text-amber-900">
                  Ch. {item.chapter}
                </span>
              </div>

              {/* Reading details in center */}
              <div className="my-auto flex flex-col items-center justify-center gap-3 text-center">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest font-bold text-stone-400">
                    Furigana
                  </p>
                  <p className="font-kanji text-4xl font-bold text-stone-900">
                    {item.furigana.join(' / ')}
                  </p>
                </div>

                <div className="w-12 h-0.5 bg-stone-200 rounded-full" />

                <div className="space-y-0.5">
                  <p className="text-xs uppercase tracking-widest font-bold text-stone-400">
                    Romaji
                  </p>
                  <p className="font-handwritten text-2xl font-bold text-stone-700 tracking-wide">
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
