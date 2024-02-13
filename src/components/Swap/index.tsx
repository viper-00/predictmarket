import MetaTags from 'components/Common/MetaTags';
import SidebarWithHeader from 'components/Navigation/Sidebar';
import SwapPage from '../SwapPage';

const Swap = () => {
  return (
    <>
      <MetaTags title="Swap" />
      <SidebarWithHeader>
        <SwapPage />
      </SidebarWithHeader>
    </>
  );
};

export default Swap;
