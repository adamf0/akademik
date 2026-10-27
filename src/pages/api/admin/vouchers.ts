import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { getUserFromSession } from '../../../lib/auth';
import crypto from 'node:crypto';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const user = await getUserFromSession(cookies);
    if (!user || user.role !== 'admin') {
      return new Response(JSON.stringify({ success: false, message: 'Akses ditolak. Hanya Administrator yang berwenang.' }), { status: 403 });
    }

    const body = await request.json();
    const { code, type, value, min_spend, max_uses, expires_at } = body;

    if (!code?.trim() || value === undefined || Number.isNaN(Number(value))) {
      return new Response(JSON.stringify({ success: false, message: 'Kode kupon dan besaran potongan wajib diisi.' }), { status: 400 });
    }

    const id = 'vouch_' + crypto.randomBytes(4).toString('hex');
    const now = new Date().toISOString();
    const cleanCode = String(code).toUpperCase().replace(/[^A-Z0-9_-]/g, '');

    await db.prepare(`
      INSERT INTO vouchers (id, code, type, value, min_spend, max_uses, used_count, expires_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)
    `).run(
      id,
      cleanCode,
      type === 'fixed' ? 'fixed' : 'percentage',
      Math.max(1, parseInt(String(value), 10)),
      Math.max(0, parseInt(String(min_spend || 0), 10)),
      Math.max(1, parseInt(String(max_uses || 100), 10)),
      expires_at || '2027-12-31T23:59:59Z',
      now
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: `Kupon ${cleanCode} aktif dan siap digunakan di halaman pembayaran.`,
        voucherId: id,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message || 'Gagal membuat kupon promo.' }), { status: 500 });
  }
};
