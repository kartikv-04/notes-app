import { useState } from 'react';
import { STATUS_ORDER, STATUS_META } from '../lib/constants';

function createInitialForm(note, defaultStatus) {
  return {
    title: note?.title ?? '',
    description: note?.description ?? '',
    status: note?.status ?? defaultStatus ?? 'todo',
  };
}

function NoteModal({ isOpen, note, defaultStatus, onClose, onSave, isSaving }) {
  const [form, setForm] = useState(() => createInitialForm(note, defaultStatus));

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    await onSave(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[32px] border border-white/80 bg-white p-6 shadow-[0_30px_120px_rgba(15,23,42,0.18)] md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">
              {note ? 'Update note' : 'Create note'}
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">
              {note ? 'Edit your note' : 'Add a fresh note'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-800"
          >
            Close
          </button>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              placeholder="UI polish checklist"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Description</span>
            <textarea
              rows="5"
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              placeholder="Write the note description here..."
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Status</span>
            <div className="grid gap-3 md:grid-cols-3">
              {STATUS_ORDER.map((status) => {
                const meta = STATUS_META[status];
                const isActive = form.status === status;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, status }))}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      isActive
                        ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-3 w-3 rounded-full ${meta.dotClass}`} />
                      <span className="font-bold text-slate-900">{meta.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </label>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? 'Saving...' : note ? 'Save changes' : 'Create note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
