import type { AppProps } from 'next/app';
import { Web3 } from 'packages/core';
import { useEffect } from 'react';
import { tokenList } from 'packages/constants/tokenList';
import Providers from 'components/Common/Providers';
import { walletFont } from 'packages/font';
import { getUserAuthorization } from 'lib/store/user';
import axios from 'packages/core/http/axios';
import { Http } from 'packages/core/http/http';
import { UserCoinBalance } from 'packages/types';
import { setEthBalance, setUsdcBalance, setUsdtBalance } from 'lib/store/balance';

// async function init() {
//   // const result = await Web3.getTransactionList(Chain.ETH, "0x79D9c06Bf20b7292F199872d4C4711206AdD1f1b")
//   // console.log(""result)
// }

// init();

// const preferredChains = [
//   arbitrum,
//   arbitrumGoerli,
//   avalanche,
//   avalancheFuji,
//   bsc,
//   bscTestnet,
//   fantom,
//   fantomTestnet,
//   foundry,
//   goerli,
//   mainnet,
//   optimism,
//   optimismGoerli,
//   polygon,
//   polygonMumbai,
//   sepolia,
// ];

// const { chains, publicClient } = configureChains(preferredChains, [publicProvider()]);

// const connectors: any = [new InjectedConnector({ chains, options: { shimDisconnect: true } })];

// const client = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
// });

const MyApp = ({ Component, pageProps }: AppProps) => {
  const updateBalance = async () => {
    if (getUserAuthorization() !== '') {
      const response: any = await axios.get(Http.userBalance);
      if (response.code === 10200 && response.result) {
        setEthBalance(response.data.eth);
        setUsdtBalance(response.data.usdt);
        setUsdcBalance(response.data.usdc);
      }
    }
  };

  useEffect(() => {
    const updateCoinPrice = setInterval(updateBalance, 1000 * 10);

    return () => {
      clearInterval(updateCoinPrice);
    };
  }, []);

  return (
    <Providers>
      <style jsx global>{`
        body {
          font-family: ${walletFont.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Providers>
  );
};

export default MyApp;
