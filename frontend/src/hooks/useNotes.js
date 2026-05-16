import { useEffect, useState } from 'react';
import { notesApi } from '../lib/api';
import { normalizeNote, normalizeStatus } from '../lib/helpers';

export function useNotes(token, onUnauthorized) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notesError, setNotesError] = useState('');

  useEffect(() => {
    if (!token) {
      return;
    }

    async function loadNotes() {
      setIsLoading(true);
      setNotesError('');

      try {
        const response = await notesApi.fetchNotes(token, onUnauthorized);
        setNotes(response.map(normalizeNote));
      } catch (error) {
        setNotesError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadNotes();
  }, [token, onUnauthorized]);

  async function createNote(values) {
    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      status: normalizeStatus(values.status),
    };

    const createdNote = normalizeNote(await notesApi.createNote(payload, token, onUnauthorized));

    setNotes((currentNotes) => [createdNote, ...currentNotes]);
    return createdNote;
  }

  async function updateNote(noteId, values) {
    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      status: normalizeStatus(values.status),
    };

    const updatedNote = normalizeNote(await notesApi.updateNote(noteId, payload, token, onUnauthorized));

    setNotes((currentNotes) => currentNotes.map((note) => (
      note.id === noteId ? updatedNote : note
    )));

    return updatedNote;
  }

  async function deleteNote(noteId) {
    const previousNotes = notes;

    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== noteId));

    try {
      await notesApi.deleteNote(noteId, token, onUnauthorized);
    } catch (error) {
      setNotes(previousNotes);
      throw error;
    }
  }

  async function moveNote(noteId, nextStatus) {
    const normalizedStatus = normalizeStatus(nextStatus);
    const previousNote = notes.find((note) => note.id === noteId);

    if (!previousNote || previousNote.status === normalizedStatus) {
      return;
    }

    setNotes((currentNotes) => currentNotes.map((note) => (
      note.id === noteId ? { ...note, status: normalizedStatus } : note
    )));

    try {
      const updatedNote = normalizeNote(
        await notesApi.updateNote(noteId, {
          title: previousNote.title,
          description: previousNote.description,
          status: normalizedStatus,
        }, token, onUnauthorized)
      );

      setNotes((currentNotes) => currentNotes.map((note) => (
        note.id === noteId ? updatedNote : note
      )));
    } catch (error) {
      setNotes((currentNotes) => currentNotes.map((note) => (
        note.id === noteId ? previousNote : note
      )));

      throw error;
    }
  }

  return {
    notes,
    isLoading,
    notesError,
    createNote,
    updateNote,
    deleteNote,
    moveNote,
  };
}
