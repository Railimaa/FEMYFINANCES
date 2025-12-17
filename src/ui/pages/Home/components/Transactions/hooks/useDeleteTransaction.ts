import { useMutation } from '@tanstack/react-query';

import { TransactionService } from '@app/services/TransactionsService/TransactionService';

export function useDeleteTransaction() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['delete', 'transaction'],
    mutationFn: TransactionService.deleteTransaction,
  });

  return {
    onDeleteTransaction: mutateAsync,
    isLoadingDeleteTransaction: isPending,
  };
}
