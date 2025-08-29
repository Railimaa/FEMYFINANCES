import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@app/services/Auth/AuthService';

export function useResetPassword() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['auth', 'reset-password'],
    mutationFn: AuthService.resetPassword,
  });

  return { onResetPassword: mutateAsync, isLoadingResetPassword: isPending };
}
