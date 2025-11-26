import clsx from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@ui/components/Button';
import { Modal } from '@ui/components/Modal/Modal';
import { IconBank } from '@ui/icons/BankAccountsIcon/IconsBank/IconBank';
import { ColorIcon } from '@ui/icons/ColorIcon';

import { useModalFilter } from '../hooks/useModalFilter';
import { FilterTransaction } from '../types/FilterTransaction';

type ModalFilterProps = {
  open: boolean;
  handleCloseModal: () => void;
  filters: FilterTransaction;
  handleChangeFilter: (field: keyof FilterTransaction, value: any) => void;
};

export function ModalFilter({
  open,
  handleCloseModal,
  filters,
  handleChangeFilter,
}: ModalFilterProps) {
  const {
    bankAccounts,
    bankAccountIdSelect,
    handleBankAccountIdSelect,
    year,
    handleChangeYear,
    handleApplyFilters,
  } = useModalFilter({
    handleChangeFilter,
    handleCloseModal,
    filters,
  });

  return (
    <Modal
      title="Filtros"
      open={open}
      handleCloseModal={handleCloseModal}
      maxWidth="md"
    >
      <div className="space-y-10">
        <div>
          <p className="font-bold text-lg tracking-tighter leading-[150%]">
            Conta
          </p>

          <div className="w-full h-screen max-h-[24vh] overflow-auto flex flex-col gap-2 mt-4">
            {bankAccounts.map((bankAccount) => (
              <button
                key={bankAccount.id}
                className={clsx(
                  'flex items-center justify-between cursor-pointer p-2 rounded-md ',
                  bankAccountIdSelect === bankAccount.id && 'bg-foreground/15 ',
                  bankAccountIdSelect !== bankAccount.id &&
                    'hover:bg-foreground/5 transition-all ease-in-out duration-500',
                )}
                onClick={() => handleBankAccountIdSelect(bankAccount.id)}
                type="button"
              >
                <p className="font-normal text-sm leading-[150%] tracking-[0px] text-foreground/90">
                  {bankAccount.name}
                </p>

                <div
                  className={clsx(
                    'rounded-full size-8  flex items-center justify-center p-1',
                  )}
                  style={{
                    backgroundColor: `${bankAccount.categoryBankAccount?.color}`,
                  }}
                >
                  {bankAccount.categoryBankAccount.id && (
                    <IconBank
                      icon={bankAccount.categoryBankAccount?.icon as any}
                    />
                  )}

                  {!bankAccount.categoryBankAccount.id && (
                    <ColorIcon
                      color={bankAccount.categoryBankAccount.colorWithoutIcon!}
                      bg="#E8E8E8"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg tracking-tighter leading-[150%]">
            Ano
          </p>

          <div className="flex items-center">
            <div className="flex items-center justify-between w-full">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleChangeYear('previous')}
              >
                <ArrowLeft />
              </Button>
              {year}
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleChangeYear('next')}
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>

        <Button className="w-full" onClick={handleApplyFilters}>
          Aplicar Filtros
        </Button>
      </div>
    </Modal>
  );
}
