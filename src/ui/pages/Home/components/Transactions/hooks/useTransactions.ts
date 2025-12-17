import { useEffect, useRef, useState } from 'react';

import { useFinancesContext } from '@ui/pages/Home/context/FinancesContext';

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
  };
}
