export type BankAccount = {
  typeBankAccount: 'CHECKING' | 'INVESTMENT' | 'CASH';
  createdAt: Date;
  initialBalance: number;
  id: string;
  name: string;
  categoryBankAccount: {
    id: string | null;
    userId: string;
    color: string | null;
    icon: string | null;
    colorWithoutIcon: string | null;
    type: string;
    category: string;
  };
};

export type BankAccountResponse = {
  bankAccounts: BankAccount[];
};
