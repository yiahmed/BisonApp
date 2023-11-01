import React, { useEffect, useState } from 'react';

import Modal from '@/components/Modal/Modal';
import AuthModal from '@/components/Modal/AuthModal';
import UploadModal from '@/components/Modal/UploadModal';

type Props = {};

const ModalProvider = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
