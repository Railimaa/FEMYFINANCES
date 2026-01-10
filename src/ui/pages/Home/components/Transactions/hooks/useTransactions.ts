import React, {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { formatDate } from '@app/utils/formatDate';
import { useFinancesContext } from '@ui/pages/Home/context/FinancesContext';

import { Transaction } from '../types/Transaction';

import { useGetTransactions } from './useGetTransactions';

export function useTransactions() {
  const { refSwiper, filters, handleChangeFilter } = useFinancesContext();

  const {
    transactions,
    isInitialLoading,
    hasNextPage,
    isLoadingNextPage,
    isFetchNextPageError,
    fetchNextPage,
    isErrorTransactions,
    isLoadingTransactions,
    refetchTransactions,
  } = useGetTransactions(filters);

  const [sliderState, setSliderState] = useState<Record<string, any>>({
    isBeginning: true,
    isEnd: false,
    activeIndex: filters.month ?? 0,
  });
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const containerTransactionsRef = useRef<HTMLDivElement | null>(null);
  const lastTransactionsRef = useRef<HTMLDivElement | null>(null);

  const [searchTransactionValue, setSearchTransactionValue] =
    useState<string>('');

  function handleChangeSearchTransactionValue(
    event: React.ChangeEvent<HTMLInputElement> | string,
  ) {
    if (typeof event !== 'string') {
      setSearchTransactionValue(event.target.value);
    } else {
      setSearchTransactionValue(event);
    }
  }

  const deferedValue = useDeferredValue(searchTransactionValue);
  const listSearch = useMemo<Transaction[]>(
    () =>
      transactions.transactions.filter((transaction) => {
        const search = deferedValue.toLowerCase();

        const name = transaction.name.toLowerCase().includes(search);
        const value = transaction.value.toString().includes(search);
        const date = formatDate(transaction.date).includes(search);
        const typeTransactionSearch =
          transaction.typeTransaction === 'INCOME' ? 'Receita' : 'Despesa';
        const typeTransactionIconSearch =
          transaction.typeTransaction === 'INCOME' ? '+' : '-';
        const typeTransaction = typeTransactionSearch
          .toLowerCase()
          .includes(search);
        const typeTransactionIcon = typeTransactionIconSearch.includes(search);

        return name || value || typeTransaction || date || typeTransactionIcon;
      }),
    [transactions, deferedValue],
  );

  function handleChangeSliderState(
    field: keyof typeof sliderState,
    value: boolean | number,
  ) {
    setSliderState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  function handleToggleFilterModal() {
    setOpenFilterModal((prevState) => !prevState);
  }

  useEffect(() => {
    if (!containerTransactionsRef.current || !lastTransactionsRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entry, obs) => {
        const { isIntersecting } = entry[0];

        if (!hasNextPage) {
          obs.disconnect();
        }

        if (isIntersecting && !isLoadingNextPage && !isFetchNextPageError) {
          fetchNextPage();
        }
      },
      { root: containerTransactionsRef.current, rootMargin: '75px' },
    );

    observer.observe(lastTransactionsRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isLoadingNextPage, fetchNextPage, isFetchNextPageError]);

  const hasTransactions = transactions.transactions.length > 0;

  function refetchNextPage() {
    fetchNextPage();
  }

  return {
    sliderState,
    handleChangeSliderState,
    isInitialLoading,
    handleChangeFilter,
    hasTransactions,
    transactions: transactions.transactions,
    filters,
    openFilterModal,
    handleToggleFilterModal,
    isLoadingNextPage,
    containerTransactionsRef,
    lastTransactionsRef,
    isFetchNextPageError,
    refetchNextPage,
    isErrorTransactions,
    isLoadingTransactions,
    refetchTransactions,
    refSwiper,
    listSearch,
    searchTransactionValue,
    handleChangeSearchTransactionValue,
  };
}
