import { Heading, Text, Button } from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';
import DashboardShell from './DashboardShell';

const EmptyState = () => (
  <DashboardShell>
    <Heading size="md" mb={2}>
      You haven't added any sites
    </Heading>
    <Text mb={4}>Welcome 👋🏻 Let's get started.</Text>
    <AddSiteModal />
  </DashboardShell>
);

export default EmptyState;
