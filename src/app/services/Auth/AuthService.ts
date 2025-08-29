import { httpClient } from '../httpClient';

import { RefreshTokenOutput } from './types/RefreshTokenOutput';
import { ResetPasswordInput } from './types/ResetPasswordInput';
import { SignInInput } from './types/SignInInput';
import { SignInOutput } from './types/SignInOutput';
import { SignUpInput } from './types/SignUpInput';
import { SignUpOutput } from './types/SignUpOutput';

async function postSignIn({
  email,
  password,
}: SignInInput): Promise<SignInOutput> {
  const { data } = await httpClient.post<SignInOutput>('/auth/sign-in', {
    email,
    password,
  });

  return data;
}

async function postSignUp({
  firstName,
  lastName,
  email,
  password,
}: SignUpInput): Promise<SignUpOutput> {
  const { data } = await httpClient.post<SignUpOutput>('/auth/sign-up', {
    firstName,
    lastName,
    email,
    password,
  });

  return data;
}

async function postForgotPassword(email: string): Promise<void> {
  const { data } = await httpClient.post<Promise<void>>(
    `/auth/forgot-password/${email}`,
  );

  return data;
}

async function postRefreshToken(
  refreshToken: string,
): Promise<RefreshTokenOutput> {
  const { data } = await httpClient.post<Promise<RefreshTokenOutput>>(
    `/auth/refresh-token?refreshToken=${refreshToken}`,
  );

  return data;
}

async function resetPassword({
  code,
  email,
  newPassword,
}: ResetPasswordInput): Promise<void> {
  const { data } = await httpClient.post<Promise<void>>(
    `/auth/reset-password?code=${code}&email=${email}&newPassword=${newPassword}`,
  );

  return data;
}

export const AuthService = {
  postSignIn,
  postSignUp,
  postForgotPassword,
  postRefreshToken,
  resetPassword,
};
