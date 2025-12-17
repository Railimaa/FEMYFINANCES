export type InputNewTransaction = {
  bankAccountId: string;
  categoryId: string;
  icon: string;
  name: string;
  date: string;
  typeTransaction: string;
  value: number;
  categoryBankAccount: {
    id: string | null;
    color: string | null;
    icon: string | null;
    colorWithoutIcon: string | null;
  };
};
