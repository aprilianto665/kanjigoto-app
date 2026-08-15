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
      {/* Backplate peeking to the top-right */}
      {backplateColor && (
        <div
          className="absolute -top-1.5 left-1.5 w-full h-full border-2 border-stone-900 rounded-2xl pointer-events-none"
          style={{ backgroundColor: backplateColor }}
          aria-hidden="true"
        />
      )}

      {/* Main card body: clean rounded solid border, no box shadow */}
      <div
        onClick={isClickable ? onClick : undefined}
        className={`relative z-10 bg-[#F4F4F8] border-2 border-stone-900 rounded-2xl transition-transform ${
          isClickable ? 'cursor-pointer active:scale-[0.98]' : ''
        } ${disabled ? 'opacity-55 cursor-not-allowed bg-[#EDEDF2]' : ''}`}
      >
        {children}
      </div>
    </div>
  );
};
