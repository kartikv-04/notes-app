import NoteCard from './NoteCard';
import { Plus } from 'lucide-react';
import { STATUS_META } from '../lib/constants';

function BoardColumn({
  status,
  notes,
  onCreateNote,
  onEditNote,
  onDeleteNote,
  onMoveNote,
  onDragStart,
  onDragEnd,
}) {
  const meta = STATUS_META[status] ?? STATUS_META.todo;

  return (
    <section
      onDragOver={(event) => event.preventDefault()}
      onDrop={() => {
        onMoveNote(status);
        onDragEnd();
      }}
      className="rounded-xl border border-slate-200 bg-slate-50/50 p-4"
    >
      <div className="mb-4 flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${meta.dotClass}`} />
          <h2 className="text-sm font-bold text-slate-900">{meta.label}</h2>
          <span className="text-xs font-medium text-slate-400">{notes.length}</span>
        </div>

        <button
          type="button"
          onClick={() => onCreateNote(status)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-900 hover:text-slate-900 shadow-sm"
          title={`Add to ${meta.label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
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
    </section>
  );
}

export default BoardColumn;
