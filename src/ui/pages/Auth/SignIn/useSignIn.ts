import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuthContext } from '@app/contexts/AuthProvider/AuthProvider';
import { routes } from '@app/router/routes';
import { localStorageKeys } from '@app/utils/localStorageKeys';

export function useSignIn() {
  const {
    signIn,
    loadings: { isLoadingSignIn },
  } = useAuthContext();

  const schema = z.object({
    email: z
      .string()
      .min(1, 'E-mail é obrigatório')
      .email('Informe um e-mail válido.'),
    password: z
      .string()
      .min(1, 'Senha é obrigatório')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Senha deve ter: 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial.',
      ),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
    try {
      await signIn({ email, password });
    } catch (err) {
      const message =
        err instanceof AxiosError ? err.response?.data.message : '';

      toast.error(message, {
        position: 'top-center',
        duration: 6000,
      });
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem(
      localStorageKeys.confirmationEmailAccount,
    );

    if (!storedData) return;

    try {
      const parsed = JSON.parse(storedData);

      if (parsed?.email) {
        navigate(routes.confirmationAccount, { replace: true });
      } else {
        localStorage.removeItem(localStorageKeys.confirmationEmailAccount);
      }
    } catch {
      localStorage.removeItem(localStorageKeys.confirmationEmailAccount);
    }
  }, []);

  return {
    handleSubmit,
    form,
    isLoadingSignIn,
    navigate,
  };
}
