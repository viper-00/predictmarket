import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PricePerisistState = {
  eth: {
    usd: number;
    usdMarketCap: number;
    usd24hVol: number;
    usd24hChange: number;
    lastUpdatedAt: number;
  };
  usdt: {
    usd: number;
    usdMarketCap: number;
    usd24hVol: number;
    usd24hChange: number;
    lastUpdatedAt: number;
  };
  usdc: {
    usd: number;
    usdMarketCap: number;
    usd24hVol: number;
    usd24hChange: number;
    lastUpdatedAt: number;
  };

  getEthCryptoPrice: () => {
    usd: number;
    usdMarketCap: number;
    usd24hVol: number;
    usd24hChange: number;
    lastUpdatedAt: number;
  };
  setEthCryptoPrice: (priceData: {
    usd: number;
    usdMarketCap: number;
    usd24hVol: number;
    usd24hChange: number;
    lastUpdatedAt: number;
  }) => void;

  getUsdtCryptoPrice: () => {
    usd: number;
    usdMarketCap: number;
    usd24hVol: number;
    usd24hChange: number;
    lastUpdatedAt: number;
  };
  setUsdtCryptoPrice: (priceData: {
    usd: number;
    usdMarketCap: number;
    usd24hVol: number;
    usd24hChange: number;
    lastUpdatedAt: number;
  }) => void;

  getUsdcCryptoPrice: () => {
    usd: number;
    usdMarketCap: number;
    usd24hVol: number;
    usd24hChange: number;
    lastUpdatedAt: number;
  };
  setUsdcCryptoPrice: (priceData: {
    usd: number;
    usdMarketCap: number;
    usd24hVol: number;
    usd24hChange: number;
    lastUpdatedAt: number;
  }) => void;

  resetPrice: () => void;
};

export const usePricePerisistStore = create(
  persist<PricePerisistState>(
    (set, get) => ({
      eth: {
        usd: 0,
        usdMarketCap: 0,
        usd24hVol: 0,
        usd24hChange: 0,
        lastUpdatedAt: 0,
      },
      usdt: {
        usd: 0,
        usdMarketCap: 0,
        usd24hVol: 0,
        usd24hChange: 0,
        lastUpdatedAt: 0,
      },
      usdc: {
        usd: 0,
        usdMarketCap: 0,
        usd24hVol: 0,
        usd24hChange: 0,
        lastUpdatedAt: 0,
      },
      getEthCryptoPrice: () => get().eth,
      setEthCryptoPrice: (priceData) =>
        set((state) => ({
          ...state,
          eth: {
            ...state.eth,
            ...priceData,
          },
        })),
      getUsdtCryptoPrice: () => get().usdt,
      setUsdtCryptoPrice: (priceData) =>
        set((state) => ({
          ...state,
          usdt: {
            ...state.usdt,
            ...priceData,
          },
        })),
      getUsdcCryptoPrice: () => get().usdc,
      setUsdcCryptoPrice: (priceData) =>
        set((state) => ({
          ...state,
          usdc: {
            ...state.usdc,
            ...priceData,
          },
        })),
      resetPrice: () => {
        set((state) => {
          return {
            ...state,
            eth: {
              usd: 0,
              usdMarketCap: 0,
              usd24hVol: 0,
              usd24hChange: 0,
              lastUpdatedAt: 0,
            },
            usdt: {
              usd: 0,
              usdMarketCap: 0,
              usd24hVol: 0,
              usd24hChange: 0,
              lastUpdatedAt: 0,
            },
            usdc: {
              usd: 0,
              usdMarketCap: 0,
              usd24hVol: 0,
              usd24hChange: 0,
              lastUpdatedAt: 0,
            },
          };
        });
      },
    }),
    {
      name: 'predictmarket.price.store',
    },
  ),
);

export default usePricePerisistStore;

export const setEthPrice = (priceData: {
  usd: number;
  usdMarketCap: number;
  usd24hVol: number;
  usd24hChange: number;
  lastUpdatedAt: number;
}) => usePricePerisistStore.getState().setEthCryptoPrice(priceData);
export const getEthPrice = () => usePricePerisistStore.getState().getEthCryptoPrice();
export const setUsdtPrice = (priceData: {
  usd: number;
  usdMarketCap: number;
  usd24hVol: number;
  usd24hChange: number;
  lastUpdatedAt: number;
}) => usePricePerisistStore.getState().setUsdtCryptoPrice(priceData);
export const getUsdtPrice = () => usePricePerisistStore.getState().getUsdtCryptoPrice();
export const setUsdcPrice = (priceData: {
  usd: number;
  usdMarketCap: number;
  usd24hVol: number;
  usd24hChange: number;
  lastUpdatedAt: number;
}) => usePricePerisistStore.getState().setUsdcCryptoPrice(priceData);
export const getUsdcPrice = () => usePricePerisistStore.getState().getUsdcCryptoPrice();
