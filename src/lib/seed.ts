import { db } from './db.js';
import crypto from 'node:crypto';

export function hashPassword(password: string): string {
  const salt = 'akademi_creator_salt_2026';
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}

export async function seedDatabase() {
  const existingUsers = (await db.prepare('SELECT COUNT(*) as count FROM users').get()) as { count: number };
  if (existingUsers && existingUsers.count > 0) {
    return;
  }

  const now = new Date().toISOString();

  const studentId = 'user_student_1';
  const mentorId = 'user_mentor_1';
  const adminId = 'user_admin_1';

  const insertUser = db.prepare(`
    INSERT INTO users (id, email, name, password_hash, role, whatsapp, avatar, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  await insertUser.run(
    studentId,
    'siswa@akademicreator.com',
    'Fadli Pratama',
    hashPassword('password123'),
    'student',
    '081298765432',
    '/acre/social/fadli-digital.webp',
    now
  );

  await insertUser.run(
    mentorId,
    'mentor@akademicreator.com',
    'Aldio Ogut (Founder & Head Mentor)',
    hashPassword('password123'),
    'mentor',
    '08114089090',
    '/acre/mentors/ogut.webp',
    now
  );

  await insertUser.run(
    adminId,
    'admin@akademicreator.com',
    'Tim Operasional Akademi Creator',
    hashPassword('admin123'),
    'admin',
    '08114089090',
    '/acre/mentors/aries-bachri.webp',
    now
  );

  const insertProduct = db.prepare(`
    INSERT INTO products (id, slug, title, tagline, description, type, price, original_price, cover_image, featured, curriculum_summary, badge, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const prod1Id = 'prod_course_100k';
  await insertProduct.run(
    prod1Id,
    'course-100k-roadmap',
    'Creatorpreneur Accelerator: 0 ke 100K Followers dalam 90 Hari',
    'Kurikulum terstruktur berbasis psikologi perilaku manusia dan distribusi multi-platform yang membimbing kreator sejak 2019.',
    'Program pendampingan intensif 3 bulan dari pembuatan konten pertama hingga monetisasi. Membedah 9 jalur kompetensi inti: Fast Track 15 Hari, Fundamental Perilaku Otak Manusia, Instagram & TikTok Organik, Workflow Montez AI, hingga Arsitektur Monetisasi.',
    'course',
    499000,
    1250000,
    '/acre/curriculum/fast-track.webp',
    1,
    '9 Jalur Kurikulum Terstruktur, 500+ Video Materi On-Demand, Evaluasi Kompetensi, Live Review Rutin',
    'Program Utama',
    now
  );

  const prod2Id = 'prod_ebook_storytelling';
  await insertProduct.run(
    prod2Id,
    'e-book-the-art-of-story-telling',
    'E-Book The Art of Story Telling: Psikologi Retensi & Narasi Konten',
    'Panduan menyusun struktur cerita pendek yang mengunci perhatian penonton sejak 3 detik pertama.',
    'Buku digital interaktif karya tim kurikulum Akademi Creator yang mengupas anatomi narasi video pendek, 50 pola pembuka (hook) berbasis rasa ingin tahu manusia, serta kerangka skrip kata demi kata untuk akun edukasi, personal brand, dan bisnis.',
    'book',
    149000,
    299000,
    '/acre/curriculum/personal-branding.webp',
    0,
    'E-Book Interaktif In-App, Mode Baca Nyaman & Handout Resmi, 50 Pola Hook Teruji',
    'Buku Terlaris',
    now
  );

  const prod3Id = 'prod_bundle_ultimate';
  await insertProduct.run(
    prod3Id,
    'super-creator-bundle-100k',
    'Full-Stack Creatorpreneur Bundle: Kelas 90 Hari + E-Book Storytelling + Mentoring 1-on-1',
    'Paket investasi lengkap dengan penghematan 67% untuk membangun personal brand sekaligus mesin produk digital.',
    'Gabungan seluruh akses Creatorpreneur Accelerator 90 Hari (500+ video pembelajaran di 9 modul), E-Book The Art of Story Telling, akses workflow Montez AI, serta jalur konsultasi privat 1-on-1 bersama Head Mentor untuk bedah akun dan strategi monetisasi.',
    'bundle',
    599000,
    1848000,
    '/acre/curriculum/monetisasi.webp',
    1,
    'Akses Penuh Kelas 100K 90 Hari + E-Book The Art of Story Telling + Ruang Diskusi Privat Mentor 1-on-1',
    'Hemat 67%',
    now
  );

  const prod4Id = 'prod_course_monetisasi';
  await insertProduct.run(
    prod4Id,
    'digital-product-dan-webinar-hack',
    'Digital Product & Webinar Hack: Blueprint 10 Juta Pertama dari Konten',
    'Strategi merancang, meluncurkan, dan menjual produk digital serta kelas online tanpa bergantung pada endorse semata.',
    'Followers besar tanpa sistem konversi tidak akan membebaskan waktu Anda. Pelajari cara memvalidasi masalah audiens, menyusun penawaran produk digital bernilai tinggi, hingga menjalankan konversi lewat skema Webinar Hack seperti studi kasus alumni kami.',
    'course',
    349000,
    750000,
    '/acre/curriculum/digital-product-hack.webp',
    0,
    'Modul Riset Produk Digital, Arsitektur Funnel Webinar, Kalkulator Harga & Konversi Penjualan',
    'Spesialis Monetisasi',
    now
  );

  const prod5Id = 'prod_buku_fisik';
  await insertProduct.run(
    prod5Id,
    'buku-fisik-creatorpreneur-playbook',
    'Buku Cetak: Creatorpreneur Playbook Edisi Eksklusif',
    'Buku pegangan fisik berisi kerangka riset konten harian, matriks personal branding, dan lembar kerja eksekusi 90 hari.',
    'Dicetak di atas kertas bookpaper ramah mata untuk diletakkan langsung di meja kerja Anda. Merangkum disiplin harian para Head Mentor Akademi Creator dalam meriset ide, menulis naskah, merekam efisien, dan memetakan penawaran produk.',
    'book',
    199000,
    350000,
    '/acre/curriculum/fundamental.webp',
    0,
    'Edisi Cetak 280 Halaman, Lembar Kerja 90 Hari, Pengiriman ke Seluruh Indonesia',
    'Edisi Cetak',
    now
  );

  const insertBundleItem = db.prepare(`
    INSERT INTO bundle_items (id, bundle_id, product_id)
    VALUES (?, ?, ?)
  `);
  await insertBundleItem.run('bi_1', prod3Id, prod1Id);
  await insertBundleItem.run('bi_2', prod3Id, prod2Id);
  await insertBundleItem.run('bi_3', prod3Id, prod4Id);

  const insertVoucher = db.prepare(`
    INSERT INTO vouchers (id, code, type, value, min_spend, max_uses, used_count, expires_at, target_product_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  await insertVoucher.run('vouch_1', 'CREATOR100K', 'fixed', 100000, 300000, 500, 14, '2027-12-31T23:59:59Z', null, now);
  await insertVoucher.run('vouch_2', 'LAUNCH50', 'percentage', 50, 100000, 200, 42, '2027-12-31T23:59:59Z', null, now);
  await insertVoucher.run('vouch_3', 'HEMAT25', 'percentage', 25, 0, 1000, 88, '2027-12-31T23:59:59Z', null, now);

  const insertLesson = db.prepare(`
    INSERT INTO lessons (id, course_id, module_title, title, type, duration, video_url, content_html, pdf_preview_text, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const les1 = 'les_100k_1';
  await insertLesson.run(
    les1,
    prod1Id,
    'Modul 01: Fast Track & Psikologi Manusia',
    '1.1 Perilaku Otak Manusia vs Algoritma: Kenapa Konten Berhenti di 200 Views',
    'video',
    '18:45',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    `<h3>Memahami Perilaku Manusia, Bukan Sekadar Mengejar Algoritma</h3>
    <p>Algoritma Instagram dan TikTok terus berganti setiap kuartal, tetapi cara otak manusia merespons rasa penasaran, status sosial, dan ancaman kerugian tetap sama sejak ribuan tahun lalu. Tiga sinyal perilaku yang diukur sistem distribusi pada 100 penonton pertama:</p>
    <ul>
      <li><strong>Stop-Scroll Reflex (0 sampai 3 detik):</strong> Apakah visual dan kalimat pembuka memutus pola pikir otomatis penonton?</li>
      <li><strong>Narrative Hold (Completion Rate):</strong> Apakah setiap 7 detik ada informasi baru yang menahan penonton hingga akhir?</li>
      <li><strong>Social Transfer (Share &amp; Save):</strong> Apakah materi ini membuat penonton terlihat cerdas ketika membagikannya ke teman?</li>
    </ul>
    <p>Catat tiga sinyal ini sebelum merekam satu pun video di fase 15 hari pertama Fast Track Anda.</p>`,
    null,
    1
  );

  const les2 = 'les_100k_2';
  await insertLesson.run(
    les2,
    prod1Id,
    'Modul 01: Fast Track & Psikologi Manusia',
    '1.2 Audience-Centric Positioning: Menentukan Ceruk Pasar yang Siap Membeli',
    'document',
    '12 Menit Baca',
    null,
    `<h3>Kerangka Kerja Audience-Centric Positioning</h3>
    <p>Kesalahan paling mahal bagi kreator pemula adalah mengumpulkan ratusan ribu penonton yang hanya mencari hiburan gratis namun enggan membeli solusi apa pun. Gunakan tiga irisan validasi Akademi Creator:</p>
    <ol>
      <li><strong>Masalah Mendesak:</strong> Kesulitan spesifik apa yang membuat target audiens rela mencari jawaban malam ini?</li>
      <li><strong>Kredibilitas Pengalaman:</strong> Bukti proses nyata atau sudut pandang lapangan yang membedakan Anda dari akun kompilasi.</li>
      <li><strong>Jalur Produk Digital:</strong> Produk turunan apa (e-book, template, kelas, konsultasi) yang logis ditawarkan dalam 60 hari ke depan?</li>
    </ol>
    <blockquote>
      Disiplin 30 Hari Pertama: Pertahankan satu benang merah masalah agar audiens dan sistem rekomendasi mengenali identitas keahlian Anda dengan tajam.
    </blockquote>`,
    `LEMBAR KERJA RESMI AKADEMI CREATOR INDONESIA\nModul 1.2: Audience-Centric Positioning Matrix\n\n1. Target Persona Spesifik: Professionals / Pebisnis / Kreator Pemula\n2. Satu Masalah Utama yang Diselesaikan Akun Ini:\n3. Tiga Pilar Topik Mingguan (Edukasi Taktis, Studi Kasus Nyata, Opini Kontras)\n4. Rencana Monetisasi Hari ke-60 (E-Book / Kelas Online / Endorsement Terkurasi)`,
    2
  );

  const les3 = 'les_100k_3';
  await insertLesson.run(
    les3,
    prod1Id,
    'Modul 01: Fast Track & Psikologi Manusia',
    '1.3 Evaluasi Kompetensi Modul 1: Psikologi Retensi & Positioning',
    'quiz',
    '4 Soal Evaluasi',
    null,
    '<p>Uji penguasaan konsep perilaku audiens dan positioning akun sebelum melangkah ke modul produksi naskah.</p>',
    null,
    3
  );

  const les4 = 'les_100k_4';
  await insertLesson.run(
    les4,
    prod1Id,
    'Modul 02: Hook, Storytelling & Distribusi IG/TikTok',
    '2.1 Anatomi Hook 3 Detik: 15 Pola Pembuka Video Beretensi Tinggi',
    'video',
    '24:10',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    `<h3>15 Pola Pembuka Berbasis Rasa Ingin Tahu</h3>
    <p>Kalimat pertama video Anda tidak boleh berisi sapaan basa-basi. Gunakan salah satu dari tiga struktur pembuka terkuat:</p>
    <ol>
      <li><strong>Kontras Ekspektasi:</strong> Patahkan asumsi umum di kalimat pertama dengan fakta lapangan yang terukur.</li>
      <li><strong>Biaya Penundaan:</strong> Tunjukkan kerugian nyata yang sedang dialami penonton jika melewatkan langkah ini.</li>
      <li><strong>Bukti Hasil di Depan:</strong> Perlihatkan hasil akhir di detik pertama, lalu urai prosesnya secara runtut.</li>
    </ol>`,
    null,
    4
  );

  const les5 = 'les_100k_5';
  await insertLesson.run(
    les5,
    prod1Id,
    'Modul 02: Hook, Storytelling & Distribusi IG/TikTok',
    '2.2 Struktur Naskah 45 Detik: Mengubah Penonton Asing Menjadi Pembeli',
    'document',
    '15 Menit Baca',
    null,
    `<h3>Arsitektur Naskah Video 45 Detik</h3>
    <p>Gunakan ritme penulisan per blok waktu agar tidak ada kalimat yang mubazir saat rekaman:</p>
    <pre>[00s - 03s] Kalimat Pembuka (Pemicu Rasa Penasaran Spesifik)
[04s - 12s] Validasi Masalah (Buat penonton merasa dipahami situasinya)
[13s - 32s] Tiga Langkah Praktis ( Langsung bisa dipraktikkan hari ini )
[33s - 40s] Kesimpulan Tajam (Satu kalimat prinsip yang mudah diingat)
[41s - 45s] Ajakan Bertindak Spesifik (Simpan materi atau baca panduan di profil)</pre>`,
    `PANDUAN NASKAH 45 DETIK AKADEMI CREATOR\nPrinsip Penulisan: Satu video hanya menjawab satu pertanyaan spesifik dengan bahasa lisan sehari-hari, bukan bahasa makalah.`,
    5
  );

  await insertLesson.run(
    'les_eb_1',
    prod2Id,
    'Bab 1: Psikologi Cerita Pendek',
    '1. Mengapa Cerita Manusia Mengalahkan Kamera Mahal',
    'document',
    '8 Menit Baca',
    null,
    `<h3>Koneksi Manusia di Balik Layar Vertikal</h3>
    <p>Banyak kreator menunda rekaman karena merasa belum memiliki kamera mirrorless atau studio kedap suara. Padahal ribuan video dengan jutaan tayangan direkam hanya menggunakan kamera ponsel dekat jendela karena ceritanya menyentuh kegelisahan nyata penonton.</p>
    <p>Dalam format video singkat, bercerita berarti menempatkan masalah penonton sebagai pusat perhatian sejak kalimat pertama.</p>`,
    `E-BOOK THE ART OF STORY TELLING\nCV Akademi Creator Indonesia\nBab 1: Koneksi Manusia Mengalahkan Kamera Mahal.`,
    1
  );

  await insertLesson.run(
    'les_eb_2',
    prod2Id,
    'Bab 2: 50 Pola Pembuka Teruji',
    '2. Katalog Pola Kalimat Pembuka untuk Edukasi dan Bisnis',
    'document',
    '20 Menit Baca',
    null,
    `<h3>Katalog Kalimat Pembuka Siap Pakai</h3>
    <p>Sesuaikan templat berikut dengan bidang keahlian Anda:</p>
    <p><strong>Pola 01 (Koreksi Kesalahan Umum):</strong> "Sembilan dari sepuluh kreator pemula gagal di bulan pertama bukan karena kurang rajin, melainkan karena salah memilih topik pertama."</p>
    <p><strong>Pola 02 (Studi Kasus Terukur):</strong> "Begini urutan langkah yang dipakai akun baru dengan nol pengikut untuk menembus sepuluh juta rupiah pertama dari kelas online."</p>`,
    `E-BOOK THE ART OF STORY TELLING\nBab 2: Katalog Pola Kalimat Pembuka Siap Pakai.`,
    2
  );

  await insertLesson.run(
    'les_mon_1',
    prod4Id,
    'Modul 01: Arsitektur Produk Digital',
    '1.1 Memetakan Masalah Audiens Menjadi Produk Digital Pertama',
    'document',
    '14 Menit Baca',
    null,
    `<h3>Dari Pertanyaan Komentar Menjadi Produk Bernilai Tinggi</h3>
    <p>Jangan menebak produk apa yang harus dibuat. Buka kolom komentar dan pesan masuk akun Anda, lalu kelompokkan tiga pertanyaan yang paling sering diulang. Produk digital terbaik menyelesaikan satu masalah spesifik lebih cepat daripada penonton mencarinya sendiri.</p>`,
    `MODUL DIGITAL PRODUCT & WEBINAR HACK\nLangkah 1: Audit 20 pertanyaan audiens menjadi kerangka produk digital.`,
    1
  );

  const insertQuiz = db.prepare(`
    INSERT INTO quizzes (id, lesson_id, title, passing_score, questions_json)
    VALUES (?, ?, ?, ?, ?)
  `);

  await insertQuiz.run(
    'quiz_100k_1',
    les3,
    'Evaluasi Kompetensi Modul 1: Psikologi Perilaku & Positioning',
    75,
    JSON.stringify([
      {
        question: 'Sinyal perilaku apa yang paling menentukan apakah video baru akan diperluas distribusinya pada 3 detik pertama?',
        options: [
          'Jumlah komentar dari kerabat dekat setelah video diunggah',
          'Tingkat ketahanan tonton (Retention Rate) di atas 65% karena pembuka yang relevan',
          'Penggunaan kamera profesional beresolusi 4K 60FPS',
          'Deretan puluhan tagar populer di akhir takarir'
        ],
        answer_index: 1,
        explanation: 'Sistem rekomendasi mengukur apakah penonton berhenti menggulir layar dan bertahan melewati 3 detik pertama sebagai bukti kualitas pembuka.'
      },
      {
        question: 'Mengapa berganti-ganti topik secara acak pada 30 hari pertama menghambat pertumbuhan akun?',
        options: [
          'Akun akan langsung dihapus permanen oleh pengelola aplikasi',
          'Sistem klasifikasi kesulitan memetakan profil minat penonton yang paling cocok dengan konten Anda',
          'Pengiklan hanya bekerja sama dengan akun bertema hiburan semata',
          'Fitur unggah video akan dibatasi menjadi satu kali per bulan'
        ],
        answer_index: 1,
        explanation: 'Konsistensi satu benang merah masalah membantu audiens maupun mesin rekomendasi mengenali spesialisasi akun Anda dengan akurat.'
      },
      {
        question: 'Berapa rentang durasi video yang disarankan pada fase awal agar rasio tonton selesai (completion rate) tetap terjaga?',
        options: [
          'Lebih dari 12 menit tanpa pemotongan jeda',
          'Sekitar 25 hingga 45 detik dengan alur padat tanpa basa-basi',
          'Hanya 2 detik berupa foto diam',
          'Minimal 5 menit penuh untuk semua jenis topik'
        ],
        answer_index: 1,
        explanation: 'Durasi 25 sampai 45 detik memberi ruang cukup untuk menyampaikan satu solusi utuh sambil menjaga persentase tonton selesai tetap tinggi.'
      },
      {
        question: 'Mengapa tombol Simpan (Save) bernilai tinggi dalam pertumbuhan organik akun edukasi?',
        options: [
          'Menunjukkan penonton menilai materi cukup berharga untuk dibuka dan dipraktikkan ulang',
          'Tidak memiliki arti apa pun dibandingkan jumlah penayangan sekilas',
          'Hanya berfungsi pada akun yang telah memiliki centang biru',
          'Mengurangi jangkauan akun ke penonton baru'
        ],
        answer_index: 0,
        explanation: 'Tindakan menyimpan menandakan bobot manfaat jangka panjang sehingga konten lebih sering direkomendasikan kembali.'
      }
    ])
  );

  const insertEnrollment = db.prepare(`
    INSERT INTO enrollments (id, user_id, course_id, progress, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  await insertEnrollment.run('enr_1', studentId, prod1Id, 40, 'active', now);
  await insertEnrollment.run('enr_2', studentId, prod2Id, 50, 'active', now);

  const insertProgress = db.prepare(`
    INSERT INTO user_lesson_progress (id, user_id, lesson_id, completed, quiz_score, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  await insertProgress.run('ulp_1', studentId, les1, 1, null, now);
  await insertProgress.run('ulp_2', studentId, les2, 1, null, now);

  const insertOrder = db.prepare(`
    INSERT INTO orders (id, user_id, product_id, subtotal, discount, total, voucher_code, payment_method, status, payment_reference, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PAID', ?, ?)
  `);
  await insertOrder.run(
    'ord_seed_1',
    studentId,
    prod3Id,
    599000,
    100000,
    499000,
    'CREATOR100K',
    'qris',
    'INV-202601',
    new Date(Date.now() - 86400000 * 3).toISOString()
  );

  const roomId = 'chat_room_student_1';
  await db.prepare(`
    INSERT INTO chat_rooms (id, student_id, mentor_id, course_id, title, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(roomId, studentId, mentorId, prod1Id, 'Diskusi 1-on-1: Fadli Pratama & Aldio Ogut', now);

  const insertMsg = db.prepare(`
    INSERT INTO chat_messages (id, room_id, sender_id, message, attachment_url, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  await insertMsg.run(
    'msg_1',
    roomId,
    mentorId,
    'Selamat datang di Akademi Creator, Fadli. Saya Aldio Ogut. Kita fokus bangun fondasi perilaku audiens dulu di 15 hari pertama Fast Track.',
    null,
    'READ',
    new Date(Date.now() - 3600000 * 24).toISOString()
  );

  await insertMsg.run(
    'msg_2',
    roomId,
    mentorId,
    'Setelah menyelesaikan Modul 1.1 dan 1.2, kirimkan draf 3 kalimat pembuka (hook) atau tautan profilmu di ruang diskusi ini supaya langsung kita bedah.',
    null,
    'READ',
    new Date(Date.now() - 3600000 * 23).toISOString()
  );

  await insertMsg.run(
    'msg_3',
    roomId,
    studentId,
    'Siap Mas Ogut! Modul 1.1 dan 1.2 sudah saya selesaikan. Untuk ceruk otomasi pemasaran UKM, sebaiknya saya uji naskah di Reels dulu atau serentak dengan TikTok?',
    null,
    'READ',
    new Date(Date.now() - 3600000 * 5).toISOString()
  );

  await insertMsg.run(
    'msg_4',
    roomId,
    mentorId,
    'Untuk ceruk bisnis dan otomasi UKM, unggah serentak di keduanya tanpa tanda air: TikTok memberi kecepatan uji retensi 3 detik terhadap penonton baru, sedangkan Instagram Reels mengunci kepercayaan calon pembeli produk digitalmu.',
    null,
    'DELIVERED',
    new Date(Date.now() - 3600000 * 2).toISOString()
  );
}

seedDatabase().catch((err) => console.error('Seed error:', err));
