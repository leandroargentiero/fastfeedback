import Head from 'next/head';
import NextLink from 'next/link';
import {
  Button,
  Flex,
  Text,
  Link,
  Box,
  Heading,
  VStack
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

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
      <VStack
        bgColor="white"
        px={5}
        py={16}
        borderRadius={4}
        border="1px solid"
        borderColor="gray.100"
      >
        <Box textAlign="center">
          <LogoIcon color="black" w={16} h={16} mb={4} />
          <Heading size="xl">Log in to Fast Feedback </Heading>
          <Text fontSize="sm" textAlign="center" maxWidth="450px" my={4}>
            This version of {''}
            Fast Feedback was built by{' '}
            <Link
              textDecoration="underline"
              _hover={{ textDecoration: 'none' }}
            >
              Leandro Argentiero
            </Link>{' '}
            as part of React 2025. It's an easy solution for adding comments or
            reviews to your static site. It's still a work in progress, but you
            can try it out by logging in.
          </Text>
        </Box>

        {auth.user ? (
          <NextLink href="/dashboard" passHref>
            <Button
              size="md"
              mt={4}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{ bg: 'gray.800', transform: 'scale(0.98)' }}
            >
              Go to dashboard
            </Button>
          </NextLink>
        ) : (
          <VStack>
            <Button
              onClick={(e) => auth.signinWithGitHub()}
              leftIcon={<FaGithub />}
              size="md"
              mt={4}
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
              mt={4}
              variant="outline"
            >
              Continue with Google
            </Button>
          </VStack>
        )}
      </VStack>
    </Flex>
  );
}
