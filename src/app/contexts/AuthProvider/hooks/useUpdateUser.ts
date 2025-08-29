import { useMutation } from '@tanstack/react-query';

import { userService } from '@app/services/UserService/UserService';

export function useUpdateUser() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['users', 'update'],
    mutationFn: userService.putMe,
  });

  return { onUpdateUser: mutateAsync, isLoadingUpdateUser: isPending };
}
