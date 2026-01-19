/* eslint-disable react/button-has-type */

import { Trash2 } from 'lucide-react';

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
  user: User;
};

export function AvatarHeader({
  user,
  isLoadingMutationUser,
  handleToggleModalDeleteAccount,
}: AvatarHeaderProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isLoadingMutationUser}>
        <Avatar className="w-36 h-36 bg-foreground/10 flex items-center justify-center hover:cursor-pointer">
          <AvatarImage src={user.profile.imgProfile} />

          <AvatarFallback>
            {user.firstName.slice(0, 1).toUpperCase()}{' '}
            {user.lastName.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onSelect={handleToggleModalDeleteAccount}>
          <Trash2 className="text-destructive" />
          Deletar conta
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
