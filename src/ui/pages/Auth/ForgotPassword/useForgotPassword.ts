/* eslint-disable no-promise-executor-return */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuthContext } from '@app/contexts/AuthProvider/AuthProvider';
import { routes } from '@app/router/routes';

export function useForgotPassword() {
  const {
    forgotPassword,
    loadings: { isLoadingForgotPassword },
  } = useAuthContext();
  const navigate = useNavigate();

  const schema = z.object({
    email: z
      .string()
      .min(1, 'E-mail é obrigatório.')
      .email('Informe um e-mail válido.'),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit(async ({ email }) => {
    try {
      await forgotPassword(email);
      navigate(routes.signIn);
      toast.success(
        'Sucesso! Enviamos o link de recuperação para o seu e-mail.',
        { position: 'top-center' },
      );
    } catch {
      toast.error('Erro ao enviar e-mail.', { position: 'top-center' });
    }
  });

  return {
    navigate,
    form,
    handleSubmit,
    isLoadingForgotPassword,
  };
}
