import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { getUserFromSession } from '../../../lib/auth';
import crypto from 'node:crypto';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const user = await getUserFromSession(cookies);
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'Silakan masuk ke akun Anda terlebih dahulu.' }), { status: 401 });
    }

    const { roomId, message, attachmentUrl } = await request.json();

    if (!roomId || !message?.trim()) {
      return new Response(JSON.stringify({ success: false, message: 'Isi pesan tidak boleh kosong.' }), { status: 400 });
    }

    const room = (await db.prepare('SELECT * FROM chat_rooms WHERE id = ?').get(roomId)) as any;
    if (!room) {
      return new Response(JSON.stringify({ success: false, message: 'Ruang diskusi tidak ditemukan.' }), { status: 404 });
    }

    if (user.role === 'student' && room.student_id !== user.id) {
      return new Response(JSON.stringify({ success: false, message: 'Anda tidak memiliki akses ke ruang diskusi ini.' }), { status: 403 });
    }

    const now = new Date().toISOString();
    const msgId = 'msg_' + crypto.randomBytes(6).toString('hex');

    await db.prepare(`
      INSERT INTO chat_messages (id, room_id, sender_id, message, attachment_url, status, created_at)
      VALUES (?, ?, ?, ?, ?, 'SENT', ?)
    `).run(msgId, roomId, user.id, String(message).trim(), attachmentUrl || null, now);

    await db.prepare('UPDATE chat_rooms SET updated_at = ? WHERE id = ?').run(now, roomId);

    let mentorReply: any = null;
    if (user.role === 'student') {
      const mentorId = room.mentor_id || 'user_mentor_1';
      const lower = String(message).toLowerCase();

      let replyText = `Siap ${user.name}, catatanmu sudah masuk. Fokus utama di fase ini: pastikan 3 detik pembuka langsung menyentuh masalah spesifik penonton sebelum masuk ke langkah taktis.`;

      if (lower.includes('hook') || lower.includes('pembuka') || lower.includes('judul')) {
        replyText = `Untuk kalimat pembuka (hook): hindari sapaan pembuka. Langsung gunakan pola Kontras Ekspektasi, misalnya: "Kebanyakan kreator baru sibuk beli kamera, padahal 3 detik pertama ini yang mengunci 100 ribu pengikut pertama."`;
      } else if (lower.includes('views') || lower.includes('stuck') || lower.includes('200')) {
        replyText = `Jika tayangan berhenti di kisaran 200 views, evaluasi dua hal: apakah topik videomu masih lompat-lompat antar ceruk, dan apakah ada jeda kosong di detik pertama. Pangkas semua jeda awal dan uji ulang besok pagi.`;
      } else if (lower.includes('monetisasi') || lower.includes('produk') || lower.includes('endorse') || lower.includes('harga')) {
        replyText = `Untuk monetisasi awal: jangan tunggu 100K pengikut baru merancang produk. Kumpulkan 10 pertanyaan paling sering muncul di kolom komentar, lalu rangkum menjadi e-book atau kelas mini perdana.`;
      }

      const mentorMsgId = 'msg_auto_' + crypto.randomBytes(4).toString('hex');
      const replyTime = new Date(Date.now() + 900).toISOString();

      await db.prepare(`
        INSERT INTO chat_messages (id, room_id, sender_id, message, attachment_url, status, created_at)
        VALUES (?, ?, ?, ?, NULL, 'DELIVERED', ?)
      `).run(mentorMsgId, roomId, mentorId, replyText, replyTime);

      mentorReply = {
        id: mentorMsgId,
        message: replyText,
        sender_id: mentorId,
        created_at: replyTime,
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        messageId: msgId,
        created_at: now,
        mentorReply,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message || 'Gagal mengirim pesan.' }), { status: 500 });
  }
};
