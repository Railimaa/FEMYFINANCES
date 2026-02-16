import { TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@ui/components/Chart';
import { Skeleton } from '@ui/components/Skeleton';
import { months } from '@ui/pages/Home/components/Transactions/utils/months';

import { ChartProps } from '../types/ChartProps';

import { EmptyChart } from './EmptyChart';

export function ChartBar({
  transactions,
  isFetching,
  isError,
  refetchTransactions,
}: ChartProps) {
  const chartData = useMemo(() => {
    const byMonth = new Map<
      string,
      {
        month: string;
        Receitas: number;
        Despesas: number;
        typeCategoryTransaction: 'INCOME' | 'EXPENSE';
      }
    >();

    transactions.forEach((t) => {
      const month = months[new Date(t.date).getMonth()];
      const current = byMonth.get(month) ?? {
        month,
        Receitas: 0,
        Despesas: 0,
        typeCategoryTransaction: t.typeCategoryTransaction,
      };

      if (t.typeTransaction === 'INCOME') {
        current.Receitas += t.value;
      } else if (t.typeTransaction === 'EXPENSE') {
        current.Despesas += t.value;
      }

      current.typeCategoryTransaction = t.typeCategoryTransaction;

      byMonth.set(month, current);
    });

    return Array.from(byMonth.values());
  }, [transactions]);

  const chartConfig = {
    Receitas: {
      label: 'Receitas',
      color: 'hsl(var(--chart-1))',
    },
    Despesas: {
      label: 'Despesas',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  const hasTransactions = transactions.length > 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Receitas x Despesas por mês</CardTitle>
        <CardDescription>Totais mensais consolidados</CardDescription>
      </CardHeader>
      <CardContent>
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
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="Receitas"
                    fill="var(--color-Receitas)"
                    radius={4}
                  />
                  <Bar
                    dataKey="Despesas"
                    fill="var(--color-Despesas)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Comparativo mensal consolidado <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Visualize a evolução das entradas e saídas
        </div>
      </CardFooter>
    </Card>
  );
}
