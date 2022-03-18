import useSWR from 'swr';

import DashboardShell from '@/components/DashboardShell';
import fetcher from '@/utils/fetcher';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';

const Dashboard = () => {
  const { data } = useSWR('/api/sites', fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <SiteTableSkeleton />}
    </DashboardShell>
  );
};

export default Dashboard;
