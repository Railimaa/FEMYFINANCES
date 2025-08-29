/* eslint-disable no-unused-expressions */
import { CircleX } from 'lucide-react';
import { ComponentProps, forwardRef, useReducer } from 'react';

import { cn } from '@app/utils/cn';
import { Eyes } from '@ui/assets/icons/Eyes';

import { Button } from './Button';

interface IInputProps extends ComponentProps<'input'> {
  isLoading?: boolean;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, isLoading, error, type, disabled, ...props }, ref) => {
    const [visiblePassword, handleToggleVisiblePassword] = useReducer(
      (prevState) => !prevState,
      false,
    );
    const isPassword = type === 'password';

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          disabled={isLoading || disabled}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
            error && '!border-destructive !focus:border-destructive',
          )}
          type={isPassword && visiblePassword ? 'text' : type}
        />

        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-0 right-1"
            onClick={handleToggleVisiblePassword}
            disabled={isLoading}
          >
            <Eyes visible={visiblePassword} />
          </Button>
        )}

        {error && (
          <div className="flex items-center gap-1 text-sm text-destructive">
            <small>{error}</small>
            <CircleX size={14} />
          </div>
        )}
      </div>
    );
  },
);
