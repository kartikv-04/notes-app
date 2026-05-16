import { STATUS_META } from '../lib/constants';

function StatusBadge({ status }) {
  const meta = STATUS_META[status] ?? STATUS_META.todo;

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${meta.badgeClass}`}>
      {meta.label}
    </span>
  );
}

export default StatusBadge;

