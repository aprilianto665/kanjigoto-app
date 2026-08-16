import { useState, useCallback, useEffect, useMemo } from 'react';
import type { KanjiItem } from '../../../types';
import { shuffleArray } from '../../../utils';

export interface FlashcardSessionState {
  queue: KanjiItem[];
  currentIndex: number;
  currentCard: KanjiItem | null;
  totalCards: number;
  isFlipped: boolean;
  isFirstCard: boolean;
  isLastCard: boolean;
  flipCard: () => void;
  nextCard: () => void;
  prevCard: () => void;
  shuffleQueue: () => void;
  resetSession: () => void;
}

export function useFlashcardSession(items: KanjiItem[]): FlashcardSessionState {
  const [queue, setQueue] = useState<KanjiItem[]>(() => shuffleArray(items));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setQueue(shuffleArray(items));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [items]);

  const flipCard = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const nextCard = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev < queue.length - 1) {
        setIsFlipped(false);
        return prev + 1;
      }
      return prev;
    });
  }, [queue.length]);

  const prevCard = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev > 0) {
        setIsFlipped(false);
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const shuffleQueue = useCallback(() => {
    setQueue(shuffleArray(queue));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [queue]);

  const resetSession = useCallback(() => {
    setQueue(shuffleArray(items));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [items]);

  const currentCard = useMemo(() => {
    if (queue.length === 0 || currentIndex >= queue.length) return null;
    return queue[currentIndex];
  }, [queue, currentIndex]);

  const totalCards = queue.length;
  const isFirstCard = currentIndex === 0;
  const isLastCard = currentIndex === queue.length - 1 || queue.length === 0;

  return {
    queue,
    currentIndex,
    currentCard,
    totalCards,
    isFlipped,
    isFirstCard,
    isLastCard,
    flipCard,
    nextCard,
    prevCard,
    shuffleQueue,
    resetSession,
  };
}
