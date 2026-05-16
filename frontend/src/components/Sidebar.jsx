import {
  BellIcon,
  BoardIcon,
  CalendarIcon,
  ChartIcon,
  HomeIcon,
  SettingsIcon,
  SparkIcon,
  UsersIcon,
} from './Icons';
import { getInitials } from '../lib/helpers';

const NAV_ITEMS = [
  { label: 'Home', icon: HomeIcon, active: true },
  { label: 'Dashboard', icon: BoardIcon },
  { label: 'Analytics', icon: ChartIcon },
  { label: 'People', icon: UsersIcon },
  { label: 'Calendar', icon: CalendarIcon },
  { label: 'Insights', icon: SparkIcon },
  { label: 'Alerts', icon: BellIcon },
];

function Sidebar({ user }) {
  return (
    <aside className="hidden min-h-screen w-[96px] flex-col items-center border-r border-white/70 bg-white/80 py-6 shadow-[20px_0_80px_rgba(148,163,184,0.08)] backdrop-blur lg:flex">
      <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-black text-white shadow-lg shadow-indigo-200">
        G
      </div>

      <nav className="flex flex-1 flex-col items-center gap-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              className={`flex h-14 w-14 items-center justify-center rounded-2xl transition ${
                item.active
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
              }`}
              aria-label={item.label}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        aria-label="Settings"
      >
        <SettingsIcon className="h-5 w-5" />
      </button>

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-200 via-amber-200 to-indigo-200 text-sm font-black text-slate-700 shadow-sm">
        {getInitials(user?.username || 'GM')}
      </div>
    </aside>
  );
}

export default Sidebar;

