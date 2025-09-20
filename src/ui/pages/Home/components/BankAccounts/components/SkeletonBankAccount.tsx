import { Skeleton } from '@ui/components/Skeleton';

export function SkeletonBankAccount() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[100px] h-[16px]" />

        <div className="flex items-center gap-2 font-bold text-3xl/4">
          <Skeleton className="w-[160px] h-[16px] " />
          <Skeleton className="w-[50px] h-[16px] " />
        </div>
      </div>

      <div className="flex flex-col flex-1  justify-end  mt-10 lg:mt-0">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="w-[110px] h-[16px] " />

          <div className="flex items-center gap-2">
            <Skeleton className="w-[50px] h-[16px] " />
            <Skeleton className="w-[50px] h-[16px] " />
          </div>
        </div>

        <Skeleton className="flex items-center gap-4 bg-opacity-0">
          <div className="min-h-[200px] py-4 px-3  rounded-[16px] flex flex-col justify-between bg-primary/5 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Skeleton className="w-[50px] h-[16px] " />
                <Skeleton className="w-[50px] h-[16px] " />
              </div>
              <Skeleton className="w-[100px] h-[16px] " />
            </div>

            <div className="flex flex-col gap-4">
              <Skeleton className="w-[50px] h-[16px] " />
              <Skeleton className="w-[100px] h-[16px] " />
            </div>
          </div>
          <div className="min-h-[200px] py-4 px-3  rounded-[16px] flex flex-col justify-between bg-primary/5 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Skeleton className="w-[50px] h-[16px] " />
                <Skeleton className="w-[50px] h-[16px] " />
              </div>
              <Skeleton className="w-[100px] h-[16px] " />
            </div>

            <div className="flex flex-col gap-4">
              <Skeleton className="w-[50px] h-[16px] " />
              <Skeleton className="w-[100px] h-[16px] " />
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}
