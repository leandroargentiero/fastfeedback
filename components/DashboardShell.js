import { useAuth } from '@/lib/auth';
import {
  Flex,
  Link,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { LogoIcon } from './CustomIcons';
import DashboardPanel from './DashboardPanel';

const DashboardShell = ({ children }) => {
  const auth = useAuth();

  return (
    <Flex flexDirection="column">
      <Flex
        backgroundColor="white"
        justifyContent="space-between"
        py={4}
        px={8}
      >
        <Stack spacing={4} isInline alignItems="center">
          <LogoIcon color="black" w={8} h={8} />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Flex alignItems="center" justifyContent="center">
          <Link mr={4} onClick={(e) => auth.signout('/')}>
            Logout
          </Link>
          <Avatar size="sm" src={auth?.user?.photoURL} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.50" p={8} height="100%">
        <Flex
          flexDirection="column"
          maxWidth="800px"
          w="100%"
          ml="auto"
          mr="auto"
          justifyContent="center"
          alignItems="flex-start"
          borderRadius={4}
        >
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink color="gray.600" fontSize="sm">
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex w="full" justifyContent="space-between" mb={7}>
            <Heading size="xl">My sites</Heading>
            <Button
              backgroundColor="gray.800"
              color="gray.100"
              leftIcon={<AddIcon w={3} h={3} />}
            >
              Add site
            </Button>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
