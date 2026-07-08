import { getLangColor } from '@/lib/constants';

interface LanguageBadgeProps {
  language: string;
  size?: 'sm' | 'md';
}

function getLangClass(language: string): string {
  const safe = language.replace('++', 'pp').replace(/[^a-zA-Z0-9]/g, '');
  const known = ['Python','Java','TypeScript','JavaScript','Elixir','Erlang','SQL','Racket','Cpp'];
  return known.includes(safe) ? `lang-${safe}` : 'lang-default';
}

export default function LanguageBadge({ language, size = 'sm' }: LanguageBadgeProps) {
  const sizeClass = size === 'md' ? 'text-xs px-2.5 py-1' : 'text-xs px-2 py-0.5';
  const colorClass = getLangClass(language);

  return (
    <span className={`inline-flex items-center rounded-full font-medium font-mono ${sizeClass} ${colorClass}`}>
      {language}
    </span>
  );
}
