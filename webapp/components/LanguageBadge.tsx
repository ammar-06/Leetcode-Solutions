import { getLangColor } from '@/lib/constants';

interface LanguageBadgeProps {
  language: string;
  size?: 'sm' | 'md';
}

export default function LanguageBadge({ language, size = 'sm' }: LanguageBadgeProps) {
  const { bg, text } = getLangColor(language);
  const sizeClass = size === 'md' ? 'text-xs px-2.5 py-1' : 'text-xs px-2 py-0.5';

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium font-mono ${sizeClass}`}
      style={{ backgroundColor: bg, color: text }}
    >
      {language}
    </span>
  );
}
