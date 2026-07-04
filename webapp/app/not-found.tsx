import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-8xl mb-6 select-none">🧩</div>
      <h1 className="text-4xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
        404 — Page Not Found
      </h1>
      <p className="text-slate-400 mb-8 max-w-sm">
        This problem doesn't exist yet — or maybe it's just waiting to be solved.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-violet-500/25"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
          Go Home
        </Link>
        <Link href="/problems" className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 border border-white/10 hover:bg-white/10 transition-all">
          Browse Problems
        </Link>
      </div>
    </div>
  );
}
