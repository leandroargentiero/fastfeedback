import Head from 'next/head';
import { Button, Flex } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { useAuth } from '@/lib/auth';

import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';

export default function Index() {
  const auth = useAuth();

  return (
    <DashboardShell>
      {!auth.user ? <SiteTableSkeleton /> : <EmptyState />}
    </DashboardShell>
  );
}
