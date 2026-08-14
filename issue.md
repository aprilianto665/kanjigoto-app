# Issue: Ekstraksi Data Master Kanji Marugoto (Semua Level)

Issue ini berisi pedoman dan instruksi umum untuk mengekstrak data master Kanji Marugoto dari referensi dokumen/PDF per level (A1, A2.1, A2.2, dst.) ke dalam file konstanta TypeScript di folder `src/data/`.

Sesuai dengan arsitektur pada `KANJIGOTO_PROJECT_PLAN_V3.md`, seluruh data Kanji disimpan dalam file `.ts` statis secara modular per level.

## Konteks & Tujuan
Menyediakan master data Kanji yang terstruktur untuk seluruh level kurikulum Marugoto. Data ini digunakan untuk:
- Navigasi folder level & bab di halaman utama (Mobile-First 2-Column Grid).
- Kuis interaktif mode **Manual Input Drill** (RealKana style).
- Mode **Randomized Flashcard** dengan toggle show/hide furigana & romaji.

## Struktur Data (TypeScript Interface)

Interface didefinisikan pada `src/types/index.ts`:

```typescript
export interface KanjiItem {
  id: string;        // Format: '[level]-[nomor]', contoh: 'a1-1', 'a2-1-1'
  kanji: string;     // Karakter Kanji / kata, contoh: '魚', '食べます'
  furigana: string;  // Cara baca Kana (hiragana/katakana), contoh: 'さかな'
  romaji: string;    // Cara baca Romaji, contoh: 'sakana'
  chapter: number;   // Topik/Bab kemunculan Kanji (kolom 'か')
  topic?: string;    // Nama Topik opsional jika relevan
}
```

## Konvensi Penamaan & Format

1. **File Data per Level (`src/data/`):**
   - Level A1: `marugoto-a1.ts` (`export const MARUGOTO_A1: KanjiItem[]`)
   - Level A2.1: `marugoto-a2-1.ts` (`export const MARUGOTO_A2_1: KanjiItem[]`)
   - Level A2.2: `marugoto-a2-2.ts` (`export const MARUGOTO_A2_2: KanjiItem[]`)

2. **Format ID:**
   - A1: `a1-1`, `a1-2`, dst.
   - A2.1: `a2-1-1`, `a2-1-2`, dst.
   - A2.2: `a2-2-1`, `a2-2-2`, dst.

## Tahapan Implementasi Ekstraksi per Level

1. **Baca Dokumen / PDF Referensi Level:**
   - **かんじ (Kanji)** -> Masukkan ke properti `kanji`.
   - **よみかた (Yomikata/Furigana)** -> Masukkan ke properti `furigana`.
   - **か (Ka/Chapter)** -> Masukkan ke properti `chapter` sebagai angka (`number`).
   - **Romaji** -> Terjemahkan secara akurat dari *Furigana* (Hepburn standard).

2. **Buat / Update File Data:**
   - Simpan array objek Kanji ke `src/data/marugoto-[level].ts`.

3. **Daftarkan ke Entry Point Data:**
   - Ekspor konstanta dari `src/data/index.ts` agar mudah diakses oleh modul lain:
   ```typescript
   export { MARUGOTO_A1 } from './marugoto-a1';
   export { MARUGOTO_A2_1 } from './marugoto-a2-1';
   // dst...
   ```

## Progress Level

- [x] **Level A1 (Katsudoo / Rikai)** - 65 Kanji (`src/data/marugoto-a1.ts`)
- [ ] **Level A2.1 (Rikai)** - *Menunggu data/dokumen referensi*
- [ ] **Level A2.2 (Rikai)** - *Menunggu data/dokumen referensi*

## Kriteria Penerimaan (Acceptance Criteria)
- Data Kanji setiap level diekstrak lengkap sesuai dokumen resmi Marugoto.
- Nilai Romaji tepat dan bebas dari salah ketik.
- Seluruh konstanta terekspor dengan rapi melalui `src/data/index.ts`.
- `bun run build` lolos tanpa error TypeScript.
