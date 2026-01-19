import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { routes } from '@app/router/routes';
import { localStorageKeys } from '@app/utils/localStorageKeys';

import { ConfirmationAccountData } from '../types/ConfirmationAccountData';

import { usePostConfirmAccount } from './usePostConfirmAccount';
import { usePostResentConfirmAccount } from './usePostResentCodeConfirmAccount';

const RESEND_TIMEOUT = 60;

export function useConfirmAccount() {
  const navigate = useNavigate();
  const { isLoadingConfirmAccount, onConfirmAccount } = usePostConfirmAccount();
  const { onResentConfirmAccount, isLoadingResentConfirmAccount } =
    usePostResentConfirmAccount();

  const [confirmationAccountData] = useState<ConfirmationAccountData>(() => {
    const hasEmail = localStorage.getItem(
      localStorageKeys.confirmationEmailAccount,
    );

    if (hasEmail) {
      return JSON.parse(hasEmail);
    }

    return {};
  });
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(true);

  const schema = z.object({
    code: z.string().min(6, 'Código é obrigatório'),
    email: z.string().email().min(1),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    defaultValues: { code: '', email: '' },
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit(async ({ code, email }) => {
    try {
      await onConfirmAccount({ code, email });
      toast.success(
        `Bem-vindo(a), ${confirmationAccountData.firstName}! 🚀
Sua conta está ativa. Faça login e comece a usar o My Finances.`,
        { position: 'top-center' },
      );

      localStorage.removeItem(localStorageKeys.confirmationEmailAccount);
      navigate(routes.signIn);
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message
          : 'Erro ao enviar confirmação';

      toast.error(message, { position: 'top-center' });
    }
  });

  async function handleSubmitResendCode() {
    if (!canResend) {
      return;
    }

    try {
      setCanResend(false);
      setTimeLeft(RESEND_TIMEOUT);

      await onResentConfirmAccount({ email: confirmationAccountData.email });
      toast.success('Pronto! Enviamos um novo código para o seu e-mail 📩', {
        position: 'top-center',
      });
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message
          : 'Erro ao enviar confirmação';

      toast.error(message, { position: 'top-center' });
    }
  }

  useEffect(() => {
    if (confirmationAccountData.email) {
      form.setValue('email', confirmationAccountData.email);
    }
  }, [form, confirmationAccountData]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    if (canResend) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevState) => prevState - 1);
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [timeLeft, canResend]);

  useEffect(() => {
    if (!confirmationAccountData.email || !confirmationAccountData.firstName) {
      navigate(routes.signIn);
    }
  }, [confirmationAccountData]);

  const isLoadingMutation =
    isLoadingConfirmAccount || isLoadingResentConfirmAccount;

  return {
    confirmationAccountData,
    timeLeft,
    canResend,
    form,
    handleSubmit,
    handleSubmitResendCode,
    isLoadingMutation,
  };
}
