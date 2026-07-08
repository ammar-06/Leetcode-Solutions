export interface Problem {
  slug: string;
  number: number;
  title: string;
  leetcodeUrl: string;
  githubUrl: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  categories: string[];
  language: string;
  languageExt: string;
  code: string;
  descriptionHtml: string;
  solvedIndex: number;
}

export interface StatsData {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  byLanguage: Record<string, number>;
  byCategory: Record<string, number>;
}
