import { useMutation } from '@tanstack/react-query';

import { userService } from '@app/services/UserService/UserService';

export function useGetSignedUrlImgProfile() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['users', 'getSignedUrls'],
    mutationFn: userService.getSignedUrlImgProfile,
  });
  return {
    onGetSignedUrlImgProfile: mutateAsync,
    isLoadingGetSignedUrl: isPending,
  };
}
