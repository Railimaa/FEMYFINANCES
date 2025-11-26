/* eslint-disable no-nested-ternary */
import { Funnel } from 'lucide-react';

import { Button } from '@ui/components/Button';

import { FilterTransaction } from '../types/FilterTransaction';

type FilterModalToggleProps = {
  filters: FilterTransaction;
  handleToggleFilterModal: () => void;
};

export function FilterModalToggle({
  filters,
  handleToggleFilterModal,
}: FilterModalToggleProps) {
  const hasFilterBankAccount = filters.bankAccountId;
  const hasYearFilter = filters.year !== new Date().getFullYear();

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="font-medium"
        onClick={handleToggleFilterModal}
      >
        <Funnel className="font-medium" size={24} />
      </Button>

      {(hasFilterBankAccount || hasYearFilter) && (
        <div className="size-3 rounded-full p-2  flex items-center justify-center bg-foreground text-background absolute top-[2px] right-2">
          <small>
            {hasFilterBankAccount && !hasYearFilter && '1'}
            {hasYearFilter && !hasFilterBankAccount && '1'}
            {hasFilterBankAccount && hasYearFilter && '1'}
          </small>

          <small className="text-[10px]">
            {hasFilterBankAccount && hasYearFilter && '+'}
          </small>
        </div>
      )}
    </div>
  );
}
