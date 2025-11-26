import { Skeleton } from '@ui/components/Skeleton';

export function SkeletonTransaction() {
  return (
    <div className="flex gap-4 w-full bg-background p-4 rounded-[16px]">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex items-center justify-between w-full">
        <div>
          <Skeleton className="w-[150px] h-4" />

          <Skeleton className="w-[100px] h-2 block mt-1" />
        </div>

        <div>
          <Skeleton className="w-[50px] h-4 lg:w-[150px]" />
        </div>
      </div>
    </div>
  );
}
