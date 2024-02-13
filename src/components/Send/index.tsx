import MetaTags from 'components/Common/MetaTags';
import SidebarWithHeader from 'components/Navigation/Sidebar';
import SendPage from '../SendPage';

const Send = () => {
  return (
    <>
      <MetaTags title="Send" />
      <SidebarWithHeader>
        <SendPage />
      </SidebarWithHeader>
    </>
  );
};

export default Send;
