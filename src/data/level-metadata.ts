import type { ChapterGroup, KanjiItem, LevelId, LevelInfo } from '../types';
import { MARUGOTO_A1 } from './marugoto-a1';
import { MARUGOTO_A2_1 } from './marugoto-a2-1';
import { MARUGOTO_A2_2 } from './marugoto-a2-2';

export const MARUGOTO_LEVELS: LevelInfo[] = [
  {
    id: 'a1',
    title: 'A1 (Katsudoo)',
    subtitle: `${MARUGOTO_A1.length} Kanji Inside`,
    kanjiCount: MARUGOTO_A1.length,
    available: true,
    accentColor: '#92B7FE', // pastel blue
    badgeBg: '#DDD6FE', // pastel purple
  },
  {
    id: 'a2-1',
    title: 'A2.1 (Rikai)',
    subtitle: `${MARUGOTO_A2_1.length} Kanji Inside`,
    kanjiCount: MARUGOTO_A2_1.length,
    available: true,
    accentColor: '#D2B4FE', // pastel purple
    badgeBg: '#FED7AA', // pastel orange/peach
  },
  {
    id: 'a2-2',
    title: 'A2.2 (Rikai)',
    subtitle: `${MARUGOTO_A2_2.length} Kanji Inside`,
    kanjiCount: MARUGOTO_A2_2.length,
    available: true,
    accentColor: '#FEC2C7', // pastel pink
    badgeBg: '#BAE6FD', // pastel blue
  },
  {
    id: 'b1',
    title: 'B1 (Coming Soon)',
    subtitle: 'Under construction',
    kanjiCount: 0,
    available: false,
    accentColor: '#CBD5E1', // pastel slate/gray
  },
];

export function getAllKanji(): KanjiItem[] {
  return [...MARUGOTO_A1, ...MARUGOTO_A2_1, ...MARUGOTO_A2_2];
}

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
    5: 'Chapter 5: Tabemono',
    6: 'Chapter 6: Nomimono',
    8: 'Chapter 8: Ie',
    9: 'Chapter 9: Jikan',
    10: 'Chapter 10: Youbi',
    11: 'Chapter 11: Yasumi no hi 1',
    12: 'Chapter 12: Suuji',
    13: 'Chapter 13: Machi',
    16: 'Chapter 16: Kaimono',
    18: 'Chapter 18: Yasumi no hi 2',
  },
  'a2-1': {
    1: 'Chapter 1: Watashi to Kazoku',
    2: 'Chapter 2: Kuni to Gengo',
    3: 'Chapter 3: Tabemono',
    4: 'Chapter 4: Ie to Kurashi',
    5: 'Chapter 5: Mainichi no Seikatsu',
    6: 'Chapter 6: Yasumi no Sugoshikata',
    7: 'Chapter 7: Machi no Shisetsu',
    8: 'Chapter 8: Kaimono',
    9: 'Chapter 9: Kisetsu to Tenki',
  },
  'a2-2': {
    10: 'Chapter 10: Kenkou to Karada',
    11: 'Chapter 11: Iwai to Purezento',
    12: 'Chapter 12: Shumi to Supootsu',
    13: 'Chapter 13: Omoide to Ryokou',
    14: 'Chapter 14: Koutsuu to Douro',
    15: 'Chapter 15: Omaturi to Ibento',
    16: 'Chapter 16: Shizen to Kankyou',
    17: 'Chapter 17: Shigoto to Shokuba',
    18: 'Chapter 18: Nihon no Bunka',
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
    const title = CHAPTER_TITLES[levelId]?.[chapter] || `Chapter ${chapter}`;
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
