import { TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { CartesianGrid, Line, LineChart as LineChartt, XAxis } from 'recharts';

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
import { months } from '@ui/pages/Home/components/Transactions/utils/months';

import { ChartProps } from '../types/ChartProps';

import { EmptyChart } from './EmptyChart';

const chartConfig = {
  Saldo: {
    label: 'Saldo',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function LineChart({
  transactions,
  isFetching,
  isError,
  refetchTransactions,
}: ChartProps) {
  const chartData = useMemo(() => {
    const byMonth = new Map<string, { month: string; Saldo: number }>();

    transactions.forEach((t) => {
      const month = months[new Date(t.date).getMonth()];
      const current = byMonth.get(month) ?? { month, Saldo: 0 };
      const sumValue = t.typeTransaction === 'INCOME' ? t.value : -t.value;
      current.Saldo += sumValue;

      byMonth.set(month, current);
    });

    return Array.from(byMonth.values());
  }, [transactions]);

  const hasTransactions = transactions.length > 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Saldo acumulado por mês</CardTitle>
        <CardDescription>Evolução do saldo mensal</CardDescription>
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
                <LineChartt
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 14,
                    right: 14,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="Saldo"
                    type="natural"
                    stroke="var(--color-Saldo)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChartt>
              </ChartContainer>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Tendência do saldo no período <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Entradas menos saídas mês a mês
        </div>
      </CardFooter>
    </Card>
  );
}
