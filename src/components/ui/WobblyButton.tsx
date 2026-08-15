import React from 'react';

interface WobblyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'active' | 'dashed';
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const WobblyButton: React.FC<WobblyButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'secondary',
  icon,
  disabled = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'active':
      case 'primary':
        return 'bg-[#93C5FD] text-stone-900 border-2 border-stone-800 shadow-doodle hover:bg-[#7DB2F8]';
      case 'dashed':
        return 'bg-white text-stone-900 border-2 border-dashed border-stone-800 shadow-doodle hover:bg-stone-50';
      case 'secondary':
      default:
        return 'bg-white text-stone-900 border-2 border-stone-800 shadow-doodle hover:bg-stone-50';
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 font-handwritten text-base font-bold transition-all wobbly-pill btn-press ${getVariantStyles()} ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      {icon && <span className="inline-flex items-center text-base">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
