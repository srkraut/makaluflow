type IconProps = { className?: string };

export function PlayIcon({ className = "size-3" }: IconProps) {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true" className={className}>
      <path d="M3 1.5 L12 7 L3 12.5 Z" fill="currentColor" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3 8 H13 M9 4 L13 8 L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "size-3" }: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M3 9 L9 3 M4 3 H9 V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon({ className = "h-3 w-[18px]" }: IconProps) {
  return (
    <svg viewBox="0 0 18 12" fill="none" aria-hidden="true" className={className}>
      <path d="M1 2 H17 M1 10 H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
