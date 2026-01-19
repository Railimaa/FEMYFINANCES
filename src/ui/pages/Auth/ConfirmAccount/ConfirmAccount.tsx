import { RefreshCw } from 'lucide-react';

import { Logo } from '@ui/assets/icons/Logo';
import { Button } from '@ui/components/Button';
import { Input } from '@ui/components/Input';

import { useConfirmAccount } from './hooks/useConfirmAccount';

export function ConfirmAccount() {
  const {
    confirmationAccountData,
    timeLeft,
    canResend,
    form,
    handleSubmit,
    handleSubmitResendCode,
    isLoadingMutation,
  } = useConfirmAccount();

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <Logo />
      <div className="flex flex-col justify-center gap-4 mt-10 border border-foreground/5 p-6 rounded-lg">
        <div>
          <h2 className="text-center text-2xl tracking-tighter font-bold">
            Confirme sua conta
          </h2>
          <p className="text-center text-muted-foreground text-sm mt-1">
            Falta só mais um passo, {confirmationAccountData.firstName} 😊
          </p>
          <p className="text-muted-foreground text-sm mt-4 text-center">
            Enviamos um código de confirmação para{' '}
            <span className="text-foreground font-bold">
              {confirmationAccountData.email}
            </span>
          </p>
        </div>

        <Input
          placeholder="Informe o codigo"
          {...form.register('code')}
          maxLength={6}
          error={form.formState.errors.code?.message}
          isLoading={isLoadingMutation}
        />

        <div className="flex items-center gap-2 justify-end">
          <Button
            type="button"
            onClick={handleSubmit}
            isLoading={isLoadingMutation}
          >
            Confirmar código
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={!canResend}
            onClick={handleSubmitResendCode}
            isLoading={isLoadingMutation}
          >
            <RefreshCw />
            {canResend ? 'Reenviar código' : `Reenviar em ${timeLeft}s`}
          </Button>
        </div>
      </div>
    </div>
  );
}
