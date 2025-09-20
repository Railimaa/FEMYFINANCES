import { useQuery } from '@tanstack/react-query';

import { BankAccountsService } from '@app/services/BankAccountsService/BankAccountsService';

export function useGetBankAccountsCategories(enabled: boolean) {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['bankAccounts', 'categories', 'get'],
    queryFn: BankAccountsService.getBankAccountsCategories,
    staleTime: Infinity,
    enabled,
  });

  return {
    bankAccountsCategories: data ?? { categories: [], type: '' },
    isLoadingBankAccountsCategories: isLoading,
    hasError: isError,
    refetchBankAccountsCategories: refetch,
    isFetchingBankAccountsCategories: isFetching,
  };
}
