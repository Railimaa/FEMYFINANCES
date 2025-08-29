import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuthContext } from '@app/contexts/AuthProvider/AuthProvider';
import { routes } from '@app/router/routes';

export function useResetPassword() {
  const {
    resetPassword,
    loadings: { isLoadingResetPassword },
  } = useAuthContext();

  const location = useLocation();
  const url = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const schema = z
    .object({
      code: z.string(),
      email: z.string().email(),
      password: z
        .string()
        .min(1, 'Senha é obrigatório')
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          'Senha deve ter: 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial.',
        ),
      confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas não coincidem.',
      path: ['confirmPassword'],
    });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(schema),
  });

  const handleSubmt = form.handleSubmit(async ({ code, email, password }) => {
    try {
      await resetPassword({ code, email, newPassword: password });
      navigate(routes.signIn);
      toast.success(
        'Senha alterada com sucesso! agora você pode voltar a usar a plataforma!',
        { position: 'top-center' },
      );
    } catch {
      toast.error('Erro ao resetar senha.', { position: 'top-center' });
    }
  });

  useEffect(() => {
    const email = url.get('email');
    const code = url.get('code');

    if (!code || !email) {
      navigate(routes.signIn);
    }
    form.setValue('code', code!);
    form.setValue('email', email!);
  }, [form]);

  return {
    form,
    handleSubmt,
    isLoadingResetPassword,
  };
}
