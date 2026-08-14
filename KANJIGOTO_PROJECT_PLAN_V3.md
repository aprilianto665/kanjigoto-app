# 📝 High-Level Project Plan: KanjiGoto

## 1. Ringkasan Proyek & Tujuan (Executive Summary & Objectives)

* **Executive Summary:**  
  **KanjiGoto** adalah aplikasi web latihan dan penghafalan Kanji minimalis yang dirancang khusus mengikuti kurikulum **Marugoto**. Berbeda dari aplikasi kuis konvensional, KanjiGoto mengusung pendekatan navigasi **Folder per Level** dengan tampilan **Mobile-First 2-Column Grid** untuk *overview* cepat. Aplikasi ini menyediakan dua mode latihan utama: **Manual Input Drill** (ketik manual ala RealKana) dan **Randomized Flashcard** (pengenalan visual). Seluruh latihan dijalankan secara acak (*randomized recognition*) tanpa pengulangan Kanji yang sudah selesai di sesi berjalan untuk melatih memori aktif (*active recall*).

* **Tujuan Utama (Objectives):**
  * Menyajikan antarmuka **Mobile-First** yang bersih dan intuitif dengan struktur folder navigasi per level Marugoto (A1, A2.1, A2.2, dst.).
  * Menampilkan seluruh Kanji dalam tiap level menggunakan tata letak **Grid 2 Kolom** yang efisien di layar smartphone, lengkap dengan separator bab berupa *subtitle/header*.
  * Menyediakan dua mode latihan fleksibel: **Manual Input Drill** (ketik instan tanpa rasa frustrasi) dan **Randomized Flashcard** (kartu flip).
  * Menerapkan sistem pengacakan tanpa pengulangan (*no-repeat queue*) yang diakhiri dengan layar penyelesaian (*congratulations screen*).
  * Mengusung estetika visual **Toddler Drawing Style** yang ramah, unik, dan tidak mengintimidasi.

---

## 2. Persyaratan Fungsional (Functional Requirements)

* **Level Folder Navigation & Mobile-First Grid Layout (Halaman Utama):**
  * **Level Folders:** Pengguna memilih folder level Marugoto (A1, A2.1, A2.2, dst.) pada tampilan utama.
  * **2-Column Grid Layout:** Di dalam folder level yang dipilih, seluruh Kanji ditampilkan dalam format grid 2 kolom yang ringkas dan nyaman diusap (*scroll*) pada layar smartphone.
  * **Card Item Content:** Setiap tile dalam grid menampilkan **Kanji**, **Furigana**, dan **Romaji**.
  * **Chapter Separator Subtitles:** Antar bab dipisahkan oleh pembatas visual berupa *subtitle header* yang tegas (misal: `"Bab 1: Perkenalan"`, `"Bab 2: Makanan"`).
  * **Quick Practice Trigger:** Tombol cepat untuk memulai mode latihan (**Drill** atau **Flashcard**) langsung dari folder level atau bab yang dipilih.

* **Mode Latihan 1: RealKana-Style Manual Input Drill Mode:**
  * **Input Manual (Text Input Drill):** Kuis **bukan pilihan ganda**. Kanji acak dimunculkan satu per satu, dan pengguna mengetikkan jawaban (Romaji/Kana) pada *input box* lalu menekan `Enter`.
  * **Umpan Balik Instan (Seamless & Silent Correction):**
    * Jika jawaban **benar**, sistem secara instan beralih ke Kanji acak berikutnya.
    * Jika jawaban **salah**, **tidak terjadi apa-apa** (input tetap menampung ketikan/di-reset secara hening) agar ritme pengetikan tidak terinterupsi.
  * **Antrean Tanpa Pengulangan (No-Repeat Queue):** Kanji yang dijawab benar dikeluarkan dari antrean sesi dan **tidak muncul lagi** hingga seluruh set Kanji habis.
  * **Layar Penyelesaian (Completion Screen):** Menampilkan **pesan ucapan selamat (*congratulations*)** beserta tombol **Main Lagi (Restart)** dan **Kembali ke Folder Level (Back)**.

* **Mode Latihan 2: Randomized Flashcard Mode:**
  * **Tampilan Kartu Kanji Acak:** Menampilkan kartu Kanji acak satu per satu dari level yang dipilih.
  * **Koin/Kartu Flip (Reveal On-Click):** Klik/ketuk kartu untuk membalik dan menampilkan Furigana & Romaji.
  * **Visual Toggle Control (Hide/Show):** Opsi *toggle* dinamis untuk menyembunyikan/menampilkan komponen (*Toggle Hide/Show Furigana* & *Toggle Hide/Show Romaji*).
  * **Antrean Unik (No-Repeat Stack):** Kartu yang sudah dibuka tidak akan muncul kembali di sesi tersebut.
  * **Layar Penyelesaian (Completion Screen):** Menampilkan **ucapan selamat (*congratulations*)** beserta tombol **Main Lagi** dan **Kembali ke Folder**.

