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
const CHAPTER_TITLES: Record<string, Record<number, { title: string; icon: string }>> = {
  a1: {
    5: { title: 'Bab 5: Tabemono', icon: '🍴' },
    6: { title: 'Bab 6: Nomimono', icon: '🍵' },
    8: { title: 'Bab 8: Ie', icon: '🏠' },
    9: { title: 'Bab 9: Jikan', icon: '⏰' },
    10: { title: 'Bab 10: Youbi', icon: '📅' },
    11: { title: 'Bab 11: Yasumi no hi 1', icon: '🏖️' },
    12: { title: 'Bab 12: Suuji', icon: '🔢' },
    13: { title: 'Bab 13: Machi', icon: '🗺️' },
    16: { title: 'Bab 16: Kaimono', icon: '🛍️' },
    18: { title: 'Bab 18: Yasumi no hi 2', icon: '✈️' },
  },
  'a2-1': {
    1: { title: 'Bab 1: Watashi to Kazoku', icon: '👨‍👩‍👧' },
    2: { title: 'Bab 2: Kuni to Gengo', icon: '🌏' },
    3: { title: 'Bab 3: Tabemono', icon: '🍱' },
    4: { title: 'Bab 4: Ie to Kurashi', icon: '🏡' },
    5: { title: 'Bab 5: Mainichi no Seikatsu', icon: '☀️' },
    6: { title: 'Bab 6: Yasumi no Sugoshikata', icon: '🎮' },
    7: { title: 'Bab 7: Machi no Shisetsu', icon: '🏢' },
    8: { title: 'Bab 8: Kaimono', icon: '🛒' },
    9: { title: 'Bab 9: Kisetsu to Tenki', icon: '⛅' },
  },
  'a2-2': {
    10: { title: 'Bab 10: Kenkou to Karada', icon: '🩺' },
    11: { title: 'Bab 11: Iwai to Purezento', icon: '🎁' },
    12: { title: 'Bab 12: Shumi to Supootsu', icon: '⚽' },
    13: { title: 'Bab 13: Omoide to Ryokou', icon: '📸' },
    14: { title: 'Bab 14: Koutsuu to Douro', icon: '🚗' },
    15: { title: 'Bab 15: Omaturi to Ibento', icon: '🏮' },
    16: { title: 'Bab 16: Shizen to Kankyou', icon: '🌲' },
    17: { title: 'Bab 17: Shigoto to Shokuba', icon: '💼' },
    18: { title: 'Bab 18: Nihon no Bunka', icon: '🏯' },
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
    const chapterMeta = CHAPTER_TITLES[levelId]?.[chapter];
    const title = chapterMeta?.title || `Bab ${chapter}`;
    const icon = chapterMeta?.icon || '🔖';
    const badgeBg = BADGE_COLORS[colorIndex % BADGE_COLORS.length];
    colorIndex++;

    groups.push({
      chapter,
      title,
      icon,
      badgeBg,
      items: groupItems,
    });
  }

  return groups;
}
