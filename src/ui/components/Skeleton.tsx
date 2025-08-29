/* eslint-disable no-undef */
import { cn } from '@app/utils/cn';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/5', className)}
      {...props}
    />
  );
}

export { Skeleton };
