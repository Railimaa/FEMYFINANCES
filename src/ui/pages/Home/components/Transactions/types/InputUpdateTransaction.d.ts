export type InputUpdateTransaction = {
  bankAccountId: string;
  categoryId: string;
  icon: string;
  name: string;
  date: string;
  typeTransaction: string;
  value: number;
  transactionId: string;
  categoryBankAccount: {
    id: string | null;
    color: string | null;
    icon: string | null;
    colorWithoutIcon: string | null;
  };
};
