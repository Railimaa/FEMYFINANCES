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
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: true, // Atualiza ao retornar para aba
    refetchInterval: 1000 * 60, // Atualiza a cada minuto
  });

  return {
    transactions: data?.transactions ?? [],
    isFetching,
    isInitialLoading: isLoading,
    isError,
    refetchTransactions: refetch,
  };
}
