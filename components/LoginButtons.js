import { Button, HStack } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '@/lib/auth';

const LoginButtons = () => {
  const auth = useAuth();

  return (
    <HStack gap={2}>
      <Button
        onClick={(e) => auth.signinWithGitHub()}
        leftIcon={<FaGithub />}
        size="md"
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.800', transform: 'scale(0.98)' }}
      >
        Continue with Github
      </Button>
      <Button
        onClick={(e) => auth.signinWithGoogle()}
        leftIcon={<FcGoogle />}
        size="md"
        variant="outline"
        backgroundColor="white"
        _hover={{ bg: 'gray.50' }}
      >
        Continue with Google
      </Button>
    </HStack>
  );
};

export default LoginButtons;
