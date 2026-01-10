import { LucideCircleChevronLeft, Search, X } from 'lucide-react';
import React from 'react';

import { cn } from '@app/utils/cn';
import { Button } from '@ui/components/Button';
import { Input } from '@ui/components/Input';

import { useInputSearch } from '../hooks/useInputSearch';
import { FilterTransaction } from '../types/FilterTransaction';
import { Transaction } from '../types/Transaction';

import { DropDownToggleTypeTransaction } from './DropDownToggleTypeTransaction';
import { FilterModalToggle } from './FilterModalToggle';

type HeaderTransactionsProps = {
  filters: FilterTransaction;
  handleChangeFilter: (field: keyof FilterTransaction, value: any) => void;
  handleToggleFilterModal: () => void;
  searchTransactionValue: string;
  // eslint-disable-next-line react/no-unused-prop-types
  handleChangeSearchTransactionValue: (
    event: React.ChangeEvent<HTMLInputElement> | string,
  ) => void;
  aa: Transaction[];
};

export function HeaderTransactions({
  filters,
  handleChangeFilter,
  handleToggleFilterModal,
  searchTransactionValue,
  handleChangeSearchTransactionValue,
  aa,
}: HeaderTransactionsProps) {
  const { visibleInputSearch, handleToggleVisibleInputSearch, inputSearchRef } =
    useInputSearch({ handleChangeSearchTransactionValue });
  // useEffect(() => {
  //   function handleKeyDown(event: KeyboardEvent) {
  //     if (event.key !== 'Escape') return;

  //     if (document.activeElement === inputSearchRef.current) {
  //       inputSearchRef.current?.blur();
  //       handleChangeSearchTransactionValue('');
  //       setVisibleSearchInput(false);
  //     }
  //   }

  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => document.removeEventListener('keydown', handleKeyDown);
  // }, [visibleSearchInput, handleChangeSearchTransactionValue]);

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
      {aa.length}
    </header>
  );
}
