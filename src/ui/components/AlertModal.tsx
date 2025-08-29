import { ReactNode } from 'react';

import { Button } from './Button';
import { Modal } from './Modal/Modal';

interface IAlertModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirmation: () => void;
  title: string;
  message: string | ReactNode;
  configButtons?: {
    cancelButtonTitle: string;
    confirmationButtonTitle: string;
  };
  loading: boolean;
}

export function AlertModal({
  open,
  title,
  message,
  handleClose,
  handleConfirmation,
  configButtons,
  loading,
}: IAlertModalProps) {
  return (
    <Modal
      open={open}
      title={title}
      handleCloseModal={handleClose}
      canButtonClose={false}
      loading={loading}
    >
      <div className="text-sm text-muted-foreground break-words">{message}</div>

      <div className="flex items-center gap-2 justify-end mt-4">
        <Button variant="outline" onClick={handleClose} isLoading={loading}>
          {configButtons ? configButtons.cancelButtonTitle : 'Cancelar'}
        </Button>
        <Button
          variant="destructive"
          onClick={handleConfirmation}
          isLoading={loading}
        >
          {configButtons ? configButtons.confirmationButtonTitle : 'Excluir'}
        </Button>
      </div>
    </Modal>
  );
}
