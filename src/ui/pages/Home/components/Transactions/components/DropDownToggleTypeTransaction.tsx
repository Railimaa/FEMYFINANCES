import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  ChevronDown,
  Repeat2,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/components/DropdownMenu';

import { FilterTransaction } from '../types/FilterTransaction';

type DropDownToggleTypeTransactionProps = {
  filters: FilterTransaction;
  handleChangeFilter: (field: keyof FilterTransaction, value: any) => void;
};

export function DropDownToggleTypeTransaction({
  handleChangeFilter,
  filters,
}: DropDownToggleTypeTransactionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 font-medium hover:bg-accent hover:text-accent-foreground ease-in-out duration-200 transition-all  rounded-md p-1 cursor-pointer">
          {filters.typeTransaction === undefined && <Repeat2 size={24} />}
          {filters.typeTransaction === 'INCOME' && (
            <BanknoteArrowUp size={24} />
          )}
          {filters.typeTransaction === 'EXPENSE' && (
            <BanknoteArrowDown size={24} />
          )}

          <h1 className="text-sm">
            {filters.typeTransaction === undefined && 'Transações'}
            {filters.typeTransaction === 'INCOME' && 'Receitas'}
            {filters.typeTransaction === 'EXPENSE' && 'Despesas'}
          </h1>
          <ChevronDown size={24} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        className="rounded-[16px] p-2 w-full min-w-[279px] h-full  flex flex-col gap-2"
      >
        <DropdownMenuItem
          onSelect={() => handleChangeFilter('typeTransaction', 'INCOME')}
        >
          <div className="flex items-center gap-2">
            <BanknoteArrowUp />
            Receitas
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => handleChangeFilter('typeTransaction', 'EXPENSE')}
        >
          <div className="flex items-center gap-2">
            <BanknoteArrowDown />
            Despesas
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => handleChangeFilter('typeTransaction', undefined)}
        >
          <div className="flex items-center gap-2">
            <Repeat2 />
            Transações
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
