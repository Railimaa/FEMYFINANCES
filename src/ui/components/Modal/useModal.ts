/* eslint-disable consistent-return */

import React, { useEffect, useId } from 'react';

import { useModalProvider } from '@app/contexts/ModalProvider';

interface IUseModalParams {
  open: boolean;
  handleCloseModal: () => void;
  loading: boolean;
}

export function useModal({ open, handleCloseModal, loading }: IUseModalParams) {
  const { registerStack, isTopStack, unRegisterStack } = useModalProvider();
  const idModal = useId();

  useEffect(() => {
    if (open) {
      registerStack(idModal);
    } else {
      unRegisterStack(idModal);
    }

    return () => unRegisterStack(idModal);
  }, [open, registerStack, idModal, unRegisterStack]);

  useEffect(() => {
    if (loading) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isTopStack(idModal)) {
        handleCloseModal();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleCloseModal, loading, isTopStack, idModal]);

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden';
      document.body.style.overflowX = 'hidden';
    }

    return () => {
      document.body.style.overflowY = '';
      document.body.style.overflowX = '';
    };
  }, [open]);

  function handleStopPropagation(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    event.stopPropagation();
  }

  return {
    handleStopPropagation,
  };
}
