import { useWindowWidth } from '@app/hooks/useWindowWidth';
import { cn } from '@app/utils/cn';
import { DropdownMenuItem } from '@ui/components/DropdownMenu';
import { IconBank } from '@ui/icons/BankAccountsIcon/IconsBank/IconBank';
import { IconsBankType } from '@ui/icons/BankAccountsIcon/IconsBank/IconsBankMap';

import { BankAccountCategories } from '../../../BankAccounts/types/BankAccountCategories';
import { CategoryBankAccount } from '../types/CategoryBankAccount';

type AccountTabProps = {
  bankAccountsCategories: BankAccountCategories;
  selectedValue: CategoryBankAccount;
  handleChange: (categoryWithIcon: CategoryBankAccount) => void;
};

export function AccountTab({
  bankAccountsCategories,
  selectedValue,
  handleChange,
}: AccountTabProps) {
  const { width } = useWindowWidth();

  return (
    <div className={cn('grid grid-cols-4 p-2', width >= 500 && 'grid-cols-6')}>
      {bankAccountsCategories.categories.map((categorie) => (
        <DropdownMenuItem
          key={categorie.id}
          onSelect={() =>
            handleChange({
              id: categorie.id,
              color: categorie.color,
              icon: categorie.icon,
              colorWithoutIcon: null,
            })
          }
          className={cn(
            'cursor-pointer',
            selectedValue.id === categorie.id && 'bg-foreground/10',
          )}
        >
          <div
            className="size-16 flex justify-center items-center rounded-full p-2"
            style={{ background: `${categorie.color}` }}
          >
            <IconBank icon={categorie.icon as IconsBankType} />
          </div>
        </DropdownMenuItem>
      ))}
    </div>
  );
}
