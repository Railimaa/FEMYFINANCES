import { useWindowWidth } from '@app/hooks/useWindowWidth';
import { cn } from '@app/utils/cn';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ui/components/Accordion';
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

  const CATEGORY_CONFIG = {
    TRADITIONAL_BANK: { label: 'Bancos tradicionais', icon: '🏦' },
    DIGITAL_BANK: { label: 'Bancos digitais', icon: '📱' },
    WALLET: { label: 'Carteiras digitais', icon: '💳' },
    INVESTMENT: { label: 'Investimentos', icon: '📈' },
    CRYPTO: { label: 'Criptomoedas', icon: '₿' },
  } as const;

  const CATEGORY_ORDER = [
    'TRADITIONAL_BANK',
    'DIGITAL_BANK',
    'WALLET',
    'INVESTMENT',
    'CRYPTO',
  ] as const;

  const groupedByCategory = bankAccountsCategories.categories.reduce<
    Record<string, typeof bankAccountsCategories.categories>
  >((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <Accordion
      type="single"
      collapsible
      className={cn(
        'w-full min-w-[250px] px-2',
        width >= 500 && 'min-w-[500px]',
      )}
      defaultValue={selectedValue.category!}
    >
      {CATEGORY_ORDER.map((categoryKey) => {
        const items = groupedByCategory[categoryKey];

        if (!items?.length) return null;

        return (
          <AccordionItem key={categoryKey} value={categoryKey}>
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <span>{CATEGORY_CONFIG[categoryKey].icon}</span>
                {CATEGORY_CONFIG[categoryKey].label}
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <div className="grid grid-cols-3 gap-1">
                {items.map((categorie) => (
                  <DropdownMenuItem
                    key={categorie.id}
                    onSelect={() =>
                      handleChange({
                        id: categorie.id,
                        color: categorie.color,
                        icon: categorie.icon,
                        category: categorie.category,
                        colorWithoutIcon: null,
                      })
                    }
                    className={cn(
                      'cursor-pointer flex justify-center',
                      selectedValue.id === categorie.id && 'bg-foreground/10',
                    )}
                  >
                    <div
                      className="size-16 flex justify-center items-center rounded-full p-2"
                      style={{ background: categorie.color }}
                    >
                      <IconBank icon={categorie.icon as IconsBankType} />
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
