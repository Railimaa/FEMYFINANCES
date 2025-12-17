import { cn } from '@app/utils/cn';
import { FieldError } from '@ui/components/FieldError';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/components/Select';
import { useFinancesContext } from '@ui/pages/Home/context/FinancesContext';

import { useGetTransactionCategories } from '../../../Transactions/hooks/useGetTransactionCategories';

type SelectCategoryProps = {
  value: {
    categoryId: string;
    icon: string;
  };
  onChange: ({
    categoryId,
    icon,
  }: {
    categoryId: string;
    icon: string;
  }) => void;
  error?: string;
  isLoading?: boolean;
};

export function SelectCategory({
  value,
  onChange,
  error,
  isLoading,
}: SelectCategoryProps) {
  const {
    transactionCategories,
    isLoadingTransactionCategories,
    refetchTransactionCategories,
    isFetchingTransactionCategories,
    isErrorTransactionCategories,
  } = useGetTransactionCategories();
  const { typeTransaction, transactionIsBegging } = useFinancesContext();

  const valueFilter = transactionIsBegging
    ? transactionIsBegging.typeTransaction
    : typeTransaction;

  const hasError = isErrorTransactionCategories;

  return (
    <div>
      <Select
        value={value.categoryId}
        onValueChange={(categoryId) => {
          const category = transactionCategories.find(
            (category) => category.id === categoryId,
          );

          onChange({ categoryId, icon: category?.icon! });
        }}
        disabled={isLoading || hasError}
      >
        <SelectTrigger
          id="categoryTransaction"
          loading={
            isLoadingTransactionCategories || isFetchingTransactionCategories
          }
          hasError={hasError}
          refetchItems={refetchTransactionCategories}
          className={cn('', error && 'border-destructive')}
        >
          <SelectValue placeholder="Selecione a Categoria" />
        </SelectTrigger>
        <SelectContent className="z-[1005]" align="center" side="top">
          {transactionCategories
            .filter(
              (category) => category.typeCategoryTransaction === valueFilter,
            )
            .map((category) => (
              <SelectItem value={category.id} key={category.id} className="">
                {category.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {error && <FieldError message={error} />}
    </div>
  );
}
