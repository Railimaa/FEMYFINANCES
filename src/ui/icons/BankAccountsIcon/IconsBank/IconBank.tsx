import { IconsBankMap, IconsBankType } from './IconsBankMap';

export type IconBankProps = {
  icon: IconsBankType;
};

export function IconBank({ icon }: IconBankProps) {
  const Icon = IconsBankMap[icon];

  return <Icon />;
}
