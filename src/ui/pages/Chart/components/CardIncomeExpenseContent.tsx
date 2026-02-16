import { PiggyBank, Wallet } from 'lucide-react';

import { Skeleton } from '@ui/components/Skeleton';
import { TransactionChart } from '@ui/pages/Home/components/Transactions/types/Transaction';

import { CardIncomeExpense } from './CardIncomeExpense';

type CardIncomeExpenseContentProps = {
  transactions: TransactionChart[];
  isLoading: boolean;
};

export function CardIncomeExpenseContent({
  transactions,
  isLoading,
}: CardIncomeExpenseContentProps) {
  return (
    <>
      {isLoading && (
        <>
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
        </>
      )}

      {!isLoading && (
        <>
          <CardIncomeExpense
            transactions={transactions}
            typeCalculation="entries"
          />
          <CardIncomeExpense
            type="EXPENSE"
            transactions={transactions}
            typeCalculation="exits"
          />
          <CardIncomeExpense
            icon={<Wallet />}
            descriptionFooter="SALDO"
            transactions={transactions}
            typeCalculation="balance"
          />
          <CardIncomeExpense
            icon={<PiggyBank />}
            descriptionFooter="ECONOMIZOU"
            transactions={transactions}
            typeCalculation="economy"
          />
        </>
      )}
    </>
  );
}
