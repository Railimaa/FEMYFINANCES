import { useQuery } from '@tanstack/react-query';

import { User } from '@app/services/UserService/types/User';
import { userService } from '@app/services/UserService/UserService';

export function useGetUser(signedIn: boolean) {
  const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: userService.getMe,
    enabled: signedIn,
    staleTime: Infinity,
  });

  return {
    user: data ?? ({} as User),
    isLoading,
    isError,
    isSuccess,
    isFetching,
  };
}
