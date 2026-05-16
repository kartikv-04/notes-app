import { STATUS_META, TEAM_MEMBERS } from './constants';

export function normalizeStatus(status) {
  if (!status) {
    return 'todo';
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

  return 'todo';
}

export function normalizeNote(note) {
  return {
    ...note,
    description: note.description ?? note.content ?? '',
    status: normalizeStatus(note.status),
    createdAt: note.created_at ?? note.createdAt ?? new Date().toISOString(),
    updatedAt: note.updated_at ?? note.updatedAt ?? new Date().toISOString(),
  };
}

export function formatNoteDate(dateValue) {
  if (!dateValue) {
    return 'Just now';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateValue));
}

export function getProgressWidth(status) {
  return STATUS_META[status]?.progressWidth ?? '18%';
}

export function getTeamSlice(seed) {
  const start = Number(seed || 0) % TEAM_MEMBERS.length;
  const count = 2 + (Number(seed || 0) % 3);

  return Array.from({ length: count }, (_, index) => TEAM_MEMBERS[(start + index) % TEAM_MEMBERS.length]);
}

export function getInitials(value) {
  return String(value || 'GM')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function downloadNotesAsJson(notes) {
  const file = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(file);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = 'gomindz-notes.json';
  anchor.click();

  URL.revokeObjectURL(url);
}

