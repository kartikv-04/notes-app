import {
  Home,
  LayoutDashboard,
  BarChart3,
  Users,
  Calendar,
  Sparkles,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';
import { getInitials } from '../lib/helpers';

const NAV_ITEMS = [
  { label: 'Home', icon: Home, active: true },
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'People', icon: Users },
  { label: 'Calendar', icon: Calendar },
  { label: 'Insights', icon: Sparkles },
  { label: 'Alerts', icon: Bell },
];

function Sidebar({ user, onLogout }) {
  return (
    <aside className="hidden min-h-screen w-[88px] flex-col items-center border-r border-slate-100 bg-white py-6 lg:flex">
      <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-xl font-bold text-white shadow-lg shadow-primary-200">
        G
      </div>


      <nav className="flex flex-1 flex-col items-center gap-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 ${
                item.active
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                  : 'text-slate-400 hover:bg-primary-50 hover:text-primary-600'
              }`}
              title={item.label}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-6">
        <button
          type="button"
          onClick={onLogout}
          className="flex h-12 w-12 items-center justify-center rounded-full text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 ring-2 ring-primary-50 ring-offset-2">
          {getInitials(user?.username || 'GM')}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
