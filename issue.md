# Issue: Ekstraksi Data Kanji Marugoto (Level A1)

Issue ini berisi instruksi untuk mengekstrak data Kanji dari referensi PDF Marugoto A1 ke dalam file konstanta (data statis) yang akan digunakan oleh aplikasi **KanjiGoto**.

Sesuai dengan arsitektur pada `KANJIGOTO_PROJECT_PLAN_V3.md`, aplikasi kita adalah aplikasi *Pure Frontend* tanpa database backend. Seluruh data Kanji disimpan dalam file `.ts` statis di dalam folder `src/data/`.

## Konteks & Tujuan
Tujuan tugas ini adalah menyalin dan menstrukturkan daftar Kanji A1 yang ada pada dokumen referensi ke dalam format array of object TypeScript. Data ini nantinya akan menjadi sumber data untuk navigasi folder level, grid view, serta kuis Drill dan Flashcard.

## Struktur Data (TypeScript Interface)

Sebelum membuat data, definisikan interface berikut di dalam `src/types/index.ts` (atau di dalam file datanya langsung):

```typescript
export interface KanjiItem {
  id: string;        // Format: '[level]-[nomor]', contoh: 'a1-1'
  kanji: string;     // Karakter Kanji, contoh: '魚'
  furigana: string;  // Cara baca Kana (hiragana/katakana), contoh: 'さかな'
  romaji: string;    // Cara baca Romaji, contoh: 'sakana'
  chapter: number;   // Topik/Bab kemunculan Kanji, diambil dari kolom 'か' di referensi
}
```

## Tahapan Implementasi (Untuk Programmer / AI Agent)

### 1. Buat File Data untuk Level A1
1. Buat file baru di path: `src/data/marugoto-a1.ts`.
2. Di dalam file tersebut, ekspor sebuah konstanta array (misalnya `export const MARUGOTO_A1: KanjiItem[] = [ ... ];`).

### 2. Ekstraksi dan Translasi Data dari PDF
Baca file referensi PDF Marugoto A1 yang diberikan. Anda akan melihat tabel dengan 3 kolom utama:
- **かんじ (Kanji)** -> Masukkan ke properti `kanji`.
- **よみかた (Yomikata/Furigana)** -> Masukkan ke properti `furigana`.
- **か (Ka/Chapter)** -> Masukkan ke properti `chapter` sebagai angka (number).

**Tugas Tambahan pada proses ekstraksi:**
- Kolom **Romaji** tidak ada di dokumen referensi. Anda harus menerjemahkan/mengonversi *Furigana* tersebut ke dalam *Romaji* secara manual/otomatis dan menyimpannya di properti `romaji`.
- Kolom **id** dibuat dengan format `a1-[nomor urut]`.

**Contoh baris pertama dari PDF:**
- Nomor urut: 1
- Kanji: 魚
- Yomikata: さかな
- Ka: 5

**Hasil Objek:**
```typescript
{
  id: 'a1-1',
  kanji: '魚',
  furigana: 'さかな',
  romaji: 'sakana',
  chapter: 5
}
```

### 3. Ekstrak Seluruh Data
Lakukan proses di atas untuk seluruh baris Kanji yang ada di referensi A1 (mulai dari nomor 1 hingga selesai, perhatikan pembagian bab/topiknya). 

### 4. Buat File Index (Data Entry Point)
1. Buat file `src/data/index.ts`.
2. Ekspor data dari `marugoto-a1.ts` agar mudah di-import oleh fitur lain.
   ```typescript
   export { MARUGOTO_A1 } from './marugoto-a1';
   ```

### Kriteria Penerimaan (Acceptance Criteria)
- File `src/data/marugoto-a1.ts` berisi array lengkap dari seluruh Kanji di A1 sesuai referensi.
- Setiap objek Kanji memiliki struktur `id`, `kanji`, `furigana`, `romaji`, dan `chapter` yang valid.
- Tidak ada data Romaji yang salah ketik (harus sesuai dengan Furigana standar).
- File tidak memiliki error TypeScript.
