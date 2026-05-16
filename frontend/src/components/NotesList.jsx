import EmptyState from './EmptyState';
import NoteCard from './NoteCard';

function NotesList({ notes, subViewMode = 'row', onCreateNote, onEditNote, onDeleteNote, onDragStart, onDragEnd }) {
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

  const variant = subViewMode === 'row' ? 'list' : 'compact';

  return (
    <div className={subViewMode === 'row' ? "space-y-4" : "space-y-2"}>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          variant={variant}
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

