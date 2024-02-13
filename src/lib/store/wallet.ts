import { Chain, WalletStatus } from 'packages/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Wallet = {
  name: string;
  type: string;
  address: string;
  chain: Chain;
  status: WalletStatus;
};

interface WalletPerisistState {
  name: Wallet['name'];
  type: Wallet['type'];
  address: Wallet['address'];
  chain: Wallet['chain'];
  status: Wallet['status'];

  setWalletName: (name: { name: string }) => void;
  setWalletType: (type: { type: string }) => void;
  setWalletAddress: (address: { address: string }) => void;
  setWalletChain: (chain: { chain: Chain }) => void;
  setWalletStatus: (status: { status: WalletStatus }) => void;
  hydrateWallet: () => Wallet;
  resetWallet: () => void;
}

export const useWalletPersistStore = create(
  persist<WalletPerisistState>(
    (set, get) => ({
      name: '',
      type: '',
      address: '',
      chain: Chain.ETH,
      status: WalletStatus.UNKNOWN,
      setWalletName: ({ name }) => set({ name }),
      setWalletType: ({ type }) => set({ type }),
      setWalletAddress: ({ address }) => set({ address }),
      setWalletChain: ({ chain }) => set({ chain }),
      setWalletStatus: ({ status }) => set({ status }),
      hydrateWallet: () => {
        return {
          name: get().name,
          type: get().type,
          chain: get().chain,
          address: get().address,
          status: get().status,
        };
      },
      resetWallet: () =>
        set((state) => {
          return {
            ...state,
            name: '',
            type: '',
            address: '',
            chain: Chain.ETH,
            status: WalletStatus.UNKNOWN,
          };
        }),
    }),
    {
      name: 'predictmarket.wallet.store',
    },
  ),
);

export default useWalletPersistStore;

export const setWalletName = (name: { name: string }) => useWalletPersistStore.getState().setWalletName(name);
export const setWalletType = (type: { type: string }) => useWalletPersistStore.getState().setWalletType(type);
export const setWalletAddress = (address: { address: string }) =>
  useWalletPersistStore.getState().setWalletAddress(address);
export const setWalletChain = (chain: { chain: Chain }) => useWalletPersistStore.getState().setWalletChain(chain);
export const setWalletStatus = (status: { status: WalletStatus }) =>
  useWalletPersistStore.getState().setWalletStatus(status);
export const resetWallet = () => useWalletPersistStore.getState().resetWallet();
export const hydrateWallet = () => useWalletPersistStore.getState().hydrateWallet();
