import { ChevronLeftIcon } from 'lucide-react';

import { routes } from '@app/router/routes';
import { Logo } from '@ui/assets/icons/Logo';
import { Button } from '@ui/components/Button';
import { Input } from '@ui/components/Input';
import { Label } from '@ui/components/Label';

import { useForgotPassword } from './useForgotPassword';

export function ForgotPassword() {
  const { form, handleSubmit, isLoadingForgotPassword, navigate } =
    useForgotPassword();

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col gap-6  w-full justify-center items-center">
        <Logo />
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <h3 className="text-2xl font-extrabold tracking-tight">
            Recupere sua conta
          </h3>
          <div>
            <h5 className="text-sm font-normal tracking-tight">
              Esqueceu sua senha? <br /> Relaxa, a gente te ajuda a recuperar!
            </h5>
          </div>
        </div>
        <div className="w-full max-w-[350px] flex flex-col gap-2 mt-5">
          <Label htmlFor="email">Informe o e-mail da sua conta</Label>
          <Input
            id="email"
            {...form.register('email')}
            error={form.formState.errors.email?.message}
            isLoading={isLoadingForgotPassword}
          />
        </div>

        <Button
          className="w-full max-w-[350px]"
          onClick={handleSubmit}
          isLoading={isLoadingForgotPassword}
        >
          Recuperar conta
        </Button>

        <div>
          <Button
            className="w-full max-w-[350px]"
            size="sm"
            variant="ghost"
            disabled={isLoadingForgotPassword}
            onClick={() => navigate(routes.signIn)}
          >
            <ChevronLeftIcon size={10} />
            Voltar para o login
          </Button>
        </div>
      </div>
    </div>
  );
}
