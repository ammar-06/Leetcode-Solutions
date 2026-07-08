import React from 'react';
import Link from 'next/link';
import { getAllProblems, getStats, getRecentlysolved, getAllCategories } from '@/lib/data';
import { DIFFICULTY_STYLES, CATEGORY_EMOJIS } from '@/lib/constants';
import ProblemCard from '@/components/ProblemCard';
import CountUp from '@/components/CountUp';
import DifficultyBadge from '@/components/DifficultyBadge';
import { ArrowRight, GitFork, ExternalLink, BookOpen, TrendingUp, Code2, Layers } from 'lucide-react';

export default function HomePage() {
  const stats = getStats();
  const recentProblems = getRecentlysolved(8);
  const categories = getAllCategories().slice(0, 12);

  const totalBar = stats.easy + stats.medium + stats.hard;
  const easyPct = (stats.easy / totalBar) * 100;
  const medPct = (stats.medium / totalBar) * 100;
  const hardPct = (stats.hard / totalBar) * 100;

  const topLanguages = Object.entries(stats.byLanguage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);
  const maxLang = topLanguages[0]?.[1] || 1;

  const topCategories = Object.entries(stats.byCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const LANG_COLORS: Record<string, string> = {
    Python: '#3572A5', Java: '#B07219', TypeScript: '#3178C6',
    JavaScript: '#F7DF1E', Elixir: '#6E4A7E', Erlang: '#B83998',
    SQL: '#E34C26', Racket: '#3E5BA9', 'C++': '#00599C',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Hero Section */}
      <div className="text-center mb-20">
        {/* Avatar/badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium text-violet-300 border border-violet-500/30 hero-badge-bg">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Active — solving problems daily
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight font-display">
          <span className="text-white">Ammar's</span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            LeetCode Journey
          </span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          {stats.total} problems solved across 9 languages — auto-synced from LeetCode via LeetHub,
          with syntax-highlighted code, category tagging, and full problem statements.
        </p>

        {/* Social links */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <a href="https://github.com/ammar-06" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-black/30 btn-github">
            <GitFork className="w-4 h-4" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/ammar-ahmad2408/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-900/40 btn-linkedin">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://ammar-ahmad.vercel.app/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-200 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all btn-portfolio">
            <ExternalLink className="w-4 h-4" />
            Portfolio
          </a>
        </div>

        {/* Quick action */}
        <Link href="/problems"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white transition-all hover:shadow-xl hover:shadow-violet-500/25 hover:-translate-y-0.5 btn-gradient-violet">
          Browse All Problems
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Total Solved', value: stats.total, icon: BookOpen, color: 'from-violet-500 to-indigo-500', shadow: 'shadow-violet-500/20' },
          { label: 'Easy', value: stats.easy, icon: TrendingUp, color: 'from-green-500 to-emerald-500', shadow: 'shadow-green-500/20' },
          { label: 'Medium', value: stats.medium, icon: Code2, color: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/20' },
          { label: 'Hard', value: stats.hard, icon: Layers, color: 'from-red-500 to-pink-500', shadow: 'shadow-red-500/20' },
        ].map(({ label, value, icon: Icon, color, shadow }) => (
          <div key={label} className="glass rounded-2xl p-5 hover:scale-105 transition-transform duration-200">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg ${shadow}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-1 font-display">
              <CountUp end={value} />
            </div>
            <div className="text-sm text-slate-400">{label}</div>
          </div>
        ))}
      </div>

      {/* Difficulty breakdown + Language chart */}
      <div className="grid lg:grid-cols-2 gap-6 mb-12">

        {/* Difficulty breakdown */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-5 font-display">Difficulty Breakdown</h2>

          {/* Inject dynamic widths via a style tag — avoids inline style= warnings */}
          <style>{`
            .diff-bar-easy  { width: ${easyPct}%; }
            .diff-bar-med   { width: ${medPct}%; }
            .diff-bar-hard  { width: ${hardPct}%; }
            ${topLanguages.map(([lang, count], i) => `
              .lang-dot-chart-${i} { background-color: ${LANG_COLORS[lang] || '#6B7280'}; }
              .lang-bar-chart-${i} { width: ${(count / maxLang) * 100}%; background-color: ${LANG_COLORS[lang] || '#6B7280'}; opacity: 0.8; }
            `).join('')}
          `}</style>

          <div className="flex h-4 rounded-full overflow-hidden mb-5 gap-0.5">
            <div className="bg-green-500 rounded-l-full transition-all diff-bar-easy" />
            <div className="bg-amber-500 transition-all diff-bar-med" />
            <div className="bg-red-500 rounded-r-full transition-all diff-bar-hard" />
          </div>

          <div className="space-y-3">
            {[
              { label: 'Easy', count: stats.easy, pct: easyPct, color: 'bg-green-500', textColor: 'text-green-400', barClass: 'diff-bar-easy' },
              { label: 'Medium', count: stats.medium, pct: medPct, color: 'bg-amber-500', textColor: 'text-amber-400', barClass: 'diff-bar-med' },
              { label: 'Hard', count: stats.hard, pct: hardPct, color: 'bg-red-500', textColor: 'text-red-400', barClass: 'diff-bar-hard' },
            ].map(({ label, count, pct, color, textColor, barClass }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${color}`} />
                <span className="text-sm text-slate-300 w-16">{label}</span>
                <div className="flex-1 h-2 rounded-full bg-white/5">
                  <div className={`h-full rounded-full ${color} transition-all ${barClass}`} />
                </div>
                <span className={`text-sm font-mono font-medium ${textColor} w-8 text-right`}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Language distribution */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-5 font-display">Languages Used</h2>
          <div className="space-y-3">
            {topLanguages.map(([lang, count], i) => (
              <div key={lang} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shrink-0 lang-dot-chart-${i}`} />
                <span className="text-sm text-slate-300 w-24 truncate font-mono">{lang}</span>
                <div className="flex-1 h-2 rounded-full bg-white/5">
                  <div className={`h-full rounded-full transition-all lang-bar-chart-${i}`} />
                </div>
                <span className="text-xs text-slate-400 font-mono w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top categories */}
      <div className="glass rounded-2xl p-6 mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white font-display">Top Categories</h2>
          <Link href="/problems" className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
            Browse all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {topCategories.map(([cat, count]) => (
            <Link key={cat} href={`/problems?category=${encodeURIComponent(cat)}`}
              className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all group">
              <span className="text-xl">{CATEGORY_EMOJIS[cat] || '📌'}</span>
              <div className="min-w-0">
                <div className="text-xs font-medium text-slate-200 group-hover:text-violet-300 transition-colors truncate">{cat}</div>
                <div className="text-xs text-slate-500">{count} problems</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Solved */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white font-display">
            Recently Solved
          </h2>
          <Link href="/problems" className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentProblems.map((p) => (
            <ProblemCard key={p.slug} problem={p} />
          ))}
        </div>
      </div>

    </div>
  );
}
