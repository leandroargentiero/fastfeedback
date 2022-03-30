import NextLink from 'next/link';
import { useSWRConfig } from 'swr';
import { Box, Code, Switch, Link, useToast } from '@chakra-ui/react';

import { updateFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { Td } from './Table';
import RemoveFeedbackButton from './RemoveFeedbackButton';

const FeedbackRow = ({ id, siteName, text, status, siteId }) => {
  const auth = useAuth();
  const { mutate } = useSWRConfig();
  const toast = useToast();
  const isChecked = status === 'active';

  const toggleStatus = async (e) => {
    try {
      await updateFeedback(id, {
        status: !isChecked ? 'active' : 'pending'
      });
      mutate([`/api/feedback/${siteId}`, auth.user.token]);
    } catch (error) {
      toast({
        title: 'Something went wrong.',
        description: "We couldn't toggle the status.",
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <Box as="tr" key={id}>
      <Td>
        <NextLink href={`/sites/${siteId}`} passHref>
          <Link fontWeight="medium">{siteName}</Link>
        </NextLink>
      </Td>
      <Td>{text}</Td>
      <Td>
        <Code>/</Code>
      </Td>
      <Td>
        <Switch
          size="md"
          colorScheme="green"
          isChecked={isChecked}
          onChange={toggleStatus}
        />
      </Td>
      <Td>
        <RemoveFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
