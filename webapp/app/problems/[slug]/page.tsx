import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProblems, getProblemBySlug } from '@/lib/data';
import { DIFFICULTY_STYLES, CATEGORY_EMOJIS } from '@/lib/constants';
import DifficultyBadge from '@/components/DifficultyBadge';
import LanguageBadge from '@/components/LanguageBadge';
import CategoryChip from '@/components/CategoryChip';
import { ExternalLink, GitFork, ArrowLeft, Code2 } from 'lucide-react';
import { codeToHtml } from 'shiki';
import sanitizeHtml from 'sanitize-html';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

// Shiki language map
const LANG_TO_SHIKI: Record<string, string> = {
  Python: 'python',
  Java: 'java',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  Elixir: 'elixir',
  Erlang: 'erlang',
  SQL: 'sql',
  Racket: 'racket',
  'C++': 'cpp',
};

export async function generateStaticParams() {
  const problems = getAllProblems();
  return problems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) return {};
  return {
    title: `${problem.number}. ${problem.title} | Ammar Ahmad`,
    description: `${problem.difficulty} problem — ${problem.language} solution by Ammar Ahmad.`,
  };
}

export default async function ProblemDetailPage({ params }: Props) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) notFound();

  // Syntax-highlight the code with Shiki
  let highlightedCode = '';
  const shikiLang = LANG_TO_SHIKI[problem.language] || 'text';
  try {
    highlightedCode = await codeToHtml(problem.code || '// No code available', {
      lang: shikiLang,
      theme: 'one-dark-pro',
    });
  } catch {
    // Fallback: plain text
    highlightedCode = `<pre class="shiki"><code>${problem.code}</code></pre>`;
  }

  // Sanitize description HTML
  const sanitized = sanitizeHtml(problem.descriptionHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img', 'h1', 'h2', 'h3', 'h4', 'sup', 'sub', 'pre', 'code',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'style', 'width', 'height'],
      '*': ['class', 'style'],
      a: ['href', 'target', 'rel'],
    },
    allowedStyles: {
      '*': {
        'max-width': [/.*/],
        'width': [/.*/],
        'height': [/.*/],
      },
    },
  });

  const diffStyles = DIFFICULTY_STYLES[problem.difficulty];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Back button */}
      <Link href="/problems" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-violet-300 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Browse
      </Link>

      {/* Header */}
      <div className={`glass rounded-2xl p-6 mb-6 border-l-4 ${diffStyles.border}`}
        style={{ borderLeftColor: problem.difficulty === 'Easy' ? '#4ade80' : problem.difficulty === 'Medium' ? '#fbbf24' : '#f87171' }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-mono text-slate-500">#{problem.number}</span>
              <DifficultyBadge difficulty={problem.difficulty} />
              <LanguageBadge language={problem.language} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {problem.title}
            </h1>
          </div>

          {/* Action links */}
          <div className="flex items-center gap-2 shrink-0">
            {problem.leetcodeUrl && (
              <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-amber-300 border border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-500/60 transition-all">
                <ExternalLink className="w-3.5 h-3.5" />
                LeetCode
              </a>
            )}
            <a href={problem.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
              <GitFork className="w-3.5 h-3.5" />
              GitHub
            </a>
          </div>
        </div>

        {/* Category chips */}
        {problem.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {problem.categories.map((cat) => (
              <Link key={cat} href={`/problems?category=${encodeURIComponent(cat)}`}>
                <CategoryChip category={cat} size="sm" />
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Problem description */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
            📋 Problem Statement
          </h2>
          <div
            className="problem-description text-slate-300 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitized }}
          />
        </div>

        {/* Code */}
        <div className="glass rounded-2xl overflow-hidden">
          {/* Code header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/8" style={{ background: '#13131f' }}>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-300" style={{ fontFamily: 'var(--font-display)' }}>Solution</span>
            </div>
            <LanguageBadge language={problem.language} />
          </div>

          {/* Shiki highlighted code */}
          <div
            className="overflow-auto text-sm"
            style={{ maxHeight: '600px', background: '#282c34' }}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
      </div>

    </div>
  );
}
