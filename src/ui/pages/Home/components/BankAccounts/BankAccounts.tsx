/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useFinancesContext } from '../../context/FinancesContext';

import { ContentBankAccounts } from './components/ContentBankAccounts';
import { EmptyBankAccounts } from './components/EmptyBankAccounts';
import { ErrorBankAccounts } from './components/ErrorBankAccounts';
import { HeaderBankAccount } from './components/HeaderBankAccount';
import { SkeletonBankAccount } from './components/SkeletonBankAccount';
import { useBankAccounts } from './hooks/useBankAccounts';

export function BankAccounts() {
  const {
    isBegging,
    handleChangeIsBegging,
    hasBankAccounts,
    bankAccounts,
    isLoadingBankAccounts,
    totalValueBankAccounts,
    isFetchingBankAccounts,
    refetchBankAccounts,
    isRefetchingBankAccounts,
    isErrorBankAccounts,
  } = useBankAccounts();
  const { showTotalValue, handleToggleShowTotalValue } = useFinancesContext();

  return (
    <div className="bg-primary-foreground flex flex-col w-full h-full rounded-[16px] py-8 px-4 lg:p-10">
      {(isLoadingBankAccounts || isFetchingBankAccounts) && (
        <SkeletonBankAccount />
      )}

      {!(isLoadingBankAccounts || isFetchingBankAccounts) && (
        <>
          {isErrorBankAccounts && (
            <ErrorBankAccounts
              refetchBankAccounts={refetchBankAccounts}
              isRefetchingBankAccounts={isRefetchingBankAccounts}
            />
          )}

          {!isErrorBankAccounts && (
            <>
              <HeaderBankAccount
                showTotalValue={showTotalValue}
                handleToggleShowTotalValue={handleToggleShowTotalValue}
                totalValueBankAccounts={totalValueBankAccounts}
              />

              <div className="flex flex-col flex-1  justify-end  mt-10 lg:mt-0">
                {!hasBankAccounts && <EmptyBankAccounts />}

                {hasBankAccounts && (
                  <ContentBankAccounts
                    bankAccounts={bankAccounts}
                    isBegging={isBegging}
                    handleChangeIsBegging={handleChangeIsBegging}
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
