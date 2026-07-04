import { CATEGORY_EMOJIS, getCategoryColor } from '@/lib/constants';

interface CategoryChipProps {
  category: string;
  active?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export default function CategoryChip({ category, active, onClick, size = 'sm' }: CategoryChipProps) {
  const emoji = CATEGORY_EMOJIS[category] || '📌';
  const baseColors = getCategoryColor(category);
  const sizeClass = size === 'md' ? 'text-sm px-3 py-1.5' : 'text-xs px-2 py-0.5';

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center gap-1 rounded-full border font-medium transition-all ${sizeClass} ${
          active
            ? 'bg-violet-500/20 text-violet-300 border-violet-500/50 shadow-sm shadow-violet-500/20'
            : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-slate-200'
        }`}
      >
        <span>{emoji}</span>
        <span>{category}</span>
      </button>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${sizeClass} ${baseColors}`}>
      <span>{emoji}</span>
      <span>{category}</span>
    </span>
  );
}
