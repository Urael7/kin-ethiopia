import { GeezBadge } from '@/components/ui/GeezBadge';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  geez: '፩' | '፪' | '፫' | '፬' | '፭' | '፮' | '፯' | '፰' | '፱' | '፲';
  tag: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  centered?: boolean;
  tone?: 'light' | 'dark';
}

export function SectionHeader({
  geez,
  tag,
  title,
  subtitle,
  align,
  centered,
  tone = 'light',
}: SectionHeaderProps) {
  const isCentered = centered || align === 'center';
  const dark = tone === 'dark';
  return (
    <div className={cn('max-w-3xl mb-10', isCentered && 'mx-auto text-center')}>
      <div className={cn('mb-3 flex items-center gap-2', isCentered && 'justify-center')}>
        <GeezBadge numeral={geez} />
        <span
          className={cn(
            'text-[0.75rem] font-bold uppercase tracking-[0.24em]',
            dark ? 'text-kin-gold' : 'text-kin-green dark:text-kin-gold'
          )}
        >
          {tag}
        </span>
      </div>
      <h2
        className={cn(
          'font-serif text-3xl font-extrabold tracking-tight md:text-5xl',
          dark ? 'text-kin-parchment-light' : 'text-stone-950 dark:text-white'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 max-w-[65ch] text-base sm:text-lg leading-relaxed font-semibold', dark ? 'text-stone-200' : 'text-stone-900 dark:text-stone-200')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
