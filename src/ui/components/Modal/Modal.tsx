/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
import { X } from 'lucide-react';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@app/utils/cn';

import { Button } from '../Button';

import { useModal } from './useModal';

interface IModalProps {
  open: boolean;
  handleCloseModal: () => void;
  title?: string;
  children: ReactNode;
  canButtonClose?: boolean;
  loading?: boolean;
  maxWidith?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  contentFull?: {
    contentFull: boolean;
    withPadding?: boolean;
  };
}

export function Modal({
  open,
  handleCloseModal,
  title,
  children,
  canButtonClose = true,
  loading = false,
  maxWidith = 'sm',
  contentFull = { contentFull: false, withPadding: false },
}: IModalProps) {
  const { handleStopPropagation } = useModal({
    open,
    handleCloseModal,
    loading,
  });

  if (!open) return null;

  const ModalContent = (
    <div
      onClick={loading ? () => {} : handleCloseModal}
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-foreground/30  z-[1002] animate-overlay-in-modal"
    >
      <div
        onClick={(event) => handleStopPropagation(event)}
        className={cn(
          'fixed bg-background border shadow-md z-[1003] p-4 rounded-md animate-scale-in-modal',
          contentFull.contentFull && contentFull.withPadding
            ? 'inset-0 m-2'
            : contentFull.contentFull && !contentFull.withPadding && 'inset-0',
          !contentFull.contentFull && maxWidith === 'xs' && 'max-w-[300px]',
          !contentFull.contentFull && maxWidith === 'sm' && 'max-w-[400px]',
          !contentFull.contentFull && maxWidith === 'md' && 'max-w-[600px]',
          !contentFull.contentFull && maxWidith === 'lg' && 'max-w-[800px]',
          !contentFull.contentFull && maxWidith === 'xl' && 'max-w-[1000px]',
        )}
      >
        <div
          className={cn(
            'flex flex-col  w-full h-full',
            !contentFull && 'justify-center',
          )}
        >
          <header className="flex justify-between items-center w-full">
            <h2 className="text-base font-semibold tracking-tight">{title}</h2>
            {canButtonClose && (
              <Button
                size="sm"
                variant="ghost"
                className="hover:bg-transparent focus:bg-transparent"
                onClick={handleCloseModal}
              >
                <div className="text-foreground/70 hover:text-foreground hover:stroke-[2.5] transition-all ease-in-out">
                  <X />
                </div>
              </Button>
            )}
          </header>

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );

  return createPortal(ModalContent, document.getElementById('modal-root')!);
}
