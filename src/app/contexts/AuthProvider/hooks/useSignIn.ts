import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@app/services/Auth/AuthService';

export function useSignIn() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['auth', 'sign-in'],
    mutationFn: AuthService.postSignIn,
  });

  return { onSignIn: mutateAsync, isLoading: isPending };
}
