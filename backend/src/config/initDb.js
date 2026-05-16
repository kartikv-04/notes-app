import ensureSchema from './ensureSchema.js';

async function initDb() {
  try {
    await ensureSchema();
    console.log('Database initialization successful.');
    process.exit(0);
  } catch (err) {
    console.error('Database initialization failed:', err.message);
    process.exit(1);
  }
}

initDb();
