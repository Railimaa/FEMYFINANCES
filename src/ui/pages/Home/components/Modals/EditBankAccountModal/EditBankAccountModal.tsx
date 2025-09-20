import { Controller } from 'react-hook-form';

import { Button } from '@ui/components/Button';
import { Input } from '@ui/components/Input';
import { Label } from '@ui/components/Label';
import { Modal } from '@ui/components/Modal/Modal';

import { useEditBankAccountModal } from '../../BankAccounts/hooks/useEditBankAccountModal';
import { AccountOrColorDropDown } from '../NewBankAccountModal/components/AccountOrColorDropDown';
import { InputInitialBalance } from '../NewBankAccountModal/components/InputInitialBalance';
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
    >
      <Label htmlFor="initialBalance">Saldo Inicial</Label>
      <div className="flex gap-2 items-center">
        <p className="text-lg/normal opacity-55 tracking-tighter font-normal">
          R$
        </p>

        <Controller
          control={form.control}
          name="initialBalance"
          render={({ field: { value, onChange } }) => (
            <InputInitialBalance
              value={value}
              onChange={onChange}
              isLoading={isLoadingUpdateBankAccount}
            />
          )}
        />
      </div>

      <div className="flex flex-col space-y-[24px] w-full mt-12">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nome da Conta</Label>
          <Input
            placeholder="Nome"
            id="name"
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
    </Modal>
  );
}
