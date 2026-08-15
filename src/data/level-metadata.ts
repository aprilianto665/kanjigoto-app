import type { ChapterGroup, KanjiItem, LevelId, LevelInfo } from '../types';
import { MARUGOTO_A1 } from './marugoto-a1';
import { MARUGOTO_A2_1 } from './marugoto-a2-1';
import { MARUGOTO_A2_2 } from './marugoto-a2-2';

export const MARUGOTO_LEVELS: LevelInfo[] = [
  {
    id: 'a1',
    title: 'A1 (Katsudoo)',
    subtitle: '35 Kanji Inside',
    kanjiCount: MARUGOTO_A1.length,
    available: true,
    accentColor: '#C7D9FE', // pastel blue
    badgeBg: '#DDD6FE', // pastel purple
  },
  {
    id: 'a2-1',
    title: 'A2.1 (Rikai)',
    subtitle: '80 Kanji Inside',
    kanjiCount: MARUGOTO_A2_1.length,
    available: true,
    accentColor: '#E8D4FE', // pastel purple
    badgeBg: '#FED7AA', // pastel orange/peach
  },
  {
    id: 'a2-2',
    title: 'A2.2 (Rikai)',
    subtitle: '120 Kanji Inside',
    kanjiCount: MARUGOTO_A2_2.length,
    available: true,
    accentColor: '#FED4D4', // pastel pink
    badgeBg: '#BAE6FD', // pastel blue
  },
  {
    id: 'b1',
    title: 'B1 (Coming Soon)',
    subtitle: 'Under construction',
    kanjiCount: 0,
    available: false,
    accentColor: '#E2E8F0', // pastel slate/gray
  },
];

export function getKanjiByLevel(levelId: LevelId): KanjiItem[] {
  switch (levelId) {
    case 'a1':
      return MARUGOTO_A1;
    case 'a2-1':
      return MARUGOTO_A2_1;
    case 'a2-2':
      return MARUGOTO_A2_2;
    default:
      return [];
  }
}

// Chapter Topic Title Mappings for Marugoto
const CHAPTER_TITLES: Record<string, Record<number, string>> = {
  a1: {
    5: 'Bab 5: Tabemono',
    6: 'Bab 6: Nomimono',
    8: 'Bab 8: Ie',
    9: 'Bab 9: Jikan',
    10: 'Bab 10: Youbi',
    11: 'Bab 11: Yasumi no hi 1',
    12: 'Bab 12: Suuji',
    13: 'Bab 13: Machi',
    16: 'Bab 16: Kaimono',
    18: 'Bab 18: Yasumi no hi 2',
  },
  'a2-1': {
    1: 'Bab 1: Watashi to Kazoku',
    2: 'Bab 2: Kuni to Gengo',
    3: 'Bab 3: Tabemono',
    4: 'Bab 4: Ie to Kurashi',
    5: 'Bab 5: Mainichi no Seikatsu',
    6: 'Bab 6: Yasumi no Sugoshikata',
    7: 'Bab 7: Machi no Shisetsu',
    8: 'Bab 8: Kaimono',
    9: 'Bab 9: Kisetsu to Tenki',
  },
  'a2-2': {
    10: 'Bab 10: Kenkou to Karada',
    11: 'Bab 11: Iwai to Purezento',
    12: 'Bab 12: Shumi to Supootsu',
    13: 'Bab 13: Omoide to Ryokou',
    14: 'Bab 14: Koutsuu to Douro',
    15: 'Bab 15: Omaturi to Ibento',
    16: 'Bab 16: Shizen to Kankyou',
    17: 'Bab 17: Shigoto to Shokuba',
    18: 'Bab 18: Nihon no Bunka',
  },
};

const BADGE_COLORS = [
  'bg-[#DDD6FE] text-purple-900 border-stone-800', // pastel purple
  'bg-[#FBCFE8] text-pink-900 border-stone-800',   // pastel pink
  'bg-[#BAE6FD] text-sky-900 border-stone-800',    // pastel blue
  'bg-[#FEF08A] text-amber-900 border-stone-800',  // pastel yellow
  'bg-[#BBF7D0] text-emerald-900 border-stone-800',// pastel green
  'bg-[#FED7AA] text-orange-900 border-stone-800', // pastel orange
];

export function groupKanjiByChapter(items: KanjiItem[], levelId: LevelId): ChapterGroup[] {
  const chapterMap = new Map<number, KanjiItem[]>();

  for (const item of items) {
    const list = chapterMap.get(item.chapter) || [];
    list.push(item);
    chapterMap.set(item.chapter, list);
  }

  const groups: ChapterGroup[] = [];
  let colorIndex = 0;

  for (const [chapter, groupItems] of chapterMap.entries()) {
    const title = CHAPTER_TITLES[levelId]?.[chapter] || `Bab ${chapter}`;
    const badgeBg = BADGE_COLORS[colorIndex % BADGE_COLORS.length];
    colorIndex++;

    groups.push({
      chapter,
      title,
      badgeBg,
      items: groupItems,
    });
  }

  return groups;
}
