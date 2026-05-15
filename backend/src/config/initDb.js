const pool = require('./db');
const fs = require('fs');
const path = require('path');

async function initDb() {
  try {
    const schemaPath = path.join(__dirname, '..', 'models', 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolon but ignore ones inside strings or comments (simplistic split)
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log('Starting Database Initialization...');

    for (const statement of statements) {
      await pool.query(statement);
    }

    console.log('Database Initialization Successful!');
    process.exit(0);
  } catch (err) {
    console.error('Database Initialization Failed:', err.message);
    process.exit(1);
  }
}

initDb();
