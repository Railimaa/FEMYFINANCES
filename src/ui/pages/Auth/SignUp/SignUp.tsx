import { routes } from '@app/router/routes';
import { Button } from '@ui/components/Button';
import { FormAuth } from '@ui/components/FormAuth';
import { Input } from '@ui/components/Input';
import { Label } from '@ui/components/Label';

import { useSignUp } from './useSignUp';

export function SignUp() {
  const { form, handleSubmit, isLoadingSignUp } = useSignUp();

  return (
    <FormAuth
      title="Já possui uma conta?"
      subTitle="Ir para login"
      navigateTo={routes.signIn}
    >
      <div className="flex flex-col justify-center gap-5 w-full max-w-[350px]">
        <div className="flex flex-col gap-1">
          <Label htmlFor="firstName" className="text-xs">
            Nome
          </Label>
          <Input
            id="firstName"
            {...form.register('firstName')}
            error={form.formState.errors.firstName?.message}
            isLoading={isLoadingSignUp}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="lastName" className="text-xs">
            Sobrenome
          </Label>
          <Input
            id="lastName"
            {...form.register('lastName')}
            error={form.formState.errors.lastName?.message}
            isLoading={isLoadingSignUp}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="email" className="text-xs">
            E-mail
          </Label>
          <Input
            id="email"
            {...form.register('email')}
            error={form.formState.errors.email?.message}
            isLoading={isLoadingSignUp}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password" className="text-xs">
            Senha
          </Label>
          <Input
            id="password"
            type="password"
            {...form.register('password')}
            error={form.formState.errors.password?.message}
            isLoading={isLoadingSignUp}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="Confirmpassword" className="text-xs font-light">
            Confirmar Senha
          </Label>
          <Input
            id="Confirmpassword"
            type="password"
            {...form.register('confirmPassword')}
            error={form.formState.errors.confirmPassword?.message}
            isLoading={isLoadingSignUp}
          />
        </div>

        <Button onClick={handleSubmit} isLoading={isLoadingSignUp}>
          Criar conta
        </Button>
      </div>
    </FormAuth>
  );
}
