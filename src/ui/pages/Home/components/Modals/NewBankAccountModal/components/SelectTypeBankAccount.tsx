import { CreditCard, HandCoins, Wallet } from 'lucide-react';

import { FieldError } from '@ui/components/FieldError';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/components/Select';

type SelectTypeBankAccountProps = {
  value: 'CHECKING' | 'INVESTMENT' | 'CASH';
  onChange: (value: string) => void;
  error?: string;
  isLoading?: boolean;
};

const optionsTypeBankAccount = [
  {
    value: 'CHECKING',
    label: 'Conta Corrente',
    icon: CreditCard,
  },
  {
    value: 'INVESTMENT',
    label: 'Investimentos',
    icon: HandCoins,
  },
  {
    value: 'CASH',
    label: 'Dinheiro Físico',
    icon: Wallet,
  },
];

export function SelectTypeBankAccount({
  value,
  onChange,
  error,
  isLoading,
}: SelectTypeBankAccountProps) {
  return (
    <>
      <Select value={value} onValueChange={onChange} disabled={isLoading}>
        <SelectTrigger id="type">
          <div className="w-full flex items-center justify-between">
            <SelectValue placeholder="Selecione o Tipo" />
          </div>
        </SelectTrigger>
        <SelectContent align="start" className="z-[1005]">
          {optionsTypeBankAccount.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              <div className="flex w-full items-center justify-between">
                <span>{option.label}</span>
                <option.icon size={20} className="ml-2" />
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <FieldError message={error} />}
    </>
  );
}
