export const buttonBaseClassName =
  'inline-flex min-h-11 w-full items-center justify-center gap-grid-2 rounded-control px-card-pad py-grid-3 font-label text-label-md transition-colors duration-hover-colour ease-hover-colour focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50';

export const primaryButtonClassName = `${buttonBaseClassName} bg-primary text-on-primary hover:bg-primary-hover`;

export const secondaryButtonClassName = `${buttonBaseClassName} border border-outline bg-surface-raised text-on-surface hover:bg-surface-subtle`;
