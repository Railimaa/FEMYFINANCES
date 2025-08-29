import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@app/services/Auth/AuthService';

export function useForgotPassword() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['auth', 'forgot-password'],
    mutationFn: AuthService.postForgotPassword,
  });

  return { onForgotPassword: mutateAsync, isLoadingForgotPassword: isPending };
}
