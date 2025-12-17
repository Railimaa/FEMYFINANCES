import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { queryClient } from '@app/libs/queryClient';
import { useFinancesContext } from '@ui/pages/Home/context/FinancesContext';

import { useDeleteTransaction } from './useDeleteTransaction';
import { useEditedTransaction } from './useEditedTransaction';
import { useFilters } from './useFilters';

export function useEditedTransactionModal() {
  const {
    transactionIsBegging,
    refSwiper,
    openModalEditedTransaction,
    handleCloseModalEditedTransaction,
  } = useFinancesContext();
  const { onPutTransaction, isLoadingPutTransaction } = useEditedTransaction();
  const { onDeleteTransaction, isLoadingDeleteTransaction } =
    useDeleteTransaction();
  const { handleChangeFilter } = useFilters();

  const [openModalDeleteTransaction, setOpenModalDeleteTransaction] =
    useState(false);

  const istypeTransactionIncome =
    transactionIsBegging?.typeTransaction === 'INCOME';

  const schema = z.object({
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
        (val) => String(val),
        z
          .string()
          .regex(/^\d+$/, 'Apenas números positivos')
          .max(20, 'Máximo de 20 caracteres'),
      )
      .transform((val) => Number(val)),
    date: z.date(),
    typeTransaction: z.enum(['INCOME', 'EXPENSE']),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    defaultValues: {
      categoryBankAccount: {
        id: transactionIsBegging?.categoryBankAccount.id,
        color: transactionIsBegging?.categoryBankAccount.color,
        colorWithoutIcon:
          transactionIsBegging?.categoryBankAccount.colorWithoutIcon,
        icon: transactionIsBegging?.categoryBankAccount.icon,
        bankAccountId: transactionIsBegging?.bankAccountId,
      },
      category: {
        categoryId: transactionIsBegging?.categoryId,
        icon: transactionIsBegging?.icon,
      },
      name: transactionIsBegging?.name,
      value: transactionIsBegging?.value,
      date: new Date(transactionIsBegging?.date!),
      typeTransaction: transactionIsBegging?.typeTransaction,
    },
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onPutTransaction({
        bankAccountId: data.categoryBankAccount.bankAccountId,
        name: data.name,
        typeTransaction: data.typeTransaction,
        value: data.value,
        icon: data.category.icon,
        categoryId: data.category.categoryId,
        transactionId: transactionIsBegging?.id!,
        date: data.date.toISOString(),
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
      handleCloseModalEditedTransaction();
      toast.success(
        `${istypeTransactionIncome ? 'Receita editada com sucesso!' : 'Despesa editada com sucesso!'}`,
        { position: 'top-right' },
      );
    } catch {
      toast.error(
        `Erro ao editar ${istypeTransactionIncome ? 'Receita' : 'Despesa'}`,
        { position: 'top-right' },
      );
    }
  });

  function handleToggleModalDeleteTransaction() {
    setOpenModalDeleteTransaction((prevState) => !prevState);
  }

  async function handleConfirmationDeleteTransaction() {
    try {
      await onDeleteTransaction({
        transactionId: transactionIsBegging?.id!,
        bankAccountId: transactionIsBegging?.bankAccountId!,
      });
      queryClient.invalidateQueries({
        queryKey: ['get', 'transactions'],
      });
      queryClient.invalidateQueries({
        queryKey: ['bankAccounts', 'get'],
      });
      handleToggleModalDeleteTransaction();
      handleCloseModalEditedTransaction();
      toast.success(
        `${istypeTransactionIncome ? 'Receita deletada com sucesso!' : 'Despesa deletada com sucesso!'}`,
        { position: 'top-right' },
      );
    } catch {
      toast.error(
        `${istypeTransactionIncome ? 'Receita deletada com sucesso!' : 'Despesa deletada com sucesso!'}`,
        { position: 'top-right' },
      );
    }
  }

  const isDurty = form.formState.isDirty;

  return {
    form,
    handleSubmit,
    istypeTransactionIncome,
    isDurty,
    isLoadingPutTransaction,
    openModalEditedTransaction,
    handleCloseModalEditedTransaction,
    openModalDeleteTransaction,
    handleToggleModalDeleteTransaction,
    handleConfirmationDeleteTransaction,
    transactionIsBegging,
    isLoadingDeleteTransaction,
  };
}
