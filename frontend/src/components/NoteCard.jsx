import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { STATUS_META } from '../lib/constants';
import { formatNoteDate, getProgressWidth, getTeamSlice } from '../lib/helpers';

function NoteCard({ note, onEdit, onDelete, onDragStart, onDragEnd, variant = 'board' }) {
  const team = getTeamSlice(note.id);
  const isList = variant === 'list';
  const isCompact = variant === 'compact';
  const meta = STATUS_META[note.status] ?? STATUS_META.todo;

  if (isCompact) {
    return (
      <article
        draggable
        onDragStart={() => onDragStart(note.id)}
        onDragEnd={onDragEnd}
        className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white px-4 py-2 shadow-sm transition-all hover:shadow-md hover:border-slate-300 group cursor-grab active:cursor-grabbing"
      >
        <StatusBadge status={note.status} />
        <h3 className="flex-1 text-sm font-bold text-slate-900 truncate">{note.title}</h3>
        <div className="hidden sm:block text-right">
          <p className="text-[10px] font-bold text-slate-400">{formatNoteDate(note.updatedAt || note.createdAt)}</p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onEdit(note); }}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <Pencil className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDelete(note); }}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </article>
    );
  }

  return (
    <article
      draggable
      onDragStart={() => onDragStart(note.id)}
      onDragEnd={onDragEnd}
      className={`rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-slate-300 group cursor-grab active:cursor-grabbing ${
        isList ? 'grid gap-5 lg:grid-cols-[1.5fr_0.85fr]' : 'space-y-4'
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <StatusBadge status={note.status} />
            <h3 className="mt-3 text-base font-bold text-slate-900 truncate">{note.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">
              {note.description || 'No description provided.'}
            </p>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onEdit(note); }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-900"
              title="Edit"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDelete(note); }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100"
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span>Progress</span>
            <span className="text-slate-900">{meta.label}</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-100">
            <div
              className={`h-1.5 rounded-full bg-slate-900 transition-all duration-500`}
              style={{ width: getProgressWidth(note.status) }}
            />
          </div>
        </div>
      </div>

      <div className={`flex ${isList ? 'items-end justify-between gap-4' : 'items-center justify-between gap-4 pt-2 border-t border-slate-50'}`}>
        <div className="flex -space-x-2">
          {team.map((member) => (
            <div
              key={`${note.id}-${member.name}`}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold shadow-sm ${member.className} ring-1 ring-slate-100`}
              title={member.name}
            >

              {member.name.slice(0, 1)}
            </div>
          ))}
        </div>

        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400">{formatNoteDate(note.updatedAt || note.createdAt)}</p>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;
