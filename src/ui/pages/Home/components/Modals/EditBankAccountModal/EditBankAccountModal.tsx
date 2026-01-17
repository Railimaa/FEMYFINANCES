import { Trash } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { formatCurrency } from '@app/utils/formatCurrency';
import { AlertModal } from '@ui/components/AlertModal';
import { Button } from '@ui/components/Button';
import { Input } from '@ui/components/Input';
import { Label } from '@ui/components/Label';
import { Modal } from '@ui/components/Modal/Modal';
import { IconBank } from '@ui/icons/BankAccountsIcon/IconsBank/IconBank';
import { IconsBankType } from '@ui/icons/BankAccountsIcon/IconsBank/IconsBankMap';
import { ColorIcon } from '@ui/icons/ColorIcon';

import { useEditBankAccountModal } from '../../BankAccounts/hooks/useEditBankAccountModal';
import { AccountOrColorDropDown } from '../NewBankAccountModal/components/AccountOrColorDropDown';
import { SelectTypeBankAccount } from '../NewBankAccountModal/components/SelectTypeBankAccount';

export function EditBankAccountModal() {
  const {
    form,
    bankAccountIsBegging,
    handleCloseModalEditBankAccount,
    openModalEditBankAccount,
    handleSubmit,
    isDurty,
    isLoadingUpdateBankAccount,
    openModalDeleteBankAccount,
    handleOpenModalDeleteBankAccount,
    handleCloseModalDeleteBankAccount,
    handleDeleteBankAccount,
    isLoadingDeleteBankAccount,
  } = useEditBankAccountModal();

  return (
    <Modal
      open={openModalEditBankAccount}
      handleCloseModal={handleCloseModalEditBankAccount}
      canButtonClose
      title={
        <div className="flex items-center gap-2">
          <p>Editar Conta:</p>
          <h1>{bankAccountIsBegging?.name}</h1>
        </div>
      }
      loading={isLoadingUpdateBankAccount}
      maxWidth="md"
      rightAction={
        <div>
          <Button
            size="icon"
            variant="destructive"
            onClick={handleOpenModalDeleteBankAccount}
          >
            <Trash />
          </Button>
        </div>
      }
    >
      <p className="text-lg/normal tracking-tighter font-normal">
        Saldo da conta
      </p>

      <span className="text-lg text-muted-foreground">
        {formatCurrency(form.getValues('initialBalance'))}
      </span>

      <div className="flex flex-col space-y-[24px] w-full mt-12">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nome da Conta</Label>
          <Input
            placeholder="Nome"
            id="name"
            maxLength={60}
            {...form.register('name')}
            error={form.formState.errors.name?.message}
            isLoading={isLoadingUpdateBankAccount}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="type">Tipo</Label>
          <Controller
            control={form.control}
            name="typeBankAccount"
            render={({ field: { value, onChange } }) => (
              <SelectTypeBankAccount
                value={value}
                onChange={onChange}
                error={form.formState.errors.typeBankAccount?.message}
                isLoading={isLoadingUpdateBankAccount}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="categoryBankAccount">Conta ou Cor</Label>
          <Controller
            control={form.control}
            name="categoryBankAccount"
            render={({ field: { value, onChange } }) => (
              <AccountOrColorDropDown
                value={value}
                onChange={onChange}
                error={form.formState.errors.categoryBankAccount?.message}
                isLoading={isLoadingUpdateBankAccount}
              />
            )}
          />
        </div>

        <Button
          onClick={handleSubmit}
          isLoading={isLoadingUpdateBankAccount}
          disabled={!isDurty}
        >
          Salvar
        </Button>
      </div>

      <AlertModal
        open={openModalDeleteBankAccount}
        handleClose={handleCloseModalDeleteBankAccount}
        title={
          <div className="flex  items-center justify-between ">
            <p>Excluir Conta Bancária</p>

            <div className="fixed top-[14px] right-3">
              {bankAccountIsBegging?.categoryBankAccount.id && (
                <div
                  className="rounded-full size-10 p-1 flex justify-center items-center"
                  style={{
                    backgroundColor: `${bankAccountIsBegging.categoryBankAccount.color}`,
                  }}
                >
                  <IconBank
                    icon={
                      bankAccountIsBegging.categoryBankAccount
                        .icon as IconsBankType
                    }
                  />
                </div>
              )}

              {!bankAccountIsBegging?.categoryBankAccount.id && (
                <ColorIcon
                  color={
                    bankAccountIsBegging?.categoryBankAccount.colorWithoutIcon!
                  }
                  bg="#E8E8E8"
                />
              )}
            </div>
          </div>
        }
        message="Atenção! Todas as transações desta conta serão removidas automáticamente."
        handleConfirmation={handleDeleteBankAccount}
        loading={isLoadingDeleteBankAccount || isLoadingUpdateBankAccount}
      />
    </Modal>
  );
}
