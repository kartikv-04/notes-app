import BoardColumn from './BoardColumn';
import EmptyState from './EmptyState';
import { STATUS_ORDER } from '../lib/constants';

function NotesBoard({
  notes,
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
        description="Create your first note and it will show up here as a clean card that can move across the Kanban board."
        actionLabel="Create a note"
        onAction={() => onCreateNote('todo')}
      />
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

