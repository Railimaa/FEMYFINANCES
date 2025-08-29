import { useMutation } from '@tanstack/react-query';

import { userService } from '@app/services/UserService/UserService';

export function useDeleteUser() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['users', 'delete'],
    mutationFn: userService.deleteMe,
  });

  return { onDeleteUser: mutateAsync, isLoadingDeleteUser: isPending };
}
