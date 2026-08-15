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
      {/* Backplate: clean standard rounded rectangle (not wobbly), peeking top-right */}
      {backplateColor && (
        <div
          className="absolute -top-1.5 left-1.5 w-full h-full border-2 border-stone-900 rounded-xl pointer-events-none"
          style={{
            backgroundColor: backplateColor,
          }}
          aria-hidden="true"
        />
      )}

      {/* Main card body with subtle wobbly border-radius */}
      <div
        onClick={isClickable ? onClick : undefined}
        className={`relative z-10 bg-[#F4F4F8] border-2 border-stone-900 transition-transform ${
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
