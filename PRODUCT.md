# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

- **Framework**: [Astro](https://astro.build/) (v5.x latest LTS) dengan Mode SSR/Hybrid (`output: 'server'`).
- **Adapter**: `@astrojs/node` (standalone Node.js server runtime).
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode, non-any).
- **Database**: [MariaDB](https://mariadb.org/) (v10.11+ LTS / v11.x).
- **Database Client / ORM**: `drizzle-orm` + driver `mariadb` resmi (connection pooling, parameterized queries anti-SQLi, zero deprecated dependencies).
- **Authentication & Security**: Session-based auth dengan cookie `HttpOnly`, `SameSite=Strict`, hashing password menggunakan `@node-rs/argon2` (standar OWASP modern), input validation via `zod`.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) dengan design token semantik yang disinkronkan dari [design.md](file:///Users/adamf/Documents/antigravity/wonderful-noether/design.md).
- **Real-time / Chat**: WebSockets atau SSE (Server-Sent Events) terintegrasi pada server Node.js dengan persistensi pesan di MariaDB.
- **Dependency Guardrail**: Seluruh library diverifikasi aktif, didukung LTS, 0 CVE vulnerability (audit clean), dan tanpa package yang berstatus deprecated.

---

## Users

1. **Siswa / Creator (Peserta Pelatihan)**
   - *Profil*: Content creator pemula hingga menengah di platform TikTok, Instagram, YouTube yang ingin mencapai target 100K followers/subscribers dalam 3 bulan.
   - *Kebutuhan*: Membeli buku (e-book / fisik), membeli course (satuan atau paket bundling hemat), menukarkan voucher diskon, menonton video pembelajaran terstruktur, mengerjakan kuis pemahaman materi, membaca panduan PDF/HTML, serta konsultasi privat langsung dengan mentor via private chat room.
2. **Mentor / Instruktur**
   - *Profil*: Praktisi creator berpengalaman yang membimbing materi.
   - *Kebutuhan*: Menjawab pesan di private chat room siswa, memantau kemajuan belajar siswa, dan meninjau hasil kuis.
3. **Administrator / Pengelola Platform**
   - *Profil*: Tim operasional Akademi Creator.
   - *Kebutuhan*: Manajemen katalog produk (buku, course, paket bundling), pengaturan harga satuan & harga bundling, manajemen voucher promo (kode, kuota, masa berlaku), pengelolaan kurikulum (video, kuis, modul dokumen), serta monitoring pesanan & transaksi siswa.

---

## Product Purpose

Akademi Creator – 100K 3 Bulan adalah platform komprehensif edukasi dan akselerator creator yang mengintegrasikan:
1. **E-Commerce & Bundling Engine**: Penjualan buku dan course baik secara satuan maupun bundling dengan skema harga dinamis dan sistem voucher diskon.
2. **Learning Management System (LMS)**: Kelas interaktif multi-materi (video player responsif, kuis pemahaman bertingkat, dan document reader format PDF/HTML).
3. **Private Mentoring Chat**: Saluran komunikasi 1-on-1 privat terenkripsi antara siswa yang terdaftar dengan mentor pendamping.

---

## Positioning

Berbeda dengan platform kursus generik atau sekadar marketplace video biasa:
- **Spesialisasi Terarah**: Berfokus eksklusif pada kurikulum intensif 3 bulan menuju 100K creator milestone.
- **Hybrid Learning Content**: Materi menggabungkan video beresolusi tinggi, kuis evaluasi interaktif yang mengunci modul lanjutan hingga lulus, serta dokumen bacaan teknis (HTML & PDF reader in-app tanpa harus download file eksternal).
- **Fasilitas Bundling Pintar**: Memungkinkan siswa membeli materi buku panduan + course teknis + private chat room dalam 1 paket hemat terpadu dengan potongan harga otomatis.

---

## Operating Context

- **Karakteristik Pengguna**: 75%+ trafik masuk berasal dari perangkat mobile (link bio Instagram/TikTok/YouTube dan WhatsApp).
- **Perangkat**: Responsif penuh mulai dari mobile smartphone (360px–430px), tablet (768px), hingga laptop/desktop (1024px–1440px+).
- **Konektivitas**: Dioptimasi untuk koneksi internet seluler di Indonesia melalui Astro SSR, HTML-first streaming, caching statis untuk aset publik, serta lazy loading video dan reader dokumen.

---

## Capabilities and Constraints

### 1. Modul Produk & Bundling
- **Produk Satuan (Standalone)**:
  - Tipe Buku: Buku digital (E-Book viewer in-app) atau buku fisik (pencatatan alamat kirim).
  - Tipe Course: Akses kurikulum berjenjang (video modules, quiz, PDF/HTML document).
  - Harga normal dan harga coret (diskon satuan).
- **Paket Bundling**:
  - Menggabungkan 2 atau lebih produk (contoh: *Course 100K Roadmap + E-Book The Art of Storytelling + 1 Bulan Private Chat*).
  - Pengaturan harga khusus bundling (menghitung otomatis persentase penghematan siswa vs beli eceran).
  - Dukungan penambahan produk ke bundle secara dinamis oleh Admin.

### 2. Sistem Voucher & Diskon
- Pembuatan kode voucher unik (contoh: `CREATOR100K`, `LAUNCH50`).
- Tipe potongan: Persentase (misal: 25%) atau Nominal Tetap (misal: Rp 50.000).
- Aturan validasi:
  - Minimal pembelanjaan.
  - Batas kuota total penggunaan (maksimal *N* kali klaim).
  - Batas tanggal & jam kadaluarsa (expiry date).
  - Pembatasan per produk tertentu atau berlaku untuk seluruh katalog / bundling.
- Validasi real-time saat checkout sebelum pembayaran.

### 3. Sistem Pembelajaran (LMS)
- **Video Player**:
  - Mendukung video streaming aman (HLS / embed privat tak terlacak seperti Cloudflare Stream, Bunny.net, atau Vimeo OTT / YouTube unlisted secure).
  - Tracking durasi & progress tonton (otomatis menandai centang hijau selesai).
- **Kuis Interaktif**:
  - Kuis pilihan ganda di setiap akhir modul materi.
  - Passing grade (misal: 80% jawaban benar untuk lanjut ke modul berikutnya).
  - Ulasan jawaban benar/salah dan opsi retake kuis.
- **Dokumen Baca (PDF & HTML)**:
  - **HTML Reader**: Tampilan typography buku yang nyaman dibaca, mode gelap, ukuran font yang bisa disesuaikan, copy-protection.
  - **PDF Reader**: Built-in PDF canvas viewer responsif tanpa perlu unduh file mentah.

### 4. Sistem Private Chat Room
- Room chat privat 1-on-1 antara Siswa dan Mentor yang ditugaskan.
- Hak akses otomatis terbuka setelah order course/bundling berstatus `PAID`.
- Fitur chat:
  - Teks, tautan materi, dan lampiran screenshot/gambar.
  - Status pengiriman: Terkirim, Diterima, Dibaca (Read Receipt).
  - Notifikasi pesan baru untuk siswa dan mentor.
  - Riwayat percakapan tersimpan aman di database MariaDB.

### 5. Keamanan & Kualitas Kode
- Seluruh endpoint API tervalidasi skema Zod.
- Parameterized SQL queries melalui Drizzle ORM (anti SQL Injection).
- Header keamanan modern: CSP (Content Security Policy), X-Frame-Options, CSRF protection pada seluruh form mutasi.
- Seluruh dependensi npm diverifikasi 0 vulnerability melalui `npm audit`.

---

## Brand Commitments & Design Foundations

Disinkronkan secara konsisten dari token di [design.md](file:///Users/adamf/Documents/antigravity/wonderful-noether/design.md), [design2.md](file:///Users/adamf/Documents/antigravity/wonderful-noether/design2.md), [design3.md](file:///Users/adamf/Documents/antigravity/wonderful-noether/design3.md), dan [design4.md](file:///Users/adamf/Documents/antigravity/wonderful-noether/design4.md):

- **Brand Name**: Akademi Creator – 100K 3 Bulan
- **URL**: https://akademicreator.com/
- **Visual Style**: Dark-mode luxury, structured, high-contrast, content-first.
- **Typography**:
  - Primary font: `Inter, Inter Fallback, -apple-system, sans-serif`
  - Body base: `16px` / line-height `24px` (`font-weight: 400`)
  - Skala Ukuran: `xs=12px`, `sm=14px`, `md=16px`, `lg=18px`, `xl=20px`, `2xl=24px`, `3xl=30px`, `4xl=36px`
- **Color Palette**:
  - Background dasar: `color.surface.base = #000000`
  - Kontainer & Card: `color.surface.raised = #121212`, `color.surface.strong = #1c1c1c`, `#27272a`
  - Border: `color.border.default = #333333`, `color.border.muted = #27272a`
  - Teks Utama: `color.text.primary = #fafafa` / `#ffffff`
  - Teks Sekunder & Muted: `color.text.secondary = #a6a6a6` / `#a1a1aa`
  - Warna Aksen / CTA Panggilan Tindakan: `color.accent.primary = #ef4343` (Crimson Red ikonik Akademi Creator)
  - Focus Ring Aksesibilitas: `color.focus.ring = #2e2e2e` / outline putih kontras
- **Spacing Scale**: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `48px`, `64px`
- **Border Radius**: `radius.xs = 8px`, `radius.sm = 10px`, `radius.md = 12px`, `radius.lg = 9999px` (Pills)
- **Writing Tone**: Tegas, percaya diri, inspiratif, transparan, berorientasi hasil tanpa basa-basi (*implementation-focused*).

---

## Tampilan UI/UX Per Halaman (Surface Specifications)

### 1. Halaman Beranda / Landing Page (`/`)
- **Header & Navigasi**: Logo Akademi Creator, link navigasi (`Katalog`, `Kurikulum`, `Paket Bundling`, `Testimoni`), tombol CTA `Daftar Kelas` / `Login Siswa`.
- **Hero Section**:
  - Headline tebal kontras tinggi: *"Dari 0 Hingga 100K Followers dalam 3 Bulan"*.
  - Subheadline persuasif mengenai framework sistematis pembuatan konten.
  - Badge akreditasi & jumlah creator yang telah bergabung.
  - Tombol CTA utama: `Pilih Program Sekarang` dengan micro-interaction hover.
- **Curriculum & Method Preview**:
  - Tab interaktif fase 1 (Fondasi & Algoritma), fase 2 (Produksi & Retensi), fase 3 (Monetisasi & Scaling).
- **Showcase Produk & Bundling**:
  - Grid card kursus populer dan buku panduan best-seller.
  - Banner "Bundling Terfavorit" dengan label hemat (misal: *"Hemat 45% + Bonus Private Chat 1 Bulan"*).
- **Proof & Testimonial Carousel**:
  - Screenshot capaian analitik murid (pertumbuhan views & followers).
- **FAQ Interaktif**:
  - Accordion FAQ dengan keyboard accessibility (Space/Enter).
- **Footer**: Link legalitas, kontak WhatsApp official, tautan media sosial.

### 2. Halaman Katalog Produk & Bundling (`/products`)
- **Filter & Search Bar**:
  - Filter pills: `Semua`, `Kelas Online (Course)`, `Buku & E-Book`, `Paket Bundling Hemat`.
  - Search input responsif dengan debounce.
- **Product Card Grid**:
  - Thumbnail cover buku / teaser course dengan rasio aspect ratio 16:9 atau 3:4.
  - Tag tipe materi (`Video + Kuis + PDF`, `E-Book`, `Super Bundle`).
  - Judul materi tebal.
  - Komparasi harga: Harga normal tercoret vs Harga penawaran aktif.
  - Label hemat khusus bundling: *"Hemat Rp 250.000 jika beli bundling"*.
  - Tombol aksi cepat: `Lihat Detail` atau `Beli Langsung`.

### 3. Halaman Detail Produk & Paket Bundling (`/products/[slug]`)
- **Hero Detail**:
  - Cover/Trailer video preview.
  - Judul lengkap, ringkasan capaian materi, rating & ulasan pembeli.
- **Bundle Inclusion Selector (Jika produk berupa bundling atau memiliki opsi bundling)**:
  - Pilihan radio card:
    - Opsi A: *Beli Materi Ini Saja (Rp 199.000)*
    - Opsi B: *Bundle Lengkap: Kursus + E-Book + Akses Chat Mentor (Rp 349.000 - Hemat 40%)*
- **Syllabus & Curriculum Accordion**:
  - Rincian Bab/Modul:
    - Ikon video + durasi (misal: *Eps 1: Algoritma FYP 2026 - 18 Menit*).
    - Ikon dokumen (misal: *Modul Bacaan: Scripting Hook Template - HTML/PDF*).
    - Ikon kuis (misal: *Uji Pemahaman: Analisis Retensi Penonton - 10 Soal*).
- **Floating Sticky Checkout Bar (Mobile & Desktop)**:
  - Informasi harga final dan tombol `Ambil Akses Sekarang` yang selalu terlihat saat scrolling.

### 4. Halaman Checkout & Registrasi (`/checkout`, `/auth/register`)
- **Layout 2-Kolom (Desktop) / 1-Kolom (Mobile)**:
  - *Kolom Kiri*: Data pembeli (Nama Lengkap, Nomor WhatsApp aktif, Email, Password akun baru).
  - *Kolom Kanan*: Ringkasan pesanan (*Order Summary*).
- **Voucher Input Component**:
  - Input teks kode kupon dengan tombol `Gunakan`.
  - Notifikasi validasi instan: Berhasil memotong harga dengan badge hijau, atau pesan kesalahan spesifik jika kuota habis / expired.
  - Rincian kalkulasi: Subtotal produk, Diskon voucher, Total bayar.
- **Metode Pembayaran**:
  - Transfer Bank / Virtual Account (BCA, Mandiri, BRI, BNI), QRIS instan, e-Wallet (GoPay, OVO, Dana).
- **Proses 1-Klik**: Siswa otomatis dibuatkan akun LMS dan langsung dialihkan ke dashboard begitu pembayaran terkonfirmasi.

### 5. Halaman Classroom & Video Learning (`/classroom/[courseId]/[lessonId]`)
- **Layout Tiga Panel / Responsif**:
  - *Panel Kiri / Drawer Mobile*: Daftar modul dan kurikulum dengan status centang progress, tombol kembali ke dashboard.
  - *Panel Tengah (Main Stage)*:
    - Jika materi berupa **Video**: Custom video player dengan kendali kecepatan (0.75x hingga 2x), penanda bookmark, tombol *Selesai & Lanjut*.
    - Jika materi berupa **Dokumen Bacaan (HTML/PDF)**: Reader terformat rapi dengan tipografi nyaman, pembatas halaman, dan zoom kontrol.
    - Jika materi berupa **Kuis**: Tampilan pertanyaan satu per satu, pilihan jawaban interaktif, tombol ragu-ragu/lanjut, dan papan evaluasi skor nilai akhir.
  - *Panel Bawah / Tab*: Catatan materi, file unduhan pendukung, dan tombol navigasi *Materi Sebelumnya* / *Materi Selanjutnya*.

### 6. Halaman Private Chat Room (`/dashboard/chat`)
- **Daftar Room Chat**:
  - Menampilkan room mentor sesuai course/bundling yang dibeli siswa.
  - Avatar mentor, nama program pelatihan, cuplikan pesan terakhir, dan indikator unread badge.
- **Area Percakapan 1-on-1**:
  - Header chat: Nama mentor, status online/terakhir aktif, subjek pelatihan.
  - Bubble pesan: Perbedaan visual kontras antara pesan siswa (kanan, aksen gelap) dan mentor (kiri, card surface).
  - Timestamps dan status pesan (`Terkirim`, `Dibaca`).
  - Input box pesan: Textarea auto-expand, tombol kirim lampiran file/gambar, dan shortcut `Enter` untuk mengirim pesan.

### 7. Halaman Admin Panel (`/admin/*`)
- **Dashboard Metrik**: Total omset penjualan, siswa aktif, kursus terpopuler, voucher paling sering digunakan.
- **Manajer Produk & Bundling (`/admin/products`)**:
  - Form CRUD produk buku & course.
  - Builder paket bundling: Memilih produk mana saja yang dimasukkan ke bundle dan menentukan harga bundle khusus.
- **Manajer Kurikulum & LMS (`/admin/courses/[id]/curriculum`)**:
  - Tree-view modul & episode.
  - Modal upload video link, HTML wysiwyg editor untuk materi dokumen, PDF uploader, dan Quiz Builder (input pertanyaan, kunci jawaban, dan bobot nilai).
- **Manajer Voucher (`/admin/vouchers`)**:
  - Tambah voucher baru: Kode, Tipe (Persen / Nominal), Nilai, Kuota limit, Expired date, target produk.
- **Inbox Konsultasi Mentor (`/admin/chat`)**:
  - Manajemen antrean chat siswa yang membutuhkan asistensi dari mentor.

---

## Evidence on Hand

- Desain token resmi diimpor dari [design.md](file:///Users/adamf/Documents/antigravity/wonderful-noether/design.md).
- Katalog produk & referensi URL halaman:
  - Home: `https://akademicreator.com/`
  - Products catalog: `https://akademicreator.com/products` ([design2.md](file:///Users/adamf/Documents/antigravity/wonderful-noether/design2.md))
  - Product detail (E-Book Storytelling): `https://akademicreator.com/products/e-book-the-art-of-story-telling` ([design3.md](file:///Users/adamf/Documents/antigravity/wonderful-noether/design3.md))
  - Checkout & Registrasi: `https://akademicreator.com/auth/register/e-book-the-art-of-story-telling` ([design4.md](file:///Users/adamf/Documents/antigravity/wonderful-noether/design4.md))

---

## Product Principles

1. **Konversi Tanpa Hambatan (Frictionless Buying)**: Alur pembelian buku dan course (terutama bundling dan voucher) harus selesai dalam hitungan langkah minimal tanpa formulir bertele-tele.
2. **Pedagogi Terstruktur (Guaranteed Competency)**: Pengalaman belajar mengkombinasikan video, kuis evaluasi berkunci, dan dokumen bacaan teknis untuk memastikan siswa benar-benar mempraktikkan ilmu.
3. **Sentuhan Personal Eksklusif (Mentorship Access)**: Fitur private chat room memberikan nilai premium yang membedakan platform ini dari sekadar tutorial YouTube gratis.
4. **Kecepatan & Performa Ekstrem (Edge/SSR First)**: Dibangun dengan Astro untuk waktu muat halaman mendekati instan di perangkat mobile dengan aset ringan.
5. **Keamanan Tanpa Kompromi**: Bebas dari celah keamanan, seluruh query database terproteksi, otentikasi ketat, dan seluruh library terjaga dari CVE vulnerabilities.

---

## Accessibility & Inclusion

- **Standar**: WCAG 2.2 AA.
- **Kontras**: Rasio kontras teks minimum 4.5:1 untuk teks normal dan 3:1 untuk teks besar/badge.
- **Navigasi Keyboard**: Seluruh elemen interaktif (accordion, tombol video, pilihan kuis, input voucher, tab modul) dapat diakses penuh dengan tombol `Tab`, `Space`, `Enter`, dan tombol panah.
- **Area Sentuh Ramah Mobile**: Minimum tap target 44x44px untuk seluruh tombol dan link navigasi pada layar sentuh.
- **Screen Reader Support**: Atribut ARIA yang jelas (`aria-expanded`, `aria-controls`, `role="tab"`, `aria-label`) pada seluruh komponen dinamis.
