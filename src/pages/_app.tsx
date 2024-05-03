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
import { getUsdtBalance, setEthBalance, setTotalBalance, setUsdcBalance, setUsdtBalance } from 'lib/store/balance';
import { getEthPrice, getUsdcPrice, getUsdtPrice, setEthPrice, setUsdcPrice, setUsdtPrice } from 'lib/store/price';
import { addition, division, multiply, subtraction } from 'utils/number';

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
    try {
      if (getUserAuthorization() !== '') {
        const response: any = await axios.get(Http.userBalance);
        if (response.code === 10200 && response.result) {
          setEthBalance(response.data.eth);
          setUsdtBalance(response.data.usdt);
          setUsdcBalance(response.data.usdc);
          const total = addition(
            addition(multiply(response.data.eth, getEthPrice().usd), multiply(response.data.usdt, getUsdtPrice().usd)),
            multiply(response.data.usdc, getUsdcPrice().usd),
          );
          setTotalBalance(total.toFixed(2));
        }
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const updatePrice = async () => {
    try {
      const response: any = await axios.get(Http.cryptoPrice);
      if (response.code === 10200 && response.result) {
        setEthPrice({
          usd: response.data.eth.usd,
          usdMarketCap: response.data.eth.usd_market_cap,
          usd24hVol: response.data.eth.usd_24h_vol,
          usd24hChange: response.data.eth.usd_24h_change,
          lastUpdatedAt: response.data.eth.last_updated_at,
        });

        setUsdtPrice({
          usd: response.data.usdt.usd,
          usdMarketCap: response.data.usdt.usd_market_cap,
          usd24hVol: response.data.usdt.usd_24h_vol,
          usd24hChange: response.data.usdt.usd_24h_change,
          lastUpdatedAt: response.data.usdt.last_updated_at,
        });

        setUsdcPrice({
          usd: response.data.usdc.usd,
          usdMarketCap: response.data.usdc.usd_market_cap,
          usd24hVol: response.data.usdc.usd_24h_vol,
          usd24hChange: response.data.usdc.usd_24h_change,
          lastUpdatedAt: response.data.usdc.last_updated_at,
        });
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  useEffect(() => {
    const updateCoinPrice = setInterval(updatePrice, 1000 * 10);
    const updateCoinBalance = setInterval(updateBalance, 1000 * 10);

    return () => {
      clearInterval(updateCoinPrice);
      clearInterval(updateCoinBalance);
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
