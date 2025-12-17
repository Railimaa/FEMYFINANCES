export type TransactionCategory = {
  PK: string;
  SK: string;
  icon: string;
  id: string;
  name: string;
  type: 'Category_Transactions';
  typeCategoryTransaction: 'EXPENSE' | 'INCOME';
  userId: string;
};

export type TransactionCategoryResponse = {
  categoriesTransaction: {
    PK: string;
    SK: string;
    icon: string;
    id: string;
    name: string;
    type: 'Category_Transactions';
    typeCategoryTransaction: 'EXPENSE' | 'INCOME';
    userId: string;
  }[];
};
