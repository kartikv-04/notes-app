import { STATUS_META } from '../lib/constants';

function StatusBadge({ status }) {
  const meta = STATUS_META[status] ?? STATUS_META.todo;

  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${meta.badgeClass}`}>
      {meta.label}
    </span>
  );
}

export default StatusBadge;
