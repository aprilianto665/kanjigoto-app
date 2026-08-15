import React from 'react';
import {
  ArrowLeftIcon,
  HomeIcon,
  PencilSquareIcon,
  Square2StackIcon,
} from '@heroicons/react/24/outline';
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
      <div className="sticky bottom-0 z-30 w-full px-4 py-3 bg-transparent">
        <div className="flex items-center justify-between gap-2.5 max-w-sm mx-auto">
          {/* Back button */}
          <WobblyButton
            onClick={onBack}
            variant="secondary"
            className="flex-1"
            icon={<ArrowLeftIcon className="w-4 h-4 stroke-2" />}
          >
            Back
          </WobblyButton>

          {/* Flashcard button */}
          <WobblyButton
            onClick={onStartFlashcard}
            variant="secondary"
            className="flex-1"
            icon={<Square2StackIcon className="w-4 h-4 stroke-2" />}
          >
            Flashcard
          </WobblyButton>

          {/* Drill button */}
          <WobblyButton
            onClick={onStartDrill}
            variant="primary"
            className="flex-1"
            icon={<PencilSquareIcon className="w-4 h-4 stroke-2" />}
          >
            Drill
          </WobblyButton>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky bottom-0 z-30 w-full px-4 py-3 bg-transparent">
      <div className="flex items-center justify-between gap-2.5 max-w-sm mx-auto">
        {/* Kanji Tab */}
        <WobblyButton
          onClick={() => onTabChange?.('kanji')}
          variant={activeTab === 'kanji' ? 'primary' : 'secondary'}
          className="flex-1"
          icon={<HomeIcon className="w-4 h-4 stroke-2" />}
        >
          Kanji
        </WobblyButton>

        {/* Flashcard Tab */}
        <WobblyButton
          onClick={() => {
            onTabChange?.('flashcard');
            onStartFlashcard?.();
          }}
          variant={activeTab === 'flashcard' ? 'primary' : 'secondary'}
          className="flex-1"
          icon={<Square2StackIcon className="w-4 h-4 stroke-2" />}
        >
          Flashcard
        </WobblyButton>

        {/* Drill Tab */}
        <WobblyButton
          onClick={() => {
            onTabChange?.('drill');
            onStartDrill?.();
          }}
          variant={activeTab === 'drill' ? 'primary' : 'secondary'}
          className="flex-1"
          icon={<PencilSquareIcon className="w-4 h-4 stroke-2" />}
        >
          Drill
        </WobblyButton>
      </div>
    </div>
  );
};
