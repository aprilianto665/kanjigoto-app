import React from 'react';
import {
  ArrowsRightLeftIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import type { KanjiItem } from '../../../types';
import { WobblyButton } from '../../../components/ui/WobblyButton';
import { FlashcardTile } from './FlashcardTile';
import { useFlashcardSession } from '../hooks/useFlashcardSession';

interface FlashcardViewProps {
  items: KanjiItem[];
  onBack: () => void;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  items,
  onBack,
}) => {
  const {
    currentCard,
    currentIndex,
    totalCards,
    isFlipped,
    isFirstCard,
    isLastCard,
    flipCard,
    nextCard,
    prevCard,
    shuffleQueue,
  } = useFlashcardSession(items);

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
    <div className="flex-1 flex flex-col justify-between min-h-0 overflow-y-auto no-scrollbar px-5 pt-6 pb-3 max-w-sm mx-auto w-full">
      {/* Header Section */}
      <header className="shrink-0 text-center mb-4">
        <h1 className="font-header font-extrabold text-2xl text-stone-900 tracking-tight">
          Flashcard Mode
        </h1>
        <p className="font-handwritten text-base font-bold text-stone-600 mt-0.5">
          {currentIndex + 1} / {totalCards} Kanji
        </p>
      </header>

      {/* Main Flashcard Display */}
      <div className="flex-1 flex items-center justify-center my-auto py-2">
        <FlashcardTile
          item={currentCard}
          isFlipped={isFlipped}
          onFlip={flipCard}
        />
      </div>

      {/* Control Buttons Group */}
      <div className="shrink-0 flex flex-col gap-2.5 w-full max-w-xs mx-auto mt-4 mb-2">
        {/* Shuffle Button (Full width with dashed border styling) */}
        <WobblyButton
          onClick={shuffleQueue}
          variant="secondary"
          className="w-full"
          icon={<ArrowsRightLeftIcon className="w-5 h-5 text-stone-800 stroke-2" />}
        >
          Shuffle
        </WobblyButton>

        {/* Prev and Next Buttons */}
        <div className="flex items-center gap-3 w-full">
          <WobblyButton
            onClick={prevCard}
            disabled={isFirstCard}
            variant="secondary"
            className="flex-1"
            icon={<ArrowLeftIcon className="w-4 h-4 stroke-2" />}
          >
            Prev
          </WobblyButton>

          <WobblyButton
            onClick={nextCard}
            disabled={isLastCard}
            variant="primary"
            className="flex-1"
            icon={<ArrowRightIcon className="w-4 h-4 stroke-2" />}
          >
            Next
          </WobblyButton>
        </div>
      </div>
    </div>
  );
};
