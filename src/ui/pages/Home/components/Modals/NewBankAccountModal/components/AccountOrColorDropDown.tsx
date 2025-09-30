/* eslint-disable no-nested-ternary */
import { ChevronDownIcon, Eclipse, Landmark } from 'lucide-react';

import { cn } from '@app/utils/cn';
import { Button } from '@ui/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@ui/components/DropdownMenu';
import { FieldError } from '@ui/components/FieldError';
import { Tabs } from '@ui/components/Tabs/Tabs';
import { IconBank } from '@ui/icons/BankAccountsIcon/IconsBank/IconBank';
import { IconsBankType } from '@ui/icons/BankAccountsIcon/IconsBank/IconsBankMap';
import { ColorIcon } from '@ui/icons/ColorIcon';

import { useAccountOrColorDropdown } from '../../../BankAccounts/hooks/useAccountOrColorDropdown';
import { CategoryBankAccount } from '../types/CategoryBankAccount';

import { AccountTab } from './AccountTab';
import { ColorTab } from './ColorTab';

type AccountOrColorDropDownProps = {
  value: CategoryBankAccount;
  onChange: (value: CategoryBankAccount) => void;
  error?: string;
  isLoading?: boolean;
};

export function AccountOrColorDropDown({
  value,
  onChange,
  error,
  isLoading,
}: AccountOrColorDropDownProps) {
  const {
    selecteValue,
    handleChange,
    bankAccountsCategories,
    isLoadingBankAccountsCategories,
    hasError,
    refetchBankAccountsCategories,
    isFetchingBankAccountsCategories,
    isTabIcon,
    openModalEditBankAccount,
  } = useAccountOrColorDropdown({
    value,
    onChange,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        id="categoryBankAccount"
        disabled={isLoadingBankAccountsCategories || hasError || isLoading}
      >
        <div
          className={cn(
            'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer',
            isLoadingBankAccountsCategories && 'opacity-50',
            (hasError || error) && 'border-destructive',
          )}
          role="button"
          tabIndex={0}
        >
          <div className="w-full flex justify-end items-center">
            {isLoadingBankAccountsCategories && (
              <div className="size-5  border-[3px] border-l-[3px] rounded-full border-l-foreground  animate-spin" />
            )}

            {!isLoadingBankAccountsCategories && (
              <>
                {hasError && (
                  <>
                    <div className="text-wrap flex w-full">
                      <span>Ocorreu um erro.</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => refetchBankAccountsCategories()}
                      isLoading={isFetchingBankAccountsCategories}
                    >
                      Buscar novamente
                    </Button>
                  </>
                )}

                {!hasError && (
                  <>
                    {!selecteValue.id && !selecteValue.colorWithoutIcon && (
                      <div className="flex justify-between w-full items-center">
                        <span className="flex w-full">
                          Selecione Conta ou Cor
                        </span>

                        <ChevronDownIcon className="h-4 w-4 opacity-50 " />
                      </div>
                    )}

                    {selecteValue.id && (
                      <>
                        <span className="flex w-full">{selecteValue.icon}</span>
                        <div
                          className="size-10 flex justify-center items-center rounded-full p-1"
                          style={{ background: `${selecteValue.color}` }}
                        >
                          <IconBank icon={selecteValue.icon as IconsBankType} />
                        </div>
                      </>
                    )}

                    {selecteValue.colorWithoutIcon && (
                      <>
                        <span className="flex w-full">Cor</span>

                        <ColorIcon
                          color={selecteValue.colorWithoutIcon}
                          bg="#E8E8E8"
                        />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="z-[1005]"
        id="categoryBankAccount"
        side="top"
        align="center"
      >
        <Tabs
          tabs={[
            {
              id: Math.random().toString(),
              name: 'Contas',
              icon: <Landmark size={14} />,
              content: (
                <AccountTab
                  bankAccountsCategories={bankAccountsCategories}
                  selectedValue={selecteValue}
                  handleChange={handleChange}
                />
              ),
            },
            {
              id: Math.random().toString(),
              name: 'Cores',
              icon: <Eclipse size={14} />,
              content: (
                <ColorTab
                  handleChange={handleChange}
                  selectedValue={selecteValue}
                />
              ),
            },
          ]}
          defaultTab={openModalEditBankAccount ? (isTabIcon ? 0 : 1) : 0}
        />
      </DropdownMenuContent>

      {error && <FieldError message={error} />}
    </DropdownMenu>
  );
}
