import React from 'react';
import { Button } from '@chakra-ui/react';

import { Link } from '../Link';

type Props = {};

const SignUpButton = (props: Props) => {
  return (
    <Link href="/signup">
      <Button
        fontWeight="medium" // Font weight
        colorScheme="whiteAlpha" // Chakra UI color scheme for button
        color="white" // Text color
        bg={'transparent'}
      >
        Sign Up
      </Button>
    </Link>
  );
};

export default SignUpButton;
