export interface KanjiItem {
  id: string;          // Format: '[level]-[nomor]', contoh: 'a1-1', 'a2-1-1'
  kanji: string;       // Karakter Kanji / kata, contoh: '魚', '日本'
  furigana: string[];  // Cara baca Kana dalam array, contoh: ['さかな'], ['にほん', 'にっぽん']
  romaji: string[];    // Cara baca Romaji dalam array, contoh: ['sakana'], ['nihon', 'nippon']
  chapter: number;     // Topik/Bab kemunculan Kanji (kolom 'か')
  topic?: string;      // Nama Topik opsional jika relevan
}

export type LevelId = 'a1' | 'a2-1' | 'a2-2' | 'b1';

export interface LevelInfo {
  id: LevelId;
  title: string;
  subtitle: string;
  kanjiCount: number;
  available: boolean;
  accentColor: string; // e.g. '#C7D9FE' for top tab backplate
  badgeBg?: string;
}

export interface ChapterGroup {
  chapter: number;
  title: string;
  badgeBg: string;
  items: KanjiItem[];
}

export type NavTab = 'kanji' | 'flashcard' | 'drill';
