import { Suspense } from 'react';
import { getAllProblems, getAllCategories, getAllLanguages } from '@/lib/data';
import BrowseClient from './BrowseClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Problems | Ammar Ahmad LeetCode Solutions',
  description: 'Browse and filter all 174+ LeetCode solutions by category, difficulty, and language.',
};

export default function ProblemsPage() {
  const problems = getAllProblems();
  const categories = getAllCategories();
  const languages = getAllLanguages();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2 font-display">
          Browse Problems
        </h1>
        <p className="text-slate-400">
          {problems.length} solutions across {categories.length} categories and {languages.length} languages.
        </p>
      </div>

      <Suspense fallback={<div className="text-slate-400">Loading filters…</div>}>
        <BrowseClient problems={problems} categories={categories} languages={languages} />
      </Suspense>
    </div>
  );
}
