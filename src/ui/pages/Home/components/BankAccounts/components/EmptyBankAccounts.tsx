import { PlusCircle } from 'lucide-react';

export function EmptyBankAccounts() {
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
      <div className="flex flex-col items-center justify-center gap-2 border-[2px] border-dashed min-h-[200px] p-4 rounded-[16px]">
        <PlusCircle size={40} />

        <div className="text-center text-base/6 tracking-tighter font-medium">
          <h3>Cadastre uma</h3>
          <p>nova conta</p>
        </div>
      </div>
    </div>
  );
}
