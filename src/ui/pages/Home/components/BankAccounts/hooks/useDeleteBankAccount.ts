import { useMutation } from '@tanstack/react-query';

import { BankAccountsService } from '@app/services/BankAccountsService/BankAccountsService';

export function useDeleteBankAccount() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['bankAccounts', 'delete'],
    mutationFn: BankAccountsService.deleteBankAccount,
  });

  return {
    onDeleteBankAccount: mutateAsync,
    isLoadingDeleteBankAccount: isPending,
  };
}
