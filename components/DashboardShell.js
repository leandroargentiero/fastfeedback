import { useAuth } from '@/lib/auth';
import {
  Flex,
  Link,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading
} from '@chakra-ui/react';
import { LogoIcon } from './CustomIcons';

const DashboardShell = ({ children }) => {
  const auth = useAuth();
  console.log(auth);
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
          <Link mr={4}>Account</Link>
          <Avatar size="sm" src={auth.user.photoURL} />
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
          <Heading mb={7} size="xl">
            Sites
          </Heading>
          <Flex
            width="100%"
            backgroundColor="white"
            p={16}
            borderRadius={8}
            direction="column"
            alignItems="center"
            border="1px"
            borderColor="gray.100"
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
