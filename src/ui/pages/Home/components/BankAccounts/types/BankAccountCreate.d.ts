export type BankAccountCreate = {
  name: string;
  initialBalance: number;
  typeBankAccount: 'CHECKING' | 'INVESTMENT' | 'CASH';
  categoryBankAccount: {
    id: string | null;
    color: string | null;
    icon: string | null;
    colorWithoutIcon: string | null;
  };
};
