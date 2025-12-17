import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Landmark,
  PlusIcon,
} from 'lucide-react';

import { Button } from '@ui/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/components/DropdownMenu';

import { useFinancesContext } from '../../context/FinancesContext';

export function Fab() {
  const { handleOpenModalNewBankAccount, handleOpenModalNewTransaction } =
    useFinancesContext();

  return (
    <DropdownMenu>
      <div className="fixed bottom-12 right-2">
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full w-[48px] h-[48px] bg-foreground flex items-center justify-center">
            <PlusIcon size={12} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="top"
          className="p-3 rounded-[16px] space-y-3"
        >
          <DropdownMenuItem
            onSelect={() => handleOpenModalNewTransaction('EXPENSE')}
          >
            <div className="flex justify-center items-center gap-3">
              <BanknoteArrowDown />
              <p className="text-sm/6 tracking-wide font-normal ">
                Nova Despesa
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => handleOpenModalNewTransaction('INCOME')}
          >
            <div className="flex justify-center items-center gap-3">
              <BanknoteArrowUp />
              <p className="text-sm/6 tracking-wide font-normal ">
                Nova Receita
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleOpenModalNewBankAccount}>
            <div className="flex justify-center items-center gap-3">
              <Landmark />
              <p className="text-sm/6 tracking-wide font-normal ">Nova Conta</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
