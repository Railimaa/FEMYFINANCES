/* eslint-disable react/require-default-props */
import { iconsMap } from './iconsMap';

interface ICategoryIconProps {
  type: 'income' | 'expense';
  category?: string;
}

export function CategoryIcon({ type, category }: ICategoryIconProps) {
  const Icon =
    iconsMap[type][
      (category as keyof (typeof iconsMap.expense | typeof iconsMap.income)) ??
        'default'
    ] ?? iconsMap[type].default;

  return <Icon />;
}
