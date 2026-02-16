import { TrendingDown, TrendingUp } from 'lucide-react';
import { ReactNode, useMemo } from 'react';

import { cn } from '@app/utils/cn';
import { formatCurrency } from '@app/utils/formatCurrency';
import { TransactionChart } from '@ui/pages/Home/components/Transactions/types/Transaction';

type CardIncomeExpenseProps = {
  type?: 'INCOME' | 'EXPENSE';
  icon?: ReactNode;
  descriptionFooter?: string;
  typeCalculation: 'entries' | 'exits' | 'balance' | 'economy';
  transactions: TransactionChart[];
};

export function CardIncomeExpense({
  type = 'INCOME',
  icon,
  descriptionFooter,
  typeCalculation,
  transactions,
}: CardIncomeExpenseProps) {
  const calc = useMemo(() => {
    switch (typeCalculation) {
      case 'entries':
        return transactions
          .filter((t) => t.typeTransaction === 'INCOME')
          .reduce((acc, transactions) => acc + transactions.value, 0);
      case 'exits':
        return transactions
          .filter((t) => t.typeTransaction === 'EXPENSE')
          .reduce((acc, transactions) => acc + transactions.value, 0);
      case 'balance': {
        const totals = transactions.reduce((acc, transaction) => {
          if (transaction.typeTransaction === 'INCOME') {
            return acc + transaction.value;
          }
          return acc - transaction.value;
        }, 0);
        return totals;
      }
      case 'economy': {
        const totals = transactions.reduce(
          (acc, transaction) => {
            if (transaction.typeTransaction === 'INCOME') {
              acc.income += transaction.value;
            }
            if (transaction.typeTransaction === 'EXPENSE') {
              acc.expense += transaction.value;
            }
            return acc;
          },
          { income: 0, expense: 0 },
        );

        if (totals.income === 0) return 0;

        return ((totals.income - totals.expense) / totals.income) * 100;
      }

      default:
        return 0;
    }
  }, [transactions, typeCalculation]);

  return (
    <div
      className={cn(
        'border py-4 px-4 flex flex-col justify-center gap-2 rounded-xl text-[#2D8C3E] bg-lime-600/10 border-lime-600/20',
        type === 'EXPENSE' && 'text-[#E03132] bg-red-600/10 border-red-600/20 ',
      )}
    >
      <div
        className={cn(
          'size-6 p-1 bg-lime-600/20 rounded-full flex justify-center items-center',
          type === 'EXPENSE' && 'bg-red-600/20',
        )}
      >
        {icon || (type === 'INCOME' ? <TrendingUp /> : <TrendingDown />)}
      </div>

      {typeCalculation === 'economy'
        ? `${Math.round(calc)}%`
        : formatCurrency(calc)}

      <span className="text-[10px] text-muted-foreground">
        {descriptionFooter || (type === 'INCOME' ? 'ENTRADAS' : 'SAÍDAS')}
      </span>
    </div>
  );
}
