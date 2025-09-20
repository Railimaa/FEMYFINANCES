import { BankAccountResponse } from '@ui/pages/Home/components/BankAccounts/types/BankAccount';
import { BankAccountCategories } from '@ui/pages/Home/components/BankAccounts/types/BankAccountCategories';
import { BankAccountCreate } from '@ui/pages/Home/components/BankAccounts/types/BankAccountCreate';
import { BankAccountUpdate } from '@ui/pages/Home/components/BankAccounts/types/BankAccountUpdate';

import { httpClient } from '../httpClient';

async function getBankAccounts(): Promise<BankAccountResponse> {
  const { data } =
    await httpClient.get<BankAccountResponse>('/bank-account/get');

  return data;
}

async function getBankAccountsCategories(): Promise<BankAccountCategories> {
  const { data } = await httpClient.get<BankAccountCategories>(
    '/bank-account/categories/get',
  );

  return data;
}

async function postBankAccounts(body: BankAccountCreate): Promise<void> {
  const { data } = await httpClient.post('/bank-account/create', body);

  return data;
}

async function putBankAccounts(
  body: BankAccountUpdate,
  idBankAccount: string,
): Promise<void> {
  const { data } = await httpClient.put(
    `/bank-account/update/${idBankAccount}`,
    body,
  );

  return data;
}

export const BankAccountsService = {
  getBankAccounts,
  getBankAccountsCategories,
  postBankAccounts,
  putBankAccounts,
};
