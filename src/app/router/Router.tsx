import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { lazyLoad } from '@app/utils/lazyLoad';
import { LoadingScreen } from '@ui/components/LoadingScreen';
import { AuthLayout } from '@ui/layouts/AuthLayout/AuthLayout';

import { AuthGuard } from './AuthGuard';
import { routes } from './routes';

const { SignUp } = lazyLoad(() => import('../../ui/pages/Auth/SignUp/SignUp'));
const { SignIn } = lazyLoad(() => import('../../ui/pages/Auth/SignIn/SignIn'));
const { ForgotPassword } = lazyLoad(
  () => import('../../ui/pages/Auth/ForgotPassword/ForgotPassword'),
);
const { ResetPassword } = lazyLoad(
  () => import('../../ui/pages/Auth/ResetPassword/ResetPassword'),
);
const { NotFound404 } = lazyLoad(
  () => import('../../ui/pages/NotFound404/NotFound404'),
);
const { Home } = lazyLoad(() => import('../../ui/pages/Home/Home'));
const { MyProfile } = lazyLoad(
  () => import('../../ui/pages/MyProfile/MyProfile'),
);
const { ConfirmAccount } = lazyLoad(
  () => import('../../ui/pages/Auth/ConfirmAccount/ConfirmAccount'),
);

export function Router() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<AuthGuard isPrivate />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.myProfile} element={<MyProfile />} />
        </Route>

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path={routes.signUp} element={<SignUp />} />
            <Route path={routes.signIn} element={<SignIn />} />
          </Route>
          <Route path={routes.forgotPassword} element={<ForgotPassword />} />
          <Route path={routes.resetPassword} element={<ResetPassword />} />
          <Route
            path={routes.confirmationAccount}
            element={<ConfirmAccount />}
          />
        </Route>

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Suspense>
  );
}
