import pool from '../config/db.js';

const VALID_STATUSES = ['todo', 'inprogress', 'done'];

const normalizeStatus = (status) => {
  if (!status) {
    return null;
  }

  const value = String(status).trim().toLowerCase();

  if (value === 'todo' || value === 'to do') {
    return 'todo';
  }

  if (value === 'inprogress' || value === 'in progress' || value === 'doing') {
    return 'inprogress';
  }

  if (value === 'done' || value === 'completed') {
    return 'done';
  }

  return null;
};

// @desc Get all user notes
// @route GET /api/notes
export const getNotes = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching notes' });
  }
};

// @desc Create a new note
// @route POST /api/notes
export const createNote = async (req, res) => {
  const { title } = req.body;
  const description = req.body.description ?? req.body.content ?? '';
  const status = normalizeStatus(req.body.status) || 'todo';
  const userId = req.user.id;

  try {
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Invalid note status' });
    }

    const [result] = await pool.query(
      'INSERT INTO notes (user_id, title, description, status) VALUES (?, ?, ?, ?)',
      [userId, title, description, status]
    );

    const newNoteId = result.insertId;
    const [newNote] = await pool.query('SELECT * FROM notes WHERE id = ?', [newNoteId]);

    res.status(201).json(newNote[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating note' });
  }
};

// @desc Update a note
// @route PUT /api/notes/:id
export const updateNote = async (req, res) => {
  const { title } = req.body;
  const hasDescription = Object.prototype.hasOwnProperty.call(req.body, 'description')
    || Object.prototype.hasOwnProperty.call(req.body, 'content');
  const description = req.body.description ?? req.body.content ?? '';
  const normalizedStatus = req.body.status ? normalizeStatus(req.body.status) : null;
  const noteId = req.params.id;
  const userId = req.user.id;

  try {
    // Check if note exists and belongs to user
    const [rows] = await pool.query('SELECT * FROM notes WHERE id = ? AND user_id = ?', [noteId, userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    if (req.body.status && !normalizedStatus) {
      return res.status(400).json({ message: 'Invalid note status' });
    }

    await pool.query(
      'UPDATE notes SET title = ?, description = ?, status = ? WHERE id = ?',
      [
        title || rows[0].title,
        hasDescription ? description : rows[0].description,
        normalizedStatus || rows[0].status,
        noteId
      ]
    );

    const [updatedNote] = await pool.query('SELECT * FROM notes WHERE id = ?', [noteId]);
    res.json(updatedNote[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating note' });
  }
};

// @desc Delete a note
// @route DELETE /api/notes/:id
export const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;

  try {
    const [result] = await pool.query('DELETE FROM notes WHERE id = ? AND user_id = ?', [noteId, userId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting note' });
  }
};
