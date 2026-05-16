import { useState } from 'react';

function AuthScreen({
  mode,
  onModeChange,
  onLogin,
  onRegister,
  isLoading,
  error,
  clearError,
}) {
  const [form, setForm] = useState({ username: '', password: '' });

  function handleModeChange(nextMode) {
    setForm({ username: '', password: '' });
    clearError();
    onModeChange(nextMode);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
      return;
    }

    if (mode === 'login') {
      await onLogin(form);
      return;
    }

    await onRegister(form);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.24),_transparent_30%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_45%,#f8fafc_100%)] px-5 py-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[36px] border border-white/70 bg-white/75 p-8 shadow-[0_30px_100px_rgba(79,70,229,0.12)] backdrop-blur xl:p-12">
          <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-2xl font-black text-white shadow-lg shadow-indigo-300/60">
            G
          </div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-indigo-500">
            GoMindz Notes
          </p>
          <h1 className="max-w-xl text-4xl font-black leading-tight text-slate-900 md:text-5xl">
            Pixel-clean notes, list views, and Kanban flow in one workspace.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Sign in to manage notes, drag them across stages, and keep the assignment UI feeling sharp on both desktop and mobile.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ['List + Board', 'Switch between overview cards and Kanban columns.'],
              ['Immediate Sync', 'Drops update on screen first, then persist to the API.'],
              ['Responsive UI', 'A layout built to stay clean at smaller widths too.'],
            ].map(([title, description]) => (
              <article
                key={title}
                className="rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
              >
                <h2 className="text-base font-bold text-slate-900">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[36px] border border-slate-200/70 bg-white p-8 shadow-[0_30px_100px_rgba(15,23,42,0.08)]">
          <div className="inline-flex rounded-full bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => handleModeChange('login')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('register')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Register
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-black text-slate-900">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {mode === 'login'
                ? 'Use your username and password to access the notes workspace.'
                : 'Register once and you will be signed in automatically.'}
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Username</span>
              <input
                type="text"
                value={form.username}
                onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                placeholder="Enter your username"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                placeholder="Enter your password"
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Please wait...' : mode === 'login' ? 'Login to workspace' : 'Register and continue'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AuthScreen;
