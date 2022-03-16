import { Heading, Box, Text, Button } from '@chakra-ui/react';
import DashboardShell from './DashboardShell';

const FreePlanEmptyState = () => (
  <DashboardShell>
    <Heading size="md">Get feedback on your site instantly</Heading>
    <Text>Start today, then grow with us 🌱</Text>
    <Button variant="solid" size="md">
      Upgrade to starter
    </Button>
  </DashboardShell>
);

export default FreePlanEmptyState;
