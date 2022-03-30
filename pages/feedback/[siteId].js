import { useRouter } from 'next/router';
import useSWR from 'swr';

import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/DashboardShell';
import FeedbackEmptyState from '@/components/FeedbackEmptyState';
import FeedbackTable from '@/components/FeedbackTable';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader';
import Page from '@/components/Page';

const SiteFeedback = () => {
  const { user } = useAuth();
  const { query } = useRouter();
  const { data } = useSWR(
    user ? [`/api/feedback/${query.siteId}`, user.token] : null,
    fetcher
  );

  if (!data) {
    return (
      <DashboardShell>
        <SiteFeedbackTableHeader siteName={data?.site?.name || '-'} />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteFeedbackTableHeader siteName={data?.site?.name || '-'} />
      {data.feedback?.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
};

const SiteFeedbackPage = () => {
  return (
    <Page name="My Feedback" path="/feedback">
      <SiteFeedback />
    </Page>
  );
};

export default SiteFeedbackPage;
