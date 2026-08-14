export interface KanjiItem {
  id: string;          // Format: '[level]-[nomor]', contoh: 'a1-1', 'a2-1-1'
  kanji: string;       // Karakter Kanji / kata, contoh: '魚', '日本'
  furigana: string[];  // Cara baca Kana dalam array, contoh: ['さかな'], ['にほん', 'にっぽん']
  romaji: string[];    // Cara baca Romaji dalam array, contoh: ['sakana'], ['nihon', 'nippon']
  chapter: number;     // Topik/Bab kemunculan Kanji (kolom 'か')
  topic?: string;      // Nama Topik opsional jika relevan
}
