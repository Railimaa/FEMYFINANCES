/* eslint-disable no-promise-executor-return */
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { useAuthContext } from '@app/contexts/AuthProvider/AuthProvider';
import { useGetSignedUrlImgProfile } from '@app/contexts/AuthProvider/hooks/useGetSignedUrlImgProfile';
import { usePutUpdateImgProfile } from '@app/contexts/AuthProvider/hooks/usePutUpdateImgProfile';
import { useUploadImgProfile } from '@app/contexts/AuthProvider/hooks/useUploadImgProfile';
import { queryClient } from '@app/libs/queryClient';

export function useAvatarHeader() {
  const [upload, setUpload] = useState<File | null>(null);
  const refInputUpload = useRef<HTMLInputElement>(null);
  const { user } = useAuthContext();
  const { onUploadImgProfile, isLoadingUploadImgProfile } =
    useUploadImgProfile();
  const { onGetSignedUrlImgProfile, isLoadingGetSignedUrl } =
    useGetSignedUrlImgProfile();
  const { onPutUpdateImgProfile, isLoadingUpdateImgProfile } =
    usePutUpdateImgProfile();

  const isLoadingUpload =
    isLoadingUploadImgProfile ||
    isLoadingGetSignedUrl ||
    isLoadingUpdateImgProfile;

  function handleChangeUpload(file: File) {
    setUpload(file);
  }

  async function handleUpload(file: File) {
    try {
      const { url } = await onGetSignedUrlImgProfile(file);
      await onUploadImgProfile({
        url,
        file,
      });
      await new Promise((r) => setTimeout(r, 1000));
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      toast.success('Upload feito com sucesso!', { position: 'top-right' });
    } catch {
      toast.error('Erro ao fazer upload!', { position: 'top-right' });
    } finally {
      setUpload(null);
    }
  }

  async function handleUpdateUploadImgProfile(file: File) {
    try {
      const fileKey = user.profile?.imgProfile.split('/')[3];
      const { url } = await onPutUpdateImgProfile({
        file,
        fileKeyImg: fileKey,
      });
      await onUploadImgProfile({ url, file });
      await new Promise((r) => setTimeout(r, 1000));
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      toast.success('Upload feito com sucesso!', { position: 'top-right' });
    } catch {
      toast.error('Erro ao fazer upload!', { position: 'top-right' });
    } finally {
      setUpload(null);
    }
  }

  return {
    handleChangeUpload,
    refInputUpload,
    isLoadingUpload,
    upload,
    handleUpload,
    handleUpdateUploadImgProfile,
  };
}
