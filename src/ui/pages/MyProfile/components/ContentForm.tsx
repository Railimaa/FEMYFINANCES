import { UseFormReturn } from 'react-hook-form';

import { User } from '@app/services/UserService/types/User';
import { Button } from '@ui/components/Button';
import { Input } from '@ui/components/Input';
import { Label } from '@ui/components/Label';

type ContentFormProps = {
  form: UseFormReturn<
    {
      firstName: string;
      lastName: string;
    },
    any,
    {
      firstName: string;
      lastName: string;
    }
  >;
  isLoadingUpdateUser: boolean;
  handleSubmit: () => Promise<void>;
  user: User;
  isDurtyy: boolean;
};

export function ContentForm({
  form,
  isLoadingUpdateUser,
  handleSubmit,
  user,
  isDurtyy,
}: ContentFormProps) {
  return (
    <>
      <div className="w-full">
        <Label htmlFor="firstName">Nome</Label>
        <Input
          id="firstName"
          {...form.register('firstName')}
          error={form.formState.errors.firstName?.message}
          isLoading={isLoadingUpdateUser}
        />
      </div>

      <div className="w-full ">
        <Label htmlFor="lastName">Sobrenome</Label>
        <Input
          id="lastName"
          {...form.register('lastName')}
          error={form.formState.errors.lastName?.message}
          isLoading={isLoadingUpdateUser}
        />
      </div>
      <div className="w-full ">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" value={user.email} disabled />
      </div>
      <div className="w-full ">
        <Label htmlFor="createdAt">Data criação</Label>
        <Input
          id="createdAt"
          value={new Date(user.createdAt).toISOString().split('T')[0]}
          type="date"
          disabled
        />
      </div>
      <Button
        className="w-full"
        onClick={handleSubmit}
        isLoading={isLoadingUpdateUser}
        disabled={!isDurtyy}
      >
        Salvar
      </Button>
    </>
  );
}
