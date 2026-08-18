import React, { useMemo } from 'react';
import {
  ArrowPathIcon,
  CheckIcon,
  FolderIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';
import type { KanjiItem } from '../../../types';
import { WobblyButton } from '../../../components/ui/WobblyButton';

interface DrillCompletionViewProps {
  durationInSeconds: number;
  items: KanjiItem[];
  onPlayAgain: () => void;
  onDone: () => void;
}

export const DrillCompletionView: React.FC<DrillCompletionViewProps> = ({
  durationInSeconds,
  items,
  onPlayAgain,
  onDone,
}) => {
  const totalCards = items.length;
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;

  const formattedTime =
    minutes > 0
      ? `${minutes} ${minutes === 1 ? 'Minute' : 'Minutes'} ${seconds} ${
          seconds === 1 ? 'Second' : 'Seconds'
        }`
      : `${seconds} ${seconds === 1 ? 'Second' : 'Seconds'}`;

  const levelLabel = useMemo(() => {
    const levelOrder = ['A1', 'A2.1', 'A2.2', 'B1'];
    const detected = new Set<string>();
    for (const item of items) {
      if (item.id.startsWith('a1-')) detected.add('A1');
      else if (item.id.startsWith('a2-1-')) detected.add('A2.1');
      else if (item.id.startsWith('a2-2-')) detected.add('A2.2');
      else if (item.id.startsWith('b1-')) detected.add('B1');
    }
    const sorted = levelOrder.filter((lvl) => detected.has(lvl));
    return sorted.length > 0 ? sorted.join(', ') : 'A1';
  }, [items]);

  return (
    <div className="flex-1 flex flex-col justify-between min-h-0 overflow-y-auto no-scrollbar px-5 pt-8 pb-4 max-w-sm mx-auto w-full">
      {/* Header Section */}
      <header className="shrink-0 text-center mb-2">
        <h1 className="font-header font-extrabold text-2xl text-stone-900 tracking-tight">
          Drill Completed!
        </h1>
        <p className="font-handwritten text-base text-stone-600 font-bold mt-0.5">
          Great job practicing!
        </p>
      </header>

      {/* Center Logo / Result Card */}
      <div className="flex-1 flex items-center justify-center my-auto py-3">
        <div className="w-full max-w-[280px] bg-white border-2 border-stone-900 rounded-3xl p-3 shadow-[2px_4px_0px_0px_rgba(0,0,0,0.18)]">
          <div className="border-2 border-dashed border-stone-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 bg-white">
            {/* Logo Image */}
            <div className="w-20 h-20 relative flex items-center justify-center">
              <img
                src="/kanjigoto_icon.png"
                alt="KanjiGoto Logo"
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>

            {/* Congratulations Text */}
            <div className="space-y-1">
              <h2 className="font-header font-bold text-lg text-stone-900">
                Congratulations!
              </h2>
              <p className="font-handwritten text-base text-stone-700 font-medium leading-relaxed">
                You completed the session in{' '}
                <span className="font-bold text-stone-900">{formattedTime}</span>.
              </p>
            </div>

            {/* Summary Stat Pills */}
            <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-dashed border-stone-200">
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-2 flex flex-col items-center">
                <LanguageIcon className="w-4 h-4 text-stone-500 mb-1" />
                <span className="font-header font-bold text-base text-stone-900">
                  {totalCards}
                </span>
                <span className="font-handwritten text-xs text-stone-500 font-bold">
                  Kanji Solved
                </span>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-2 flex flex-col items-center justify-center">
                <FolderIcon className="w-4 h-4 text-stone-500 mb-1" />
                <span className="font-header font-bold text-base text-stone-900 truncate max-w-full px-1">
                  {levelLabel}
                </span>
                <span className="font-handwritten text-xs text-stone-500 font-bold">
                  Level
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="shrink-0 flex flex-col gap-2.5 w-full max-w-xs mx-auto mt-2">
        <WobblyButton
          onClick={onPlayAgain}
          variant="secondary"
          className="w-full"
          icon={<ArrowPathIcon className="w-4 h-4 stroke-2" />}
        >
          Play Again
        </WobblyButton>

        <WobblyButton
          onClick={onDone}
          variant="primary"
          className="w-full"
          icon={<CheckIcon className="w-4 h-4 stroke-2" />}
        >
          Done
        </WobblyButton>
      </div>
    </div>
  );
};
