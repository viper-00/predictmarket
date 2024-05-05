import { CoinbaseWalletConnector } from '@wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from '@wagmi/connectors/injected';
import { WalletConnectConnector } from '@wagmi/connectors/walletConnect';

import { type FC, type ReactNode } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { optimism, optimismSepolia } from 'wagmi/chains';
import { PRED_APP_NAME, WC_PROJECT_ID } from 'packages/constants';

const { chains, publicClient } = configureChains([optimismSepolia], [publicProvider()]);

const connectors: any = [
  new InjectedConnector({ chains, options: { shimDisconnect: true } }),
  new CoinbaseWalletConnector({ options: { appName: PRED_APP_NAME } }),
  new WalletConnectConnector({
    options: {
      projectId: WC_PROJECT_ID,
    },
    chains,
  }),
];

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

type Props = {
  children: ReactNode;
};

const Web3Provider: FC<Props> = ({ children }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};

export default Web3Provider;
