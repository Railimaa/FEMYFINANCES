import { Skeleton } from '@ui/components/Skeleton';

export function LoadingDataUser() {
  return (
    <div className="w-full flex items-center flex-col space-y-5">
      <Skeleton className="w-24 h-24 rounded-full" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
    </div>
  );
}
