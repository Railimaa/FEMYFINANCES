import { cn } from '@app/utils/cn';
import { DropdownMenuItem } from '@ui/components/DropdownMenu';
import { ColorIcon } from '@ui/icons/ColorIcon';

import { CategoryBankAccount } from '../types/CategoryBankAccount';

type Color = {
  color: string;
  bg: string;
  nameColor: string;
}[];

type ColorTabProps = {
  selectedValue: CategoryBankAccount;
  handleChange: (categoryWithIcon: CategoryBankAccount) => void;
};

export function ColorTab({ selectedValue, handleChange }: ColorTabProps) {
  const colors: Color = [
    { color: '#868E96', bg: '#F8F9FA', nameColor: 'Cinza' },
    { color: '#FA5252', bg: '#FFF5F5', nameColor: 'Vermelho' },
    { color: '#E64980', bg: '#FFF0F6', nameColor: 'Rosa' },
    { color: '#BE4BDB', bg: '#F8F0FC', nameColor: 'Roxo' },
    { color: '#7950F2', bg: '#F3F0FF', nameColor: 'Violeta' },
    { color: '#4C6EF5', bg: '#EDF2FF', nameColor: 'Azul' },
    { color: '#228BE6', bg: '#E7F5FF', nameColor: 'Azul Claro' },
    { color: '#15AABF', bg: '#E3FAFC', nameColor: 'Ciano' },
    { color: '#12B886', bg: '#E6FCF5', nameColor: 'Verde Água' },
    { color: '#40C057', bg: '#EBFBEE', nameColor: 'Verde' },
    { color: '#82C91E', bg: '#F4FCE3', nameColor: 'Verde Limão' },
    { color: '#FAB005', bg: '#FFF9DB', nameColor: 'Amarelo' },
    { color: '#FD7E14', bg: '#FFF4E6', nameColor: 'Laranja' },
    { color: '#212529', bg: '#F8F9FA', nameColor: 'Preto' },
    { color: '#74C0FC', bg: '#E7F5FF', nameColor: 'Azul Bebê' },
    { color: '#fff', bg: '#DEE2E6', nameColor: 'Branco' },
  ];

  return (
    <div className="grid grid-cols-4 p-2">
      {colors.map(({ color, bg }) => (
        <DropdownMenuItem
          key={color}
          onSelect={() =>
            handleChange({
              id: null,
              color: null,
              icon: null,
              colorWithoutIcon: color,
              category: null,
            })
          }
          className={cn(
            'cursor-pointer',
            selectedValue.colorWithoutIcon === color && 'bg-foreground/10',
          )}
        >
          <div className="size-16 flex items-center justify-center">
            <ColorIcon color={color} bg={bg} />
          </div>
        </DropdownMenuItem>
      ))}
    </div>
  );
}
