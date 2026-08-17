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
    6: 'Chapter 6: Tabemono',
    8: 'Chapter 8: Ie',
    9: 'Chapter 9: Seikatsu',
    10: 'Chapter 10: Seikatsu',
    11: 'Chapter 11: Yasumi no hi 1',
    12: 'Chapter 12: Yasumi no hi 1',
    13: 'Chapter 13: Machi',
    16: 'Chapter 16: Kaimono',
    18: 'Chapter 18: Yasumi no hi 2',
  },
  'a2-1': {
    1: 'Chapter 1: Watashi to Kazoku',
    2: 'Chapter 2: Watashi to Kazoku',
    3: 'Chapter 3: Kisetsu to Tenki',
    4: 'Chapter 4: Kisetsu to Tenki',
    5: 'Chapter 5: Watashi no Machi',
    6: 'Chapter 6: Watashi no Machi',
    7: 'Chapter 7: Dekakeru',
    8: 'Chapter 8: Dekakeru',
    9: 'Chapter 9: Gaikokugo to Gaikoku Bunka',
    10: 'Chapter 10: Gaikokugo to Gaikoku Bunka',
    11: 'Chapter 11: Soto de Taberu',
    12: 'Chapter 12: Soto de Taberu',
    13: 'Chapter 13: Shucchou',
    14: 'Chapter 14: Shucchou',
    15: 'Chapter 15: Kenkou',
    16: 'Chapter 16: Kenkou',
    17: 'Chapter 17: Oiwai',
    18: 'Chapter 18: Oiwai',
  },
  'a2-2': {
    1: 'Chapter 1: Atarashii Tomodachi',
    2: 'Chapter 2: Atarashii Tomodachi',
    3: 'Chapter 3: Mise de Taberu',
    4: 'Chapter 4: Mise de Taberu',
    5: 'Chapter 5: Okinawa Ryokou',
    6: 'Chapter 6: Okinawa Ryokou',
    7: 'Chapter 7: Nihon Matsuri',
    8: 'Chapter 8: Nihon Matsuri',
    9: 'Chapter 9: Tokubetsu na Hi',
    10: 'Chapter 10: Tokubetsu na Hi',
    11: 'Chapter 11: Netto Shoppingu',
    12: 'Chapter 12: Netto Shoppingu',
    13: 'Chapter 13: Rekishi to Bunka no Machi',
    14: 'Chapter 14: Rekishi to Bunka no Machi',
    15: 'Chapter 15: Seikatsu to Eko',
    16: 'Chapter 16: Seikatsu to Eko',
    17: 'Chapter 17: Jinsei',
    18: 'Chapter 18: Jinsei',
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
