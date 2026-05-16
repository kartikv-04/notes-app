import { BoardIcon, ListIcon } from './Icons';
import { VIEW_OPTIONS } from '../lib/constants';

const ICON_BY_VIEW = {
  board: BoardIcon,
  list: ListIcon,
};

function ViewTabs({ value, onChange }) {
  return (
    <div className="inline-flex rounded-full bg-slate-100/90 p-1 shadow-inner shadow-slate-200/60">
      {VIEW_OPTIONS.map((option) => {
        const Icon = ICON_BY_VIEW[option.id];
        const isActive = option.id === value;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? 'bg-white text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.08)]'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Icon className="h-4 w-4" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default ViewTabs;

