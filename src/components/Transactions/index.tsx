import MetaTags from 'components/Common/MetaTags';
import SidebarWithHeader from 'components/Navigation/Sidebar';
import TransactionsPage from '../TransactionsPage';

const Transactions = () => {
  return (
    <>
      <MetaTags title="Transactions" />
      <SidebarWithHeader>
        <TransactionsPage />
      </SidebarWithHeader>
    </>
  );
};

export default Transactions;
