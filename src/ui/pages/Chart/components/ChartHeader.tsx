import { Label } from '@ui/components/Label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@ui/components/Select';
import { Skeleton } from '@ui/components/Skeleton';
import { Switch } from '@ui/components/Switch';
import { months } from '@ui/pages/Home/components/Transactions/utils/months';

type ChartHeaderProps = {
  selectedYear: number;
  handleSelectedYear: (year: number) => void;
  years: number[];
  selectedMonth: number;
  handleSelectedMonth: (month: number) => void;
  selectedAllPeriod: boolean;
  handleToggleAllPeriod: () => void;
  isLoading: boolean;
};

export function ChartHeader({
  selectedYear,
  handleSelectedYear,
  years,
  selectedMonth,
  handleSelectedMonth,
  selectedAllPeriod,
  handleToggleAllPeriod,
  isLoading,
}: ChartHeaderProps) {
  return (
    <div className="flex w-full justify-end items-center gap-2">
      {isLoading && (
        <>
          <Skeleton className="w-[100px] h-[20px]" />
          <Skeleton className="w-[100px] h-[20px]" />
        </>
      )}

      {!isLoading && (
        <>
          <Select
            value={selectedAllPeriod ? '' : String(selectedMonth)}
            onValueChange={(value) => {
              handleSelectedMonth(Number(value));
              if (selectedAllPeriod) {
                handleToggleAllPeriod();
              }
            }}
          >
            <SelectTrigger className="w-full md:min-w-[200px]">
              <SelectValue placeholder="Todos os meses" />
            </SelectTrigger>
            <SelectContent
              className="h-full max-h-[400px] overflow-y-auto"
              side="top"
            >
              <SelectGroup>
                <div className="flex justify-between items-center">
                  <Label htmlFor="allPeriod">Todos os meses</Label>
                  <Switch
                    id="allPeriod"
                    checked={selectedAllPeriod}
                    onCheckedChange={handleToggleAllPeriod}
                  />
                </div>

                {months.map((month, index) => (
                  <SelectItem key={month} value={String(index)}>
                    {month}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={String(selectedYear)}
            onValueChange={(value) => handleSelectedYear(Number(value))}
          >
            <SelectTrigger className="w-full min-w-[100px]">
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent
              className="h-full max-h-[400px] overflow-y-auto"
              side="top"
            >
              <SelectGroup>
                <SelectLabel>Ano</SelectLabel>
                {years.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  );
}
