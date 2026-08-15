import React from 'react';

interface WobblyCardProps {
  children: React.ReactNode;
  className?: string;
  backplateColor?: string;
  onClick?: () => void;
  variant?: 'card' | 'card-alt' | 'tile';
  disabled?: boolean;
}

export const WobblyCard: React.FC<WobblyCardProps> = ({
  children,
  className = '',
  backplateColor,
  onClick,
  variant = 'card',
  disabled = false,
}) => {
  const getBorderRadiusClass = () => {
    switch (variant) {
      case 'card-alt':
        return 'wobbly-card-alt';
      case 'tile':
        return 'wobbly-tile';
      default:
        return 'wobbly-card';
    }
  };

  const isClickable = !!onClick && !disabled;

  return (
    <div className={`relative group ${className}`}>
      {/* Backplate / Tab accent layer if specified (gives the folder stacked look) */}
      {backplateColor && (
        <div
          className={`absolute -top-1.5 -left-1 w-full h-full border-2 border-stone-800 pointer-events-none transition-transform ${getBorderRadiusClass()}`}
          style={{ backgroundColor: backplateColor }}
          aria-hidden="true"
        />
      )}

      {/* Main card body */}
      <div
        onClick={isClickable ? onClick : undefined}
        className={`relative z-10 bg-white/95 border-2 border-stone-800 shadow-doodle transition-all ${getBorderRadiusClass()} ${
          isClickable ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-doodle-lg btn-press' : ''
        } ${disabled ? 'opacity-50 cursor-not-allowed bg-stone-100/90' : ''}`}
      >
        {children}
      </div>
    </div>
  );
};
