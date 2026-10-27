import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { createSession } from '../../../lib/auth';

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const rawRole = url.searchParams.get('role') || 'student';
  const role = ['student', 'mentor', 'admin'].includes(rawRole) ? rawRole : 'student';
  const user = (await db.prepare('SELECT id FROM users WHERE role = ? LIMIT 1').get(role)) as any;

  if (user) {
    createSession(cookies, user.id);
  }

  const requestedRedirect = url.searchParams.get('redirect');
  const safeRedirect =
    requestedRedirect && requestedRedirect.startsWith('/') && !requestedRedirect.startsWith('//')
      ? requestedRedirect
      : role === 'admin'
        ? '/admin'
        : role === 'mentor'
          ? '/admin/chat'
          : '/dashboard';

  return redirect(safeRedirect);
};
