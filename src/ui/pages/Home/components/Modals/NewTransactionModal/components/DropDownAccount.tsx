import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@app/utils/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/components/DropdownMenu';
import { FieldError } from '@ui/components/FieldError';
import { IconBank } from '@ui/icons/BankAccountsIcon/IconsBank/IconBank';
import { ColorIcon } from '@ui/icons/ColorIcon';

import { useGetBankAccounts } from '../../../BankAccounts/hooks/useGetBankAccounts';
import { BankAccount } from '../../../BankAccounts/types/BankAccount';

type DropDownAccountProps = {
  value: {
    id: string | null;
    color: string | null;
    icon: string | null;
    colorWithoutIcon: string | null;
    bankAccountId: string;
  };
  onChange: (bankAccount: {
    id: string | null;
    color: string | null;
    icon: string | null;
    colorWithoutIcon: string | null;
    bankAccountId: string;
  }) => void;
  error?: string;
  isLoading?: boolean;
  disabled?: boolean;
};

export function DropDownAccount({
  value,
  onChange,
  error,
  isLoading,
  disabled,
}: DropDownAccountProps) {
  const { bankAccounts } = useGetBankAccounts();
  const [selectedValue, setSelectedValue] = useState<BankAccount>(() => {
    const hasValue = bankAccounts.find(
      (bankAccount) => bankAccount.id === value.bankAccountId,
    );

    if (hasValue) {
      return { ...hasValue };
    }

    return {} as BankAccount;
  });

  function handleSelectedValue(bankAccount: BankAccount) {
    setSelectedValue(bankAccount);

    onChange({
      bankAccountId: bankAccount.id,
      ...bankAccount.categoryBankAccount,
    });
  }

  console.log(selectedValue, 'selectValue');

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          id="account"
          asChild
          className={cn(
            'cursor-pointer',
            error && 'border-destructive',
            (isLoading || disabled) && 'cursor-not-allowed opacity-50',
          )}
          disabled={isLoading || disabled}
        >
          <div
            className={cn(
              'w-full border rounded-md  h-9 px-3',
              !selectedValue.id && 'py-2',
            )}
            role="button"
            tabIndex={0}
          >
            <div className="w-full flex items-center justify-between">
              {!selectedValue.id && (
                <>
                  <span className="text-sm text-muted-foreground">
                    Selecione a Conta
                  </span>

                  <ChevronDown className=" size-4 text-muted-foreground opacity-50" />
                </>
              )}

              {selectedValue.id && (
                <>
                  <span>{selectedValue.name}</span>

                  <div>
                    {selectedValue.categoryBankAccount.id && (
                      <div
                        className="size-9 rounded-full flex items-center justify-center p-1"
                        style={{
                          backgroundColor: `${selectedValue.categoryBankAccount.color}`,
                        }}
                      >
                        <IconBank
                          icon={selectedValue.categoryBankAccount.icon as any}
                        />
                      </div>
                    )}

                    {!selectedValue.categoryBankAccount.id && (
                      <div className="size-9 rounded-full flex items-center justify-center">
                        <ColorIcon
                          color={
                            selectedValue.categoryBankAccount.colorWithoutIcon!
                          }
                          bg="#E8E8E8"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="z-[1005] " side="top" align="center">
          <div className="grid grid-cols-4">
            {bankAccounts.map((bankAccount) => (
              <DropdownMenuItem
                className="flex flex-col items-center justify-center gap-2"
                key={bankAccount.id}
                onSelect={() => handleSelectedValue(bankAccount)}
              >
                <div>
                  {bankAccount.categoryBankAccount.id && (
                    <div
                      className="size-9 rounded-full flex items-center justify-center p-1"
                      style={{
                        backgroundColor: `${bankAccount.categoryBankAccount.color}`,
                      }}
                    >
                      <IconBank
                        icon={bankAccount.categoryBankAccount.icon as any}
                      />
                    </div>
                  )}

                  {!bankAccount.categoryBankAccount.id && (
                    <div className="size-9 rounded-full flex items-center justify-center">
                      <ColorIcon
                        color={
                          bankAccount.categoryBankAccount.colorWithoutIcon!
                        }
                        bg="#E8E8E8"
                      />
                    </div>
                  )}
                </div>

                <span>{bankAccount.name}</span>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {error && <FieldError message={error} />}
    </div>
  );
}
