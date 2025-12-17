import { FilterTransaction } from '@ui/pages/Home/components/Transactions/types/FilterTransaction';
import { InputNewTransaction } from '@ui/pages/Home/components/Transactions/types/InputNewTransaction';
import { InputUpdateTransaction } from '@ui/pages/Home/components/Transactions/types/InputUpdateTransaction';
import { TransactionResponse } from '@ui/pages/Home/components/Transactions/types/Transaction';
import { TransactionCategoryResponse } from '@ui/pages/Home/components/Transactions/types/TransactionCategory';

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

async function postTransaction(body: InputNewTransaction): Promise<void> {
  const { data } = await httpClient.post('/transactions/create', body);

  return data;
}

async function putTransaction({
  transactionId,
  ...body
}: InputUpdateTransaction): Promise<void> {
  const { data } = await httpClient.put(
    `/transactions/update/${transactionId}`,
    body,
  );

  return data;
}

async function deleteTransaction({
  transactionId,
  bankAccountId,
}: {
  transactionId: string;
  bankAccountId: string;
}): Promise<void> {
  const { data } = await httpClient.delete(
    `/transactions/delete/${transactionId}/${bankAccountId}`,
  );

  return data;
}

async function getAllTransactionsCategories(): Promise<TransactionCategoryResponse> {
  const { data } = await httpClient.get('/transactions/categories/get');

  return data;
}

export const TransactionService = {
  getAllTransactions,
  getAllTransactionsCategories,
  postTransaction,
  putTransaction,
  deleteTransaction,
};
