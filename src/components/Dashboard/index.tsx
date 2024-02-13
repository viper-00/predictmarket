import MetaTags from 'components/Common/MetaTags';
import SidebarWithHeader from 'components/Navigation/Sidebar';
import DashboardPage from '../DashboardPage';

const Dashboard = () => {
  return (
    <>
      <MetaTags title="Dashboard" />
      <SidebarWithHeader>
        <DashboardPage />
      </SidebarWithHeader>
    </>
  );
};

export default Dashboard;
