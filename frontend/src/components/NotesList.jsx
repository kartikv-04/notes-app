import EmptyState from './EmptyState';
import NoteCard from './NoteCard';

function NotesList({ notes, onCreateNote, onEditNote, onDeleteNote, onDragStart, onDragEnd }) {
  if (!notes.length) {
    return (
      <EmptyState
        title="Nothing matches this view"
        description="Try a different search query or create a fresh note to start filling the list."
        actionLabel="Create a note"
        onAction={() => onCreateNote('todo')}
      />
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          variant="list"
          onEdit={onEditNote}
          onDelete={onDeleteNote}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  );
}

export default NotesList;

