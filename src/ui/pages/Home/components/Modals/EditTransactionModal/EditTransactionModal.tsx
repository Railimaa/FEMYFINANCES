import { Trash } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { AlertModal } from '@ui/components/AlertModal';
import { Button } from '@ui/components/Button';
import { FieldError } from '@ui/components/FieldError';
import { Input } from '@ui/components/Input';
import { InputCurrency } from '@ui/components/InputCurrency';
import { Label } from '@ui/components/Label';
import { Modal } from '@ui/components/Modal/Modal';

import { useEditedTransactionModal } from '../../Transactions/hooks/useEditedTransactionModal';
import { DatePicker } from '../NewTransactionModal/components/DatePicker';
import { DropDownAccount } from '../NewTransactionModal/components/DropDownAccount';
import { SelectCategory } from '../NewTransactionModal/components/SelectCategory';

export function EditTransactionModal() {
  const {
    form,
    handleSubmit,
    istypeTransactionIncome,
    isDurty,
    isLoadingPutTransaction,
    openModalEditedTransaction,
    handleCloseModalEditedTransaction,
    openModalDeleteTransaction,
    handleToggleModalDeleteTransaction,
    handleConfirmationDeleteTransaction,
    isLoadingDeleteTransaction,
    transactionIsBegging,
  } = useEditedTransactionModal();

  return (
    <>
      <Modal
        open={openModalEditedTransaction}
        handleCloseModal={handleCloseModalEditedTransaction}
        title={`Editar ${istypeTransactionIncome ? 'Receita' : 'Despesa'}`}
        maxWidth="md"
        rightAction={
          <Button
            size="icon"
            variant="destructive"
            onClick={handleToggleModalDeleteTransaction}
          >
            <Trash />
          </Button>
        }
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
                    isLoading={isLoadingPutTransaction}
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
              isLoading={isLoadingPutTransaction}
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
                  isLoading={isLoadingPutTransaction}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="account">
              {istypeTransactionIncome ? 'Recebido na conta' : 'Pago com'}
            </Label>
            <Controller
              name="categoryBankAccount"
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <DropDownAccount
                  value={value}
                  onChange={onChange}
                  error={form.formState.errors.categoryBankAccount?.message}
                  disabled
                />
              )}
            />
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
                  isLoading={isLoadingPutTransaction}
                />
              )}
            />
          </div>

          <Button
            className="w-full"
            onClick={handleSubmit}
            isLoading={isLoadingPutTransaction}
            disabled={!isDurty}
          >
            Salvar
          </Button>
        </div>
      </Modal>

      <AlertModal
        open={openModalDeleteTransaction}
        handleClose={handleToggleModalDeleteTransaction}
        title={`Excluir ${istypeTransactionIncome ? 'Receita' : 'Despesa'}`}
        handleConfirmation={handleConfirmationDeleteTransaction}
        loading={isLoadingDeleteTransaction}
        message={
          <div>
            Tem certeza que deseja excluir a{' '}
            {istypeTransactionIncome ? 'receita' : 'despesa'}:{' '}
            <span className="font-semibold text-foreground">
              {`"${transactionIsBegging?.name}"`}
            </span>
          </div>
        }
      />
    </>
  );
}
