export function JebenaIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M32 10v14M28 10h8" />
      <path d="M26 24c-8 0-10 8-10 18s8 14 16 14 16-4 16-14-2-18-10-18z" />
      <path d="M42 28c10 0 12 12 4 20" />
    </svg>
  );
}

export function KeberoDrumIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <ellipse cx="32" cy="18" rx="16" ry="6" />
      <path d="M16 18l6 30c0 4 4 7 10 7s10-3 10-7l6-30" />
      <path d="M20 22l20 26M44 22L24 48" opacity="0.45" />
    </svg>
  );
}

export function KrarIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M20 14h24M20 14l6 26M44 14l-6 26" />
      <ellipse cx="32" cy="46" rx="16" ry="10" />
      <path d="M24 14l6 32M32 14v32M40 14l-6 32" opacity="0.5" />
    </svg>
  );
}

export function TiletDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex w-full items-center gap-3 py-2 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-kin-gold/50" />
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rotate-45 bg-kin-crimson" />
        <span className="h-2.5 w-2.5 rotate-45 border border-kin-gold bg-kin-green" />
        <span className="h-1.5 w-1.5 rotate-45 bg-kin-gold" />
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-kin-gold/50" />
    </div>
  );
}

export function TiletLine({ className = '' }: { className?: string }) {
  return <div className={`tilet-line w-full rounded-full ${className}`} aria-hidden="true" />;
}

export function PatternField({ className = '' }: { className?: string }) {
  return <div className={`pointer-events-none absolute inset-0 pattern-mesh opacity-70 ${className}`} aria-hidden="true" />;
}
