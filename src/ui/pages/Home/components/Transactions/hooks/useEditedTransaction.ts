import { useMutation } from '@tanstack/react-query';

import { TransactionService } from '@app/services/TransactionsService/TransactionService';

export function useEditedTransaction() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['put', 'transaction'],
    mutationFn: TransactionService.putTransaction,
  });

  return { onPutTransaction: mutateAsync, isLoadingPutTransaction: isPending };
}
