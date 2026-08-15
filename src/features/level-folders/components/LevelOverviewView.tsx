import React, { useMemo } from 'react';
import type { LevelInfo } from '../../../types';
import { getKanjiByLevel, groupKanjiByChapter } from '../../../data';
import { ChapterBadge } from '../../../components/ui/ChapterBadge';
import { KanjiTile2Col } from './KanjiTile2Col';

interface LevelOverviewViewProps {
  level: LevelInfo;
}

export const LevelOverviewView: React.FC<LevelOverviewViewProps> = ({ level }) => {
  const kanjiList = useMemo(() => getKanjiByLevel(level.id), [level.id]);
  const chapterGroups = useMemo(
    () => groupKanjiByChapter(kanjiList, level.id),
    [kanjiList, level.id]
  );

  return (
    <div className="flex-1 flex flex-col px-4 pt-6 pb-6">
      {/* Header with Level Title */}
      <header className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Marugoto {level.title.split(' ')[0]}
        </h1>
        <p className="font-handwritten text-sm text-stone-600 font-bold mt-0.5">
          {kanjiList.length} Kanji Total
        </p>
      </header>

      {/* Chapters & 2-Column Kanji Grids */}
      <main className="space-y-6 max-w-sm mx-auto w-full">
        {chapterGroups.map((group) => (
          <section key={group.chapter} className="space-y-3">
            {/* Chapter Separator Badge */}
            <div className="flex items-center">
              <ChapterBadge
                title={group.title}
                icon={group.icon}
                colorClass={group.badgeBg}
              />
            </div>

            {/* 2-Column Grid of Kanji */}
            <div className="grid grid-cols-2 gap-2.5">
              {group.items.map((item) => (
                <KanjiTile2Col key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};
