import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { queryClient } from '@app/libs/queryClient';
import { useFinancesContext } from '@ui/pages/Home/context/FinancesContext';

import { useFilters } from './useFilters';
import { usePostNewTransaction } from './usePostNewTransaction';

export function useNewTransactionModal() {
  const {
    openModalNewTransaction,
    handleCloseModalNewTransaction,
    typeTransaction,
    refSwiper,
  } = useFinancesContext();

  const { onPostNewTransaction, isLoadingNewTransaction } =
    usePostNewTransaction();

  const { handleChangeFilter } = useFilters();

  const istypeTransactionIncome = typeTransaction === 'INCOME';

  const schema = z.object({
    category: z.object({
      categoryId: z.string().min(1, 'Categoria é obrigatório'),
      icon: z.string().min(1),
    }),
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .max(100, 'Máximo de 100 caracteres'),
    value: z
      .preprocess(
        (val) =>
          String(val)
            .replace(/\./g, '') // remove separador de milhar
            .replace(',', '.'), // vírgula → ponto
        z
          .string()
          .regex(/^\d+(\.\d+)?$/, 'Apenas números positivos')
          .max(20, 'Máximo de 20 caracteres'),
      )
      .transform(Number),
    date: z.date(),
    typeTransaction: z.enum(['INCOME', 'EXPENSE']),
    categoryBankAccount: z
      .object({
        id: z.string().nullable(),
        color: z.string().nullable(),
        icon: z.string().nullable(),
        colorWithoutIcon: z.string().nullable(),
        bankAccountId: z.string().min(1),
      })
      .refine(
        (data) => {
          if (!data.bankAccountId) {
            return false;
          }

          return true;
        },
        { message: 'Conta é obrigatório' },
      ),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    defaultValues: {
      categoryBankAccount: {
        id: null,
        color: null,
        colorWithoutIcon: null,
        icon: null,
        bankAccountId: '',
      },
      category: { icon: '', categoryId: '' },
      date: new Date(),
      name: '',
      typeTransaction: 'INCOME',
      value: 0,
    },
    resolver: zodResolver(schema),
  });

  function handleCloseModalNewTransactionAndResetForm() {
    handleCloseModalNewTransaction();
    form.reset();
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onPostNewTransaction({
        ...data,
        bankAccountId: data.categoryBankAccount.bankAccountId,
        categoryId: data.category.categoryId,
        icon: data.category.icon,
        date: data.date.toISOString(),
        typeTransaction,
        categoryBankAccount: { ...data.categoryBankAccount },
      });
      handleChangeFilter('month', data.date.getMonth());
      queryClient.invalidateQueries({
        queryKey: ['get', 'transactions'],
      });
      queryClient.invalidateQueries({
        queryKey: ['bankAccounts', 'get'],
      });
      refSwiper.current?.slideTo(data.date.getMonth());
      handleCloseModalNewTransactionAndResetForm();
      toast.success(
        `${istypeTransactionIncome ? 'Receita cadastrada com sucesso!' : 'Despesa cadastrada com sucesso!'}`,
        { position: 'top-right' },
      );
    } catch {
      toast.error(
        `Erro ao cadastrar ${istypeTransactionIncome ? 'Receita' : 'Despesa'}`,
        { position: 'top-right' },
      );
    }
  });

  return {
    form,
    handleSubmit,
    openModalNewTransaction,
    typeTransaction,
    handleCloseModalNewTransactionAndResetForm,
    istypeTransactionIncome,
    isLoadingNewTransaction,
  };
}
