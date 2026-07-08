'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Problem } from '@/lib/types';
import { CATEGORY_EMOJIS } from '@/lib/constants';
import ProblemCard from '@/components/ProblemCard';
import CategoryChip from '@/components/CategoryChip';
import { Search, X, ChevronDown } from 'lucide-react';

interface BrowseClientProps {
  problems: Problem[];
  categories: string[];
  languages: string[];
}

export default function BrowseClient({ problems, categories, languages }: BrowseClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'' | 'Easy' | 'Medium' | 'Hard'>(
    (searchParams.get('difficulty') as '' | 'Easy' | 'Medium' | 'Hard') || ''
  );
  const [selectedLanguage, setSelectedLanguage] = useState(searchParams.get('lang') || '');
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedDifficulty) params.set('difficulty', selectedDifficulty);
    if (selectedLanguage) params.set('lang', selectedLanguage);
    const str = params.toString();
    router.replace(str ? `?${str}` : '/problems', { scroll: false });
  }, [query, selectedCategory, selectedDifficulty, selectedLanguage]);

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      if (selectedDifficulty && p.difficulty !== selectedDifficulty) return false;
      if (selectedLanguage && p.language !== selectedLanguage) return false;
      if (selectedCategory && !p.categories.includes(selectedCategory)) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !String(p.number).includes(q)) return false;
      }
      return true;
    });
  }, [problems, query, selectedCategory, selectedDifficulty, selectedLanguage]);

  const hasFilters = query || selectedCategory || selectedDifficulty || selectedLanguage;
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 18);

  // Category counts for current language/difficulty filter (ignoring category filter itself)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const base = problems.filter((p) => {
      if (selectedDifficulty && p.difficulty !== selectedDifficulty) return false;
      if (selectedLanguage && p.language !== selectedLanguage) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !String(p.number).includes(q)) return false;
      }
      return true;
    });
    for (const p of base) {
      for (const cat of p.categories) {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    }
    return counts;
  }, [problems, query, selectedDifficulty, selectedLanguage]);

  return (
    <div>
      {/* Search + filter bar */}
      <div className="glass rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title or number…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-violet-500/50 transition-all search-input-bg"
          />
        </div>

        {/* Difficulty filter */}
        <div className="flex items-center gap-1.5">
          {(['', 'Easy', 'Medium', 'Hard'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedDifficulty === d
                  ? d === ''
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                    : d === 'Easy'
                    ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                    : d === 'Medium'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  : 'text-slate-400 border border-white/8 hover:bg-white/8 hover:text-slate-200'
              }`}
            >
              {d || 'All'}
            </button>
          ))}
        </div>

        {/* Language select */}
        <select
          aria-label="Filter by language"
          title="Filter by language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-3 py-2.5 rounded-xl text-xs font-mono text-slate-300 outline-none cursor-pointer transition-all focus:ring-2 focus:ring-violet-500/50 select-bg"
        >
          <option value="">All Languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={() => { setQuery(''); setSelectedCategory(''); setSelectedDifficulty(''); setSelectedLanguage(''); }}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/10 border border-white/8 transition-all"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <CategoryChip
            category="All Categories"
            active={!selectedCategory}
            onClick={() => setSelectedCategory('')}
            size="sm"
          />
          {visibleCategories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            if (count === 0 && (selectedDifficulty || selectedLanguage || query)) return null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                className={`inline-flex items-center gap-1 rounded-full border text-xs px-2 py-0.5 font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-violet-500/20 text-violet-300 border-violet-500/50 shadow-sm shadow-violet-500/20'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-slate-200'
                }`}
              >
                <span>{CATEGORY_EMOJIS[cat] || '📌'}</span>
                <span>{cat}</span>
                {count > 0 && <span className="opacity-50 ml-0.5">({count})</span>}
              </button>
            );
          })}
          {categories.length > 18 && (
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="inline-flex items-center gap-1 rounded-full border text-xs px-2 py-0.5 font-medium text-slate-400 border-white/10 hover:bg-white/10 hover:text-slate-200 transition-all"
            >
              <ChevronDown className={`w-3 h-3 transition-transform ${showAllCategories ? 'rotate-180' : ''}`} />
              {showAllCategories ? 'Less' : `+${categories.length - 18} more`}
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-400">
          <span className="text-white font-medium">{filtered.length}</span> problem{filtered.length !== 1 ? 's' : ''}
          {hasFilters && ' matching filters'}
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProblemCard key={p.slug} problem={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-white mb-2 font-display">No problems found</h3>
          <p className="text-slate-400 text-sm">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}
