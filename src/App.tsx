import { useState } from 'react';
import type { LevelInfo, NavTab } from './types';
import { AppShell } from './app/AppShell';
import { BottomNavBar } from './components/ui/BottomNavBar';
import { LevelOverviewView, LevelSelectionView } from './features/level-folders';

export default function App() {
  const [selectedLevel, setSelectedLevel] = useState<LevelInfo | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('kanji');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleSelectLevel = (level: LevelInfo) => {
    setSelectedLevel(level);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSelection = () => {
    setSelectedLevel(null);
    setActiveTab('kanji');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartFlashcard = () => {
    const levelName = selectedLevel ? selectedLevel.title : 'Marugoto';
    showToast(`Mode Flashcard untuk ${levelName} segera hadir di issue berikutnya!`);
  };

  const handleStartDrill = () => {
    const levelName = selectedLevel ? selectedLevel.title : 'Marugoto';
    showToast(`Mode RealKana Drill untuk ${levelName} segera hadir di issue berikutnya!`);
  };

  return (
    <AppShell>
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-stone-900 text-white font-handwritten font-bold text-sm rounded-2xl shadow-doodle border-2 border-stone-700 animate-bounce max-w-[90vw] text-center">
          {toastMessage}
        </div>
      )}

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
