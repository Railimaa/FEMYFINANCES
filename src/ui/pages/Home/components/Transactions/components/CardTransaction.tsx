import { memo } from 'react';

import { cn } from '@app/utils/cn';
import { formatCurrency } from '@app/utils/formatCurrency';
import { formatDate } from '@app/utils/formatDate';
import { CategoryIcon } from '@ui/icons/categories/CategoryIcon';
import { useFinancesContext } from '@ui/pages/Home/context/FinancesContext';

import { useIsMobile } from '../hooks/useIsMobile';
import { Transaction } from '../types/Transaction';

type CardTransactionProps = {
  transaction: Transaction;
};

function CardTransaction({ transaction }: CardTransactionProps) {
  const isTransactionIncome = transaction.typeTransaction === 'INCOME';
  const { showTotalValue } = useFinancesContext();
  const isMobile = useIsMobile();

  console.log(isMobile);

  const MAX_LENGTH_NAME_TRANSACTION = isMobile ? 18 : 30;

  return (
    <div className="flex gap-4 w-full bg-background p-4 rounded-[16px]">
      <CategoryIcon
        type={isTransactionIncome ? 'income' : 'expense'}
        category={transaction.icon}
      />
      <div className="flex items-center justify-between w-full ">
        <div>
          <p className="font-bold text-base tracking-tighter leading-[150%] whitespace-normal break-words">
            {transaction.name.length >= MAX_LENGTH_NAME_TRANSACTION
              ? `${transaction.name.slice(0, MAX_LENGTH_NAME_TRANSACTION)}...`
              : `${transaction.name}`}
          </p>
          <span className="block font-normal tracking-normal leading-[150%] text-muted-foreground text-sm ">
            {formatDate(transaction.date)}
          </span>
        </div>

        <div>
          <span
            className={cn(
              'font-medium text-base tracking-tighter leading-[150%] text-[#2F9E44]',
              !isTransactionIncome && 'text-[#E03131]',
              !showTotalValue && 'blur-md',
            )}
          >
            {isTransactionIncome ? '+' : '-'}
            {'  '}
            {formatCurrency(transaction.value || 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(CardTransaction);
