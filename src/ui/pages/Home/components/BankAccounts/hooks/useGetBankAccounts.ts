import { useQuery } from '@tanstack/react-query';

import { BankAccountsService } from '@app/services/BankAccountsService/BankAccountsService';

export function useGetBankAccounts() {
  const { data, isLoading, isFetching, refetch, isRefetching, isError } =
    useQuery({
      queryKey: ['bankAccounts', 'get'],
      queryFn: BankAccountsService.getBankAccounts,
      enabled: true,
      staleTime: Infinity,
    });

  return {
    bankAccounts: data?.bankAccounts ?? [],
    isLoadingBankAccounts: isLoading,
    isFetchingBankAccounts: isFetching,
    isRefetchingBankAccounts: isRefetching,
    isErrorBankAccounts: isError,
    refetchBankAccounts: refetch,
  };
}
