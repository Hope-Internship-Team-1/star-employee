export default function FormError({ message }: { message: string }) {
  return (
    <p role="alert" className="mb-4 text-sm text-clay">
      {message}
    </p>
  );
}
