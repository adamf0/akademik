import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { hashPassword } from '../../../lib/seed';
import { createSession } from '../../../lib/auth';
import crypto from 'node:crypto';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { name, email, whatsapp, password } = await request.json();

    if (!name?.trim() || !email?.trim() || !password || String(password).length < 6) {
      return new Response(
        JSON.stringify({ success: false, message: 'Nama lengkap, email aktif, dan kata sandi (minimal 6 karakter) wajib diisi.' }),
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const existing = await db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
    if (existing) {
      return new Response(
        JSON.stringify({ success: false, message: 'Email ini sudah terdaftar. Silakan masuk menggunakan kata sandi Anda.' }),
        { status: 409 }
      );
    }

    const userId = 'user_' + crypto.randomBytes(4).toString('hex');
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT INTO users (id, email, name, password_hash, role, whatsapp, avatar, created_at)
      VALUES (?, ?, ?, ?, 'student', ?, ?, ?)
    `).run(
      userId,
      normalizedEmail,
      String(name).trim(),
      hashPassword(String(password)),
      whatsapp ? String(whatsapp).trim() : '',
      '/acre/social/fadli-digital.webp',
      now
    );

    createSession(cookies, userId);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Akun berhasil dibuat.',
        redirectUrl: '/dashboard',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: err.message || 'Gagal mendaftarkan akun baru.' }),
      { status: 500 }
    );
  }
};
