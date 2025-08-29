import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuthContext } from '@app/contexts/AuthProvider/AuthProvider';

export function useSignUp() {
  const {
    signUp,
    loadings: { isLoadingSignUp },
  } = useAuthContext();

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
      toast.success(`Conta criada com sucesso ${data.firstName}! Faça Login!`, {
        position: 'top-center',
      });
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
