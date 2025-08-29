import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '@app/contexts/AuthProvider/AuthProvider';

import { routes } from './routes';

export function AuthGuard({ isPrivate }: { isPrivate: boolean }) {
  const { signedIn } = useAuthContext();

  if (signedIn && !isPrivate) {
    return <Navigate to={routes.home} replace />;
  }

  if (!signedIn && isPrivate) {
    return <Navigate to={routes.signIn} replace />;
  }

  return <Outlet />;
}
