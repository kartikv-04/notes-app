import { ChevronRightIcon, LogoutIcon, SearchIcon } from './Icons';
import { TEAM_MEMBERS } from '../lib/constants';

function TopBar({ searchQuery, onSearchChange, onLogout }) {
  return (
    <header className="border-b border-white/80 bg-white/80 px-5 py-4 backdrop-blur md:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-400">
          <span className="text-slate-700">Dashboard</span>
          <ChevronRightIcon className="h-4 w-4" />
          <span>Project</span>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="text-indigo-600">GoMindz Board</span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block min-w-[240px]">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              placeholder="Search notes, descriptions, or status"
            />
          </label>

          <div className="flex items-center justify-between gap-3 sm:justify-start">
            <div className="flex -space-x-3">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.name}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-black shadow-sm ${member.className}`}
                  title={member.name}
                >
                  {member.name.slice(0, 1)}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              <LogoutIcon className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
