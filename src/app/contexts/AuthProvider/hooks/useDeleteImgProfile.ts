import { useMutation } from '@tanstack/react-query';

import { userService } from '@app/services/UserService/UserService';

export function useDeleteImgProfile() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['users', 'deleteImgProfile'],
    mutationFn: userService.deleteImgProfile,
  });

  return {
    onDeleteImgProfile: mutateAsync,
    isLoadingDeleteImgProfile: isPending,
  };
}
