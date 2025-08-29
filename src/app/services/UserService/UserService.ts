import { httpClient } from '../httpClient';

import { InputPutImgProfile } from './types/InputPutImgProfile';
import { OutPutGetSignedUrlImgProfile } from './types/OutPutGetSignedUrlImgProfile';
import { User } from './types/User';

async function getMe(): Promise<User> {
  const { data } = await httpClient.get<User>('/auth/me');
  return data;
}

async function putMe({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}): Promise<void> {
  const { data } = await httpClient.put<Promise<void>>('/auth/me/update', {
    firstName,
    lastName,
  });

  return data;
}

async function deleteMe(): Promise<void> {
  const { data } = await httpClient.delete<Promise<void>>('/auth/me/delete');

  return data;
}

async function deleteImgProfile(fileKey: string) {
  const { data } = await httpClient.delete(
    `/me/profile/delete-imgProfile/${fileKey}`,
  );

  return data;
}

async function getSignedUrlImgProfile(
  file: File,
): Promise<OutPutGetSignedUrlImgProfile> {
  const { name, size, type } = file;
  const { data } = await httpClient.post<Promise<OutPutGetSignedUrlImgProfile>>(
    '/me/profile/get-signedUrl',
    {
      fileName: name,
      fileSize: size,
      fileType: type,
    },
  );

  return data;
}

async function putImgProfile({
  url,
  file,
  onProgress,
}: InputPutImgProfile): Promise<void> {
  const { data } = await httpClient.put(url, file, {
    onUploadProgress: ({ loaded, total }) => {
      const percentage = Math.round((loaded * 100) / (total ?? 0));
      onProgress?.(percentage);
    },
    headers: {
      'Content-Type': file.type,
    },
  });

  return data;
}

async function putUpdateImgProfile({
  file,
  fileKeyImg,
}: {
  file: File;
  fileKeyImg: string;
}): Promise<OutPutGetSignedUrlImgProfile> {
  const fileName = file.name;
  const fileSize = file.size;
  const fileType = file.type;

  const { data } = await httpClient.put<Promise<OutPutGetSignedUrlImgProfile>>(
    '/me/profile/update-imgProfile',
    { fileName, fileSize, fileType, fileKeyBefore: fileKeyImg },
  );

  return data;
}

export const userService = {
  getMe,
  putMe,
  deleteMe,
  deleteImgProfile,
  getSignedUrlImgProfile,
  putImgProfile,
  putUpdateImgProfile,
};
