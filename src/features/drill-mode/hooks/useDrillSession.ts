import { useState, useCallback, useEffect, useMemo } from 'react';
import * as wanakana from 'wanakana';
import type { KanjiItem } from '../../../types';
import { shuffleArray } from '../../../utils';

export interface DrillSessionState {
  queue: KanjiItem[];
  currentIndex: number;
  currentCard: KanjiItem | null;
  totalCards: number;
  inputText: string;
  startTime: number | null;
  endTime: number | null;
  isCompleted: boolean;
  handleInputChange: (value: string) => void;
  restartSession: () => void;
}

export function useDrillSession(items: KanjiItem[]): DrillSessionState {
  const [queue, setQueue] = useState<KanjiItem[]>(() => shuffleArray(items));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputText, setInputText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(() => Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setQueue(shuffleArray(items));
    setCurrentIndex(0);
    setInputText('');
    setStartTime(Date.now());
    setEndTime(null);
    setIsCompleted(false);
  }, [items]);

  const currentCard = useMemo(() => {
    if (queue.length === 0 || currentIndex >= queue.length) return null;
    return queue[currentIndex];
  }, [queue, currentIndex]);

  const handleInputChange = useCallback(
    (rawVal: string) => {
      if (isCompleted || !currentCard) return;

      // Convert romaji to kana (hiragana) with IME mode support
      const kana = wanakana.toKana(rawVal, { IMEMode: true });
      setInputText(kana);

      const cleanKana = kana.trim();
      const isMatch = currentCard.furigana.some(
        (f) => f.trim() === cleanKana
      );

      if (isMatch) {
        setInputText('');
        if (currentIndex < queue.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setEndTime(Date.now());
          setIsCompleted(true);
        }
      }
    },
    [currentCard, currentIndex, isCompleted, queue.length]
  );

  const restartSession = useCallback(() => {
    setQueue(shuffleArray(items));
    setCurrentIndex(0);
    setInputText('');
    setStartTime(Date.now());
    setEndTime(null);
    setIsCompleted(false);
  }, [items]);

  const totalCards = queue.length;

  return {
    queue,
    currentIndex,
    currentCard,
    totalCards,
    inputText,
    startTime,
    endTime,
    isCompleted,
    handleInputChange,
    restartSession,
  };
}
