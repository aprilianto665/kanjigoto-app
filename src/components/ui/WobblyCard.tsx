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
      {/* Unified single-path folder backplate: bold 3.5px border */}
      {backplateColor && (
        <svg
          className="absolute -top-[18px] left-1.5 w-full h-[calc(100%+10px)] pointer-events-none z-0 overflow-visible"
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

      {/* Main card body with bold 3.5px border */}
      <div
        onClick={isClickable ? onClick : undefined}
        className={`relative z-10 bg-[#F4F4F8] border-[3.5px] border-stone-900 transition-transform ${
          isClickable ? 'cursor-pointer active:scale-[0.98]' : ''
        } ${disabled ? 'opacity-55 cursor-not-allowed bg-[#EDEDF2]' : ''}`}
        style={{
          borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
        }}
      >
        {children}
      </div>
    </div>
  );
};
