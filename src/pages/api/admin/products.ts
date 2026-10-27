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
    const { title, slug, tagline, description, type, price, original_price, cover_image, badge } = body;

    if (!title?.trim() || price === undefined || Number.isNaN(Number(price))) {
      return new Response(JSON.stringify({ success: false, message: 'Judul produk dan harga jual wajib diisi.' }), { status: 400 });
    }

    const id = 'prod_' + crypto.randomBytes(4).toString('hex');
    const finalSlug = (slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + id.slice(-4);
    const now = new Date().toISOString();
    const numericPrice = Math.max(0, parseInt(String(price), 10));
    const numericOriginal = Math.max(numericPrice, parseInt(String(original_price || price), 10));

    await db.prepare(`
      INSERT INTO products (id, slug, title, tagline, description, type, price, original_price, cover_image, featured, badge, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
    `).run(
      id,
      finalSlug,
      String(title).trim(),
      tagline ? String(tagline).trim() : '',
      description ? String(description).trim() : '',
      ['course', 'book', 'bundle'].includes(type) ? type : 'course',
      numericPrice,
      numericOriginal,
      cover_image?.trim() || '/acre/curriculum/fast-track.webp',
      badge?.trim() || null,
      now
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Produk baru telah tersimpan di katalog.',
        productId: id,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message || 'Gagal menyimpan produk.' }), { status: 500 });
  }
};
