import Head from 'next/head';
import { Button, Flex } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';

export default function Index() {
  const auth = useAuth();

  if (!auth.user) {
    return 'Loading...';
  }

  return <EmptyState />;
}
