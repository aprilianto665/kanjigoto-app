import { useState, useMemo } from 'react';
import type { LevelInfo, NavTab, KanjiItem } from './types';
import { AppShell } from './app/AppShell';
import { BottomNavBar } from './components/ui/BottomNavBar';
import {
  LevelOverviewView,
  LevelSelectionView,
} from './features/level-folders';
import {
  FlashcardLevelSelect,
  FlashcardChapterSelect,
  FlashcardView,
} from './features/flashcard-mode';
import { getAllKanji, getKanjiByLevel } from './data';

type FlashcardStep = 'level-select' | 'chapter-select' | 'session';

export default function App() {
  // Navigation tab: 'kanji' (Folders tab), 'flashcard' (Cards tab), or 'drill'
  const [activeTab, setActiveTab] = useState<NavTab>('kanji');

  // Level Folders State (Overview Mode)
  const [selectedOverviewLevel, setSelectedOverviewLevel] = useState<LevelInfo | null>(null);

  // Flashcard Mode State
  const [flashcardStep, setFlashcardStep] = useState<FlashcardStep>('level-select');
  const [selectedFlashcardLevel, setSelectedFlashcardLevel] = useState<LevelInfo | null>(null);
  const [selectedKanjiIds, setSelectedKanjiIds] = useState<Set<string>>(new Set());

  const allKanji = useMemo(() => getAllKanji(), []);

  // Compute active practice Kanji items for Flashcard session
  const activeFlashcardItems = useMemo<KanjiItem[]>(() => {
    if (selectedKanjiIds.size > 0) {
      return allKanji.filter((item: KanjiItem) => selectedKanjiIds.has(item.id));
    }
    // Fallback if starting with 0 selected: default to A1 level or current selected level
    if (selectedFlashcardLevel) {
      return getKanjiByLevel(selectedFlashcardLevel.id);
    }
    return getKanjiByLevel('a1');
  }, [allKanji, selectedKanjiIds, selectedFlashcardLevel]);

  // Flashcard chapter toggle handlers
  const handleToggleChapter = (chapterItems: KanjiItem[]) => {
    setSelectedKanjiIds((prev) => {
      const next = new Set(prev);
      const allIncluded = chapterItems.every((item) => next.has(item.id));

      if (allIncluded) {
        chapterItems.forEach((item) => next.delete(item.id));
      } else {
        chapterItems.forEach((item) => next.add(item.id));
      }
      return next;
    });
  };

  const handleToggleAllInLevel = (levelItems: KanjiItem[]) => {
    setSelectedKanjiIds((prev) => {
      const next = new Set(prev);
      const allIncluded =
        levelItems.length > 0 && levelItems.every((item) => next.has(item.id));

      if (allIncluded) {
        levelItems.forEach((item) => next.delete(item.id));
      } else {
        levelItems.forEach((item) => next.add(item.id));
      }
      return next;
    });
  };

  const handleClearSelection = () => {
    setSelectedKanjiIds(new Set());
  };

  const handleStartFlashcardSession = () => {
    // If no kanji selected, automatically select all in current level or A1
    if (selectedKanjiIds.size === 0) {
      const defaultList = selectedFlashcardLevel
        ? getKanjiByLevel(selectedFlashcardLevel.id)
        : getKanjiByLevel('a1');
      setSelectedKanjiIds(new Set(defaultList.map((k) => k.id)));
    }
    setFlashcardStep('session');
    setActiveTab('flashcard');
  };

  const handleBack = () => {
    if (activeTab === 'kanji') {
      // Return from LevelOverviewView to LevelSelectionView
      setSelectedOverviewLevel(null);
    } else if (activeTab === 'flashcard') {
      if (flashcardStep === 'session') {
        if (selectedFlashcardLevel) {
          setFlashcardStep('chapter-select');
        } else {
          setFlashcardStep('level-select');
        }
      } else if (flashcardStep === 'chapter-select') {
        setSelectedFlashcardLevel(null);
        setFlashcardStep('level-select');
      }
    } else if (activeTab === 'drill') {
      setActiveTab('kanji');
    }
  };

  const handleGoHome = () => {
    setSelectedOverviewLevel(null);
    setSelectedFlashcardLevel(null);
    setFlashcardStep('level-select');
    setActiveTab('kanji');
  };

  // Determine if bottom bar should be in 'session' mode (with Back button) or 'home' mode (with Tabs)
  const isSessionMode =
    (activeTab === 'kanji' && selectedOverviewLevel !== null) ||
    (activeTab === 'flashcard' && flashcardStep !== 'level-select');

  return (
    <AppShell>
      {/* 1. Level Folders View (Overview Grid 2-Column) */}
      {activeTab === 'kanji' && (
        selectedOverviewLevel ? (
          <LevelOverviewView level={selectedOverviewLevel} />
        ) : (
          <LevelSelectionView onSelectLevel={(lvl) => setSelectedOverviewLevel(lvl)} />
        )
      )}

      {/* 2. Flashcard Mode Flow (Selection -> Practice) */}
      {activeTab === 'flashcard' && (
        <>
          {flashcardStep === 'level-select' && (
            <FlashcardLevelSelect
              selectedKanjiIds={selectedKanjiIds}
              onSelectLevel={(lvl) => {
                setSelectedFlashcardLevel(lvl);
                setFlashcardStep('chapter-select');
              }}
              onClearSelection={handleClearSelection}
              onStartFlashcard={handleStartFlashcardSession}
            />
          )}

          {flashcardStep === 'chapter-select' && selectedFlashcardLevel && (
            <FlashcardChapterSelect
              level={selectedFlashcardLevel}
              selectedKanjiIds={selectedKanjiIds}
              onToggleChapter={handleToggleChapter}
              onToggleAllInLevel={handleToggleAllInLevel}
            />
          )}

          {flashcardStep === 'session' && (
            <FlashcardView
              items={activeFlashcardItems}
              onBack={handleBack}
            />
          )}
        </>
      )}

      {/* 3. Drill Mode Placeholder */}
      {activeTab === 'drill' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="font-header font-bold text-2xl text-stone-900 mb-2">
            Drill Mode
          </h2>
          <p className="font-handwritten text-base text-stone-600 mb-4">
            Coming soon in the next update!
          </p>
        </div>
      )}

      {/* Persistent Bottom Action Bar */}
      <BottomNavBar
        mode={isSessionMode ? 'session' : 'home'}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'kanji') {
            setSelectedOverviewLevel(null);
          } else if (tab === 'flashcard') {
            // Keep existing flashcard selection state or step
          }
        }}
        onBack={handleBack}
        onGoHome={handleGoHome}
        onStartFlashcard={() => {
          setActiveTab('flashcard');
          setFlashcardStep('level-select');
        }}
        onStartDrill={() => {
          setActiveTab('drill');
        }}
      />
    </AppShell>
  );
}
