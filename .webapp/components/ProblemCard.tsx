import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { Problem } from '@/lib/types';
import DifficultyBadge from './DifficultyBadge';
import LanguageBadge from './LanguageBadge';
import CategoryChip from './CategoryChip';

function getLangDotClass(language: string): string {
  const safe = language.replace('++', 'pp').replace(/[^a-zA-Z0-9]/g, '');
  const known = ['Python','Java','TypeScript','JavaScript','Elixir','Erlang','SQL','Racket','Cpp'];
  return known.includes(safe) ? `lang-dot-${safe}` : 'lang-dot-default';
}

interface ProblemCardProps {
  problem: Problem;
  compact?: boolean;
}


function CodePreview({ code, language }: { code: string; language: string }) {
  const lines = code.split('\n').slice(0, 10);
  const dotClass = getLangDotClass(language);

  return (
    <div className="code-preview code-bg rounded-lg overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 code-header-bg">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className={`ml-2 text-xs font-mono opacity-80 ${dotClass}`}>{language}</span>
      </div>
      {/* Code lines */}
      <div className="px-3 py-2 relative code-lines-wrap">
        {lines.map((line, i) => (
          <div key={i} className="flex text-xs font-mono leading-5">
            <span className="w-6 shrink-0 text-right pr-2 select-none code-line-number">
              {i + 1}
            </span>
            <span className="code-line-text">{line || ' '}</span>
          </div>
        ))}
        {/* Fade out */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none code-fade"
        />
      </div>
    </div>
  );
}

export default function ProblemCard({ problem, compact = false }: ProblemCardProps) {
  const visibleCats = problem.categories.slice(0, 2);
  const moreCats = problem.categories.length - 2;

  return (
    <Link href={`/problems/${problem.slug}`} className="group block">
      <div
        className={`relative h-full rounded-xl border-l-4 transition-all duration-200 ease-out
          hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40
          card-bg
          ${
            problem.difficulty === 'Easy'
              ? 'card-border-easy'
              : problem.difficulty === 'Medium'
              ? 'card-border-medium'
              : 'card-border-hard'
          }`}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="min-w-0">
              <span className="text-xs font-mono text-slate-500 mb-0.5 block">#{problem.number}</span>
              <h3 className="font-display font-semibold text-slate-100 text-sm leading-snug group-hover:text-violet-300 transition-colors line-clamp-2">
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
