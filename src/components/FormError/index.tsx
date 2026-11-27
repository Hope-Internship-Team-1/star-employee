import { AlertCircleIcon } from '../Icons';

export default function FormError({ message }: { message: string }) {
  return (
    <p role="alert" className="flex items-center gap-grid-1 font-meta text-meta-md text-on-surface">
      <AlertCircleIcon />
      <span>{message}</span>
    </p>
  );
}
