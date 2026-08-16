import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { LevelInfo } from '../../../types';
import { getKanjiByLevel, groupKanjiByChapter } from '../../../data';
import { ChapterBadge, Toast } from '../../../components/ui';
import { KanjiTile2Col } from './KanjiTile2Col';

interface LevelOverviewViewProps {
  level: LevelInfo;
}

export const LevelOverviewView: React.FC<LevelOverviewViewProps> = ({ level }) => {
  const [playingKanjiId, setPlayingKanjiId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const kanjiList = useMemo(() => getKanjiByLevel(level.id), [level.id]);
  const chapterGroups = useMemo(
    () => groupKanjiByChapter(kanjiList, level.id),
    [kanjiList, level.id]
  );

  // Stop any active speech synthesis when navigating away / unmounting
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayTTS = useCallback(
    (kanjiId: string, text: string) => {
      // 1. Fallback if browser doesn't support Web Speech API
      if (typeof window === 'undefined' || !('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
        setToastMessage('Text-to-speech is not supported in this browser.');
        return;
      }

      // 2. Stop any ongoing speech
      window.speechSynthesis.cancel();

      // 3. Toggle off if clicking the currently active/playing kanji card
      if (playingKanjiId === kanjiId) {
        setPlayingKanjiId(null);
        return;
      }

      // 4. Create and configure speech utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;

      utterance.onend = () => {
        setPlayingKanjiId(null);
      };

      utterance.onerror = () => {
        setPlayingKanjiId(null);
      };

      // 5. Play speech and set active state
      window.speechSynthesis.speak(utterance);
      setPlayingKanjiId(kanjiId);
    },
    [playingKanjiId]
  );

  return (
    <div className="relative flex-1 flex flex-col min-h-0 overflow-hidden px-5 pt-6 pb-2 max-w-sm mx-auto w-full">
      {/* Header with Level Title (fixed at top) */}
      <header className="shrink-0 text-center mb-3">
        <h1 className="font-header font-bold text-2xl text-stone-900 tracking-tight">
          Marugoto {level.title.split(' ')[0]}
        </h1>
        <p className="font-handwritten text-sm text-stone-600 font-bold mt-0.5">
          {kanjiList.length} Kanji Total
        </p>
      </header>

      {/* Chapters & 2-Column Kanji Grids: scrollable container without visible scrollbar */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar min-h-0 space-y-6 max-w-sm mx-auto w-full pt-1 pb-4 px-1">
        {chapterGroups.map((group) => (
          <section key={group.chapter} className="space-y-3">
            {/* Chapter Separator Badge with Heroicon Bookmark */}
            <div className="flex items-center">
              <ChapterBadge
                title={group.title}
                colorClass={group.badgeBg}
              />
            </div>

            {/* 2-Column Grid of Kanji */}
            <div className="grid grid-cols-2 gap-2.5">
              {group.items.map((item) => (
                <KanjiTile2Col
                  key={item.id}
                  item={item}
                  isActive={playingKanjiId === item.id}
                  onClick={() => handlePlayTTS(item.id, item.kanji)}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Fallback Toast Notification */}
      <Toast
        message={toastMessage || ''}
        isVisible={!!toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};

