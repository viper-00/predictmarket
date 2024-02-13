import MetaTags from 'components/Common/MetaTags';
import SidebarWithHeader from 'components/Navigation/Sidebar';
import BridgePage from '../BridgePage';

const Bridge = () => {
  return (
    <>
      <MetaTags title="Bridge" />
      <SidebarWithHeader>
        <BridgePage />
      </SidebarWithHeader>
    </>
  );
};

export default Bridge;
