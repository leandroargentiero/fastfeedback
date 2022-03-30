import NextLink from 'next/link';
import { Avatar, Flex, Link, Stack, Container } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { LogoIcon } from './CustomIcons';

const DashboardShell = ({ children }) => {
  const auth = useAuth();

  return (
    <>
      <Flex
        as="header"
        w="full"
        backgroundColor="white"
        justifyContent="space-between"
        py={4}
        px={8}
      >
        <Stack as="nav" spacing={4} isInline alignItems="center">
          <NextLink href="/" passHref>
            <Link>
              <LogoIcon color="black" w={8} h={8} />
            </Link>
          </NextLink>
          <NextLink href="/sites" passHref>
            <Link>Sites</Link>
          </NextLink>
          <NextLink href="/feedback" passHref>
            <Link>Feedback</Link>
          </NextLink>
        </Stack>
        <Flex alignItems="center" justifyContent="center">
          <Link mr={4} onClick={(e) => auth.signout('/')}>
            Logout
          </Link>
          <Avatar size="sm" src={auth?.user?.photoUrl} />
        </Flex>
      </Flex>
      <Container as="main" maxW="container.lg" pt={8}>
        {children}
      </Container>
    </>
  );
};

export default DashboardShell;
