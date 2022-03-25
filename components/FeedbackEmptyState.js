import { Heading, Text } from '@chakra-ui/react';

import DashboardPanel from './DashboardPanel';

const FeedbackEmptyState = () => (
  <DashboardPanel>
    <Heading size="md" mb={2} textAlign="center">
      You haven't received any feedback yet.
    </Heading>
    <Text mb={4}>Make sure you shared your site. </Text>
  </DashboardPanel>
);

export default FeedbackEmptyState;
