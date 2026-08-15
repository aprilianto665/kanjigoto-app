import React from 'react';

interface WobblyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'active' | 'dashed';
  disabled?: boolean;
}

export const WobblyButton: React.FC<WobblyButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'secondary',
  disabled = false,
}) => {
  const isActive = variant === 'active' || variant === 'primary';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center p-[3px] border-2 border-stone-900 rounded-2xl transition-all cursor-pointer select-none active:scale-[0.97] ${
        isActive ? 'bg-[#8BB4F8]' : 'bg-white'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
    >
      <div
        className={`w-full h-full flex items-center justify-center px-3.5 py-1.5 border-2 border-dashed rounded-[10px] ${
          isActive
            ? 'border-[#5C8CE0] text-stone-900'
            : 'border-stone-400 text-stone-900'
        }`}
      >
        <span className="font-handwritten text-lg font-bold tracking-wide">
          {children}
        </span>
      </div>
    </button>
  );
};
