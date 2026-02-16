import { QueryObserverResult } from '@tanstack/react-query';

import {
  TransactionChart,
  TransactionChartResponse,
} from '@ui/pages/Home/components/Transactions/types/Transaction';

export type ChartProps = {
  transactions: TransactionChart[];
  isFetching: boolean;
  isError: boolean;
  refetchTransactions: () => Promise<
    QueryObserverResult<TransactionChartResponse, Error>
  >;
};
