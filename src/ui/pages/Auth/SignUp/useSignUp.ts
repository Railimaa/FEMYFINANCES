import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuthContext } from '@app/contexts/AuthProvider/AuthProvider';
import { routes } from '@app/router/routes';
import { localStorageKeys } from '@app/utils/localStorageKeys';

export function useSignUp() {
  const {
    signUp,
    loadings: { isLoadingSignUp },
  } = useAuthContext();

  const navigate = useNavigate();

  const schema = z
    .object({
      firstName: z.string().min(1, 'Nome é obrigatório').max(200),
      lastName: z.string().min(1, 'Sobrenome é obrigatório').max(200),
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
      confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas não coincidem.',
      path: ['confirmPassword'],
    });
  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signUp(data);
      toast.success(
        `Tudo certo, ${data.firstName}! 🎉
        Enviamos um e-mail com o código para confirmação da sua conta.`,
        {
          position: 'top-center',
          duration: 6000,
        },
      );
      localStorage.setItem(
        localStorageKeys.confirmationEmailAccount,
        JSON.stringify({ email: data.email, firstName: data.firstName }),
      );
      navigate(routes.confirmationAccount);
    } catch {
      toast.error('Ocorreu um erro ao criar conta!', {
        position: 'top-center',
      });
    }
  });

  return {
    form,
    handleSubmit,
    isLoadingSignUp,
  };
}