* **Settings & Persistence (Client-Side):**
  * Menyimpan folder level terakhir yang dibuka, preferensi mode latihan, dan opsi *toggle hide* menggunakan `localStorage`.

---

## 3. Persyaratan Non-Fungsional (Non-Functional Requirements)

* **Pure Frontend Architecture:**
  * Tidak memerlukan database atau backend server. Seluruh data Kanji, level, dan bab Marugoto disimpan sebagai file statis (`.json` / `.ts`).
* **Instant Load & Zero Latency:**
  * Navigasi folder, *scrolling* grid 2 kolom, dan pengacakan kuis berjalan serba instan di sisi *client*.
* **Mobile-First Design Focus:**
  * Dirancang dan dioptimalkan utama untuk viewport seluler (pencapaian ibu jari/thumb-zone navigation, *touch targets* besar, responsivitas keyboard *on-screen*).
* **Tech Stack:**
  * **Framework/Library:** React.js + TypeScript
  * **Styling:** Tailwind CSS

---

## 4. Estetika & UI/UX Design: *Mobile-First & Toddler Drawing Style*

* **Mobile-First Layout Strategy:**
  * **2-Column Compact Grid:** Dipilih secara khusus agar muat banyak Kanji dalam satu jangkauan layar hp tanpa terasa sesak.
  * **Thumb-Friendly Actions:** Tombol utama (pilih folder, mulai drill, flip card, next) diletakkan di area bawah layar yang mudah dijangkau ibu jari.
* **Toddler Drawing Style Aesthetics:**
  * **Garis & Border Wobbly:** Efek garis luar yang tidak lurus sempurna seperti coretan spidol/krayon anak-anak.
  * **Tipografi:** Kombinasi *font* gaya tulisan tangan (*handwritten/doodle font*) seperti *Kalam*, *Gaegu*, atau *Comic Shanns* untuk teks Latin & UI, dipadukan dengan font Kanji standar yang jelas dan tegas.
  * **Palet Warna Krayon/Pastel:** Aksen warna krem kertas gambar, kuning krayon, biru langit, dan hijau pastel.
  * **Folder & Cutout Visuals:** Ikon folder dan *card* didesain menyerupai kantong kertas atau stiker tempel buatan tangan.

---

## 5. Arsitektur Informasi & Struktur Folder (Feature-Based Architecture)

```text
kanjigoto/
├── public/
│   └── assets/                  # Fonts kustom, doodle folder icons, SVG filters
├── src/
│   ├── app/                     # Layout App Shell (Mobile Viewport Container)
│   ├── components/ui/           # Reusable UI components (Input, Button, Card, FolderIcon ala Toddler Style)
│   ├── data/                    # Master Data Kanji Marugoto per Level & Bab
│   │   ├── marugoto-a1.ts
│   │   ├── marugoto-a2-1.ts
│   │   └── index.ts
│   ├── features/                # Feature-Based Architecture
│   │   ├── level-folders/       # Navigasi Folder Level & Tampilan Grid 2 Kolom (dengan Separator Subtitle)
│   │   │   ├── components/      # FolderList, LevelGridView, ChapterSubtitleSeparator, KanjiTile2Col
│   │   │   └── hooks/
│   │   ├── drill-mode/          # Fitur Drill Input Manual (RealKana Style - Silent Correct & No Repeat)
│   │   │   ├── components/      # MobileDrillCard, ManualInputForm, CompletionOverlay
│   │   │   └── hooks/           # useDrillSession (Fisher-Yates queue, instant auto-advance)
│   │   └── flashcard-mode/      # Fitur Randomized Flashcard Mode (Mobile Friendly)
│   │       ├── components/      # FlashcardTile, DisplayToggleControls, CompletionOverlay
│   │       └── hooks/           # useFlashcardSession (No-repeat card stack logic)
│   ├── styles/                  # Tailwind config & wobbly border utilities
│   ├── types/                   # Interfaces (KanjiItem, MarugotoLevel, Chapter, DisplayOptions)
│   ├── utils/                   # Fisher-Yates shuffle algorithm, Romaji-to-Kana converter, localStorage
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.js
├── tsconfig.json
└── package.json
```