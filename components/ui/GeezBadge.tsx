interface GeezBadgeProps {
  numeral: '፩' | '፪' | '፫' | '፬' | '፭' | '፮' | '፯' | '፰' | '፱' | '፲';
  className?: string;
}

export function GeezBadge({ numeral, className = '' }: GeezBadgeProps) {
  return (
    <span
      className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-kin-gold/40 bg-kin-gold/10 px-2 font-geez text-sm text-kin-gold ${className}`}
      aria-hidden="true"
    >
      {numeral}
    </span>
  );
}
