import { Controller } from 'react-hook-form';

import { Button } from '@ui/components/Button';
import { Input } from '@ui/components/Input';
import { Label } from '@ui/components/Label';
import { Modal } from '@ui/components/Modal/Modal';

import { useNewAccountModal } from '../../BankAccounts/hooks/useNewAccountModal';

import { AccountOrColorDropDown } from './components/AccountOrColorDropDown';
import { InputInitialBalance } from './components/InputInitialBalance';
import { SelectTypeBankAccount } from './components/SelectTypeBankAccount';

export function NewBankAccountModal() {
  const {
    form,
    handleSubmit,
    openModalNewBankAccount,
    handleCloseModalNewBankAccount,
    isLoadingPostBankAccount,
  } = useNewAccountModal();

  return (
    <Modal
      open={openModalNewBankAccount}
      handleCloseModal={handleCloseModalNewBankAccount}
      title={<p className="font-bold text-lg">Nova Conta</p>}
      canButtonClose
      loading={isLoadingPostBankAccount}
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
              isLoading={isLoadingPostBankAccount}
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
            isLoading={isLoadingPostBankAccount}
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
                isLoading={isLoadingPostBankAccount}
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
                isLoading={isLoadingPostBankAccount}
              />
            )}
          />
        </div>

        <Button onClick={handleSubmit} isLoading={isLoadingPostBankAccount}>
          Salvar
        </Button>
      </div>
    </Modal>
  );
}
