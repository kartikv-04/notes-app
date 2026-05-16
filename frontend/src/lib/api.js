const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

async function parseResponse(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function apiRequest(path, { method = 'GET', body, token, onUnauthorized } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    if (response.status === 401) {
      onUnauthorized?.();
    }

    throw new Error(data?.message || 'Something went wrong while talking to the server.');
  }

  return data;
}

export const authApi = {
  login(credentials) {
    return apiRequest('/auth/login', { method: 'POST', body: credentials });
  },
  register(credentials) {
    return apiRequest('/auth/register', { method: 'POST', body: credentials });
  },
};

export const notesApi = {
  fetchNotes(token, onUnauthorized) {
    return apiRequest('/notes', { token, onUnauthorized });
  },
  createNote(payload, token, onUnauthorized) {
    return apiRequest('/notes', { method: 'POST', body: payload, token, onUnauthorized });
  },
  updateNote(noteId, payload, token, onUnauthorized) {
    return apiRequest(`/notes/${noteId}`, { method: 'PUT', body: payload, token, onUnauthorized });
  },
  deleteNote(noteId, token, onUnauthorized) {
    return apiRequest(`/notes/${noteId}`, { method: 'DELETE', token, onUnauthorized });
  },
};

