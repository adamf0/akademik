import { DatabaseSync } from 'node:sqlite';
import mariadb from 'mariadb';
import path from 'node:path';

const sqliteDbPath = path.resolve('data/akademicreator.db');
const sqlite = new DatabaseSync(sqliteDbPath);

const pool = mariadb.createPool({
  host: process.env.MARIADB_HOST || 'localhost',
  port: Number(process.env.MARIADB_PORT) || 3306,
  user: process.env.MARIADB_USER || 'root',
  password: process.env.MARIADB_PASSWORD || '',
  database: process.env.MARIADB_DATABASE || 'akademicreator',
  socketPath: process.env.MARIADB_SOCKET,
  connectionLimit: 5,
});

async function migrate() {
  const conn = await pool.getConnection();
  console.log('Connected to MariaDB successfully.');

  try {
    await conn.query('SET FOREIGN_KEY_CHECKS = 0;');

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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
    ];

    for (const sql of schemaStatements) {
      await conn.query(sql);
    }
    console.log('Tables created or verified in MariaDB.');

    // Now migrate data from SQLite
    const tables = [
      'users',
      'products',
      'bundle_items',
      'vouchers',
      'orders',
      'enrollments',
      'lessons',
      'quizzes',
      'user_lesson_progress',
      'chat_rooms',
      'chat_messages'
    ];

    for (const table of tables) {
      const rows = sqlite.prepare(`SELECT * FROM ${table}`).all();
      if (rows.length > 0) {
        const columns = Object.keys(rows[0]);
        const placeholders = columns.map(() => '?').join(', ');
        const insertSql = `REPLACE INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
        for (const row of rows) {
          const values = columns.map(col => row[col]);
          await conn.query(insertSql, values);
        }
      }
      const count = await conn.query(`SELECT COUNT(*) as c FROM ${table}`);
      console.log(`Table ${table}: migrated ${rows.length} rows (MariaDB count: ${count[0].c})`);
    }

    await conn.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log('Data migration complete!');
  } finally {
    conn.release();
    await pool.end();
  }
}

migrate().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
