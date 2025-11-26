import { FilterTransaction } from '@ui/pages/Home/components/Transactions/types/FilterTransaction';
import { TransactionResponse } from '@ui/pages/Home/components/Transactions/types/Transaction';

import { httpClient } from '../httpClient';

async function getAllTransactions(
  filters: FilterTransaction,
  exclusiveStartKey?: Record<string, any> | null,
): Promise<TransactionResponse> {
  let exclusiveStartKeyEncoded;

  if (exclusiveStartKey) {
    exclusiveStartKeyEncoded = encodeURIComponent(
      JSON.stringify(exclusiveStartKey),
    );
  }

  const { data } = await httpClient.get(
    `/transactions/get/all?month=${filters.month}&year=${filters.year}&typeTransaction=${filters.typeTransaction}&bankAccountId=${filters.bankAccountId}&exclusiveStartKey=${exclusiveStartKeyEncoded}`,
  );

  return data;
}

export const TransactionService = { getAllTransactions };
