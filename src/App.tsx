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
import {
  DrillLevelSelect,
  DrillChapterSelect,
  DrillSessionView,
  DrillCompletionView,
} from './features/drill-mode';
import { getAllKanji, getKanjiByLevel } from './data';

type FlashcardStep = 'level-select' | 'chapter-select' | 'session';
type DrillStep = 'level-select' | 'chapter-select' | 'session' | 'completion';

export default function App() {
  // Navigation tab: 'kanji' (Folders tab), 'flashcard' (Cards tab), or 'drill'
  const [activeTab, setActiveTab] = useState<NavTab>('kanji');

  // Level Folders State (Overview Mode)
  const [selectedOverviewLevel, setSelectedOverviewLevel] = useState<LevelInfo | null>(null);

  // Flashcard Mode State
  const [flashcardStep, setFlashcardStep] = useState<FlashcardStep>('level-select');
  const [selectedFlashcardLevel, setSelectedFlashcardLevel] = useState<LevelInfo | null>(null);
  const [selectedKanjiIds, setSelectedKanjiIds] = useState<Set<string>>(new Set());

  // Drill Mode State
  const [drillStep, setDrillStep] = useState<DrillStep>('level-select');
  const [selectedDrillLevel, setSelectedDrillLevel] = useState<LevelInfo | null>(null);
  const [selectedDrillKanjiIds, setSelectedDrillKanjiIds] = useState<Set<string>>(new Set());
  const [drillDuration, setDrillDuration] = useState<number>(0);

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

  // Compute active practice Kanji items for Drill session
  const activeDrillItems = useMemo<KanjiItem[]>(() => {
    if (selectedDrillKanjiIds.size > 0) {
      return allKanji.filter((item: KanjiItem) => selectedDrillKanjiIds.has(item.id));
    }
    if (selectedDrillLevel) {
      return getKanjiByLevel(selectedDrillLevel.id);
    }
    return getKanjiByLevel('a1');
  }, [allKanji, selectedDrillKanjiIds, selectedDrillLevel]);

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
    if (selectedKanjiIds.size === 0) return;
    setFlashcardStep('session');
    setActiveTab('flashcard');
  };

  // Drill chapter toggle handlers
  const handleToggleDrillChapter = (chapterItems: KanjiItem[]) => {
    setSelectedDrillKanjiIds((prev) => {
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

  const handleToggleAllInDrillLevel = (levelItems: KanjiItem[]) => {
    setSelectedDrillKanjiIds((prev) => {
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

  const handleClearDrillSelection = () => {
    setSelectedDrillKanjiIds(new Set());
  };

  const handleStartDrillSession = () => {
    if (selectedDrillKanjiIds.size === 0) return;
    setDrillStep('session');
    setActiveTab('drill');
  };

  const handleDrillComplete = (durationInSeconds: number) => {
    setDrillDuration(durationInSeconds);
    setDrillStep('completion');
  };

  const handleDrillPlayAgain = () => {
    setDrillStep('session');
  };

  const handleDrillDone = () => {
    setDrillStep('level-select');
    setSelectedDrillLevel(null);
    setSelectedDrillKanjiIds(new Set());
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
      if (drillStep === 'completion') {
        setDrillStep('level-select');
        setSelectedDrillLevel(null);
      } else if (drillStep === 'session') {
        if (selectedDrillLevel) {
          setDrillStep('chapter-select');
        } else {
          setDrillStep('level-select');
        }
      } else if (drillStep === 'chapter-select') {
        setSelectedDrillLevel(null);
        setDrillStep('level-select');
      } else {
        setActiveTab('kanji');
      }
    }
  };

  const handleGoHome = () => {
    setSelectedOverviewLevel(null);
    setSelectedFlashcardLevel(null);
    setSelectedDrillLevel(null);
    setFlashcardStep('level-select');
    setDrillStep('level-select');
    setActiveTab('kanji');
  };

  // Determine BottomNavBar mode dynamically:
  // - 'overview' in LevelOverviewView: Back, Cards, Drill
  // - 'session' in Flashcard sub-pages: Back, Kanji (Home), Drill
  // - 'drill-session' in Drill sub-pages: Back, Kanji (Home), Cards
  // - 'home' in root level lists: Folders, Cards, Drill tabs
  const getNavMode = (): 'home' | 'session' | 'overview' | 'drill-session' => {
    if (activeTab === 'kanji' && selectedOverviewLevel !== null) {
      return 'overview';
    }
    if (activeTab === 'flashcard' && flashcardStep !== 'level-select') {
      return 'session';
    }
    if (activeTab === 'drill' && drillStep !== 'level-select') {
      return 'drill-session';
    }
    return 'home';
  };

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

      {/* 3. Drill Mode Flow (Selection -> Practice -> Completion) */}
      {activeTab === 'drill' && (
        <>
          {drillStep === 'level-select' && (
            <DrillLevelSelect
              selectedKanjiIds={selectedDrillKanjiIds}
              onSelectLevel={(lvl) => {
                setSelectedDrillLevel(lvl);
                setDrillStep('chapter-select');
              }}
              onClearSelection={handleClearDrillSelection}
              onStartDrill={handleStartDrillSession}
            />
          )}

          {drillStep === 'chapter-select' && selectedDrillLevel && (
            <DrillChapterSelect
              level={selectedDrillLevel}
              selectedKanjiIds={selectedDrillKanjiIds}
              onToggleChapter={handleToggleDrillChapter}
              onToggleAllInLevel={handleToggleAllInDrillLevel}
            />
          )}

          {drillStep === 'session' && (
            <DrillSessionView
              items={activeDrillItems}
              onBack={handleBack}
              onComplete={handleDrillComplete}
            />
          )}

          {drillStep === 'completion' && (
            <DrillCompletionView
              durationInSeconds={drillDuration}
              totalCards={activeDrillItems.length}
              onPlayAgain={handleDrillPlayAgain}
              onDone={handleDrillDone}
            />
          )}
        </>
      )}

      {/* Persistent Bottom Action Bar */}
      <BottomNavBar
        mode={getNavMode()}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'kanji') {
            setSelectedOverviewLevel(null);
          } else if (tab === 'flashcard') {
            // Keep existing flashcard selection state or step
          } else if (tab === 'drill') {
            // Keep existing drill selection state or step
          }
        }}
        onBack={handleBack}
        onGoHome={handleGoHome}
        onStartFlashcard={() => {
          setSelectedOverviewLevel(null);
          setSelectedFlashcardLevel(null);
          setFlashcardStep('level-select');
          setActiveTab('flashcard');
        }}
        onStartDrill={() => {
          setSelectedOverviewLevel(null);
          setSelectedDrillLevel(null);
          setDrillStep('level-select');
          setActiveTab('drill');
        }}
      />
    </AppShell>
  );
}

