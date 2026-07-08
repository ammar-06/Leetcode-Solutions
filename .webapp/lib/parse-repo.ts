import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Support both CJS (__dirname) and ESM (import.meta.url) via tsx
const __filename_compat = typeof __filename !== 'undefined' ? __filename : fileURLToPath(import.meta.url);
const __dirname_compat = path.dirname(__filename_compat);

// webapp/ is at Leetcode-Solutions/webapp/
// lib/parse-repo.ts is at Leetcode-Solutions/webapp/lib/parse-repo.ts
// REPO_ROOT should be Leetcode-Solutions/
const REPO_ROOT = path.resolve(__dirname_compat, '../..');
const WEBAPP_ROOT = path.resolve(__dirname_compat, '..');

const EXT_TO_LANG: Record<string, string> = {
  py: 'Python',
  java: 'Java',
  ts: 'TypeScript',
  js: 'JavaScript',
  ex: 'Elixir',
  erl: 'Erlang',
  sql: 'SQL',
  rkt: 'Racket',
  cpp: 'C++',
};

const PROBLEM_DIR_RE = /^\d{4}-[a-z0-9-]+$/;

interface RawStatsEntry {
  difficulty: string;
  [key: string]: string; // other keys are filenames → sha
}

interface Stats {
  leetcode: {
    easy: number;
    medium: number;
    hard: number;
    solved: number;
    shas: Record<string, RawStatsEntry | { '': string }>;
  };
}

function parseCategories(rootReadme: string): Record<string, string[]> {
  const startMarker = '<!--LeetCode Topics Start-->';
  const endMarker = '<!--LeetCode Topics End-->';
  // Also handle the variant with dashes
  const startAlt = '<!---LeetCode Topics Start-->';
  const endAlt = '<!---LeetCode Topics End-->';

  let block = '';
  let s = rootReadme.indexOf(startMarker);
  let e = rootReadme.indexOf(endMarker);
  if (s === -1) {
    s = rootReadme.indexOf(startAlt);
    e = rootReadme.indexOf(endAlt);
  }
  if (s !== -1 && e !== -1) {
    block = rootReadme.slice(s, e);
  }

  const slugToCategories: Record<string, string[]> = {};
  if (!block) return slugToCategories;

  // Split by "## CategoryName"
  const categoryBlocks = block.split(/^## /m).slice(1);
  for (const cb of categoryBlocks) {
    const lines = cb.split('\n');
    const categoryName = lines[0].trim();
    // Extract slugs from markdown table links like [slug](url)
    const slugRe = /\|\s*\[([^\]]+)\]\([^)]+\)/g;
    let m: RegExpExecArray | null;
    while ((m = slugRe.exec(cb)) !== null) {
      const slug = m[1].trim();
      if (!slugToCategories[slug]) slugToCategories[slug] = [];
      if (!slugToCategories[slug].includes(categoryName)) {
        slugToCategories[slug].push(categoryName);
      }
    }
  }
  return slugToCategories;
}

function extractFromProblemReadme(content: string): {
  title: string;
  number: number;
  leetcodeUrl: string;
  descriptionHtml: string;
} {
  // Title and URL from <h2><a href="...">N. Title</a></h2>
  const h2Re = /<h2[^>]*><a\s+href="([^"]+)"[^>]*>(\d+)\.\s*([^<]+)<\/a><\/h2>/i;
  const m = h2Re.exec(content);
  const leetcodeUrl = m ? m[1] : '';
  const number = m ? parseInt(m[2], 10) : 0;
  const title = m ? m[3].trim() : '';

  // Description: strip the h2 and h3 difficulty tag at top
  let descriptionHtml = content
    .replace(/<h2[^>]*>[\s\S]*?<\/h2>/i, '')
    .replace(/<h3[^>]*>(Easy|Medium|Hard)<\/h3>/i, '')
    .trim();

  return { title, number, leetcodeUrl, descriptionHtml };
}

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

