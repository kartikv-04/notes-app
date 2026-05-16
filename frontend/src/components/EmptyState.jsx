function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-200 bg-white/80 px-6 py-14 text-center shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
      <h3 className="text-2xl font-black text-slate-900">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">{description}</p>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:translate-y-[-1px]"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export default EmptyState;

