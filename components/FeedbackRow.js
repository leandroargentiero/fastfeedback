import { useState } from 'react';
import NextLink from 'next/link';
import { mutate } from 'swr';
import { Box, Code, Switch, Link } from '@chakra-ui/react';

import { updateFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { Td } from './Table';
import RemoveFeedbackButton from './RemoveFeedbackButton';

const FeedbackRow = ({ id, siteName, text, status, siteId }) => {
  const [checked, setChecked] = useState(status === 'active');
  const auth = useAuth();

  const toggleStatus = async (e) => {
    await updateFeedback(id, {
      status: !checked ? 'active' : 'pending'
    });
    mutate(['/api/feedback', auth.user.token]);
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
          isChecked={status === 'active'}
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
