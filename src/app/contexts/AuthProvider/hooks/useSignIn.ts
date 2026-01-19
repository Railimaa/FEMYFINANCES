import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { AuthService } from '@app/services/Auth/AuthService';
import { SignInInput } from '@app/services/Auth/types/SignInInput';
import type { SignInOutput } from '@app/services/Auth/types/SignInOutput';

export function useSignIn() {
  const { mutateAsync, isPending } = useMutation<
    SignInOutput,
    AxiosError<{ message: string }>,
    SignInInput
  >({
    mutationKey: ['auth', 'sign-in'],
    mutationFn: AuthService.postSignIn,
  });

  return {
    onSignIn: mutateAsync,
    isLoading: isPending,
  };
}
