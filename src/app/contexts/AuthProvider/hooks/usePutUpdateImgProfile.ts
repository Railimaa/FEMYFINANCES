import { useMutation } from '@tanstack/react-query';

import { userService } from '@app/services/UserService/UserService';

export function usePutUpdateImgProfile() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['users', 'me', 'updateImgProfile'],
    mutationFn: userService.putUpdateImgProfile,
  });

  return {
    onPutUpdateImgProfile: mutateAsync,
    isLoadingUpdateImgProfile: isPending,
  };
}
