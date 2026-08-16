import React, { useEffect } from 'react';
import { SpeakerXMarkIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  onClose,
  duration = 3500,
}) => {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-2 left-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div
        className="bg-[#FFF4E5] border-2 border-stone-900 rounded-xl p-2.5 flex items-center justify-between gap-2.5"
        style={{
          boxShadow: '2.5px 2.5px 0px 0px rgba(0, 0, 0, 0.22)',
        }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <SpeakerXMarkIcon className="w-5 h-5 text-amber-700 shrink-0 stroke-2" />
          <span className="font-handwritten text-sm sm:text-base font-bold text-stone-800 tracking-wide truncate">
            {message}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-stone-600 hover:text-stone-900 rounded-lg transition-colors cursor-pointer shrink-0"
          aria-label="Close notification"
        >
          <XMarkIcon className="w-4 h-4 stroke-2" />
        </button>
      </div>
    </div>
  );
};
