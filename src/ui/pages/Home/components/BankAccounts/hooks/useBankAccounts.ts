import { useMemo, useState } from 'react';

import { useGetBankAccounts } from './useGetBankAccounts';

export function useBankAccounts() {
  const { bankAccounts, isLoadingBankAccounts } = useGetBankAccounts();
  const [isBegging, setIsBegging] = useState<Record<string, boolean>>({
    isBegging: true,
    isEnd: false,
  });

  const hasBankAccounts = bankAccounts.length > 0;

  function handleChangeIsBegging(isBegging: boolean, isEnd: boolean) {
    setIsBegging({
      isBegging,
      isEnd,
    });
  }

  const totalValueBankAccounts = useMemo<number>(() => {
    if (!hasBankAccounts) return 0;

    const totalValue = bankAccounts.reduce(
      (total, value) => total + value.initialBalance,
      0,
    );

    return totalValue;
  }, [bankAccounts, hasBankAccounts]);

  return {
    isLoadingBankAccounts,
    handleChangeIsBegging,
    hasBankAccounts,
    isBegging,
    bankAccounts,
    totalValueBankAccounts,
  };
}
