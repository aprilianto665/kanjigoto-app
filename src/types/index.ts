export interface KanjiItem {
  id: string;        // Format: '[level]-[nomor]', contoh: 'a1-1'
  kanji: string;     // Karakter Kanji / kata, contoh: '魚'
  furigana: string;  // Cara baca Kana (hiragana/katakana), contoh: 'さかな'
  romaji: string;    // Cara baca Romaji, contoh: 'sakana'
  chapter: number;   // Topik/Bab kemunculan Kanji (kolom 'か')
  topic?: string;    // Nama Topik opsional jika relevan
}
