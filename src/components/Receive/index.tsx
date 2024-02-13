import MetaTags from 'components/Common/MetaTags';
import SidebarWithHeader from 'components/Navigation/Sidebar';
import ReceivePage from '../ReceivePage';

const Receive = () => {
  return (
    <>
      <MetaTags title="Receive" />
      <SidebarWithHeader>
        <ReceivePage />
      </SidebarWithHeader>
    </>
  );
};

export default Receive;
