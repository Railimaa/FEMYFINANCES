import { iconsMap, iconTypeBankAccount } from './IconsMap';

type BankAccountTypeIconsProps = {
  type: iconTypeBankAccount;
};

export function BankAccountTypeIcons({ type }: BankAccountTypeIconsProps) {
  const Icon = iconsMap[type];

  return <Icon />;
}
