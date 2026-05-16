import { ChevronRight } from 'lucide-react';
import { TEAM_MEMBERS } from '../lib/constants';

function TopBar({ searchQuery, onSearchChange, onLogout, user }) {
  const getInitials = (name) => {
    if (!name) return 'GM';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="border-b border-slate-100 bg-white px-5 py-4 md:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-400">
          <span className="text-slate-900">Dashboard</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Project</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded">GoMindz Board</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex -space-x-2.5">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold shadow-sm ${member.className} ring-1 ring-slate-100`}
                title={member.name}
              >
                {member.name.slice(0, 1)}
              </div>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-slate-200"></div>

          <div 
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 ring-2 ring-primary-50 transition hover:scale-105"
            title={user?.username || 'Account'}
          >
            {getInitials(user?.username)}
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
