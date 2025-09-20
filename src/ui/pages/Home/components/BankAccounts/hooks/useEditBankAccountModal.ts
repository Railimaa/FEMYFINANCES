import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { queryClient } from '@app/libs/queryClient';
import { useFinancesContext } from '@ui/pages/Home/context/FinancesContext';

import { usePutBankAccount } from './usePutBankAccount';

export function useEditBankAccountModal() {
  const {
    openModalEditBankAccount,
    handleCloseModalEditBankAccount,
    bankAccountIsBegging,
  } = useFinancesContext();

  const { onUpdateBankAccount, isLoadingUpdateBankAccount } =
    usePutBankAccount();

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
      initialBalance: bankAccountIsBegging?.initialBalance,
      categoryBankAccount: {
        id: bankAccountIsBegging?.categoryBankAccount.id,
        color: bankAccountIsBegging?.categoryBankAccount.color,
        colorWithoutIcon:
          bankAccountIsBegging?.categoryBankAccount.colorWithoutIcon,
        icon: bankAccountIsBegging?.categoryBankAccount.icon,
      },
      typeBankAccount: bankAccountIsBegging?.typeBankAccount,
      name: bankAccountIsBegging?.name,
    },
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onUpdateBankAccount({
        body: data,
        idBankAccount: bankAccountIsBegging?.id!,
      });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts', 'get'] });
      toast.success('Conta editada com sucesso!', { position: 'top-right' });
      handleCloseModalEditBankAccount();
    } catch {
      toast.error('Erro ao cadastrar conta!', { position: 'top-right' });
    }
  });

  const isDurty = form.formState?.isDirty;

  return {
    form,
    handleSubmit,
    openModalEditBankAccount,
    handleCloseModalEditBankAccount,
    bankAccountIsBegging,
    isLoadingUpdateBankAccount,
    isDurty,
  };
}
