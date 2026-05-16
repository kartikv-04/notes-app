import NoteCard from './NoteCard';
import { PlusIcon } from './Icons';
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
      className="rounded-[30px] border border-slate-200/80 bg-white/70 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur"
    >
      <div className="mb-4 flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-3">
          <span className={`h-3 w-3 rounded-full ${meta.dotClass}`} />
          <h2 className="text-2xl font-black text-slate-900">{meta.label}</h2>
          <span className="text-lg font-bold text-slate-300">({notes.length})</span>
        </div>

        <button
          type="button"
          onClick={() => onCreateNote(status)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:text-indigo-600"
          aria-label={`Add note in ${meta.label}`}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
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

