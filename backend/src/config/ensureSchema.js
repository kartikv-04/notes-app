import pool from './db.js';

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createNotesTableQuery = `
  CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('todo', 'inprogress', 'done') DEFAULT 'todo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`;

async function getTableColumns(tableName) {
  const [rows] = await pool.query(
    `
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?
    `,
    [tableName]
  );

  return new Set(rows.map((row) => row.COLUMN_NAME));
}

async function ensureNotesCompatibility() {
  const columns = await getTableColumns('notes');

  if (!columns.has('description')) {
    await pool.query('ALTER TABLE notes ADD COLUMN description TEXT AFTER title');
  }

  if (!columns.has('updated_at')) {
    await pool.query(
      `
        ALTER TABLE notes
        ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
      `
    );
  }

  if (columns.has('content')) {
    await pool.query(
      `
        UPDATE notes
        SET description = CASE
          WHEN description IS NULL OR description = '' THEN content
          ELSE description
        END
        WHERE content IS NOT NULL
      `
    );
  }

  await pool.query(
    `
      ALTER TABLE notes
      MODIFY COLUMN status VARCHAR(20) NOT NULL DEFAULT 'todo'
    `
  );

  await pool.query(
    `
      UPDATE notes
      SET status = CASE
        WHEN LOWER(status) IN ('doing', 'inprogress', 'in progress') THEN 'inprogress'
        WHEN LOWER(status) IN ('done', 'completed') THEN 'done'
        ELSE 'todo'
      END
    `
  );

  await pool.query(
    `
      ALTER TABLE notes
      MODIFY COLUMN status ENUM('todo', 'inprogress', 'done') NOT NULL DEFAULT 'todo'
    `
  );
}

async function ensureSchema() {
  await pool.query(createUsersTableQuery);
  await pool.query(createNotesTableQuery);
  await ensureNotesCompatibility();
}

export default ensureSchema;
