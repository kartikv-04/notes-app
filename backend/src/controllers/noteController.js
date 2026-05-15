const pool = require('../config/db');

// @desc Get all user notes
// @route GET /api/notes
exports.getNotes = async (req, res) => {
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
exports.createNote = async (req, res) => {
  const { title, content, status } = req.body;
  const userId = req.user.id;

  try {
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const [result] = await pool.query(
      'INSERT INTO notes (user_id, title, content, status) VALUES (?, ?, ?, ?)',
      [userId, title, content, status || 'todo']
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
exports.updateNote = async (req, res) => {
  const { title, content, status } = req.body;
  const noteId = req.params.id;
  const userId = req.user.id;

  try {
    // Check if note exists and belongs to user
    const [rows] = await pool.query('SELECT * FROM notes WHERE id = ? AND user_id = ?', [noteId, userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    await pool.query(
      'UPDATE notes SET title = ?, content = ?, status = ? WHERE id = ?',
      [title || rows[0].title, content || rows[0].content, status || rows[0].status, noteId]
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
exports.deleteNote = async (req, res) => {
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
