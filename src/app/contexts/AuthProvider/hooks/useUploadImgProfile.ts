import { useMutation } from '@tanstack/react-query';

import { userService } from '@app/services/UserService/UserService';

export function useUploadImgProfile() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['users', 'me', 'uploadImgProfile'],
    mutationFn: userService.putImgProfile,
  });
  return {
    onUploadImgProfile: mutateAsync,
    isLoadingUploadImgProfile: isPending,
  };
}
