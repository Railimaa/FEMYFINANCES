import { QueryObserverResult } from '@tanstack/react-query';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

import { Button } from '@ui/components/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/components/Card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@ui/components/Chart';
import { Skeleton } from '@ui/components/Skeleton';
import {
  TransactionChart,
  TransactionChartResponse,
} from '@ui/pages/Home/components/Transactions/types/Transaction';

import { EmptyChart } from './EmptyChart';

const colorPalette = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

type PierChartProps = {
  typeCategoryTransaction?: 'INCOME' | 'EXPENSE';
  transactions: TransactionChart[];
  isFetching: boolean;
  isError: boolean;
  refetchTransactions: () => Promise<
    QueryObserverResult<TransactionChartResponse, Error>
  >;
};

export function PierChart({
  typeCategoryTransaction = 'INCOME',
  isFetching,
  transactions,
  isError,
  refetchTransactions,
}: PierChartProps) {
  const isIncome = typeCategoryTransaction === 'INCOME';

  const chartData = useMemo(() => {
    const byType = new Map<
      string,
      { categoryId: string; total: number; categoryName: string }
    >();

    transactions.forEach((t) => {
      if (t.typeTransaction !== typeCategoryTransaction) return;

      const key = t.categoryId;
      const current = byType.get(key) ?? {
        categoryId: key,
        total: 0,
        categoryName: t.categoryName,
      };

      current.total += t.value;
      byType.set(key, current);
    });

    return Array.from(byType.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [transactions, typeCategoryTransaction]);

  const chartConfig = useMemo(
    () =>
      chartData.reduce<ChartConfig>((acc, item, index) => {
        acc[item.categoryId] = {
          label: item.categoryName,
          color: colorPalette[index % colorPalette.length],
        };

        return acc;
      }, {}),
    [chartData],
  );

  const hasTransactions = transactions.length > 0;

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          Maiores {`${isIncome ? 'receitas' : 'despesas'}`} por categoria
        </CardTitle>
        <CardDescription>
          Distribuição das {`${isIncome ? 'receitas' : 'despesas'}`} no período
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isError && (
          <div className="flex justify-center items-center flex-col gap-1">
            <p className="text-xl font-semibold tracking-tight">
              Ops... Ocorreu um erro
            </p>
            <Button onClick={refetchTransactions}>Tentar Novamente</Button>
          </div>
        )}

        {!isError && (
          <>
            {isFetching && <Skeleton className="h-[350px]" />}

            {!isFetching && !hasTransactions && <EmptyChart />}

            {!isFetching && hasTransactions && (
              <ChartContainer config={chartConfig}>
                <PieChart>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent nameKey="categoryName" hideLabel />
                    }
                  />
                  <Pie data={chartData} dataKey="total" nameKey="categoryName">
                    {chartData.map((item) => (
                      <Cell
                        key={item.categoryId}
                        fill={`var(--color-${item.categoryId})`}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Categorias com maior {`${isIncome ? 'entrada' : 'saída'}`}{' '}
          {isIncome ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="text-muted-foreground leading-none">
          Percentual de participação por categoria
        </div>
      </CardFooter>
    </Card>
  );
}
