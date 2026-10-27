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

    const { quizId, lessonId, answers } = await request.json();
    const quiz = (await db.prepare('SELECT * FROM quizzes WHERE id = ? OR lesson_id = ?').get(quizId, lessonId)) as any;
    if (!quiz) {
      return new Response(JSON.stringify({ success: false, message: 'Evaluasi tidak ditemukan.' }), { status: 404 });
    }

    const questions = JSON.parse(quiz.questions_json);
    let correctCount = 0;
    const reviewDetails = questions.map((q: any, idx: number) => {
      const isCorrect = answers?.[idx] === q.answer_index;
      if (isCorrect) correctCount++;
      return {
        questionIndex: idx,
        isCorrect,
        correctAnswerIndex: q.answer_index,
        explanation: q.explanation || 'Sesuai prinsip perilaku audiens Akademi Creator.',
      };
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= quiz.passing_score;
    const now = new Date().toISOString();

    const existing = (await db.prepare('SELECT id FROM user_lesson_progress WHERE user_id = ? AND lesson_id = ?').get(user.id, quiz.lesson_id)) as any;
    if (existing) {
      await db.prepare('UPDATE user_lesson_progress SET completed = ?, quiz_score = ?, updated_at = ? WHERE id = ?').run(
        passed ? 1 : 0,
        score,
        now,
        existing.id
      );
    } else {
      await db.prepare(`
        INSERT INTO user_lesson_progress (id, user_id, lesson_id, completed, quiz_score, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run('ulp_' + crypto.randomBytes(4).toString('hex'), user.id, quiz.lesson_id, passed ? 1 : 0, score, now);
    }

    const lessonRow = (await db.prepare('SELECT course_id FROM lessons WHERE id = ?').get(quiz.lesson_id)) as any;
    if (lessonRow?.course_id) {
      const totalLessons = ((await db.prepare('SELECT COUNT(*) as count FROM lessons WHERE course_id = ?').get(lessonRow.course_id)) as any)?.count || 1;
      const completedLessons =
        (
          (await db
            .prepare(`
          SELECT COUNT(*) as count FROM user_lesson_progress ulp
          JOIN lessons l ON ulp.lesson_id = l.id
          WHERE ulp.user_id = ? AND l.course_id = ? AND ulp.completed = 1
        `)
            .get(user.id, lessonRow.course_id)) as any
        )?.count || 0;
      const progressPercent = Math.min(100, Math.round((completedLessons / totalLessons) * 100));
      await db.prepare('UPDATE enrollments SET progress = ? WHERE user_id = ? AND course_id = ?').run(progressPercent, user.id, lessonRow.course_id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        score,
        passed,
        passingScore: quiz.passing_score,
        correctCount,
        totalQuestions: questions.length,
        reviewDetails,
        message: passed
          ? `Lulus evaluasi dengan skor ${score}/100. Materi berikutnya siap dipelajari.`
          : `Skor Anda ${score}/100 (batas kelulusan ${quiz.passing_score}/100). Tinjau pembahasan di bawah lalu ulangi evaluasi.`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message || 'Gagal menilai jawaban kuis.' }), { status: 500 });
  }
};
