import { Logo } from '@ui/assets/icons/Logo';
import { Button } from '@ui/components/Button';
import { Input } from '@ui/components/Input';
import { Label } from '@ui/components/Label';

import { useResetPassword } from './useResetPassword';

export function ResetPassword() {
  const { form, handleSubmt, isLoadingResetPassword } = useResetPassword();
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex w-full max-w-[350px] items-center flex-col gap-6">
        <Logo />
        <div className="flex flex-col text-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Altere a sua senha
          </h1>
          <small className="text-sm font-normal tracking-tight">
            Informe a sua nova senha e volte a acessar a <br />
            plataforma!
          </small>
        </div>

        <div className="w-full">
          <Label htmlFor="newPassword">Sua nova senha</Label>
          <Input
            id="newPassword"
            type="password"
            {...form.register('password')}
            error={form.formState.errors.password?.message}
            isLoading={isLoadingResetPassword}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="confirmNewPassword">Repita a nova senha</Label>
          <Input
            id="confirmNewPassword"
            type="password"
            {...form.register('confirmPassword')}
            error={form.formState.errors.confirmPassword?.message}
            isLoading={isLoadingResetPassword}
          />
        </div>

        <Button
          className="w-full"
          onClick={handleSubmt}
          isLoading={isLoadingResetPassword}
        >
          Alterar senha
        </Button>
      </div>
    </div>
  );
}
