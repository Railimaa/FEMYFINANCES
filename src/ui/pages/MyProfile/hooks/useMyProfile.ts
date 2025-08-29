import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuthContext } from '@app/contexts/AuthProvider/AuthProvider';
import { useDeleteImgProfile } from '@app/contexts/AuthProvider/hooks/useDeleteImgProfile';
import { useDeleteUser } from '@app/contexts/AuthProvider/hooks/useDeleteUser';
import { useGetUser } from '@app/contexts/AuthProvider/hooks/useGetUser';
import { useUpdateUser } from '@app/contexts/AuthProvider/hooks/useUpdateUser';
import { queryClient } from '@app/libs/queryClient';

export function useMyProfile() {
  const { user, signedIn, signOut } = useAuthContext();
  const { onUpdateUser, isLoadingUpdateUser } = useUpdateUser();
  const { onDeleteUser, isLoadingDeleteUser } = useDeleteUser();
  const { onDeleteImgProfile, isLoadingDeleteImgProfile } =
    useDeleteImgProfile();
  const { isFetching } = useGetUser(signedIn);
  const [openModalDeleteAccount, handleToggleModalDeleteAccount] = useReducer(
    (prevState) => !prevState,
    false,
  );
  const [openModalDeleteImgProfile, handleToggleModalDeleteImgProfile] =
    useReducer((prevState) => !prevState, false);

  const isLoadingMutationUser =
    isLoadingUpdateUser || isLoadingDeleteUser || isLoadingDeleteImgProfile;

  const schema = z.object({
    firstName: z.string().min(1, 'Nome é obrigatório'),
    lastName: z.string().min(1, 'Sobrenome é obrigatório'),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    resolver: zodResolver(schema),
  });
  const isDurtyy = Object.keys(form.formState.dirtyFields).length > 0;

  const handleSubmit = form.handleSubmit(async ({ firstName, lastName }) => {
    try {
      await onUpdateUser({
        firstName,
        lastName,
      });
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      toast.success('Dados atualizados com sucesso!', {
        position: 'top-right',
      });
    } catch {
      toast.error('Erro ao atualizar dados!', { position: 'top-right' });
    }
  });

  async function handleDeleteUser() {
    try {
      await onDeleteUser();
      handleToggleModalDeleteAccount();
      signOut();
      toast.success('Sucesso, todos seus dados foram removidos.', {
        position: 'top-right',
      });
    } catch {
      toast.error('Erro ao excluir conta.', { position: 'top-right' });
    } finally {
      handleToggleModalDeleteAccount();
    }
  }

  async function handleDeleteImgProfile() {
    try {
      const { imgProfile } = user.profile;
      const fileKey = imgProfile.split('/')[3];

      await onDeleteImgProfile(fileKey);
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      toast.success('Foto deletada com sucesso!', { position: 'top-right' });
    } catch {
      toast.error('Erro ao deletar foto!', { position: 'top-right' });
    } finally {
      handleToggleModalDeleteImgProfile();
    }
  }

  useEffect(() => {
    form.resetField('firstName', { defaultValue: user.firstName });
    form.resetField('lastName', { defaultValue: user.lastName });
  }, [user, form]);

  return {
    form,
    handleSubmit,
    user,
    isLoadingUpdateUser,
    isFetching,
    isDurtyy,
    openModalDeleteAccount,
    handleToggleModalDeleteAccount,
    isLoadingDeleteUser,
    handleDeleteUser,
    openModalDeleteImgProfile,
    handleToggleModalDeleteImgProfile,
    handleDeleteImgProfile,
    isLoadingMutationUser,
    isLoadingDeleteImgProfile,
  };
}
