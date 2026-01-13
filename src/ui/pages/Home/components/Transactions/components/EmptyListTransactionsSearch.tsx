import { ArrowLeftRight } from 'lucide-react';
import React from 'react';

import { cn } from '@app/utils/cn';
import { Button } from '@ui/components/Button';

import { useIsMobile } from '../hooks/useIsMobile';

type EmptyListTransactionsSearchProps = {
  handleChangeSearchTransactionValue: (
    value: string | React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

export function EmptyListTransactionsSearch({
  handleChangeSearchTransactionValue,
}: EmptyListTransactionsSearchProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        'flex items-center justify-center mt-10',
        isMobile && 'mt-10',
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <ArrowLeftRight size={80} className="opacity-70" />
        <p className="text-base tracking-tighter">
          Nenhum resultado encontrado
        </p>
        <p className="text-muted-foreground text-sm max-w-[380px] whitespace-normal text-center">
          Por favor, tente buscar por outro termo ou clique no botão abaixo para
          limpar a busca.
        </p>

        <div className="w-full h-[1px] bg-muted-foreground/20 mt-2" />

        <div className="mt-4">
          <Button
            variant="secondary"
            onClick={() => handleChangeSearchTransactionValue('')}
          >
            Limpar busca
          </Button>
        </div>
      </div>
    </div>
  );
}
