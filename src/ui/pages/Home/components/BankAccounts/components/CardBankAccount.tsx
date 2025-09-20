import { cn } from '@app/utils/cn';
import { formatCurrency } from '@app/utils/formatCurrency';
import { BankAccountTypeIcons } from '@ui/icons/BankAccountsIcon/BankAccountTypeIcons/BankAccountTypeIcons';
import { IconBank } from '@ui/icons/BankAccountsIcon/IconsBank/IconBank';
import { useFinancesContext } from '@ui/pages/Home/context/FinancesContext';

import { BankAccount } from '../types/BankAccount';

type CardBankAccountProps = {
  bankAccount: BankAccount;
};

export function CardBankAccount({ bankAccount }: CardBankAccountProps) {
  const { showTotalValue, handleOpenModalEditBankAccount } =
    useFinancesContext();
  const hasIcon = !!bankAccount.categoryBankAccount?.id;
  const isColorWithoutIconFFF =
    !!bankAccount?.categoryBankAccount?.colorWithoutIcon &&
    bankAccount?.categoryBankAccount?.colorWithoutIcon === '#fff';

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={() => handleOpenModalEditBankAccount(bankAccount)}
      className={cn(
        'min-h-[200px] py-4 px-3  rounded-[16px] flex flex-col justify-between  text-white cursor-pointer hover:opacity-85 transition-all duration-500 ease-in-out hover:scale-[0.97]',
        isColorWithoutIconFFF && 'text-black',
      )}
      style={{
        background: `${hasIcon ? bankAccount.categoryBankAccount?.color : bankAccount.categoryBankAccount?.colorWithoutIcon}`,
      }}
    >
      <div className="flex flex-col gap-4 justify-center">
        <div className="flex items-center justify-between">
          <BankAccountTypeIcons type={bankAccount.typeBankAccount} />
          {hasIcon && (
            <IconBank icon={bankAccount.categoryBankAccount?.icon as any} />
          )}
        </div>
        <span>{bankAccount.name}</span>
      </div>

      <div className="flex flex-col">
        <span className={cn('', !showTotalValue && 'blur-md')}>
          {formatCurrency(bankAccount.initialBalance)}
        </span>

        <small>Saldo atual</small>
      </div>
    </div>
  );
}
