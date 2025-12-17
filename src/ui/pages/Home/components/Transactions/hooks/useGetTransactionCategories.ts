import { useQuery } from '@tanstack/react-query';

import { TransactionService } from '@app/services/TransactionsService/TransactionService';

export function useGetTransactionCategories() {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['transactions', 'categories'],
    queryFn: TransactionService.getAllTransactionsCategories,
    staleTime: Infinity,
    enabled: true,
  });

  return {
    transactionCategories: data?.categoriesTransaction ?? [],
    isLoadingTransactionCategories: isLoading,
    isErrorTransactionCategories: isError,
    isFetchingTransactionCategories: isFetching,
    refetchTransactionCategories: refetch,
  };
}
