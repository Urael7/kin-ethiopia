import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

const styles = {
  primary:
    'bg-kin-green text-kin-parchment-light hover:bg-kin-green-dark border border-transparent',
  secondary:
    'bg-transparent text-kin-ink border border-kin-ink/20 hover:border-kin-ink/50',
  ghost: 'bg-white/10 text-white border border-white/20 hover:bg-white/16',
  gold: 'bg-kin-gold text-kin-coffee hover:bg-kin-gold-light border border-transparent',
};

export function Button({
  href,
  children,
  variant = 'primary',
  className,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const cls = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-transform duration-150 ease-out active:scale-[0.97] disabled:opacity-50',
    styles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
