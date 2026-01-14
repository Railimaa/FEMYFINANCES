import { LucideCircleChevronLeft, Search, X } from 'lucide-react';
import React from 'react';

import { cn } from '@app/utils/cn';
import { Button } from '@ui/components/Button';
import { Input } from '@ui/components/Input';

import { useInputSearch } from '../hooks/useInputSearch';
import { FilterTransaction } from '../types/FilterTransaction';

import { DropDownToggleTypeTransaction } from './DropDownToggleTypeTransaction';
import { FilterModalToggle } from './FilterModalToggle';

type HeaderTransactionsProps = {
  filters: FilterTransaction;
  handleChangeFilter: (field: keyof FilterTransaction, value: any) => void;
  handleToggleFilterModal: () => void;
  searchTransactionValue: string;
  handleChangeSearchTransactionValue: (
    event: React.ChangeEvent<HTMLInputElement> | string,
  ) => void;
};

export function HeaderTransactions({
  filters,
  handleChangeFilter,
  handleToggleFilterModal,
  searchTransactionValue,
  handleChangeSearchTransactionValue,
}: HeaderTransactionsProps) {
  const { visibleInputSearch, handleToggleVisibleInputSearch, inputSearchRef } =
    useInputSearch({ handleChangeSearchTransactionValue });

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2  w-full">
        {!visibleInputSearch && (
          <DropDownToggleTypeTransaction
            filters={filters}
            handleChangeFilter={handleChangeFilter}
          />
        )}

        <div className="relative w-full">
          {visibleInputSearch && (
            <>
              <Input
                value={searchTransactionValue}
                onChange={(e) => handleChangeSearchTransactionValue(e)}
                placeholder="Buscar..."
                className="pl-11"
                ref={inputSearchRef}
              />

              {searchTransactionValue.length > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-[2px] right-[1px]"
                  type="button"
                  onClick={() => handleChangeSearchTransactionValue('')}
                >
                  <X />
                </Button>
              )}
            </>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleToggleVisibleInputSearch}
            className={cn(
              '',
              visibleInputSearch && 'absolute top-[2px] left-[1px]',
            )}
            type="button"
          >
            {visibleInputSearch ? <LucideCircleChevronLeft /> : <Search />}
          </Button>
        </div>
      </div>

      <FilterModalToggle
        filters={filters}
        handleToggleFilterModal={handleToggleFilterModal}
      />
    </header>
  );
}
