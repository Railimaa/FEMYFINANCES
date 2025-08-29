import { AlertModal } from '@ui/components/AlertModal';
import { Header } from '@ui/components/Header';
import { LoadingScreen } from '@ui/components/LoadingScreen';

import { AvatarHeader } from './components/AvatarHeader';
import { ContentForm } from './components/ContentForm';
import { LoadingDataUser } from './components/LoadingDataUser';
import { useAvatarHeader } from './hooks/useAvatarHeader';
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
    openModalDeleteImgProfile,
    handleToggleModalDeleteImgProfile,
    handleDeleteImgProfile,
    isLoadingMutationUser,
    isLoadingDeleteUser,
    isLoadingDeleteImgProfile,
  } = useMyProfile();
  const {
    isLoadingUpload,
    handleChangeUpload,
    refInputUpload,
    handleUpload,
    handleUpdateUploadImgProfile,
  } = useAvatarHeader();

  return (
    <>
      {(isLoadingUpdateUser || isLoadingUpload) && <LoadingScreen isLoading />}

      <Header />

      <div className="py-12 px-4 lg:px-20 lg:py-6">
        <div className="w-full min-h-screen flex">
          <div className="flex justify-center items-center w-full">
            <div className="flex items-center flex-col space-y-5 w-full max-w-[350px] p-6 lg:p-0 ">
              {isFetching && <LoadingDataUser />}

              {!isFetching && (
                <>
                  <AvatarHeader
                    isLoadingMutationUser={isLoadingMutationUser}
                    handleToggleModalDeleteAccount={
                      handleToggleModalDeleteAccount
                    }
                    handleToggleModalDeleteImgProfile={
                      handleToggleModalDeleteImgProfile
                    }
                    isLoadingUploadImgProfile={isLoadingUpload}
                    handleChangeUpload={handleChangeUpload}
                    refInputUpload={refInputUpload}
                    handleUpload={handleUpload}
                    user={user}
                    handleUpdateUploadImgProfile={handleUpdateUploadImgProfile}
                  />

                  <ContentForm
                    form={form}
                    handleSubmit={handleSubmit}
                    isDurtyy={isDurtyy}
                    isLoadingUpdateUser={isLoadingUpdateUser}
                    isLoadingUpload={isLoadingUpload}
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

      {openModalDeleteImgProfile && (
        <AlertModal
          open={openModalDeleteImgProfile}
          title="Deseja realmente excluir sua foto?"
          message={
            <>
              Sua <strong>foto</strong> será permanentemente removida.
            </>
          }
          handleClose={handleToggleModalDeleteImgProfile}
          handleConfirmation={handleDeleteImgProfile}
          loading={isLoadingDeleteImgProfile}
        />
      )}
    </>
  );
}
