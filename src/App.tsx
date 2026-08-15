import { useState } from 'react';
import type { LevelInfo, NavTab } from './types';
import { AppShell } from './app/AppShell';
import { BottomNavBar } from './components/ui/BottomNavBar';
import { LevelOverviewView, LevelSelectionView } from './features/level-folders';

export default function App() {
  const [selectedLevel, setSelectedLevel] = useState<LevelInfo | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('kanji');

  const handleSelectLevel = (level: LevelInfo) => {
    setSelectedLevel(level);
  };

  const handleBackToSelection = () => {
    setSelectedLevel(null);
    setActiveTab('kanji');
  };

  const handleStartFlashcard = () => {
    // Will be implemented in the Flashcard issue
  };

  const handleStartDrill = () => {
    // Will be implemented in the Drill issue
  };

  return (
    <AppShell>
      {/* Main View Area */}
      {selectedLevel ? (
        <LevelOverviewView level={selectedLevel} />
      ) : (
        <LevelSelectionView onSelectLevel={handleSelectLevel} />
      )}

      {/* Persistent Bottom Action Bar */}
      <BottomNavBar
        mode={selectedLevel ? 'overview' : 'home'}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'kanji') {
            setSelectedLevel(null);
          }
        }}
        onBack={handleBackToSelection}
        onStartFlashcard={handleStartFlashcard}
        onStartDrill={handleStartDrill}
      />
    </AppShell>
  );
}
