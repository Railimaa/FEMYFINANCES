import { cn } from '@app/utils/cn';
import { Logo } from '@ui/assets/icons/Logo';

interface ILoadingScreenProps {
  isLoading?: boolean;
}

export function LoadingScreen({ isLoading }: ILoadingScreenProps) {
  return (
    <div
      className={cn(
        'fixed top-0 bottom-0 left-0 right-0 z-[1001] bg-background ',
        isLoading && 'bg-background/80',
      )}
    >
      <div className="flex justify-center items-center w-full h-full">
        <div className="animate-pulse">
          <Logo />
        </div>
      </div>
    </div>
  );
}
