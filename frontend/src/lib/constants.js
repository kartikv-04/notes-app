export const TOKEN_STORAGE_KEY = 'gomindz_token';
export const USER_STORAGE_KEY = 'gomindz_user';

export const STATUS_ORDER = ['todo', 'inprogress', 'done'];

export const STATUS_META = {
  todo: {
    label: 'To Do',
    badgeClass: 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100',
    dotClass: 'bg-indigo-500',
    progressClass: 'from-indigo-500 to-violet-500',
    progressWidth: '18%',
  },
  inprogress: {
    label: 'In Progress',
    badgeClass: 'bg-amber-50 text-amber-600 ring-1 ring-amber-100',
    dotClass: 'bg-amber-500',
    progressClass: 'from-amber-400 to-orange-500',
    progressWidth: '58%',
  },
  done: {
    label: 'Done',
    badgeClass: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100',
    dotClass: 'bg-emerald-500',
    progressClass: 'from-emerald-400 to-green-500',
    progressWidth: '100%',
  },
};

export const VIEW_OPTIONS = [
  { id: 'board', label: 'Board View' },
  { id: 'list', label: 'List View' },
];

export const TEAM_MEMBERS = [
  { name: 'Ava', className: 'bg-rose-200 text-rose-700' },
  { name: 'Mila', className: 'bg-amber-200 text-amber-700' },
  { name: 'Kai', className: 'bg-emerald-200 text-emerald-700' },
  { name: 'Noah', className: 'bg-cyan-200 text-cyan-700' },
  { name: 'Ira', className: 'bg-violet-200 text-violet-700' },
  { name: 'Zoya', className: 'bg-fuchsia-200 text-fuchsia-700' },
];

