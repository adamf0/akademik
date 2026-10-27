import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { getUserFromSession } from '../../../lib/auth';
import crypto from 'node:crypto';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const user = await getUserFromSession(cookies);
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'Silakan masuk terlebih dahulu.' }), { status: 401 });
    }

    const { lessonId, courseId, completed } = await request.json();
    if (!lessonId) {
      return new Response(JSON.stringify({ success: false, message: 'ID materi wajib disertakan.' }), { status: 400 });
    }

    const now = new Date().toISOString();
    const existing = (await db.prepare('SELECT id FROM user_lesson_progress WHERE user_id = ? AND lesson_id = ?').get(user.id, lessonId)) as any;

    if (existing) {
      await db.prepare('UPDATE user_lesson_progress SET completed = ?, updated_at = ? WHERE id = ?').run(completed ? 1 : 0, now, existing.id);
    } else {
      await db.prepare(`
        INSERT INTO user_lesson_progress (id, user_id, lesson_id, completed, updated_at)
        VALUES (?, ?, ?, ?, ?)
      `).run('ulp_' + crypto.randomBytes(4).toString('hex'), user.id, lessonId, completed ? 1 : 0, now);
    }

    let progressPercent = 0;
    if (courseId) {
      const totalLessons = ((await db.prepare('SELECT COUNT(*) as count FROM lessons WHERE course_id = ?').get(courseId)) as any)?.count || 1;
      const completedLessons =
        (
          (await db
            .prepare(`
          SELECT COUNT(*) as count FROM user_lesson_progress ulp
          JOIN lessons l ON ulp.lesson_id = l.id
          WHERE ulp.user_id = ? AND l.course_id = ? AND ulp.completed = 1
        `)
            .get(user.id, courseId)) as any
        )?.count || 0;

      progressPercent = Math.min(100, Math.round((completedLessons / totalLessons) * 100));
      await db.prepare('UPDATE enrollments SET progress = ? WHERE user_id = ? AND course_id = ?').run(progressPercent, user.id, courseId);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: completed ? 'Materi ditandai selesai.' : 'Status materi diperbarui.',
        completed: Boolean(completed),
        progressPercent,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message || 'Gagal memperbarui progres.' }), { status: 500 });
  }
};
