import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { createSession, verifyPassword } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ success: false, message: 'Email dan password wajib diisi' }), { status: 400 });
    }

    const user = (await db.prepare('SELECT id, email, name, role, password_hash FROM users WHERE email = ?').get(email.toLowerCase().trim())) as any;

    if (!user || !verifyPassword(password, user.password_hash)) {
      return new Response(JSON.stringify({ success: false, message: 'Email atau password salah' }), { status: 401 });
    }

    createSession(cookies, user.id);

    return new Response(JSON.stringify({
      success: true,
      message: 'Login berhasil',
      role: user.role,
      redirectUrl: user.role === 'admin' ? '/admin' : '/dashboard'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message || 'Terjadi kesalahan sistem' }), { status: 500 });
  }
};
