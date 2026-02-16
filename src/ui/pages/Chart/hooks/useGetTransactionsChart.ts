import { useQuery } from '@tanstack/react-query';

import { TransactionService } from '@app/services/TransactionsService/TransactionService';

export function useGetTransactionsChart(
  month: number,
  year: number,
  allPeriod: boolean,
) {
  const { data, isFetching, isLoading, isError, refetch } = useQuery({
    queryKey: ['get', 'transactions', 'chart', month, year, allPeriod],
    queryFn: () =>
      TransactionService.getTransactionsChart(month, year, allPeriod),
    enabled: true,
    staleTime: Infinity,
  });

  return {
    transactions: data?.transactions ?? [],
    isFetching,
    isInitialLoading: isLoading,
    isError,
    refetchTransactions: refetch,
  };
}
