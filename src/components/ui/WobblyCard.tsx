import React from 'react';

interface WobblyCardProps {
  children: React.ReactNode;
  className?: string;
  backplateColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const WobblyCard: React.FC<WobblyCardProps> = ({
  children,
  className = '',
  backplateColor,
  onClick,
  disabled = false,
}) => {
  const isClickable = !!onClick && !disabled;

  return (
    <div className={`relative ${className}`}>
      {/* Unified single-path folder backplate: bold 3.5px border with doodle drop-shadow */}
      {backplateColor && (
        <svg
          className="absolute -top-[18px] left-1.5 w-full h-[calc(100%+10px)] pointer-events-none z-0 overflow-visible"
          style={{
            filter: 'drop-shadow(2.5px 2.5px 0px rgba(0, 0, 0, 0.18))',
          }}
          viewBox="0 0 360 82"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 2 20 C 2 8, 8 2, 18 2 L 115 2 C 122 2, 126 5, 130 9 L 140 10 L 344 10 C 352 10, 358 14, 358 22 L 358 70 C 358 76, 352 78, 344 78 L 14 78 C 6 78, 2 76, 2 70 Z"
            fill={backplateColor}
            stroke="#1c1917"
            strokeWidth="3.5"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      {/* Main card body with clean rounded border and inner dashed border (no shadow) */}
      <div
        onClick={isClickable ? onClick : undefined}
        className={`relative z-10 bg-white p-[3px] border-2 border-stone-900 rounded-2xl transition-transform ${
          isClickable ? 'cursor-pointer active:scale-[0.98]' : ''
        } ${disabled ? 'opacity-55 cursor-not-allowed bg-stone-100' : ''}`}
      >
        <div className="w-full h-full border-2 border-dashed border-stone-300 rounded-[10px]">
          {children}
        </div>
      </div>
    </div>
  );
};
