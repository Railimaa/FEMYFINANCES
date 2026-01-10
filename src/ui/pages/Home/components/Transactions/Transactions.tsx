import 'swiper/css';

import { CircleAlert } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@ui/components/Button';

import CardTransaction from './components/CardTransaction';
import { EmptyTransactions } from './components/EmptyTransactions';
import { ErrorTransactions } from './components/ErrorTransactions';
import { HeaderTransactions } from './components/HeaderTransactions';
import { ModalFilter } from './components/ModalFilter';
import { SkeletonHeaderTransaction } from './components/SkeletonHeaderTransaction';
import { SkeletonTransaction } from './components/SkeletonTransaction';
import { SliderNavigation } from './components/SliderNavigation';
import { SliderOption } from './components/SliderOption';
import { useTransactions } from './hooks/useTransactions';
import { months } from './utils/months';

export function Transactions() {
  const {
    sliderState,
    handleChangeSliderState,
    isInitialLoading,
    handleChangeFilter,
    hasTransactions,
    transactions,
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
  } = useTransactions();

  const hasEmptyListSearch = transactions.length > 0 && listSearch.length <= 0;

  return (
    <div className="bg-primary/10 flex flex-col gap-6 w-full rounded-[16px] px-2 py-4 lg:p-10 ">
      {isInitialLoading && (
        <>
          <SkeletonHeaderTransaction />
          <SkeletonTransaction />
          <SkeletonTransaction />
          <SkeletonTransaction />
          <SkeletonTransaction />
        </>
      )}

      {!isInitialLoading && (
        <>
          {isErrorTransactions && (
            <ErrorTransactions
              isLoadingTransactions={isLoadingTransactions}
              refetchTransactions={refetchTransactions}
            />
          )}

          {!isErrorTransactions && (
            <>
              <HeaderTransactions
                filters={filters}
                handleChangeFilter={handleChangeFilter}
                handleToggleFilterModal={handleToggleFilterModal}
                searchTransactionValue={searchTransactionValue}
                handleChangeSearchTransactionValue={
                  handleChangeSearchTransactionValue
                }
                aa={transactions}
              />
              <div className="relative mt-6">
                <Swiper
                  slidesPerView={3}
                  centeredSlides
                  initialSlide={filters.month ?? 0}
                  onSlideChange={(swiper) => {
                    handleChangeSliderState('isBeginning', swiper.isBeginning);
                    handleChangeSliderState('isEnd', swiper.isEnd);
                    handleChangeSliderState('activeIndex', swiper.activeIndex);
                    handleChangeFilter('month', swiper.realIndex);
                    refSwiper.current = swiper;
                  }}
                  onSwiper={() => {}}
                >
                  <SliderNavigation
                    isBeginning={sliderState.isBeginning as boolean}
                    isEnd={sliderState.isEnd as boolean}
                  />

                  {months.map((month, index) => (
                    <SwiperSlide key={month}>
                      <SliderOption
                        activeIndex={sliderState.activeIndex as number}
                        index={index}
                        month={month}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <>
                {hasTransactions && (
                  <div
                    className="h-full max-h-[350px]  overflow-y-auto space-y-[8px]"
                    ref={containerTransactionsRef}
                  >
                    {listSearch.map((transaction) => (
                      <CardTransaction
                        key={transaction.id}
                        transaction={transaction}
                      />
                    ))}

                    <div ref={lastTransactionsRef} className=" ">
                      {isLoadingNextPage && (
                        <div className="flex flex-col space-y-[8px]">
                          <SkeletonTransaction />
                          <SkeletonTransaction />
                          <SkeletonTransaction />
                        </div>
                      )}

                      {hasEmptyListSearch && (
                        <p>Nenhum transação encontrada...</p>
                      )}

                      {!isLoadingNextPage && isFetchNextPageError && (
                        <div className="flex items-center justify-center">
                          <Button
                            onClick={refetchNextPage}
                            className="flex items-center gap-1"
                          >
                            <CircleAlert size={10} />
                            Tentar novamente
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!hasTransactions && <EmptyTransactions />}
              </>
            </>
          )}
        </>
      )}

      <ModalFilter
        open={openFilterModal}
        handleCloseModal={handleToggleFilterModal}
        filters={filters}
        handleChangeFilter={handleChangeFilter}
      />
    </div>
  );
}
