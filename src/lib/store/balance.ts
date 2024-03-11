import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BalancePerisistState = {
  eth: string;
  usdt: string;
  usdc: string;

  setEth: (eth: string) => void;
  getEth: () => string;
  setUsdt: (usdt: string) => void;
  getUsdt: () => string;
  setUsdc: (usdc: string) => void;
  getUsdc: () => string;

  resetBalance: () => void;
};

export const useBalancePerisistStore = create(
  persist<BalancePerisistState>(
    (set, get) => ({
      eth: '',
      usdt: '',
      usdc: '',
      setEth: (value) => set(() => ({ eth: value })),
      getEth: () => get().eth,
      setUsdt: (value) => set(() => ({ usdt: value })),
      getUsdt: () => get().usdt,
      setUsdc: (value) => set(() => ({ usdc: value })),
      getUsdc: () => get().usdc,
      resetBalance: () => {
        set((state) => {
          return {
            ...state,
            eth: '',
            usdt: '',
            usdc: '',
          };
        });
      },
    }),
    {
      name: 'predictmarket.balance.store',
    },
  ),
);

export default useBalancePerisistStore;

export const setEthBalance = (value: string) => useBalancePerisistStore.getState().setEth(value);
export const getEthBalance = () => useBalancePerisistStore.getState().getEth();
export const setUsdtBalance = (value: string) => useBalancePerisistStore.getState().setUsdt(value);
export const getUsdtBalance = () => useBalancePerisistStore.getState().getUsdt();
export const setUsdcBalance = (value: string) => useBalancePerisistStore.getState().setUsdc(value);
export const getUsdcBalance = () => useBalancePerisistStore.getState().getUsdc();
