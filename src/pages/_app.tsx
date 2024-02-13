import type { AppProps } from 'next/app';
import { Web3 } from 'packages/core';
import { useEffect } from 'react';
import { tokenList } from 'packages/constants/tokenList';
import Providers from 'components/Common/Providers';
import { walletFont } from 'packages/font';

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
  // useEffect(() => {
  //   const updateCoinPrice = setInterval(async () => {
  //     const ids: string[] = tokenList.map((token) => token.ids);
  //     await Web3.updateCryptoPrice(ids);
  //   }, 1000 * 10);

  //   return () => {
  //     clearInterval(updateCoinPrice);
  //   };
  // }, []);

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
