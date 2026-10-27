import crypto from 'node:crypto';
import { Readable, Writable } from 'node:stream';
import mariadb from 'mariadb';
import path from 'node:path';
if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile();
  } catch {}
}

process.env.ASTRO_NODE_AUTOSTART = 'disabled';
const { handler } = await import('../dist/server/entry.mjs');

const SESSION_SECRET = process.env.SESSION_SECRET || 'acre_hmac_session_secret_2026_v2';

function makeCookie(userId) {
  const payloadB64 = Buffer.from(JSON.stringify({ userId, iat: Date.now() })).toString('base64url');
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payloadB64).digest('hex');
  return `akademisession_token=${payloadB64}.${sig}`;
}

function invoke(urlStr, opts = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const bodyBuf = opts.body ? Buffer.from(opts.body) : null;

    const req = new Readable({
      read() {
        if (bodyBuf) this.push(bodyBuf);
        this.push(null);
      },
    });
    req.method = opts.method || 'GET';
    req.url = u.pathname + u.search;
    req.headers = {
      host: u.host,
      ...(bodyBuf ? { 'content-length': String(bodyBuf.length) } : {}),
      ...(opts.headers || {}),
    };
    req.socket = { encrypted: false, remoteAddress: '127.0.0.1' };

    const chunks = [];
    const resHeaders = {};
    const res = new Writable({
      write(chunk, _enc, cb) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        cb();
      },
    });
    res.statusCode = 200;
    res.setHeader = (k, v) => {
      resHeaders[k.toLowerCase()] = v;
    };
    res.getHeader = (k) => resHeaders[k.toLowerCase()];
    res.removeHeader = (k) => {
      delete resHeaders[k.toLowerCase()];
    };
    res.writeHead = (status, hdrs) => {
      res.statusCode = status;
      if (hdrs && typeof hdrs === 'object') {
        for (const [k, v] of Object.entries(hdrs)) resHeaders[k.toLowerCase()] = v;
      }
      return res;
    };

    const origEnd = res.end.bind(res);
    res.end = (chunk, enc, cb) => {
      if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk), typeof enc === 'string' ? enc : 'utf8'));
      return origEnd(cb);
    };

    res.on('finish', () => {
      const textBody = Buffer.concat(chunks).toString('utf8');
      resolve({
        status: res.statusCode,
        headers: resHeaders,
        text: async () => textBody,
        json: async () => JSON.parse(textBody),
      });
    });
    res.on('error', reject);

    handler(req, res);
  });
}

const studentCookie = makeCookie('user_student_1');
const adminCookie = makeCookie('user_admin_1');

