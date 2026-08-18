import React, { useEffect, useRef } from 'react';
import type { KanjiItem } from '../../../types';
import { WobblyButton } from '../../../components/ui/WobblyButton';
import { DrillTile } from './DrillTile';
import { useDrillSession } from '../hooks/useDrillSession';

interface DrillSessionViewProps {
  items: KanjiItem[];
  onBack: () => void;
  onComplete: (durationInSeconds: number) => void;
}

export const DrillSessionView: React.FC<DrillSessionViewProps> = ({
  items,
  onBack,
  onComplete,
}) => {
  const {
    currentCard,
    currentIndex,
    totalCards,
    inputText,
    startTime,
    endTime,
    isCompleted,
    handleInputChange,
  } = useDrillSession(items);

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically on mount and whenever the card changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIndex]);

  // When completed, calculate duration and trigger onComplete
  useEffect(() => {
    if (isCompleted && startTime && endTime) {
      const duration = Math.max(1, Math.floor((endTime - startTime) / 1000));
      onComplete(duration);
    }
  }, [isCompleted, startTime, endTime, onComplete]);

  if (totalCards === 0 || !currentCard) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-header font-bold text-xl text-stone-900 mb-2">
          No Kanji Selected
        </h2>
        <p className="font-handwritten text-base text-stone-600 mb-6">
          Please choose at least one chapter or level to practice.
        </p>
        <WobblyButton variant="primary" onClick={onBack}>
          Select Kanji
        </WobblyButton>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between min-h-0 overflow-y-auto no-scrollbar px-5 pt-6 pb-4 max-w-sm mx-auto w-full">
      {/* Header Section */}
      <header className="shrink-0 text-center mb-2">
        <h1 className="font-header font-extrabold text-2xl text-stone-900 tracking-tight">
          Drill Mode
        </h1>
        <p className="font-handwritten text-base font-bold text-stone-600 mt-0.5">
          {currentIndex + 1} / {totalCards} Kanji
        </p>
      </header>

      {/* Main Card Display */}
      <div className="flex-1 flex items-center justify-center my-auto py-2">
        <DrillTile item={currentCard} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 w-full max-w-xs mx-auto mt-2 mb-2">
        <div className="relative p-[3px] bg-white border-2 border-stone-900 rounded-2xl shadow-[2px_3px_0px_0px_rgba(0,0,0,0.18)]">
          <div className="border-2 border-dashed border-stone-300 rounded-[10px] p-2 bg-white flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Type kana or romaji..."
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              className="w-full text-center font-kanji font-bold text-2xl text-stone-900 bg-transparent outline-none placeholder:font-handwritten placeholder:text-stone-400 placeholder:text-base placeholder:font-normal"
            />
          </div>
        </div>
        <p className="text-center font-handwritten text-xs text-stone-400 font-bold mt-2">
          Auto-advances when answer matches reading
        </p>
      </div>
    </div>
  );
};
