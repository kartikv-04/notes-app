import { EditIcon, TrashIcon } from './Icons';
import StatusBadge from './StatusBadge';
import { STATUS_META } from '../lib/constants';
import { formatNoteDate, getProgressWidth, getTeamSlice } from '../lib/helpers';

function NoteCard({ note, onEdit, onDelete, onDragStart, onDragEnd, variant = 'board' }) {
  const team = getTeamSlice(note.id);
  const isList = variant === 'list';
  const meta = STATUS_META[note.status] ?? STATUS_META.todo;

  return (
    <article
      draggable
      onDragStart={() => onDragStart(note.id)}
      onDragEnd={onDragEnd}
      className={`rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.12)] ${
        isList ? 'grid gap-5 lg:grid-cols-[1.5fr_0.85fr]' : 'space-y-5'
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <StatusBadge status={note.status} />
            <h3 className="mt-4 text-xl font-black text-slate-900">{note.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              {note.description || 'No description yet. Add more detail to make this note easier to act on.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(note)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:text-indigo-600"
              aria-label="Edit note"
            >
              <EditIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(note)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:text-rose-600"
              aria-label="Delete note"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-500">
            <span>Progress</span>
            <span className="text-slate-700">{meta.label}</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${meta.progressClass}`}
              style={{ width: getProgressWidth(note.status) }}
            />
          </div>
        </div>
      </div>

      <div className={`flex ${isList ? 'items-end justify-between gap-4' : 'items-center justify-between gap-4'}`}>
        <div className="flex -space-x-3">
          {team.map((member) => (
            <div
              key={`${note.id}-${member.name}`}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-white text-xs font-black shadow-sm ${member.className}`}
              title={member.name}
            >
              {member.name.slice(0, 1)}
            </div>
          ))}
        </div>

        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Updated</p>
          <p className="mt-1 text-sm font-bold text-slate-700">{formatNoteDate(note.updatedAt || note.createdAt)}</p>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;

