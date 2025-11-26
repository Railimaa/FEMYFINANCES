import { useCallback, useEffect, useState } from 'react';

import { useGetBankAccounts } from '../../BankAccounts/hooks/useGetBankAccounts';
import { FilterTransaction } from '../types/FilterTransaction';

type useModalFilterParams = {
  handleChangeFilter: (field: keyof FilterTransaction, value: any) => void;
  handleCloseModal: () => void;
  filters: FilterTransaction;
};

export function useModalFilter({
  handleChangeFilter,
  handleCloseModal,
  filters,
}: useModalFilterParams) {
  const { bankAccounts } = useGetBankAccounts();

  const [bankAccountIdSelect, setBankAccountIdSelect] = useState<
    string | undefined
  >(undefined);

  const [year, setYear] = useState<number>(new Date().getFullYear());

  function handleBankAccountIdSelect(bankAccountId: string) {
    setBankAccountIdSelect((prevState) =>
      prevState === bankAccountId ? undefined : bankAccountId,
    );
  }

  function handleChangeYear(year: 'previous' | 'next') {
    setYear((prevState) => (year === 'next' ? prevState + 1 : prevState - 1));
  }

  const handleApplyFilters = useCallback(() => {
    handleChangeFilter('bankAccountId', bankAccountIdSelect);
    handleChangeFilter('year', year);
    handleCloseModal();
  }, [handleChangeFilter, handleCloseModal, bankAccountIdSelect, year]);

  useEffect(() => {
    if (filters.bankAccountId) {
      setBankAccountIdSelect(filters.bankAccountId);
    }

    if (filters.year) {
      setYear(filters.year);
    }
  }, [filters]);

  return {
    bankAccounts,
    bankAccountIdSelect,
    handleBankAccountIdSelect,
    year,
    handleChangeYear,
    handleApplyFilters,
  };
}
