import { LayoutGrid, List } from 'lucide-react';
import { VIEW_OPTIONS } from '../lib/constants';

const ICON_BY_VIEW = {
  board: LayoutGrid,
  list: List,
};

function ViewTabs({ value, onChange }) {
  return (
    <div className="inline-flex rounded-lg bg-slate-100 p-1">
      {VIEW_OPTIONS.map((option) => {
        const Icon = ICON_BY_VIEW[option.id];
        const isActive = option.id === value;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
              isActive
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-primary-600 hover:bg-white/50'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ViewTabs;
