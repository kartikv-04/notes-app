import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ViewTabs from './ViewTabs';
import NotesBoard from './NotesBoard';
import NotesList from './NotesList';
import NoteModal from './NoteModal';
import { ExportIcon, FilterIcon, PlusIcon, SortIcon } from './Icons';
import { STATUS_META } from '../lib/constants';
import { downloadNotesAsJson } from '../lib/helpers';

function DashboardLayout({
  user,
  notes,
  isLoading,
  notesError,
  onLogout,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
  onMoveNote,
}) {
  const [viewMode, setViewMode] = useState('board');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalState, setModalState] = useState({ isOpen: false, note: null, defaultStatus: 'todo' });
  const [isSaving, setIsSaving] = useState(false);
  const [actionError, setActionError] = useState('');
  const [draggedNoteId, setDraggedNoteId] = useState(null);

  const filteredNotes = notes.filter((note) => {
    const haystack = `${note.title} ${note.description} ${STATUS_META[note.status]?.label ?? ''}`.toLowerCase();
    return haystack.includes(searchQuery.trim().toLowerCase());
  });

  async function handleSaveNote(values) {
    setIsSaving(true);
    setActionError('');

    try {
      if (modalState.note) {
        await onUpdateNote(modalState.note.id, values);
      } else {
        await onCreateNote(values);
      }

      setModalState({ isOpen: false, note: null, defaultStatus: 'todo' });
    } catch (error) {
      setActionError(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteNote(note) {
    const shouldDelete = window.confirm(`Delete "${note.title}"?`);

    if (!shouldDelete) {
      return;
    }

    setActionError('');

    try {
      await onDeleteNote(note.id);
    } catch (error) {
      setActionError(error.message);
    }
  }

  async function handleDrop(targetStatus) {
    if (!draggedNoteId) {
      return;
    }

    try {
      await onMoveNote(draggedNoteId, targetStatus);
    } catch (error) {
      setActionError(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.14),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.10),_transparent_26%),linear-gradient(180deg,#f8fafc_0%,#f5f7ff_100%)]">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar user={user} />

        <main className="min-w-0 flex-1">
          <TopBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onLogout={onLogout}
          />

          <section className="border-b border-white/80 px-5 py-6 md:px-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-5">
                <div className="flex h-24 w-24 items-center justify-center rounded-[30px] bg-gradient-to-br from-indigo-100 via-violet-100 to-cyan-100 shadow-inner shadow-white/80">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">
                    Frontend Workspace
                  </p>
                  <h1 className="mt-2 text-4xl font-black text-slate-900">GoMindz Notes Board</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                    A clean notes workspace with list and Kanban views, drag-and-drop status updates, and assignment-aligned CRUD flows.
                  </p>
                  <div className="mt-5">
                    <ViewTabs value={viewMode} onChange={setViewMode} />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                >
                  <FilterIcon className="h-4 w-4" />
                  Filter
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                >
                  <SortIcon className="h-4 w-4" />
                  Sort
                </button>
                <button
                  type="button"
                  onClick={() => downloadNotesAsJson(filteredNotes)}
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-3 text-sm font-semibold text-indigo-600 transition hover:border-indigo-200 hover:text-indigo-700"
                >
                  <ExportIcon className="h-4 w-4" />
                  Export
                </button>
                <button
                  type="button"
                  onClick={() => setModalState({ isOpen: true, note: null, defaultStatus: 'todo' })}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:translate-y-[-1px]"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Note
                </button>
              </div>
            </div>
          </section>

          <section className="px-5 py-6 md:px-8">
            {notesError || actionError ? (
              <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                {actionError || notesError}
              </div>
            ) : null}

            {isLoading ? (
              <div className="grid gap-6 xl:grid-cols-3">
                {[1, 2, 3].map((column) => (
                  <div key={column} className="rounded-[30px] border border-slate-200/80 bg-white/70 p-4">
                    <div className="mb-4 h-8 w-40 animate-pulse rounded-full bg-slate-100" />
                    <div className="space-y-4">
                      {[1, 2].map((card) => (
                        <div key={card} className="rounded-[28px] border border-slate-200/70 bg-white p-5">
                          <div className="h-5 w-24 animate-pulse rounded-full bg-slate-100" />
                          <div className="mt-5 h-7 w-2/3 animate-pulse rounded-full bg-slate-100" />
                          <div className="mt-4 h-20 animate-pulse rounded-2xl bg-slate-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : viewMode === 'board' ? (
              <NotesBoard
                notes={filteredNotes}
                onCreateNote={(status) => setModalState({ isOpen: true, note: null, defaultStatus: status })}
                onEditNote={(note) => setModalState({ isOpen: true, note, defaultStatus: note.status })}
                onDeleteNote={handleDeleteNote}
                onMoveNote={handleDrop}
                onDragStart={setDraggedNoteId}
                onDragEnd={() => setDraggedNoteId(null)}
              />
            ) : (
              <NotesList
                notes={filteredNotes}
                onCreateNote={(status) => setModalState({ isOpen: true, note: null, defaultStatus: status })}
                onEditNote={(note) => setModalState({ isOpen: true, note, defaultStatus: note.status })}
                onDeleteNote={handleDeleteNote}
                onDragStart={setDraggedNoteId}
                onDragEnd={() => setDraggedNoteId(null)}
              />
            )}
          </section>
        </main>
      </div>

      <NoteModal
        key={`${modalState.note?.id ?? 'new'}-${modalState.defaultStatus}-${modalState.isOpen ? 'open' : 'closed'}`}
        isOpen={modalState.isOpen}
        note={modalState.note}
        defaultStatus={modalState.defaultStatus}
        onClose={() => setModalState({ isOpen: false, note: null, defaultStatus: 'todo' })}
        onSave={handleSaveNote}
        isSaving={isSaving}
      />
    </div>
  );
}

export default DashboardLayout;
