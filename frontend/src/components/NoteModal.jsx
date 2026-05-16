import { useState } from 'react';
import { X } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            {note ? 'Edit Note' : 'Create Note'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-primary-50 hover:text-primary-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">Title</span>
              <input
                type="text"
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10"
                placeholder="What's this about?"
                autoFocus
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">Description</span>
              <textarea
                rows="4"
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 resize-none"
                placeholder="Details..."
              />
            </label>

            <div className="block">
              <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-400">Status</span>
              <div className="grid gap-2 grid-cols-3">
                {STATUS_ORDER.map((status) => {
                  const meta = STATUS_META[status];
                  const isActive = form.status === status;

                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setForm((current) => ({ ...current, status }))}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${
                        isActive
                          ? 'border-primary-600 bg-primary-600 text-white shadow-md shadow-primary-200'
                          : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-primary-200'
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-white' : meta.dotClass}`} />
                      <span className="text-[10px] font-bold uppercase tracking-wide">{meta.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-200 transition hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSaving ? 'Saving...' : note ? 'Save Changes' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
