import type { APIRoute } from 'astro';
import { db } from '../../lib/db';
import { hashPassword } from '../../lib/seed';
import { getUserFromSession, createSession, verifyPassword } from '../../lib/auth';
import crypto from 'node:crypto';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { productId, name, email, whatsapp, password, voucherCode, paymentMethod } = body;

    if (!productId) {
      return new Response(JSON.stringify({ success: false, message: 'Produk wajib dipilih.' }), { status: 400 });
    }

    const product = (await db.prepare('SELECT * FROM products WHERE id = ?').get(productId)) as any;
    if (!product) {
      return new Response(JSON.stringify({ success: false, message: 'Produk tidak ditemukan.' }), { status: 404 });
    }

    let user = await getUserFromSession(cookies);

    if (!user) {
      if (!name?.trim() || !email?.trim() || !password || String(password).length < 6) {
        return new Response(
          JSON.stringify({ success: false, message: 'Nama lengkap, email aktif, dan kata sandi (minimal 6 karakter) wajib diisi.' }),
          { status: 400 }
        );
      }

      const normalizedEmail = String(email).toLowerCase().trim();
      const existingUser = (await db.prepare('SELECT id, email, name, role, password_hash FROM users WHERE email = ?').get(normalizedEmail)) as any;

      if (existingUser) {
        if (!verifyPassword(String(password), existingUser.password_hash)) {
          return new Response(
            JSON.stringify({ success: false, message: 'Email sudah terdaftar. Masukkan kata sandi akun Anda yang benar atau masuk terlebih dahulu.' }),
            { status: 401 }
          );
        }
        user = existingUser;
      } else {
        const newUserId = 'user_' + crypto.randomBytes(4).toString('hex');
        const now = new Date().toISOString();
        await db.prepare(`
          INSERT INTO users (id, email, name, password_hash, role, whatsapp, avatar, created_at)
          VALUES (?, ?, ?, ?, 'student', ?, ?, ?)
        `).run(
          newUserId,
          normalizedEmail,
          String(name).trim(),
          hashPassword(String(password)),
          whatsapp ? String(whatsapp).trim() : '',
          '/acre/social/fadli-digital.webp',
          now
        );

        user = {
          id: newUserId,
          email: normalizedEmail,
          name: String(name).trim(),
          role: 'student',
          whatsapp: whatsapp ? String(whatsapp).trim() : '',
        };
      }

      createSession(cookies, user.id);
    }

    const subtotal = product.price;
    let discount = 0;
    let appliedVoucher: string | null = null;

    if (voucherCode && String(voucherCode).trim()) {
      const codeNorm = String(voucherCode).toUpperCase().trim();
      const voucher = (await db.prepare('SELECT * FROM vouchers WHERE code = ?').get(codeNorm)) as any;
      const isValidVoucher =
        voucher &&
        new Date(voucher.expires_at) >= new Date() &&
        voucher.used_count < voucher.max_uses &&
        subtotal >= voucher.min_spend &&
        (!voucher.target_product_id || voucher.target_product_id === product.id);

      if (isValidVoucher) {
        discount = voucher.type === 'percentage' ? Math.floor((subtotal * voucher.value) / 100) : voucher.value;
        discount = Math.min(discount, subtotal);
        appliedVoucher = voucher.code;
        await db.prepare('UPDATE vouchers SET used_count = used_count + 1 WHERE id = ?').run(voucher.id);
      }
    }

    const total = Math.max(0, subtotal - discount);
    const orderId = 'ord_' + crypto.randomBytes(6).toString('hex');
    const paymentRef = 'INV-' + Math.floor(100000 + Math.random() * 900000);
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT INTO orders (id, user_id, product_id, subtotal, discount, total, voucher_code, payment_method, status, payment_reference, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PAID', ?, ?)
    `).run(orderId, user.id, product.id, subtotal, discount, total, appliedVoucher, paymentMethod || 'qris', paymentRef, now);

    const coursesToEnroll = new Set<string>([product.id]);
    if (product.type === 'bundle') {
      const items = (await db.prepare('SELECT product_id FROM bundle_items WHERE bundle_id = ?').all(product.id)) as any[];
      items.forEach((it) => coursesToEnroll.add(it.product_id));
      coursesToEnroll.add('prod_course_100k');
    }

    for (const cid of coursesToEnroll) {
      const existingEnr = await db.prepare('SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?').get(user.id, cid);
      if (!existingEnr) {
        await db.prepare(`
          INSERT INTO enrollments (id, user_id, course_id, progress, status, created_at)
          VALUES (?, ?, ?, 0, 'active', ?)
        `).run('enr_' + crypto.randomBytes(4).toString('hex'), user.id, cid, now);
      }
    }

    const existingRoom = (await db.prepare('SELECT id FROM chat_rooms WHERE student_id = ?').get(user.id)) as any;
    if (!existingRoom) {
      const mentor = (await db.prepare("SELECT id FROM users WHERE role = 'mentor' LIMIT 1").get()) as any;
      const mentorId = mentor ? mentor.id : 'user_mentor_1';
      const roomId = 'chat_' + crypto.randomBytes(4).toString('hex');

      await db.prepare(`
        INSERT INTO chat_rooms (id, student_id, mentor_id, course_id, title, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(roomId, user.id, mentorId, product.id, `Diskusi 1-on-1: ${user.name} & Aldio Ogut`, now);

      await db.prepare(`
        INSERT INTO chat_messages (id, room_id, sender_id, message, status, created_at)
        VALUES (?, ?, ?, ?, 'DELIVERED', ?)
      `).run(
        'msg_' + crypto.randomBytes(4).toString('hex'),
        roomId,
        mentorId,
        `Selamat bergabung di Akademi Creator, ${user.name}. Akun belajarmu sudah aktif. Silakan mulai dari Modul 1.1 dan kirimkan draf konsep kontenmu di ruang diskusi ini kapan saja.`,
        now
      );
    }

    let targetCourseId = product.type === 'bundle' ? 'prod_course_100k' : product.id;
    let firstLesson = (await db.prepare('SELECT id FROM lessons WHERE course_id = ? ORDER BY order_index ASC LIMIT 1').get(targetCourseId)) as any;
    if (!firstLesson) {
      targetCourseId = 'prod_course_100k';
      firstLesson = (await db.prepare('SELECT id FROM lessons WHERE course_id = ? ORDER BY order_index ASC LIMIT 1').get(targetCourseId)) as any;
    }
    const targetLessonId = firstLesson ? firstLesson.id : 'les_100k_1';

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Pembayaran terkonfirmasi. Akses materi dan ruang mentoring Anda telah aktif.',
        orderId,
        paymentRef,
        redirectUrl: `/classroom/${targetCourseId}/${targetLessonId}?order_success=1`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message || 'Terjadi kendala saat memproses pesanan.' }), { status: 500 });
  }
};
