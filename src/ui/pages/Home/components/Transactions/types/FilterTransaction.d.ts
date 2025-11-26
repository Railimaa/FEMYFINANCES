export type FilterTransaction = {
  month: number;
  year: number;
  typeTransaction?: 'INCOME' | 'EXPENSE' | undefined;
  bankAccountId?: string;
  exclusiveStartKey?: Record<string, any>;
};
