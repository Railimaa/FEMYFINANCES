import { Controller } from 'react-hook-form';

import { Button } from '@ui/components/Button';
import { FieldError } from '@ui/components/FieldError';
import { Input } from '@ui/components/Input';
import { InputCurrency } from '@ui/components/InputCurrency';
import { Label } from '@ui/components/Label';
import { Modal } from '@ui/components/Modal/Modal';

import { useNewTransactionModal } from '../../Transactions/hooks/useNewTransactionModal';

import { DatePicker } from './components/DatePicker';
import { DropDownAccount } from './components/DropDownAccount';
import { SelectCategory } from './components/SelectCategory';

export function NewTransactionModal() {
  const {
    form,
    handleSubmit,
    openModalNewTransaction,
    istypeTransactionIncome,
    handleCloseModalNewTransactionAndResetForm,
    isLoadingNewTransaction,
    hasBankAccounts,
  } = useNewTransactionModal();

  return (
    <Modal
      open={openModalNewTransaction}
      handleCloseModal={handleCloseModalNewTransactionAndResetForm}
      title={`${istypeTransactionIncome ? 'Nova Receita' : 'Nova Despesa'}`}
      maxWidth="md"
      loading={isLoadingNewTransaction}
    >
      <div className="flex flex-col items-center space-y-[24px]">
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="initialBalance">Valor</Label>

          <div className="flex w-full  items-center gap-3 justify-center">
            <span className="text-lg font-normal leading-[150%] tracking-tighter text-[#868E96]">
              R$
            </span>

            <Controller
              name="value"
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <InputCurrency
                  value={value}
                  onChange={onChange}
                  isLoading={isLoadingNewTransaction}
                />
              )}
            />
          </div>

          {form.formState.errors?.value?.message && (
            <FieldError message={form.formState.errors?.value?.message} />
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="typeTransaction">
            {istypeTransactionIncome ? 'Nome da Receita' : 'Nome da Despesa'}
          </Label>
          <Input
            placeholder="Nome"
            id="typeTransaction"
            maxLength={80}
            {...form.register('name')}
            error={form.formState.errors.name?.message}
            isLoading={isLoadingNewTransaction}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="categoryTransaction">Categoria</Label>

          <Controller
            name="category"
            control={form.control}
            render={({ field: { value, onChange } }) => (
              <SelectCategory
                value={value}
                onChange={onChange}
                error={form.formState.errors.category?.categoryId?.message}
                isLoading={isLoadingNewTransaction}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          {!hasBankAccounts && (
            <div className="rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
              <strong>Você ainda não tem uma conta cadastrada.</strong>
              <br />
              Cadastre uma conta para registrar suas receitas e despesas.
            </div>
          )}

          {hasBankAccounts && (
            <>
              <Label htmlFor="account">
                {istypeTransactionIncome ? 'Receber na conta' : 'Pagar com'}
              </Label>

              <Controller
                name="categoryBankAccount"
                control={form.control}
                render={({ field: { value, onChange } }) => (
                  <DropDownAccount
                    value={value}
                    onChange={onChange}
                    error={form.formState.errors.categoryBankAccount?.message}
                    isLoading={isLoadingNewTransaction}
                  />
                )}
              />
            </>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="date">Data</Label>
          <Controller
            name="date"
            control={form.control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                value={value}
                onChange={onChange}
                isLoading={isLoadingNewTransaction}
              />
            )}
          />
        </div>

        <Button
          className="w-full"
          onClick={handleSubmit}
          isLoading={isLoadingNewTransaction}
        >
          Salvar
        </Button>
      </div>
    </Modal>
  );
}
