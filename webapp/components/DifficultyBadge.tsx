import { DIFFICULTY_STYLES } from '@/lib/constants';

interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  size?: 'sm' | 'md';
}

export default function DifficultyBadge({ difficulty, size = 'md' }: DifficultyBadgeProps) {
  const styles = DIFFICULTY_STYLES[difficulty];
  const sizeClass = size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-1';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${styles.badge} ${sizeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      {difficulty}
    </span>
  );
}
