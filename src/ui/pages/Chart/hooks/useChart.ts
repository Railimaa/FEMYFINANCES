import { useState } from 'react';

import { useGetTransactionsChart } from './useGetTransactionsChart';

export function useChart() {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedAllPeriod, setSelectedAllPeriod] = useState(true);

  const {
    isInitialLoading,
    transactions,
    isFetching,
    isError,
    refetchTransactions,
  } = useGetTransactionsChart(selectedMonth, selectedYear, selectedAllPeriod);

  function handleSelectedYear(year: number) {
    setSelectedYear(year);
  }

  function handleSelectedMonth(month: number) {
    setSelectedMonth(month);
  }

  function handleToggleAllPeriod() {
    setSelectedAllPeriod((prevState) => !prevState);
  }

  const generateYears = (startYear: number = 2024): number[] => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => startYear + i,
    );
  };

  const years = generateYears();

  return {
    selectedYear,
    handleSelectedYear,
    isInitialLoading,
    isFetching,
    isError,
    transactions,
    refetchTransactions,
    years,
    selectedMonth,
    handleSelectedMonth,
    selectedAllPeriod,
    handleToggleAllPeriod,
  };
}
