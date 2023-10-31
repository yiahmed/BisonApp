import React from 'react';
import { Button } from '@chakra-ui/react';

import { Link } from '../Link';

import useAuthModal from '@/hooks/useAuthModal';

type Props = {};

const LoginButton = (props: Props) => {
  const authModal = useAuthModal();
  return (
    // <Link href="/login">
    <Button
      w="100%" // Width
      px={6} // Padding X-axis
      py={2} // Padding Y-axis
      fontWeight="bold" // Font weight
      color="black" // Text color
      transition="background-color 0.2s, opacity 0.2s" // Transition properties
      bg="white" // Background color
      borderWidth="1px" // Border width
      borderColor="transparent" // Border color
      borderRadius="full" // Rounded corners
      _disabled={{ cursor: 'not-allowed', opacity: '0.5' }} // Disabled state styles
      _hover={{ opacity: '0.75' }} // Hover state styles
      onClick={authModal.onOpen}
    >
      Login
    </Button>
    // </Link>
  );
};

export default LoginButton;
