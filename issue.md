# Issue: Ekstraksi Data Master Kanji Marugoto (Semua Level)

Issue ini berisi pedoman dan instruksi umum untuk mengekstrak data master Kanji Marugoto dari referensi dokumen/PDF per level (A1, A2.1, A2.2, dst.) ke dalam file konstanta TypeScript di folder `src/data/`.

Sesuai dengan arsitektur pada `KANJIGOTO_PROJECT_PLAN_V3.md`, seluruh data Kanji disimpan dalam file `.ts` statis secara modular per level.

## Konteks & Tujuan
Menyediakan master data Kanji yang terstruktur dan terisolasi per level kurikulum Marugoto. Data ini digunakan untuk:
- Navigasi folder level & bab di halaman utama (Mobile-First 2-Column Grid).
- Kuis interaktif mode **Manual Input Drill** (RealKana style).
- Mode **Randomized Flashcard** dengan toggle show/hide furigana & romaji.

## Struktur Data (TypeScript Interface)

Interface didefinisikan pada `src/types/index.ts`. **Furigana dan Romaji menggunakan array of string (`string[]`)** untuk menampung cara baca alternatif / lebih dari satu (menghindari penggunaan tanda pemisah slash `/`):

```typescript
export interface KanjiItem {
  id: string;          // Format: '[level]-[nomor]', contoh: 'a1-1', 'a2-1-1'
  kanji: string;       // Karakter Kanji / kata, contoh: '魚', '日本'
  furigana: string[];  // Cara baca Kana dalam array, contoh: ['さかな'], ['にほん', 'にっぽん']
  romaji: string[];    // Cara baca Romaji dalam array, contoh: ['sakana'], ['nihon', 'nippon']
  chapter: number;     // Topik/Bab kemunculan Kanji (kolom 'か')
  topic?: string;      // Nama Topik opsional jika relevan
}
```

## ⚠️ Catatan Penting Mengenai Dokumen Referensi Level Lanjutan

Pada dokumen PDF Marugoto level lanjutan (seperti **A2.1 / 初級 1**, **A2.2 / 初級 2**, dst.):
1. **Kumulatif dari Level Sebelumnya:** PDF level atas tetap memuat daftar Kanji dari level sebelumnya (misalnya ada bagian *入門 (にゅうもん)* sebelum *初級 (しょきゅう) 1*).
2. **Aturan Ekstraksi:** **HANYA ekstrak Kanji baru milik level tersebut.** Jangan memasukkan kembali Kanji dari level sebelumnya agar tidak terjadi duplikasi data antar file.
   - Contoh: Pada PDF A2.1 (初級 1), lewati nomor 1–65 (bagian 入門), dan mulai ekstrak dari nomor 66 (bagian 初級 1).
3. **Reset Indeks Bab / Kolom `か`:** Pada bagian level baru, kolom `か` (chapter) akan **direset dan mulai dari 1 lagi**. Simpan angka bab sesuai kolom `か` di bagian level baru tersebut.
4. **Pembacaan Ganda (Multiple Readings):** Jika kolom *よみかた* memuat lebih dari satu cara baca (misal `にほん／にっぽん`, `よん／し`), pisahkan menjadi elemen array terpisah:
   - `furigana: ['にほん', 'にっぽん']`
   - `romaji: ['nihon', 'nippon']`

## Konvensi Penamaan & Format

1. **File Data per Level (`src/data/`):**
   - Level A1: `marugoto-a1.ts` (`export const MARUGOTO_A1: KanjiItem[]`)
   - Level A2.1: `marugoto-a2-1.ts` (`export const MARUGOTO_A2_1: KanjiItem[]`)
   - Level A2.2: `marugoto-a2-2.ts` (`export const MARUGOTO_A2_2: KanjiItem[]`)

2. **Format ID:**
   - A1: `a1-1`, `a1-2`, dst.
   - A2.1: `a2-1-1`, `a2-1-2`, dst. (dimulai dari item pertama khusus level A2.1)
   - A2.2: `a2-2-1`, `a2-2-2`, dst.

## Tahapan Implementasi Ekstraksi per Level

1. **Baca Dokumen / PDF Referensi Level:**
   - Identifikasi bagian level baru (misal: *初級 1* pada A2.1) dan abaikan bagian review level sebelumnya (*入門*).
   - **かんじ (Kanji)** -> Masukkan ke properti `kanji`.
   - **よみかた (Yomikata/Furigana)** -> Masukkan ke properti `furigana` sebagai `string[]`.
   - **か (Ka/Chapter)** -> Masukkan ke properti `chapter` sebagai angka (`number`).
   - **Romaji** -> Terjemahkan secara akurat dari *Furigana* (Hepburn standard) sebagai `string[]`.

2. **Simpan ke File Data:**
   - Simpan array objek Kanji ke `src/data/marugoto-[level].ts`.

3. **Daftarkan ke Entry Point Data:**
   - Ekspor konstanta dari `src/data/index.ts`:
   ```typescript
   export { MARUGOTO_A1 } from './marugoto-a1';
   export { MARUGOTO_A2_1 } from './marugoto-a2-1';
   // dst...
   ```

## Progress Level

- [x] **Level A1 (Katsudoo / Rikai)** - 65 Kanji (`src/data/marugoto-a1.ts`)
- [x] **Level A2.1 (Rikai / 初級 1)** - 156 Kanji (`src/data/marugoto-a2-1.ts`)
- [ ] **Level A2.2 (Rikai / 初級 2)** - *Menunggu data/dokumen referensi*

## Kriteria Penerimaan (Acceptance Criteria)
- `furigana` dan `romaji` bertipe `string[]` tanpa ada karakter pemisah slash `/`.
- Data Kanji setiap level diekstrak lengkap hanya untuk Kanji spesifik level tersebut.
- Nilai `chapter` tepat sesuai kolom `か` level bersangkutan.
- Seluruh konstanta terekspor melalui `src/data/index.ts`.
- `bun run build` lolos tanpa error TypeScript.
