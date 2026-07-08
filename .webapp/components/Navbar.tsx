import Link from 'next/link';
import { GitFork, ExternalLink, Code2 } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 navbar-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-white text-lg navbar-brand-font">
              Ammar<span className="text-violet-400">.</span>codes
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden sm:flex items-center gap-1">
            <Link href="/" className="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/8 rounded-lg transition-all">
              Dashboard
            </Link>
            <Link href="/problems" className="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/8 rounded-lg transition-all">
              Browse
            </Link>
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-2">
                      <a
              href="https://github.com/ammar-06"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              title="GitHub"
            >
              <GitFork className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ammar-ahmad2408/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a
              href="https://ammar-ahmad.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-violet-300 border border-violet-500/30 rounded-lg hover:bg-violet-500/10 hover:border-violet-500/60 transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
