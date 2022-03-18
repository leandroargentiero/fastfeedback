import Head from 'next/head';
import { Button, Flex, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/components/CustomIcons';
import Link from 'next/link';

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `
          }}
        />
      </Head>

      <LogoIcon color="black" w={16} h={16} />

      <Text fontSize="sm" textAlign="center" maxWidth="450px" my={4}>
        Fast Feedback is being built as part of React 2025. It's an easy
        solution for adding comments or reviews to your static site. It's still
        a work in progress, but you can try it out by logging in.
      </Text>

      {auth.user ? (
        <Link href="/dashboard" passHref>
          <Button as="a" size="sm" mt={4}>
            Go to dashboard →
          </Button>
        </Link>
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
