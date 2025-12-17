import { memo, useCallback } from 'react';

import { cn } from '@app/utils/cn';
import { formatCurrency } from '@app/utils/formatCurrency';
import { formatDate } from '@app/utils/formatDate';
import { IconBank } from '@ui/icons/BankAccountsIcon/IconsBank/IconBank';
import { CategoryIcon } from '@ui/icons/categories/CategoryIcon';
import { ColorIcon } from '@ui/icons/ColorIcon';
import { useFinancesContext } from '@ui/pages/Home/context/FinancesContext';

import { useIsMobile } from '../hooks/useIsMobile';
import { Transaction } from '../types/Transaction';

type CardTransactionProps = {
  transaction: Transaction;
};

function CardTransaction({ transaction }: CardTransactionProps) {
  const isTransactionIncome = transaction.typeTransaction === 'INCOME';
  const { showTotalValue, handleOpenModalEditedTransaction } =
    useFinancesContext();
  const isMobile = useIsMobile();

  const handleOpenModal = useCallback(
    (transaction: Transaction) => {
      handleOpenModalEditedTransaction(transaction);
    },
    [handleOpenModalEditedTransaction],
  );

  const MAX_LENGTH_NAME_TRANSACTION = isMobile ? 18 : 30;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="flex gap-4 w-full bg-background p-4 rounded-[16px] hover:bg-background/50 transition-all ease-in-out duration-500 hover:scale-[0.99]"
      role="button"
      tabIndex={0}
      onClick={() => handleOpenModal(transaction)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOpenModal(transaction);
        }
      }}
    >
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
          <div className="block">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm font-normal tracking-normal leading-[150%] ">
                {formatDate(transaction.date)}
              </span>
              <div className="leading-[150%]">
                {transaction.categoryBankAccount.id && (
                  <div
                    className="size-6 rounded-full flex items-center p-[2px]"
                    style={{
                      backgroundColor: `${transaction.categoryBankAccount.color}`,
                    }}
                  >
                    <IconBank
                      icon={transaction.categoryBankAccount.icon as any}
                    />
                  </div>
                )}

                {!transaction.categoryBankAccount.id && (
                  <ColorIcon
                    color={transaction.categoryBankAccount.colorWithoutIcon!}
                    bg="#E8E8E8"
                    size="24"
                  />
                )}
              </div>
            </div>
          </div>
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