export function parseRepo(): Problem[] {
  // Read stats.json
  const statsPath = path.join(REPO_ROOT, 'stats.json');
  const stats: Stats = JSON.parse(fs.readFileSync(statsPath, 'utf-8'));
  const shas = stats.leetcode.shas;

  // Read root README for categories
  const rootReadmePath = path.join(REPO_ROOT, 'README.md');
  const rootReadme = fs.readFileSync(rootReadmePath, 'utf-8');
  const slugToCategories = parseCategories(rootReadme);

  // Build solve order map from shas key insertion order
  const solveOrder: Record<string, number> = {};
  let idx = 0;
  for (const key of Object.keys(shas)) {
    if (key === 'README.md' || key === 'stats.json') continue;
    solveOrder[key] = idx++;
  }

  // Collect all problem directories from filesystem
  const entries = fs.readdirSync(REPO_ROOT, { withFileTypes: true });
  const problemDirs = entries
    .filter((e) => e.isDirectory() && PROBLEM_DIR_RE.test(e.name))
    .map((e) => e.name);

  const problems: Problem[] = [];

  for (const slug of problemDirs) {
    const folderPath = path.join(REPO_ROOT, slug);

    // Get difficulty and code filename from stats.json
    const statsEntry = shas[slug] as RawStatsEntry | undefined;
    let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Easy';
    let codeFilename = '';

    if (statsEntry && typeof statsEntry === 'object') {
      const rawDiff = (statsEntry as RawStatsEntry).difficulty;
      if (rawDiff === 'medium') difficulty = 'Medium';
      else if (rawDiff === 'hard') difficulty = 'Hard';
      else difficulty = 'Easy';

      // Find the code filename (the non-difficulty, non-README key)
      for (const k of Object.keys(statsEntry)) {
        if (k !== 'difficulty' && k !== 'README.md') {
          codeFilename = k;
          break;
        }
      }
    }

    // Fallback: glob for a non-README file
    if (!codeFilename) {
      const folderFiles = fs.readdirSync(folderPath);
      codeFilename = folderFiles.find((f) => f !== 'README.md') || '';
    }

    // Language detection
    const ext = codeFilename.split('.').pop() || '';
    const language = EXT_TO_LANG[ext] || ext.toUpperCase();
    const languageExt = ext;

    // Read code file
    let code = '';
    if (codeFilename) {
      const codePath = path.join(folderPath, codeFilename);
      if (fs.existsSync(codePath)) {
        code = fs.readFileSync(codePath, 'utf-8');
      }
    }

    // Read per-problem README
    const readmePath = path.join(folderPath, 'README.md');
    let title = slug;
    let number = 0;
    let leetcodeUrl = '';
    let descriptionHtml = '';

    if (fs.existsSync(readmePath)) {
      const readmeContent = fs.readFileSync(readmePath, 'utf-8');
      const parsed = extractFromProblemReadme(readmeContent);
      title = parsed.title || slug;
      number = parsed.number || parseInt(slug.split('-')[0], 10);
      leetcodeUrl = parsed.leetcodeUrl;
      descriptionHtml = parsed.descriptionHtml;
    }

    if (!number) {
      number = parseInt(slug.split('-')[0], 10);
    }

    const githubUrl = `https://github.com/ammar-06/Leetcode-Solutions/tree/master/${slug}`;
    const categories = slugToCategories[slug] || [];
    const solvedIndex = solveOrder[slug] ?? 9999;

    problems.push({
      slug,
      number,
      title,
      leetcodeUrl,
      githubUrl,
      difficulty,
      categories,
      language,
      languageExt,
      code,
      descriptionHtml,
      solvedIndex,
    });
  }

  // Sort by solve index
  problems.sort((a, b) => a.solvedIndex - b.solvedIndex);

  return problems;
}

// When run directly as a script, emit problems.json
if (require.main === module) {
  const problems = parseRepo();
  const outDir = path.join(WEBAPP_ROOT, 'lib', 'generated');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'problems.json');
  fs.writeFileSync(outPath, JSON.stringify(problems, null, 2));
  
  // Print summary
  const langs = new Set(problems.map((p) => p.language));
  const cats = new Set(problems.flatMap((p) => p.categories));
  console.log(`✓ Parsed ${problems.length} problems`);
  console.log(`✓ ${cats.size} categories`);
  console.log(`✓ Languages: ${[...langs].join(', ')}`);
  console.log(`✓ Output: ${outPath}`);
}
