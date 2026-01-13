import { iconsMap, iconTypeBankAccount } from './iconsMap';

type BankAccountTypeIconsProps = {
  type: iconTypeBankAccount;
};

export function BankAccountTypeIcons({ type }: BankAccountTypeIconsProps) {
  const Icon = iconsMap[type];

  return <Icon />;
}
