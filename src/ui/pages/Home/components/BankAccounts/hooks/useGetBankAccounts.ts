import { useQuery } from '@tanstack/react-query';

import { BankAccountsService } from '@app/services/BankAccountsService/BankAccountsService';

export function useGetBankAccounts() {
  const { data, isLoading } = useQuery({
    queryKey: ['bankAccounts', 'get'],
    queryFn: BankAccountsService.getBankAccounts,
    enabled: true,
    staleTime: Infinity,
  });

  return {
    bankAccounts: data?.bankAccounts ?? [],
    isLoadingBankAccounts: isLoading,
  };
}
