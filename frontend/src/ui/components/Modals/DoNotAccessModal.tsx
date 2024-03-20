'use client';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import React from 'react';

export default function DoNotAccessModal() {
  const isProcessing = false;
  if (!isProcessing) return null;

  return (
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isOpen={true}
      size="full"
      onClose={() => {}}
    >
      <ModalOverlay bg="transparent" cursor="not-allowed" />
    </Modal>
  );
}
