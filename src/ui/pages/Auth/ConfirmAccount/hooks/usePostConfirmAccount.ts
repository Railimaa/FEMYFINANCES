import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@app/services/Auth/AuthService';

export function usePostConfirmAccount() {
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['auth', 'confirm-account'],
    mutationFn: AuthService.postConfirmAccount,
  });

  return { isLoadingConfirmAccount: isPending, onConfirmAccount: mutateAsync };
}
