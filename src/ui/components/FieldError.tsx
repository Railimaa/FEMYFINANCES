import { CircleX } from 'lucide-react';

type FieldErrorProps = {
  message: string;
};

export function FieldError({ message }: FieldErrorProps) {
  return (
    <div className="flex items-center gap-1 text-sm text-destructive">
      <small>{message}</small>
      <CircleX size={14} />
    </div>
  );
}
