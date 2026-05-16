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
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-slate-100 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 font-display text-xl font-black text-white shadow-sm">
            G
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-slate-900">
            GoMindz
          </span>
        </div>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
          <a href="#" className="transition hover:text-slate-900">
            Features
          </a>
          <a href="#" className="transition hover:text-slate-900">
            Security
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-slate-50 px-4 py-1.5 text-slate-900 ring-1 ring-slate-200 transition hover:bg-slate-100"
          >
            Github
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="mb-10 text-center">
            <h1 className="mb-3 font-display text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Capture ideas at the speed of thought.
            </h1>
            <p className="text-lg text-slate-500">
              The workspace for minimalists who value speed, clarity, and focus.
            </p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <div className="mb-8 flex rounded-2xl bg-slate-50 p-1.5">
              <button
                type="button"
                onClick={() => handleModeChange('login')}
                className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
                  mode === 'login'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('register')}
                className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
                  mode === 'register'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Join now
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Username
                </label>
                <input
                  type="text"
                  required
                  autoComplete="username"
                  value={form.username}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, username: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  placeholder="Enter username"
                />
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <input
                  type="password"
                  required
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  value={form.password}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, password: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  placeholder="••••••••"
                />
              </div>

              {error ? (
                <div className="animate-in fade-in zoom-in-95 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 duration-200">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full overflow-hidden rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 shadow-xl shadow-slate-200"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Securing workspace...
                  </span>
                ) : mode === 'login' ? (
                  'Sign in to GoMindz'
                ) : (
                  'Create your account'
                )}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-sm text-slate-400">
            By continuing, you agree to our{' '}
            <a
              href="#"
              className="text-slate-600 underline underline-offset-4 transition hover:text-slate-900"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="#"
              className="text-slate-600 underline underline-offset-4 transition hover:text-slate-900"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>

      <footer className="pointer-events-none fixed bottom-0 left-0 right-0 flex justify-center p-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
          Built for clarity • GoMindz Notes 2026
        </div>
      </footer>
    </div>
  );
}

export default AuthScreen;
