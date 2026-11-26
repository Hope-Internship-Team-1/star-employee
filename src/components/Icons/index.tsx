interface IconProps {
  className?: string;
  size?: number;
}

export function StarIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`shrink-0 ${className ?? ''}`}
      aria-hidden="true"
    >
      <path d="M12 1.5L14.85 9.15L22.5 12L14.85 14.85L12 22.5L9.15 14.85L1.5 12L9.15 9.15L12 1.5Z" />
    </svg>
  );
}

export function AlertCircleIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className ?? ''}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}
