import { AlertModal } from '@ui/components/AlertModal';
import { Header } from '@ui/components/Header';
import { LoadingScreen } from '@ui/components/LoadingScreen';

import { AvatarHeader } from './components/AvatarHeader';
import { ContentForm } from './components/ContentForm';
import { LoadingDataUser } from './components/LoadingDataUser';
import { useMyProfile } from './hooks/useMyProfile';

export function MyProfile() {
  const {
    form,
    handleSubmit,
    isLoadingUpdateUser,
    user,
    isFetching,
    isDurtyy,
    openModalDeleteAccount,
    handleToggleModalDeleteAccount,
    handleDeleteUser,
    isLoadingMutationUser,
    isLoadingDeleteUser,
  } = useMyProfile();

  return (
    <>
      {isLoadingUpdateUser && <LoadingScreen isLoading />}

      <Header />

      <div className="py-12 px-4 lg:px-20 lg:py-6">
        <div className="w-full min-h-screen flex">
          <div className="flex justify-center items-center w-full">
            <div className="flex items-center flex-col space-y-5 w-full max-w-[350px] p-6 lg:p-0 ">
              {isFetching && <LoadingDataUser />}

              {!isFetching && (
                <>
                  <AvatarHeader
                    handleToggleModalDeleteAccount={
                      handleToggleModalDeleteAccount
                    }
                    isLoadingMutationUser={isLoadingMutationUser}
                    user={user}
                  />

                  <ContentForm
                    form={form}
                    handleSubmit={handleSubmit}
                    isDurtyy={isDurtyy}
                    isLoadingUpdateUser={isLoadingUpdateUser}
                    user={user}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {openModalDeleteAccount && (
        <AlertModal
          open={openModalDeleteAccount}
          title="Deseja realmente excluir sua conta?"
          message={
            <>
              Essa ação é <strong>irreversível</strong> e todos os seus dados
              serão permanentemente
            </>
          }
          handleClose={handleToggleModalDeleteAccount}
          handleConfirmation={handleDeleteUser}
          loading={isLoadingDeleteUser}
        />
      )}
    </>
  );
}
