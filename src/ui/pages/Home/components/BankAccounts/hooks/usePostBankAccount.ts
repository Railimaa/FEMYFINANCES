import { useMutation } from '@tanstack/react-query';

import { BankAccountsService } from '@app/services/BankAccountsService/BankAccountsService';

export function usePostBankAccount() {
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['bankAccounts', 'post'],
    mutationFn: BankAccountsService.postBankAccounts,
  });

  return {
    onPostBankAccount: mutateAsync,
    isLoadingPostBankAccount: isPending,
  };
}
