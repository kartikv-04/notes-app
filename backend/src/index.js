const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');
const ensureSchema = require('./config/ensureSchema');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

app.get('/', (req, res) => {
  res.send('GoMindz Notes API is running...');
});

const startServer = async () => {
  try {
    await ensureSchema();

    const connection = await pool.getConnection();
    console.log('Connected to MySQL database.');
    connection.release();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

startServer();
