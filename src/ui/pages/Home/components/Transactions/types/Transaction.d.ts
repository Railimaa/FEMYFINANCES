type Transaction = {
  id: string;
  bankAccountId: string;
  categoryId: string;
  icon: string;
  userId: string;
  name: string;
  value: number;
  typeTransaction: 'INCOME' | 'EXPENSE';
  date: string;
  createdAt: string;
  updatedAt: string;
  categoryBankAccount: {
    id: string | null;
    color: string | null;
    icon: string | null;
    colorWithoutIcon: string | null;
    userId: string;
    type: string;
  };
};

export type TransactionResponse = {
  transactions: Transaction[];
  lastEvaluatedKey?: {
    GSI1PK?: string;
    GSI1SK?: string;
    GSI2PK?: string;
    GSI2SK?: string;
    PK: string;
    SK: string;
  };
};
