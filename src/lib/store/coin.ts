import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type coin = {
  ids: string;
  price: string;
  usdMarketCap: string;
  usd24hVol: string;
  usd24hChange: string;
  lastUpdatedAt: number;
};

type Coins = {
  btc: string | null;
  eth: string | null;

  cryptoCoins: coin[] | [];
};

interface CoinPerisistState {
  cryptoCoins: Coins['cryptoCoins'];
  setCryptoCoins: (coins: { cryptoCoins: coin[] }) => void;
  getCryptoCoins: () => coin[];
}

export const useCoinPersistStore = create(
  persist<CoinPerisistState>(
    (set, get) => ({
      cryptoCoins: [],
      setCryptoCoins: ({ cryptoCoins }) => set({ cryptoCoins }),
      getCryptoCoins: () => get().cryptoCoins,
    }),
    {
      name: 'predictmarket.coin.store',
    },
  ),
);

export default useCoinPersistStore;

export const setCryptoCoins = (coins: { cryptoCoins: coin[] }) => useCoinPersistStore.getState().setCryptoCoins(coins);
export const getCryptoCoins = () => useCoinPersistStore.getState().getCryptoCoins();
