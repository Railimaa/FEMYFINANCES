import { useCallback, useEffect, useState } from 'react';

import { localStorageKeys } from '@app/utils/localStorageKeys';

import { FilterTransaction } from '../types/FilterTransaction';

export function useFilters() {
  const [filters, setFilters] = useState<FilterTransaction>(() => {
    const saved = localStorage.getItem(localStorageKeys.filtersTransactions);
    if (saved) {
      return JSON.parse(saved) as FilterTransaction;
    }
    return {
      month: 0,
      year: new Date().getFullYear(),
    };
  });

  const handleChangeFilter = useCallback(
    (field: keyof FilterTransaction, value: any) => {
      setFilters((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  useEffect(() => {
    localStorage.setItem(
      localStorageKeys.filtersTransactions,
      JSON.stringify(filters),
    );
  }, [filters]);

  return { filters, handleChangeFilter };
}
