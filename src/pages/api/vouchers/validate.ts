import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { code, subtotal, productId } = await request.json();

    if (!code?.trim()) {
      return new Response(JSON.stringify({ valid: false, message: 'Masukkan kode kupon terlebih dahulu.' }), { status: 400 });
    }

    const voucher = (await db.prepare('SELECT * FROM vouchers WHERE code = ?').get(String(code).toUpperCase().trim())) as any;
    if (!voucher) {
      return new Response(JSON.stringify({ valid: false, message: 'Kode kupon tidak ditemukan.' }), { status: 404 });
    }

    if (new Date(voucher.expires_at) < new Date()) {
      return new Response(JSON.stringify({ valid: false, message: 'Masa berlaku kupon sudah berakhir.' }), { status: 400 });
    }

    if (voucher.used_count >= voucher.max_uses) {
      return new Response(JSON.stringify({ valid: false, message: 'Kuota pemakaian kupon ini telah habis.' }), { status: 400 });
    }

    const numericSubtotal = Number(subtotal) || 0;
    if (numericSubtotal < voucher.min_spend) {
      const minFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(voucher.min_spend);
      return new Response(JSON.stringify({ valid: false, message: `Transaksi minimum untuk kupon ini adalah ${minFormatted}.` }), { status: 400 });
    }

    if (voucher.target_product_id && voucher.target_product_id !== productId) {
      return new Response(JSON.stringify({ valid: false, message: 'Kupon ini hanya berlaku pada produk tertentu.' }), { status: 400 });
    }

    const rawDiscount = voucher.type === 'percentage' ? Math.floor((numericSubtotal * voucher.value) / 100) : voucher.value;
    const discount = Math.min(rawDiscount, numericSubtotal);

    return new Response(
      JSON.stringify({
        valid: true,
        code: voucher.code,
        type: voucher.type,
        discount,
        message: `Kupon ${voucher.code} aktif. Potongan Rp ${discount.toLocaleString('id-ID')} diterapkan.`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ valid: false, message: err.message || 'Gagal memvalidasi kupon.' }), { status: 500 });
  }
};
