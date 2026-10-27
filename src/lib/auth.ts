import { db } from './db.js';
import { hashPassword } from './seed.js';
import crypto from 'node:crypto';
import type { AstroCookies } from 'astro';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'mentor' | 'admin';
  whatsapp?: string;
  avatar?: string;
}

export const SESSION_COOKIE_NAME = 'akademisession_token';
// shortcut: fallback dev secret when SESSION_SECRET env is unset, set SESSION_SECRET in production
const SESSION_SECRET = process.env.SESSION_SECRET || 'acre_hmac_session_secret_2026_v2';

function signPayload(payloadB64: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(payloadB64).digest('hex');
}

export function createSessionToken(userId: string): string {
  const payloadB64 = Buffer.from(JSON.stringify({ userId, iat: Date.now() })).toString('base64url');
  return `${payloadB64}.${signPayload(payloadB64)}`;
}

export function createSession(cookies: AstroCookies, userId: string) {
  cookies.set(SESSION_COOKIE_NAME, createSessionToken(userId), {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production',
  });
}

export function clearSession(cookies: AstroCookies) {
  cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
}

export async function getUserFromSession(cookies: AstroCookies): Promise<UserSession | null> {
  const raw = cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!raw) return null;

  const dotIdx = raw.indexOf('.');
  if (dotIdx === -1) return null;

  const payloadB64 = raw.slice(0, dotIdx);
  const sig = raw.slice(dotIdx + 1);
  const expected = signPayload(payloadB64);

  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    if (!data.userId) return null;
    const user = (await db.prepare('SELECT id, email, name, role, whatsapp, avatar FROM users WHERE id = ?').get(data.userId)) as UserSession | undefined;
    return user || null;
  } catch {
    return null;
  }
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const candidate = hashPassword(password);
  if (candidate.length !== storedHash.length) return false;
  return crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(storedHash));
}
