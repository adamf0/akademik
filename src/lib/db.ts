import mariadb from 'mariadb';

export const pool = mariadb.createPool({
  host: process.env.MARIADB_HOST || 'localhost',
  port: Number(process.env.MARIADB_PORT) || 3306,
  user: process.env.MARIADB_USER || 'root',
  password: process.env.MARIADB_PASSWORD || '',
  database: process.env.MARIADB_DATABASE || 'akademicreator',
  socketPath: process.env.MARIADB_SOCKET,
  connectionLimit: Number(process.env.MARIADB_CONNECTION_LIMIT) || 10,
  bigIntAsNumber: true,
  decimalAsNumber: true,
  insertIdAsNumber: true,
});

let initPromise: Promise<void> | null = null;

export async function initTables(): Promise<void> {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const conn = await pool.getConnection();
    try {
      const schemaStatements = [
        `CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(64) PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role VARCHAR(32) NOT NULL DEFAULT 'student',
          whatsapp VARCHAR(64),
          avatar TEXT,
          created_at VARCHAR(64) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(64) PRIMARY KEY,
          slug VARCHAR(255) UNIQUE NOT NULL,
          title VARCHAR(255) NOT NULL,
          tagline TEXT,
          description LONGTEXT,
          type VARCHAR(32) NOT NULL,
          price INT NOT NULL,
          original_price INT NOT NULL,
          cover_image TEXT,
          featured TINYINT(1) NOT NULL DEFAULT 0,
          curriculum_summary TEXT,
          badge VARCHAR(128),
          created_at VARCHAR(64) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS bundle_items (
          id VARCHAR(64) PRIMARY KEY,
          bundle_id VARCHAR(64) NOT NULL,
          product_id VARCHAR(64) NOT NULL,
          FOREIGN KEY(bundle_id) REFERENCES products(id) ON DELETE CASCADE,
          FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS vouchers (
          id VARCHAR(64) PRIMARY KEY,
          code VARCHAR(64) UNIQUE NOT NULL,
          type VARCHAR(32) NOT NULL,
          value INT NOT NULL,
          min_spend INT NOT NULL DEFAULT 0,
          max_uses INT NOT NULL DEFAULT 100,
          used_count INT NOT NULL DEFAULT 0,
          expires_at VARCHAR(64) NOT NULL,
          target_product_id VARCHAR(64),
          created_at VARCHAR(64) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(64) PRIMARY KEY,
          user_id VARCHAR(64) NOT NULL,
          product_id VARCHAR(64) NOT NULL,
          subtotal INT NOT NULL,
          discount INT NOT NULL DEFAULT 0,
          total INT NOT NULL,
          voucher_code VARCHAR(64),
          payment_method VARCHAR(64) NOT NULL,
          status VARCHAR(32) NOT NULL DEFAULT 'PAID',
          payment_reference VARCHAR(128) NOT NULL,
          created_at VARCHAR(64) NOT NULL,
          FOREIGN KEY(user_id) REFERENCES users(id),
          FOREIGN KEY(product_id) REFERENCES products(id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS enrollments (
          id VARCHAR(64) PRIMARY KEY,
          user_id VARCHAR(64) NOT NULL,
          course_id VARCHAR(64) NOT NULL,
          progress INT NOT NULL DEFAULT 0,
          status VARCHAR(32) NOT NULL DEFAULT 'active',
          created_at VARCHAR(64) NOT NULL,
          FOREIGN KEY(user_id) REFERENCES users(id),
          FOREIGN KEY(course_id) REFERENCES products(id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS lessons (
          id VARCHAR(64) PRIMARY KEY,
          course_id VARCHAR(64) NOT NULL,
          module_title VARCHAR(255) NOT NULL,
          title VARCHAR(255) NOT NULL,
          type VARCHAR(32) NOT NULL,
          duration VARCHAR(64),
          video_url TEXT,
          content_html LONGTEXT,
          pdf_preview_text LONGTEXT,
          order_index INT NOT NULL DEFAULT 0,
          FOREIGN KEY(course_id) REFERENCES products(id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS quizzes (
          id VARCHAR(64) PRIMARY KEY,
          lesson_id VARCHAR(64) UNIQUE NOT NULL,
          title VARCHAR(255) NOT NULL,
          passing_score INT NOT NULL DEFAULT 80,
          questions_json LONGTEXT NOT NULL,
          FOREIGN KEY(lesson_id) REFERENCES lessons(id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS user_lesson_progress (
          id VARCHAR(64) PRIMARY KEY,
          user_id VARCHAR(64) NOT NULL,
          lesson_id VARCHAR(64) NOT NULL,
          completed TINYINT(1) NOT NULL DEFAULT 0,
          quiz_score INT,
          updated_at VARCHAR(64) NOT NULL,
          UNIQUE KEY unique_user_lesson (user_id, lesson_id),
          FOREIGN KEY(user_id) REFERENCES users(id),
          FOREIGN KEY(lesson_id) REFERENCES lessons(id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS chat_rooms (
          id VARCHAR(64) PRIMARY KEY,
          student_id VARCHAR(64) NOT NULL,
          mentor_id VARCHAR(64) NOT NULL,
          course_id VARCHAR(64) NOT NULL,
          title VARCHAR(255) NOT NULL,
          updated_at VARCHAR(64) NOT NULL,
          FOREIGN KEY(student_id) REFERENCES users(id),
          FOREIGN KEY(mentor_id) REFERENCES users(id),
          FOREIGN KEY(course_id) REFERENCES products(id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS chat_messages (
          id VARCHAR(64) PRIMARY KEY,
          room_id VARCHAR(64) NOT NULL,
          sender_id VARCHAR(64) NOT NULL,
          message LONGTEXT NOT NULL,
          attachment_url TEXT,
          status VARCHAR(32) NOT NULL DEFAULT 'SENT',
          created_at VARCHAR(64) NOT NULL,
          FOREIGN KEY(room_id) REFERENCES chat_rooms(id),
          FOREIGN KEY(sender_id) REFERENCES users(id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
      ];

      for (const statement of schemaStatements) {
        await conn.query(statement);
      }
    } finally {
      conn.release();
    }
  })();
  return initPromise;
}

export const db = {
  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    await initTables();
    const conn = await pool.getConnection();
    try {
      const rows = await conn.query(sql, params);
      return Array.isArray(rows) ? rows : [];
    } finally {
      conn.release();
    }
  },

  async get<T = any>(sql: string, params?: any[]): Promise<T | undefined> {
    const rows = await this.query<T>(sql, params);
    return rows[0];
  },

  async run(sql: string, params?: any[]): Promise<{ affectedRows: number; insertId?: any }> {
    await initTables();
    const conn = await pool.getConnection();
    try {
      const res = await conn.query(sql, params);
      return {
        affectedRows: Number(res?.affectedRows || 0),
        insertId: res?.insertId,
      };
    } finally {
      conn.release();
    }
  },

  async exec(sql: string): Promise<void> {
    await initTables();
    const conn = await pool.getConnection();
    try {
      await conn.query(sql);
    } finally {
      conn.release();
    }
  },

  prepare(sql: string) {
    return {
      all: async (...params: any[]) => {
        const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        return db.query(sql, flatParams.length > 0 ? flatParams : undefined);
      },
      get: async (...params: any[]) => {
        const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        return db.get(sql, flatParams.length > 0 ? flatParams : undefined);
      },
      run: async (...params: any[]) => {
        const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        return db.run(sql, flatParams.length > 0 ? flatParams : undefined);
      },
    };
  },
};
