import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div
      className="min-h-screen w-full flex justify-center bg-white"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `url('/paper_background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Centered mobile content viewport */}
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        {children}
      </div>
    </div>
  );
};
