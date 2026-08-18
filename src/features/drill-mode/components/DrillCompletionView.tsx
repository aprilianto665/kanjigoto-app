import React from 'react';
import {
  TrophyIcon,
  ArrowPathIcon,
  CheckIcon,
  ClockIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';
import { WobblyButton } from '../../../components/ui/WobblyButton';

interface DrillCompletionViewProps {
  durationInSeconds: number;
  totalCards: number;
  onPlayAgain: () => void;
  onDone: () => void;
}

export const DrillCompletionView: React.FC<DrillCompletionViewProps> = ({
  durationInSeconds,
  totalCards,
  onPlayAgain,
  onDone,
}) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;

  const formattedTime =
    minutes > 0
      ? `${minutes} ${minutes === 1 ? 'Minute' : 'Minutes'} ${seconds} ${
          seconds === 1 ? 'Second' : 'Seconds'
        }`
      : `${seconds} ${seconds === 1 ? 'Second' : 'Seconds'}`;

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

      {/* Center Trophy / Result Card */}
      <div className="flex-1 flex items-center justify-center my-auto py-3">
        <div className="w-full max-w-[280px] bg-white border-2 border-stone-900 rounded-3xl p-3 shadow-[2px_4px_0px_0px_rgba(0,0,0,0.18)]">
          <div className="border-2 border-dashed border-stone-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 bg-white">
            {/* Trophy Icon Pill */}
            <div className="w-16 h-16 rounded-2xl bg-[#FEF08A] border-2 border-stone-900 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.18)]">
              <TrophyIcon className="w-9 h-9 text-amber-600 stroke-2" />
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

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-2 flex flex-col items-center">
                <ClockIcon className="w-4 h-4 text-stone-500 mb-1" />
                <span className="font-header font-bold text-base text-stone-900">
                  {durationInSeconds}s
                </span>
                <span className="font-handwritten text-xs text-stone-500 font-bold">
                  Total Time
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
