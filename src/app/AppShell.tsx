import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div
      className="h-screen w-full flex justify-center bg-white overflow-hidden"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `url('/paper_background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Centered mobile viewport container locked to 100vh */}
      <div className="w-full max-w-md h-full max-h-screen flex flex-col relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};
