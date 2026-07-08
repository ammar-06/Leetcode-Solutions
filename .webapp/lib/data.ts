import problems from './generated/problems.json';
import type { Problem, StatsData } from './types';

const allProblems = problems as Problem[];

export function getAllProblems(): Problem[] {
  return allProblems;
}

export function getProblemBySlug(slug: string): Problem | undefined {
  return allProblems.find((p) => p.slug === slug);
}

export function getStats(): StatsData {
  const total = allProblems.length;
  const easy = allProblems.filter((p) => p.difficulty === 'Easy').length;
  const medium = allProblems.filter((p) => p.difficulty === 'Medium').length;
  const hard = allProblems.filter((p) => p.difficulty === 'Hard').length;

  const byLanguage: Record<string, number> = {};
  const byCategory: Record<string, number> = {};

  for (const p of allProblems) {
    byLanguage[p.language] = (byLanguage[p.language] || 0) + 1;
    for (const cat of p.categories) {
      byCategory[cat] = (byCategory[cat] || 0) + 1;
    }
  }

  return { total, easy, medium, hard, byLanguage, byCategory };
}

export function getRecentlysolved(n = 8): Problem[] {
  return [...allProblems].sort((a, b) => b.solvedIndex - a.solvedIndex).slice(0, n);
}

export function getAllCategories(): string[] {
  const cats = new Set<string>();
  for (const p of allProblems) {
    for (const c of p.categories) cats.add(c);
  }
  return [...cats].sort();
}

export function getAllLanguages(): string[] {
  const langs = new Set<string>();
  for (const p of allProblems) langs.add(p.language);
  return [...langs].sort();
}
