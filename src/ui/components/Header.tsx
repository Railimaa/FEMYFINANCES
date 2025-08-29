import { ChevronDown, LogOutIcon, MoonStar, SunIcon, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@app/contexts/AuthProvider/AuthProvider';
import { Theme, useTheme } from '@app/contexts/ThemeProvider';
import { routes } from '@app/router/routes';
import type { User as UserType } from '@app/services/UserService/types/User';
import { Logo } from '@ui/assets/icons/Logo';

import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';

function HeaderProfile({
  user,
  theme,
  toogleTheme,
  signOut,
}: {
  user: UserType;
  theme: Theme;
  toogleTheme: () => void;
  signOut: () => void;
}) {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-1 hover:bg-foreground/10  rounded-full cursor-pointer transition-all duration-300 ease-in-out  ">
          <Avatar className="w-9 h-9">
            <AvatarImage src={user.profile.imgProfile} />
            <AvatarFallback className="text-xs">
              {user.firstName.slice(0, 1).toUpperCase()}
              {user.lastName.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <ChevronDown size={18} />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[1001]" align="end">
        <DropdownMenuItem className="hover:bg-transparent focus:bg-transparent pointer-events-none">
          <div className="flex gap-1  w-full">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.profile.imgProfile} />
              <AvatarFallback className="text-xs">
                {user.firstName.slice(0, 1).toUpperCase()}
                {user.lastName.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <div className="text-sm">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => navigate(routes.myProfile)}>
          <User />
          Meu Perfil
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={toogleTheme}>
          {theme === 'dark' ? <SunIcon /> : <MoonStar />}
          Mudar Tema
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={signOut}>
          <LogOutIcon />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const { user, signOut } = useAuthContext();
  const { theme, toogleTheme } = useTheme();

  return (
    <div className="flex w-full h-full max-h-16 fixed top-0 left-0 px-4 lg:px-20 z-[1000] bg-background shadow-sm py-2">
      <Logo />

      <div className="flex justify-end  w-full">
        <HeaderProfile
          user={user}
          theme={theme}
          toogleTheme={toogleTheme}
          signOut={signOut}
        />
      </div>
    </div>
  );
}
