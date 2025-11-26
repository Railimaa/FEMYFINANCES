import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import { Frown } from 'lucide-react';

import { Button } from '@ui/components/Button';

import { TransactionResponse } from '../types/Transaction';

type ErrorTransactionsProps = {
  isLoadingTransactions: boolean;
  refetchTransactions: (
    options?: RefetchOptions | undefined,
  ) => Promise<
    QueryObserverResult<InfiniteData<TransactionResponse, unknown>, Error>
  >;
};

export function ErrorTransactions({
  isLoadingTransactions,
  refetchTransactions,
}: ErrorTransactionsProps) {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-2">
      <div className="flex items-center gap-1">
        <p>Ops... Ocorreu um erro ao carregar transações.</p>
        <Frown />
      </div>

      <Button
        onClick={() => refetchTransactions()}
        isLoading={isLoadingTransactions}
      >
        Buscar Novamente
      </Button>
    </div>
  );
}
