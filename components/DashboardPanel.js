import { Flex } from '@chakra-ui/react';

const DashboardPanel = ({ children }) => (
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
);

export default DashboardPanel;
