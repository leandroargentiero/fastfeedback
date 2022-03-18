import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Link,
  Stack
} from '@chakra-ui/react';

import AddSiteModal from './AddSiteModal';
import { useAuth } from '@/lib/auth';
import { LogoIcon } from './CustomIcons';

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
          <Avatar size="sm" src={auth?.user?.photoUrl} />
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
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
