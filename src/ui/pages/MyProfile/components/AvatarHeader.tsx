/* eslint-disable react/button-has-type */
import { ImageUp, Trash2 } from 'lucide-react';
import { RefObject } from 'react';

import { User } from '@app/services/UserService/types/User';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/components/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/components/DropdownMenu';

type AvatarHeaderProps = {
  isLoadingMutationUser: boolean;
  handleToggleModalDeleteAccount: () => void;
  handleToggleModalDeleteImgProfile: () => void;
  isLoadingUploadImgProfile: boolean;
  handleChangeUpload: (file: File) => void;
  refInputUpload: RefObject<HTMLInputElement | null>;
  handleUpload: (file: File) => Promise<void>;
  user: User;
  handleUpdateUploadImgProfile: (file: File) => Promise<void>;
};

export function AvatarHeader({
  isLoadingMutationUser,
  handleToggleModalDeleteAccount,
  handleToggleModalDeleteImgProfile,
  isLoadingUploadImgProfile,
  handleChangeUpload,
  refInputUpload,
  handleUpload,
  user,
  handleUpdateUploadImgProfile,
}: AvatarHeaderProps) {
  return (
    <>
      <input
        ref={refInputUpload}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleChangeUpload(file);

            const isUploadUpdate = user.profile?.imgProfile;

            if (isUploadUpdate) {
              await handleUpdateUploadImgProfile(file);
            } else {
              await handleUpload(file);
            }
          }
        }}
      />

      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          disabled={isLoadingMutationUser || isLoadingUploadImgProfile}
        >
          <Avatar className="w-36 h-36 bg-foreground/10 flex items-center justify-center hover:cursor-pointer">
            <AvatarImage src={user.profile.imgProfile} />

            <AvatarFallback>
              {user.firstName.slice(0, 1).toUpperCase()}{' '}
              {user.lastName.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {user.profile?.imgProfile && (
            <DropdownMenuItem onSelect={() => refInputUpload.current?.click()}>
              <ImageUp />
              Trocar foto
            </DropdownMenuItem>
          )}

          {user.profile?.imgProfile && (
            <DropdownMenuItem onSelect={handleToggleModalDeleteImgProfile}>
              <Trash2 className="text-destructive" />
              Remover foto
            </DropdownMenuItem>
          )}

          {!user.profile?.imgProfile && (
            <DropdownMenuItem onSelect={() => refInputUpload.current?.click()}>
              <ImageUp />
              Adicionar foto
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onSelect={handleToggleModalDeleteAccount}>
            <Trash2 className="text-destructive" />
            Deletar conta
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
