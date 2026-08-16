import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div
      className="h-screen w-full flex justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #FBFBFA 0%, #F5F4EF 40%, #EAE8DF 100%)',
      }}
    >
      {/* Centered mobile viewport container locked to 100vh */}
      <div className="w-full max-w-md h-full max-h-screen flex flex-col relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};
