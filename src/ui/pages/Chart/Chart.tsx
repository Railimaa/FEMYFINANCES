import { CardIncomeExpenseContent } from './components/CardIncomeExpenseContent';
import { ChartBar } from './components/ChartBar';
import { ChartHeader } from './components/ChartHeader';
import { ChartSkeleton } from './components/ChartSkeleton';
import { LineChart } from './components/LineChart';
import { PierChart } from './components/PierChart';
import { useChart } from './hooks/useChart';

export function Chart() {
  const {
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
  } = useChart();

  return (
    <div className="w-full min-h-screen  pt-20 px-4 flex flex-1 flex-col space-y-4">
      <ChartHeader
        selectedYear={selectedYear}
        handleSelectedYear={handleSelectedYear}
        years={years}
        selectedMonth={selectedMonth}
        handleSelectedMonth={handleSelectedMonth}
        selectedAllPeriod={selectedAllPeriod}
        handleToggleAllPeriod={handleToggleAllPeriod}
        isLoading={isInitialLoading || isFetching}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <CardIncomeExpenseContent
          transactions={transactions}
          isLoading={isInitialLoading || isFetching}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6 lg:gap-4 place-items-center">
        {isInitialLoading && (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        )}

        {!isInitialLoading && (
          <>
            <ChartBar
              transactions={transactions}
              isFetching={isFetching}
              isError={isError}
              refetchTransactions={refetchTransactions}
            />
            <LineChart
              transactions={transactions}
              isFetching={isFetching}
              isError={isError}
              refetchTransactions={refetchTransactions}
            />
            <PierChart
              typeCategoryTransaction="INCOME"
              transactions={transactions}
              isFetching={isFetching}
              isError={isError}
              refetchTransactions={refetchTransactions}
            />
            <PierChart
              typeCategoryTransaction="EXPENSE"
              transactions={transactions}
              isFetching={isFetching}
              isError={isError}
              refetchTransactions={refetchTransactions}
            />
          </>
        )}
      </div>
    </div>
  );
}
