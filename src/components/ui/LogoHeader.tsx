import React from 'react';

interface LogoHeaderProps {
  children?: React.ReactNode;
  className?: string;
  logoSize?: 'sm' | 'md' | 'lg';
}

export const LogoHeader: React.FC<LogoHeaderProps> = ({
  children,
  className = '',
  logoSize = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-24 h-24',
    lg: 'w-28 h-28',
  }[logoSize];

  return (
    <header className={`shrink-0 flex flex-col items-center text-center mb-4 ${className}`}>
      <div className={`${sizeClasses} relative flex items-center justify-center mb-1`}>
        <img
          src="/kanjigoto_icon.png"
          alt="KanjiGoto Logo"
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>
      {children}
    </header>
  );
};
