import { PlusCircle } from 'lucide-react';

import { useFinancesContext } from '@ui/pages/Home/context/FinancesContext';

export function EmptyBankAccounts() {
  const { handleOpenModalNewBankAccount } = useFinancesContext();

  return (
    <div>
      <div
        className="flex items-center justify-between mb-4"
        slot="container-start"
      >
        <span className="text-lg/snug font-bold tracking-[-1px]">
          Minhas contas
        </span>
      </div>
      <div
        className="flex flex-col items-center justify-center gap-2 border-[2px] border-dashed min-h-[200px] p-4 rounded-[16px] cursor-pointer hover:bg-foreground/5 transition-all ease-in-out duration-500"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleOpenModalNewBankAccount();
          }
        }}
        onClick={handleOpenModalNewBankAccount}
      >
        <PlusCircle size={40} />

        <div className="text-center text-base/6 tracking-tighter font-medium">
          <h3>Cadastre uma</h3>
          <p>nova conta</p>
        </div>
      </div>
    </div>
  );
}
