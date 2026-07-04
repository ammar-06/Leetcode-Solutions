import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { Problem } from '@/lib/types';
import { DIFFICULTY_STYLES } from '@/lib/constants';
import DifficultyBadge from './DifficultyBadge';
import LanguageBadge from './LanguageBadge';
import CategoryChip from './CategoryChip';

interface ProblemCardProps {
  problem: Problem;
  compact?: boolean;
}

const LANG_HIGHLIGHT: Record<string, string> = {
  Python: '#3572A5',
  Java: '#B07219',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Elixir: '#6E4A7E',
  Erlang: '#B83998',
  SQL: '#E34C26',
  Racket: '#3E5BA9',
  'C++': '#00599C',
};

function CodePreview({ code, language }: { code: string; language: string }) {
  const lines = code.split('\n').slice(0, 10);
  const color = LANG_HIGHLIGHT[language] || '#6B7280';

  return (
    <div className="code-preview rounded-lg overflow-hidden" style={{ background: '#0d0d1a' }}>
      {/* Header bar */}
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: '#13131f', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs font-mono" style={{ color: color, opacity: 0.8 }}>{language}</span>
      </div>
      {/* Code lines */}
      <div className="px-3 py-2 relative" style={{ maxHeight: '140px', overflow: 'hidden' }}>
        {lines.map((line, i) => (
          <div key={i} className="flex text-xs font-mono leading-5">
            <span className="w-6 shrink-0 text-right pr-2 select-none" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)' }}>
              {i + 1}
            </span>
            <span style={{ color: '#cdd6f4', fontFamily: 'var(--font-mono)', whiteSpace: 'pre' }}>{line || ' '}</span>
          </div>
        ))}
        {/* Fade out */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #0d0d1a)' }}
        />
      </div>
    </div>
  );
}

export default function ProblemCard({ problem, compact = false }: ProblemCardProps) {
  const styles = DIFFICULTY_STYLES[problem.difficulty];
  const visibleCats = problem.categories.slice(0, 2);
  const moreCats = problem.categories.length - 2;

  return (
    <Link href={`/problems/${problem.slug}`} className="group block">
      <div
        className={`relative h-full rounded-xl border-l-4 transition-all duration-200 ease-out
          hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40
          ${styles.border}`}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid rgba(255,255,255,0.07)`,
          borderLeftWidth: '4px',
          borderLeftColor: problem.difficulty === 'Easy' ? '#4ade80' : problem.difficulty === 'Medium' ? '#fbbf24' : '#f87171',
        }}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="min-w-0">
              <span className="text-xs font-mono text-slate-500 mb-0.5 block">#{problem.number}</span>
              <h3 className="font-semibold text-slate-100 text-sm leading-snug group-hover:text-violet-300 transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-display)' }}>
                {problem.title}
              </h3>
            </div>
            <div className="shrink-0">
              <DifficultyBadge difficulty={problem.difficulty} size="sm" />
            </div>
          </div>

          {/* Code preview */}
          {!compact && problem.code && (
            <div className="mb-3">
              <CodePreview code={problem.code} language={problem.language} />
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1 min-w-0">
              {visibleCats.map((cat) => (
                <CategoryChip key={cat} category={cat} size="sm" />
              ))}
              {moreCats > 0 && (
                <span className="text-xs text-slate-500 px-1.5 py-0.5">+{moreCats}</span>
              )}
            </div>
            <LanguageBadge language={problem.language} size="sm" />
          </div>
        </div>
      </div>
    </Link>
  );
}
