import { Skeleton } from '@ui/components/Skeleton';

export function SkeletonHeaderTransaction() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Skeleton className="w-[100px] h-6" />

        <Skeleton className="size-6" />
      </div>

      <div className="w-full mt-6">
        <Skeleton className="w-full h-8" />
      </div>
    </>
  );
}
