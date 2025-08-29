import { routes } from '@app/router/routes';
import { Button } from '@ui/components/Button';
import { FormAuth } from '@ui/components/FormAuth';
import { Input } from '@ui/components/Input';
import { Label } from '@ui/components/Label';

import { useSignIn } from './useSignIn';

export function SignIn() {
  const { form, handleSubmit, isLoadingSignIn, navigate } = useSignIn();

  return (
    <FormAuth
      title="Não possui uma conta?"
      subTitle="Cadastre-se"
      navigateTo={routes.signUp}
    >
      <div className="flex justify-center flex-col gap-5">
        <div className="flex flex-col justify-center gap-1">
          <Label htmlFor="e-mail" className="text-xs">
            E-mail
          </Label>
          <Input
            id="e-mail"
            {...form.register('email')}
            isLoading={isLoadingSignIn}
            error={form.formState.errors.email?.message}
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Label htmlFor="password" className="text-xs">
            Senha
          </Label>
          <Input
            id="password"
            {...form.register('password')}
            error={form.formState.errors.password?.message}
            isLoading={isLoadingSignIn}
            type="password"
          />
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => navigate(routes.forgotPassword)}
              disabled={isLoadingSignIn}
            >
              Esqueci minha senha
            </Button>
          </div>
        </div>

        <Button onClick={handleSubmit} isLoading={isLoadingSignIn}>
          Entrar
        </Button>
      </div>
    </FormAuth>
  );
}
