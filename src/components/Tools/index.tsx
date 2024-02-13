import MetaTags from 'components/Common/MetaTags';
import SidebarWithHeader from 'components/Navigation/Sidebar';
import DeFiPage from './defi';
import NFTPage from './nft';
import BlockExplorerPage from './blockExplorer';
import DaosPage from './daos';
import DeveloperPage from './developer';
import NewsPage from './news';
import SecurityPage from './security';
import StoragePage from './storage';
import TechPage from './tech';
import WalletPage from './wallet';

import { useRouter } from 'next/router';

const Tools = () => {
  const router = useRouter();

  return (
    <>
      <MetaTags title="Tools" />
      <SidebarWithHeader>
        {router.pathname === '/tools/defi' && <DeFiPage />}
        {router.pathname === '/tools/nft' && <NFTPage />}
        {router.pathname === '/tools/blockexplorer' && <BlockExplorerPage />}
        {router.pathname === '/tools/daos' && <DaosPage />}
        {router.pathname === '/tools/developer' && <DeveloperPage />}
        {router.pathname === '/tools/news' && <NewsPage />}
        {router.pathname === '/tools/security' && <SecurityPage />}
        {router.pathname === '/tools/storage' && <StoragePage />}
        {router.pathname === '/tools/tech' && <TechPage />}
        {router.pathname === '/tools/wallet' && <WalletPage />}
      </SidebarWithHeader>
    </>
  );
};

export default Tools;
