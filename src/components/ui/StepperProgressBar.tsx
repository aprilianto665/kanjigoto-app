import React from 'react';

interface StepperProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const StepperProgressBar: React.FC<StepperProgressBarProps> = ({
  current,
  total,
  className = '',
}) => {
  const totalBars = 10;
  const percentage =
    total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;

  const filledBars =
    total > 0
      ? current >= total
        ? totalBars
        : Math.min(
            totalBars - 1,
            Math.max(current > 0 ? 1 : 0, Math.round(percentage / 10))
          )
      : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Progress: ${current} of ${total} Kanji`}
      className={`relative p-[3px] bg-white border-2 border-stone-900 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.18)] ${className}`}
    >
      <div className="border-2 border-dashed border-stone-300 rounded-[7px] overflow-hidden flex items-stretch h-6 gap-0.5 bg-white">
        {Array.from({ length: totalBars }).map((_, index) => {
          const isFilled = index < filledBars;
          return (
            <div
              key={index}
              className={`flex-1 h-full transition-colors duration-300 ${
                isFilled ? 'bg-[#BBF8D0]' : 'bg-transparent'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
