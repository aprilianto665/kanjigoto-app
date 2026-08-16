import React from 'react';
import {
  ArrowLeftIcon,
  HomeIcon,
  AcademicCapIcon,
  Square2StackIcon,
  FolderIcon,
  Bars3BottomLeftIcon,
} from '@heroicons/react/24/outline';
import type { NavTab } from '../../types';
import { WobblyButton } from './WobblyButton';

interface BottomNavBarProps {
  mode: 'home' | 'session' | 'overview';
  activeTab?: NavTab;
  onTabChange?: (tab: NavTab) => void;
  onBack?: () => void;
  onGoHome?: () => void;
  onStartFlashcard?: () => void;
  onStartDrill?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  mode,
  activeTab = 'kanji',
  onTabChange,
  onBack,
  onGoHome,
  onStartFlashcard,
  onStartDrill,
}) => {
  if (mode === 'session' || mode === 'overview') {
    return (
      <div className="shrink-0 w-full px-4 py-3 bg-transparent">
        <div className="flex items-center justify-between gap-2.5 max-w-sm mx-auto">
          {/* Back button (Active/Primary in session mode) */}
          <WobblyButton
            onClick={onBack}
            variant="primary"
            className="flex-1"
            icon={<ArrowLeftIcon className="w-4 h-4 stroke-2" />}
          >
            Back
          </WobblyButton>

          {/* Kanji / Home button */}
          <WobblyButton
            onClick={onGoHome}
            variant="secondary"
            className="flex-1"
            icon={<HomeIcon className="w-4 h-4 stroke-2" />}
          >
            Kanji
          </WobblyButton>

          {/* Drill button */}
          <WobblyButton
            onClick={onStartDrill}
            variant="secondary"
            className="flex-1"
            icon={<AcademicCapIcon className="w-4 h-4 stroke-2" />}
          >
            Drill
          </WobblyButton>
        </div>
      </div>
    );
  }

  return (
    <div className="shrink-0 w-full px-4 py-3 bg-transparent">
      <div className="flex items-center justify-between gap-2.5 max-w-sm mx-auto">
        {/* Folders Tab */}
        <WobblyButton
          onClick={() => {
            onTabChange?.('kanji');
            onGoHome?.();
          }}
          variant={activeTab === 'kanji' ? 'primary' : 'secondary'}
          className="flex-1"
          icon={<FolderIcon className="w-4 h-4 stroke-2" />}
        >
          Folders
        </WobblyButton>

        {/* Cards Tab */}
        <WobblyButton
          onClick={() => {
            onTabChange?.('flashcard');
            onStartFlashcard?.();
          }}
          variant={activeTab === 'flashcard' ? 'primary' : 'secondary'}
          className="flex-1"
          icon={<Square2StackIcon className="w-4 h-4 stroke-2" />}
        >
          Cards
        </WobblyButton>

        {/* Drill Tab */}
        <WobblyButton
          onClick={() => {
            onTabChange?.('drill');
            onStartDrill?.();
          }}
          variant={activeTab === 'drill' ? 'primary' : 'secondary'}
          className="flex-1"
          icon={<Bars3BottomLeftIcon className="w-4 h-4 stroke-2" />}
        >
          Drill
        </WobblyButton>
      </div>
    </div>
  );
};
