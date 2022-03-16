import { Heading, Text, Button } from '@chakra-ui/react';
import DashboardShell from './DashboardShell';

const EmptyState = () => (
  <DashboardShell>
    <Heading size="md" mb={2}>
      You haven't added any sites
    </Heading>
    <Text mb={4}>Welcome 👋🏻 Let's get started.</Text>
    <Button variant="solid" size="md">
      Add your first site
    </Button>
  </DashboardShell>
);

export default EmptyState;
