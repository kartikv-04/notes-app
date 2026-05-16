import BoardColumn from './BoardColumn';
import NoteCard from './NoteCard';
import EmptyState from './EmptyState';
import { STATUS_ORDER } from '../lib/constants';

function NotesBoard({
  notes,
  subViewMode = 'column',
  onCreateNote,
  onEditNote,
  onDeleteNote,
  onMoveNote,
  onDragStart,
  onDragEnd,
}) {
  if (!notes.length) {
    return (
      <EmptyState
        title="No notes yet"
        description="Create your first note and it will show up here as a clean card."
        actionLabel="Create a note"
        onAction={() => onCreateNote('todo')}
      />
    );
  }

  if (subViewMode === 'grid') {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={onEditNote}
            onDelete={onDeleteNote}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {STATUS_ORDER.map((status) => (
        <BoardColumn
          key={status}
          status={status}
          notes={notes.filter((note) => note.status === status)}
          onCreateNote={onCreateNote}
          onEditNote={onEditNote}
          onDeleteNote={onDeleteNote}
          onMoveNote={onMoveNote}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  );
}

export default NotesBoard;

