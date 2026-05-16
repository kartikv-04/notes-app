import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-slate-100 bg-white/80 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 font-display text-xl font-bold text-white shadow-sm">
            G
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-slate-900">
            GoMindz
          </span>
        </div>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
          <a href="#features" className="transition hover:text-slate-900">Features</a>
          <a href="#security" className="transition hover:text-slate-900">Security</a>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <Link to="/login" className="transition hover:text-slate-900">Sign in</Link>
          <Link
            to="/register"
            className="rounded-lg bg-slate-900 px-5 py-2 text-white transition hover:bg-slate-800"
          >
            Get started
          </Link>
        </div>
        <Link to="/login" className="text-sm font-bold text-slate-900 md:hidden">
          Sign in
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20">
        <section className="px-6 text-center md:px-12">
          <div className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-200">
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span>Introducing GoMindz Notes 2.0</span>
            </div>
            <h1 className="mb-8 font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Thought capture, <br />
              <span className="bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent">refined for speed.</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-500 sm:text-xl">
              The minimalist workspace where ideas flow without friction. No clutter, no distractions—just you and your best thoughts.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.98] sm:w-auto"
              >
                Start writing for free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="flex w-full items-center justify-center rounded-lg border border-slate-200 px-8 py-4 text-lg font-bold text-slate-900 transition-all hover:bg-slate-50 active:scale-[0.98] sm:w-auto"
              >
                Sign in to your account
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="mt-32 px-6 md:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-900">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Instant Sync</h3>
                <p className="text-slate-500">Your notes are updated across all devices in real-time. Never lose a thought again.</p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-900">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Pure Focus</h3>
                <p className="text-slate-500">A distraction-free interface designed to disappear so your ideas can take center stage.</p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-900">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Private by Design</h3>
                <p className="text-slate-500">Enterprise-grade security keeps your workspace protected and your data strictly yours.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-12 px-6 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-900 text-[10px] font-bold text-white">
              G
            </div>
            <span className="text-sm font-bold text-slate-900">GoMindz Notes</span>
          </div>
          <p className="text-xs font-medium text-slate-400">
            &copy; 2026 GoMindz. Built for the modern mind.
          </p>
          <div className="flex gap-6 text-xs font-medium text-slate-400">
            <a href="#" className="hover:text-slate-900">Terms</a>
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
