import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { AuthService } from '@app/services/Auth/AuthService';
import { ResetPasswordInput } from '@app/services/Auth/types/ResetPasswordInput';
import { SignInInput } from '@app/services/Auth/types/SignInInput';
import { SignUpInput } from '@app/services/Auth/types/SignUpInput';
import { httpClient } from '@app/services/httpClient';
import { User } from '@app/services/UserService/types/User';
import { localStorageKeys } from '@app/utils/localStorageKeys';
import { LoadingScreen } from '@ui/components/LoadingScreen';

import { useForgotPassword } from './hooks/useForgotPassword';
import { useGetUser } from './hooks/useGetUser';
import { useResetPassword } from './hooks/useResetPassword';
import { useSignIn } from './hooks/useSignIn';
import { useSignUp } from './hooks/useSignUp';

export interface IAuthProviderContextValues {
  signedIn: boolean;
  signIn: (signInInput: SignInInput) => Promise<void>;
  signUp: (signUpInput: SignUpInput) => Promise<void>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (resetPasswordInput: ResetPasswordInput) => Promise<void>;
  loadings: {
    isLoadingSignIn: boolean;
    isLoadingSignUp: boolean;
    isLoadingForgotPassword: boolean;
    isLoadingResetPassword: boolean;
  };
  user: User;
}

export const AuthContext = createContext({} as IAuthProviderContextValues);

export function useAuthContext() {
  if (!AuthContext) throw new Error('Error in Auth');
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { onSignIn, isLoading: isLoadingSignIn } = useSignIn();
  const { onSignUp, isLoading: isLoadingSignUp } = useSignUp();
  const { onForgotPassword, isLoadingForgotPassword } = useForgotPassword();
  const { onResetPassword, isLoadingResetPassword } = useResetPassword();

  const [signedIn, setSignedIn] = useState<boolean>(
    () => !!localStorage.getItem(localStorageKeys.accessToken),
  );
  const {
    user,
    isError,
    isLoading: isLoadignMe,
    isSuccess,
  } = useGetUser(signedIn);

  const signIn = useCallback(
    async ({ email, password }: SignInInput) => {
      const { accessToken, refreshToken } = await onSignIn({ email, password });
      localStorage.setItem(localStorageKeys.accessToken, accessToken);
      localStorage.setItem(localStorageKeys.refreshToken, refreshToken);
      setSignedIn(true);
    },
    [onSignIn],
  );

  const signUp = useCallback(
    async (signUpInput: SignUpInput) => {
      await onSignUp(signUpInput);
    },
    [onSignUp],
  );

  const signOut = useCallback(() => {
    localStorage.clear();
    setSignedIn(false);
  }, []);

  const forgotPassword = useCallback(
    async (email: string) => {
      await onForgotPassword(email);
    },
    [onForgotPassword],
  );

  const resetPassword = useCallback(
    async (resetPasswordInput: ResetPasswordInput) => {
      await onResetPassword(resetPasswordInput);
    },
    [onResetPassword],
  );

  useEffect(() => {
    if (isError) {
      signOut();
    }
  }, [isError, signOut]);

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(localStorageKeys.accessToken);
      if (accessToken && !config.url?.includes('s3')) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    return () => httpClient.interceptors.request.eject(interceptorId);
  }, []);

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originRequest = error.config;
        const refreshToken = localStorage.getItem(
          localStorageKeys.refreshToken,
        );

        if (originRequest.url === '/auth/refresh-token') {
          setSignedIn(false);
          localStorage.clear();
          return Promise.reject(error);
        }

        if (error.response?.status !== 401 || !refreshToken) {
          return Promise.reject(error);
        }

        const { accessToken } =
          await AuthService.postRefreshToken(refreshToken);

        localStorage.setItem(localStorageKeys.accessToken, accessToken);
        localStorage.setItem(localStorageKeys.refreshToken, refreshToken);

        return httpClient(originRequest);
      },
    );

    return () => {
      httpClient.interceptors.response.eject(interceptorId);
    };
  }, []);

  const values = useMemo(
    () => ({
      signedIn: signedIn && isSuccess,
      signIn,
      signUp,
      signOut,
      forgotPassword,
      resetPassword,
      user,
      loadings: {
        isLoadingSignIn,
        isLoadingSignUp,
        isLoadingForgotPassword,
        isLoadingResetPassword,
      },
    }),
    [
      signedIn,
      signIn,
      signUp,
      signOut,
      forgotPassword,
      user,
      isLoadingSignIn,
      isLoadingSignUp,
      isLoadingForgotPassword,
      isLoadingResetPassword,
      isSuccess,
      resetPassword,
    ],
  );

  return (
    <AuthContext.Provider value={values}>
      {isLoadignMe && <LoadingScreen />}
      {!isLoadignMe && children}
    </AuthContext.Provider>
  );
}
