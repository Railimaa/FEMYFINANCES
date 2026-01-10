import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { queryClient } from '@app/libs/queryClient';
import { useFinancesContext } from '@ui/pages/Home/context/FinancesContext';

import { usePostBankAccount } from './usePostBankAccount';

export function useNewAccountModal() {
  const { openModalNewBankAccount, handleCloseModalNewBankAccount } =
    useFinancesContext();

  const { onPostBankAccount, isLoadingPostBankAccount } = usePostBankAccount();

  const schema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    initialBalance: z.number(),
    typeBankAccount: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], {
      message: 'Tipo é obrigatório',
    }),
    categoryBankAccount: z
      .object({
        id: z.string().min(1).nullable(),
        color: z.string().min(1).nullable(),
        icon: z.string().min(1).nullable(),
        colorWithoutIcon: z.string().min(1).nullable(),
        category: z.string().nullable(),
      })
      .refine(
        (data) => {
          if (
            data.id === null &&
            data.color === null &&
            data.icon === null &&
            data.colorWithoutIcon === null
          ) {
            return false;
          }

          return true;
        },
        { message: 'Categoria é obrigatório, selecione uma conta ou uma cor' },
      ),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    defaultValues: {
      initialBalance: 0,
      categoryBankAccount: {
        id: null,
        color: null,
        colorWithoutIcon: null,
        icon: null,
      },
      typeBankAccount: 'CASH',
      name: '',
    },
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onPostBankAccount(data);
      queryClient.invalidateQueries({ queryKey: ['bankAccounts', 'get'] });
      toast.success('Conta criada com sucesso!', { position: 'top-right' });
      handleCloseModalNewBankAccount();
    } catch {
      toast.error('Erro ao cadastrar conta!', { position: 'top-right' });
    }
  });

  useEffect(() => {
    form.reset({
      initialBalance: 0,
      categoryBankAccount: {
        id: null,
        color: null,
        colorWithoutIcon: null,
        icon: null,
      },
      typeBankAccount: 'CASH',
      name: '',
    });
  }, [openModalNewBankAccount, form]);

  return {
    form,
    handleSubmit,
    openModalNewBankAccount,
    handleCloseModalNewBankAccount,
    isLoadingPostBankAccount,
  };
}
