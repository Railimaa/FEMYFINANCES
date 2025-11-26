type Transaction = {
  id: string;
  bankAccountId: string;
  categoryId: string;
  icon: string;
  userId: string;
  name: string;
  value: number;
  typeTransaction: 'INCOME' | 'EXPENSE';
  date: Date;
  createdAt: Date;
  updatedAt: Date;
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
