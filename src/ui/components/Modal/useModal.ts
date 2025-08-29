/* eslint-disable consistent-return */
import React, { useEffect } from 'react';

interface IUseModalParams {
  open: boolean;
  handleCloseModal: () => void;
  loading: boolean;
}

export function useModal({ open, handleCloseModal, loading }: IUseModalParams) {
  useEffect(() => {
    if (loading) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleCloseModal, loading]);

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
