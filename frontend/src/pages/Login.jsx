import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Loader2 } from 'lucide-react';

export default function Login({ onLogin, isLoading, error, clearError }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) return;
    await onLogin(form);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
      <nav className="p-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to home
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-2xl font-bold text-white mb-4 shadow-lg shadow-slate-200">
              G
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
            <p className="text-slate-500 mt-2">Sign in to continue to GoMindz</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
                <input
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/5 transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <a href="#" className="text-xs font-medium text-slate-400 hover:text-slate-900 transition">Forgot?</a>
                </div>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/5 transition-all"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="rounded-lg bg-rose-50 border border-rose-100 p-3 text-sm font-medium text-rose-600 animate-in shake duration-500">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-lg bg-slate-900 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 shadow-md shadow-slate-200"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              onClick={clearError}
              className="font-bold text-slate-900 hover:underline underline-offset-4"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </main>

      <footer className="py-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
          GoMindz Notes • Secure Auth
        </p>
      </footer>
    </div>
  );
}
