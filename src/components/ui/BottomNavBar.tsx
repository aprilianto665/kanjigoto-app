import React from 'react';
import type { NavTab } from '../../types';
import { WobblyButton } from './WobblyButton';

interface BottomNavBarProps {
  mode: 'home' | 'overview';
  activeTab?: NavTab;
  onTabChange?: (tab: NavTab) => void;
  onBack?: () => void;
  onStartFlashcard?: () => void;
  onStartDrill?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  mode,
  activeTab = 'kanji',
  onTabChange,
  onBack,
  onStartFlashcard,
  onStartDrill,
}) => {
  if (mode === 'overview') {
    return (
      <div className="sticky bottom-0 z-30 w-full px-4 py-3 bg-white/80 backdrop-blur-xs border-t-2 border-stone-800/10">
        <div className="flex items-center justify-between gap-2 max-w-sm mx-auto">
          {/* Back button */}
          <WobblyButton
            onClick={onBack}
            variant="secondary"
            className="flex-1 py-2 text-sm"
          >
            ← Back
          </WobblyButton>

          {/* Flashcard button */}
          <WobblyButton
            onClick={onStartFlashcard}
            variant="dashed"
            className="flex-1 py-2 text-sm"
            icon={<span className="text-base">🎴</span>}
          >
            Flashcard
          </WobblyButton>

          {/* Drill button */}
          <WobblyButton
            onClick={onStartDrill}
            variant="primary"
            className="flex-1 py-2 text-sm"
            icon={<span className="text-base">✏️</span>}
          >
            Drill
          </WobblyButton>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky bottom-0 z-30 w-full px-4 py-3 bg-white/80 backdrop-blur-xs border-t-2 border-stone-800/10">
      <div className="flex items-center justify-between gap-2 max-w-sm mx-auto">
        {/* Kanji Tab */}
        <WobblyButton
          onClick={() => onTabChange?.('kanji')}
          variant={activeTab === 'kanji' ? 'primary' : 'dashed'}
          className="flex-1 py-2 text-sm"
          icon={<span className="text-base">🏠</span>}
        >
          Kanji
        </WobblyButton>

        {/* Flashcard Tab */}
        <WobblyButton
          onClick={() => {
            onTabChange?.('flashcard');
            onStartFlashcard?.();
          }}
          variant={activeTab === 'flashcard' ? 'primary' : 'dashed'}
          className="flex-1 py-2 text-sm"
          icon={<span className="text-base">🎴</span>}
        >
          Flashcard
        </WobblyButton>

        {/* Drill Tab */}
        <WobblyButton
          onClick={() => {
            onTabChange?.('drill');
            onStartDrill?.();
          }}
          variant={activeTab === 'drill' ? 'primary' : 'dashed'}
          className="flex-1 py-2 text-sm"
          icon={<span className="text-base">✏️</span>}
        >
          Drill
        </WobblyButton>
      </div>
    </div>
  );
};
