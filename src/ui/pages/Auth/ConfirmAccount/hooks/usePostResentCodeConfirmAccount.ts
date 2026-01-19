import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@app/services/Auth/AuthService';

export function usePostResentConfirmAccount() {
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['auth', 'resent-confirm-account'],
    mutationFn: AuthService.postResentConfirmAccount,
  });

  return {
    isLoadingResentConfirmAccount: isPending,
    onResentConfirmAccount: mutateAsync,
  };
}
