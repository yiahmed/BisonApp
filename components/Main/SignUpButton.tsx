import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';

import { Link } from '../Link';

import useAuthModal from '@/hooks/useAuthModal';

const SignUpButton = () => {
  const authModal = useAuthModal();

  return (
    // <Link href="/signup">
    <Button
      fontWeight="medium" // Font weight
      colorScheme="whiteAlpha" // Chakra UI color scheme for button
      color="white" // Text color
      bg={'transparent'}
      onClick={authModal.onOpen}
    >
      Sign Up
    </Button>
    // </Link>
  );
};

export default SignUpButton;