async function testAll() {
  console.log('--- VERIFYING AKADEMI CREATOR SSR ROUTES & APIS ---');

  const routes = [
    { name: '01. Landing Page', url: 'http://localhost:4322/', cookie: null },
    { name: '02. Products Catalog', url: 'http://localhost:4322/products', cookie: null },
    { name: '03. Product Detail (100K Roadmap)', url: 'http://localhost:4322/products/course-100k-roadmap', cookie: null },
    { name: '04. Product Detail (Full-Stack Bundle)', url: 'http://localhost:4322/products/super-creator-bundle-100k', cookie: null },
    { name: '05. Product Detail (E-Book Storytelling)', url: 'http://localhost:4322/products/e-book-the-art-of-story-telling', cookie: null },
    { name: '06. Checkout Page', url: 'http://localhost:4322/checkout', cookie: null },
    { name: '07. Login Page', url: 'http://localhost:4322/auth/login', cookie: null },
    { name: '08. Register Page', url: 'http://localhost:4322/auth/register', cookie: null },
    { name: '09. Terms & Privacy Page', url: 'http://localhost:4322/terms-and-privacy', cookie: null },
    { name: '10. LMS Video Lesson', url: 'http://localhost:4322/classroom/prod_course_100k/les_100k_1', cookie: studentCookie },
    { name: '11. LMS Document Reader', url: 'http://localhost:4322/classroom/prod_course_100k/les_100k_2', cookie: studentCookie },
    { name: '12. LMS Competency Quiz', url: 'http://localhost:4322/classroom/prod_course_100k/les_100k_3', cookie: studentCookie },
    { name: '13. Student Member Dashboard', url: 'http://localhost:4322/dashboard', cookie: studentCookie },
    { name: '14. Student 1-on-1 Mentoring Chat', url: 'http://localhost:4322/dashboard/chat', cookie: studentCookie },
    { name: '15. Admin Console Overview', url: 'http://localhost:4322/admin', cookie: adminCookie },
    { name: '16. Admin Products Manager', url: 'http://localhost:4322/admin/products', cookie: adminCookie },
    { name: '17. Admin Vouchers Manager', url: 'http://localhost:4322/admin/vouchers', cookie: adminCookie },
    { name: '18. Admin & Mentor Chat Desk', url: 'http://localhost:4322/admin/chat', cookie: adminCookie },
  ];

  let passed = 0;
  let failed = 0;

  const assertPass = (ok, label, detail = '') => {
    if (ok) {
      console.log(`PASS ${label}${detail ? ` -> ${detail}` : ''}`);
      passed++;
    } else {
      console.error(`FAIL ${label}${detail ? ` -> ${detail}` : ''}`);
      failed++;
    }
  };

  for (const r of routes) {
    const res = await invoke(r.url, {
      headers: r.cookie ? { cookie: r.cookie } : {},
    });
    const html = await res.text();
    const hasEmDash = html.includes('\u2014');
    assertPass(
      res.status === 200 && !hasEmDash && html.length > 500,
      r.name,
      `HTTP ${res.status}, ${html.length} bytes, zero em-dash=${!hasEmDash}`
    );
  }

  {
    const res = await invoke('http://localhost:4322/dashboard');
    assertPass(res.status === 302, '19. Unauthenticated /dashboard Redirect Guard', `HTTP ${res.status}`);
  }

  {
    const res = await invoke('http://localhost:4322/api/admin/products', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie: studentCookie },
      body: JSON.stringify({ title: 'Unauthorized Test', price: 100000 }),
    });
    assertPass(res.status === 403, '20. Admin API Rejects Non-Admin Role', `HTTP ${res.status}`);
  }

  {
    const res = await invoke('http://localhost:4322/api/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        productId: 'prod_course_100k',
        name: 'Spoof Attempt',
        email: 'siswa@akademicreator.com',
        password: 'wrongpassword',
      }),
    });
    assertPass(res.status === 401, '21. Checkout Prevents Existing Email Spoofing', `HTTP ${res.status}`);
  }

  {
    const res = await invoke('http://localhost:4322/api/vouchers/validate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: 'CREATOR100K', subtotal: 599000, productId: 'prod_bundle_ultimate' }),
    });
    const json = await res.json();
    assertPass(json.valid === true && json.discount === 100000, '22. Voucher Engine Validation (CREATOR100K)', `Discount Rp ${json.discount}`);
  }

  {
    const res = await invoke('http://localhost:4322/api/classroom/quiz', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie: studentCookie },
      body: JSON.stringify({ quizId: 'quiz_100k_1', lessonId: 'les_100k_3', answers: [1, 1, 1, 0] }),
    });
    const json = await res.json();
    assertPass(json.success && json.score === 100 && json.passed === true, '23. LMS Quiz Grading Engine', `Score ${json.score}/100`);
  }

  {
    const res = await invoke('http://localhost:4322/api/classroom/progress', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie: studentCookie },
      body: JSON.stringify({ lessonId: 'les_100k_2', courseId: 'prod_course_100k', completed: true }),
    });
    const json = await res.json();
    assertPass(json.success && json.completed === true, '24. LMS Lesson Progress Update', `Course progress ${json.progressPercent}%`);
  }

  let createdMsgIds = [];
  {
    const res = await invoke('http://localhost:4322/api/chat/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie: studentCookie },
      body: JSON.stringify({ roomId: 'chat_room_student_1', message: 'Mas Ogut, mohon bedah kalimat pembuka hook 3 detik saya.' }),
    });
    const json = await res.json();
    if (json.messageId) createdMsgIds.push(json.messageId);
    if (json.mentorReply?.id) createdMsgIds.push(json.mentorReply.id);
    assertPass(Boolean(json.success && json.mentorReply?.message), '25. 1-on-1 Mentoring Chat + Contextual Reply', json.mentorReply?.message?.slice(0, 48));
  }

  const testEmail = `autotest.${Date.now()}@akademicreator.id`;
  let createdOrderId = null;
  {
    const res = await invoke('http://localhost:4322/api/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        productId: 'prod_bundle_ultimate',
        name: 'Nadia Kusuma',
        email: testEmail,
        whatsapp: '081234567899',
        password: 'password123',
        voucherCode: 'CREATOR100K',
        paymentMethod: 'qris',
      }),
    });
    const json = await res.json();
    createdOrderId = json.orderId;
    assertPass(Boolean(json.success && json.paymentRef && json.redirectUrl), '26. 1-Click Checkout & Auto-Enrollment', `${json.paymentRef} -> ${json.redirectUrl}`);
  }

  const pool = mariadb.createPool({
    host: process.env.MARIADB_HOST || 'localhost',
    port: Number(process.env.MARIADB_PORT) || 3306,
    user: process.env.MARIADB_USER || 'root',
    password: process.env.MARIADB_PASSWORD || '',
    database: process.env.MARIADB_DATABASE || 'akademicreator',
    socketPath: process.env.MARIADB_SOCKET,
  });
  const conn = await pool.getConnection();
  try {
    for (const mid of createdMsgIds) {
      await conn.query('DELETE FROM chat_messages WHERE id = ?', [mid]);
    }
    const testUsers = await conn.query('SELECT id FROM users WHERE email = ?', [testEmail]);
    const testUser = testUsers[0];
    if (testUser?.id) {
      const rooms = await conn.query('SELECT id FROM chat_rooms WHERE student_id = ?', [testUser.id]);
      for (const rm of rooms) {
        await conn.query('DELETE FROM chat_messages WHERE room_id = ?', [rm.id]);
      }
      await conn.query('DELETE FROM chat_rooms WHERE student_id = ?', [testUser.id]);
      await conn.query('DELETE FROM enrollments WHERE user_id = ?', [testUser.id]);
      if (createdOrderId) await conn.query('DELETE FROM orders WHERE id = ?', [createdOrderId]);
      await conn.query('DELETE FROM users WHERE id = ?', [testUser.id]);
      await conn.query("UPDATE vouchers SET used_count = GREATEST(0, used_count - 1) WHERE code = 'CREATOR100K'");
    }
    await conn.query("DELETE FROM user_lesson_progress WHERE user_id = 'user_student_1' AND lesson_id = 'les_100k_3'");
    await conn.query("UPDATE enrollments SET progress = 40 WHERE user_id = 'user_student_1' AND course_id = 'prod_course_100k'");
  } finally {
    conn.release();
    await pool.end();
  }

  console.log(`\nSUMMARY: ${passed} PASSED | ${failed} FAILED\n`);
  process.exit(failed > 0 ? 1 : 0);
}

testAll().catch((err) => {
  console.error('Fatal test failure:', err);
  process.exit(1);
});
