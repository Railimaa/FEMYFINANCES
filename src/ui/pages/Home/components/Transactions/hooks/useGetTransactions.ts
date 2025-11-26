import { useInfiniteQuery } from '@tanstack/react-query';

import { TransactionService } from '@app/services/TransactionsService/TransactionService';

import { FilterTransaction } from '../types/FilterTransaction';
import { TransactionResponse } from '../types/Transaction';

export function useGetTransactions(filters: FilterTransaction) {
  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
    refetch,
    isError,
    isFetching,
  } = useInfiniteQuery<TransactionResponse>({
    queryKey: [
      'get',
      'transactions',
      filters.month,
      filters.year,
      filters.bankAccountId,
      filters.typeTransaction,
    ],
    initialPageParam: null,
    queryFn: ({ pageParam }) =>
      TransactionService.getAllTransactions(filters, pageParam as any),
    getNextPageParam: (lastPage) => lastPage.lastEvaluatedKey ?? null,
    staleTime: Infinity,
    enabled: true,
  });

  const allTransactions = data?.pages.flatMap((p) => p.transactions) ?? [];

  return {
    transactions: {
      transactions: allTransactions,
      lastEvaluatedKey: data?.pages.at(-1)?.lastEvaluatedKey ?? null,
    },
    isInitialLoading: isLoading,
    refetchTransactions: refetch,
    hasNextPage,
    isLoadingNextPage: isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
    isErrorTransactions: isError,
    isLoadingTransactions: isFetching,
  };
}
