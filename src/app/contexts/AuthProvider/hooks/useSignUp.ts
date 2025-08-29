import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@app/services/Auth/AuthService';

export function useSignUp() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['auth', 'sign-up'],
    mutationFn: AuthService.postSignUp,
  });

  return {
    onSignUp: mutateAsync,
    isLoading: isPending,
  };
}
