import Head from 'next/head';
import { Button, Flex } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/components/CustomIcons';

export default function Index() {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <LogoIcon color="black" w={16} h={16} />

      {auth.user ? (
        <Button onClick={(e) => auth.signout()} size="sm" mt={4}>
          Sign Out
        </Button>
      ) : (
        <Button
          onClick={(e) => auth.signinWithGitHub()}
          rightIcon={<ArrowForwardIcon />}
          size="sm"
          mt={4}
        >
          Sign in with Github
        </Button>
      )}
    </Flex>
  );
}
