import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ViewTabs from './ViewTabs';
import NotesBoard from './NotesBoard';
import NotesList from './NotesList';
import NoteModal from './NoteModal';
import { Download, Filter, Plus, LayoutGrid, Columns, Rows, List, Search } from 'lucide-react';
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
  const [subViewMode, setSubViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalState, setModalState] = useState({ isOpen: false, note: null, defaultStatus: 'todo' });
  const [isSaving, setIsSaving] = useState(false);
  const [actionError, setActionError] = useState('');
  const [draggedNoteId, setDraggedNoteId] = useState(null);


  const filteredNotes = notes
    .filter((note) => {
      const haystack = `${note.title} ${note.description} ${STATUS_META[note.status]?.label ?? ''}`.toLowerCase();
      const matchesSearch = haystack.includes(searchQuery.trim().toLowerCase());
      const matchesFilter = filterBy === 'all' || note.status === filterBy;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
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
    <div className="flex min-h-screen bg-[#f8fafc] font-sans">
      <Sidebar user={user} onLogout={onLogout} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar user={user} />

        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          <div className="mx-auto max-w-7xl">
            <header className="mb-8 space-y-6">
              {/* Row 1: Title and Main Actions */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Notes Board</h1>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Manage your project tasks and ideas efficiently.
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => downloadNotesAsJson(filteredNotes)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalState({ isOpen: true, note: null, defaultStatus: 'todo' })}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-primary-200 transition hover:bg-primary-700 active:scale-95"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add New</span>
                  </button>
                </div>
              </div>

              {/* Row 2: Search and Filters */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-y border-slate-100 py-6">
                <div className="relative block w-full lg:max-w-md">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search anything..."
                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 shadow-sm"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                    <Filter className="h-3.5 w-3.5 text-slate-400" />
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="bg-transparent text-sm font-bold text-slate-600 outline-none"
                    >
                      <option value="all">All Status</option>
                      <option value="todo">To Do</option>
                      <option value="inprogress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                    <span className="text-xs font-bold text-slate-400">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent text-sm font-bold text-slate-600 outline-none"
                    >
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                      <option value="title">Alphabetical</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3: View Toggles */}
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'grid', icon: LayoutGrid, label: 'Grid', view: 'board' },
                  { id: 'column', icon: Columns, label: 'Column', view: 'board' },
                  { id: 'row', icon: Rows, label: 'Row', view: 'list' },
                  { id: 'list', icon: List, label: 'List', view: 'list' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      setSubViewMode(mode.id);
                      setViewMode(mode.view);
                    }}
                    className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                      subViewMode === mode.id
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-100'
                        : 'text-slate-500 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200'
                    }`}
                  >
                    <mode.icon className="h-3.5 w-3.5" />
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>
            </header>

            <section className="flex-1 overflow-auto px-5 pb-8 md:px-8">
              {notesError || actionError ? (
                <div className="mb-6 rounded-lg border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600">
                  {actionError || notesError}
                </div>
              ) : null}

              {isLoading ? (
                <div className="grid gap-6 xl:grid-cols-3">
                  {[1, 2, 3].map((column) => (
                    <div key={column} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                      <div className="mb-4 h-6 w-32 animate-pulse rounded-md bg-slate-200" />
                      <div className="space-y-4">
                        {[1, 2].map((card) => (
                          <div key={card} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="h-4 w-20 animate-pulse rounded-md bg-slate-100" />
                            <div className="mt-4 h-6 w-2/3 animate-pulse rounded-md bg-slate-100" />
                            <div className="mt-3 h-16 animate-pulse rounded-md bg-slate-100" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : viewMode === 'board' ? (
                <NotesBoard
                  notes={filteredNotes}
                  subViewMode={subViewMode}
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
                  subViewMode={subViewMode}
                  onCreateNote={(status) => setModalState({ isOpen: true, note: null, defaultStatus: status })}
                  onEditNote={(note) => setModalState({ isOpen: true, note, defaultStatus: note.status })}
                  onDeleteNote={handleDeleteNote}
                  onDragStart={setDraggedNoteId}
                  onDragEnd={() => setDraggedNoteId(null)}
                />
              )}
            </section>
          </div>
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
