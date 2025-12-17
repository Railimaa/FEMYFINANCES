import { useMutation } from '@tanstack/react-query';

import { TransactionService } from '@app/services/TransactionsService/TransactionService';

export function usePostNewTransaction() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['transactions', 'postNewTransactio'],
    mutationFn: TransactionService.postTransaction,
  });

  return {
    onPostNewTransaction: mutateAsync,
    isLoadingNewTransaction: isPending,
  };
}
