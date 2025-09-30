import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { Frown } from 'lucide-react';

import { Button } from '@ui/components/Button';

import { BankAccountResponse } from '../types/BankAccount';

type ErrorBankAccountsProps = {
  refetchBankAccounts: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<BankAccountResponse, Error>>;
  isRefetchingBankAccounts: boolean;
};

export function ErrorBankAccounts({
  refetchBankAccounts,
  isRefetchingBankAccounts,
}: ErrorBankAccountsProps) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <p>Ops... Ocorreu um erro ao carregar contas bancárias.</p>
          <Frown />
        </div>
        <Button
          variant="default"
          onClick={() => refetchBankAccounts()}
          isLoading={isRefetchingBankAccounts}
        >
          Buscar Novamente
        </Button>
      </div>
    </div>
  );
}
