import { useMutation } from '@tanstack/react-query';

import { BankAccountsService } from '@app/services/BankAccountsService/BankAccountsService';

import { BankAccountUpdate } from '../types/BankAccountUpdate';

export function usePutBankAccount() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['bankAccounts', 'put'],
    mutationFn: (params: { body: BankAccountUpdate; idBankAccount: string }) =>
      BankAccountsService.putBankAccounts(params.body, params.idBankAccount),
  });

  return {
    onUpdateBankAccount: mutateAsync,
    isLoadingUpdateBankAccount: isPending,
  };
}
