import useSWR from 'swr';

import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import FeedbackTable from '@/components/FeedbackTable';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';
import Page from '@/components/Page';

const Feedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data.feedback.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
};

const MyFeedbackPage = () => {
  return (
    <Page name="My Feedback" path="/feedback">
      <Feedback />
    </Page>
  );
};

export default MyFeedbackPage;
