import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPerisistState {
  authorization: string;
  address: string;
  contractAddress: string;
  chainId: number;
  username: string;
  avatarUrl: string;
  joinedDate: number;
  email: string;
  bio: string;

  setEmail: (email: string) => void;
  getEmail: () => string;
  setAuthorization: (authorization: string) => void;
  getAuthorization: () => string;
  setAddress: (address: string) => void;
  getAddress: () => string;
  setContractAddress: (contractAddress: string) => void;
  getContractAddress: () => string;
  setChainId: (chainId: number) => void;
  getChainId: () => number;
  setUsername: (username: string) => void;
  getUsername: () => string;
  setAvatarUrl: (avatarUrl: string) => void;
  getAvatarUrl: () => string;
  setJoinedDate: (joinedDate: number) => void;
  getJoinedDate: () => number;
  setBio: (bio: string) => void;
  getBio: () => string;

  resetUser: () => void;
}

export const useUserPresistStore = create(
  persist<UserPerisistState>(
    (set, get) => ({
      authorization: '',
      address: '',
      email: '',
      contractAddress: '',
      chainId: 0,
      username: '',
      avatarUrl: '',
      bio: '',
      joinedDate: 0,
      setAuthorization: (value) => set(() => ({ authorization: value })),
      getAuthorization: () => get().authorization,
      setAddress: (value) => set(() => ({ address: value })),
      getAddress: () => get().address,
      setEmail: (value) => set(() => ({ email: value })),
      getEmail: () => get().email,
      setContractAddress: (value) => set(() => ({ contractAddress: value })),
      getContractAddress: () => get().contractAddress,
      setChainId: (value) => set(() => ({ chainId: value })),
      getChainId: () => get().chainId,
      setUsername: (value) => set(() => ({ username: value })),
      getUsername: () => get().username,
      setBio: (value) => set(() => ({ bio: value })),
      getBio: () => get().bio,
      setAvatarUrl: (value) => set(() => ({ avatarUrl: value })),
      getAvatarUrl: () => get().avatarUrl,
      setJoinedDate: (value) => set(() => ({ joinedDate: value })),
      getJoinedDate: () => get().joinedDate,
      resetUser: () => {
        set((state) => {
          return {
            ...state,
            authorization: '',
            address: '',
            email: '',
            contractAddress: '',
            chainId: 0,
            username: '',
            avatarUrl: '',
            joinedDate: 0,
            bio: '',
          };
        });
      },
    }),
    {
      name: 'predictmarket.user.store',
    },
  ),
);

export default useUserPresistStore;

export const setUserAuthorization = (authorization: string) =>
  useUserPresistStore.getState().setAuthorization(authorization);
export const getUserAuthorization = () => useUserPresistStore.getState().getAuthorization();
export const setUserAddress = (address: string) => useUserPresistStore.getState().setAddress(address);
export const getUserAddress = () => useUserPresistStore.getState().getAddress();
export const setUserEmail = (email: string) => useUserPresistStore.getState().setEmail(email);
export const getUserEmail = () => useUserPresistStore.getState().getEmail();
export const setUserContractAddress = (contractAddress: string) =>
  useUserPresistStore.getState().setContractAddress(contractAddress);
export const getUserContractAddress = () => useUserPresistStore.getState().getContractAddress();
export const setUserChainId = (chainId: number) => useUserPresistStore.getState().setChainId(chainId);
export const getUserChainId = () => useUserPresistStore.getState().getChainId();
export const setUsername = (username: string) => useUserPresistStore.getState().setUsername(username);
export const getUsername = () => useUserPresistStore.getState().getUsername();
export const setUserBio = (bio: string) => useUserPresistStore.getState().setBio(bio);
export const getUserBio = () => useUserPresistStore.getState().getBio();
export const setUserAvatarUrl = (avatarUrl: string) => useUserPresistStore.getState().setAvatarUrl(avatarUrl);
export const getUserAvatarUrl = () => useUserPresistStore.getState().getAvatarUrl();
export const setJoinedDate = (joinedDate: number) => useUserPresistStore.getState().setJoinedDate(joinedDate);
export const getJoinedDate = () => useUserPresistStore.getState().getJoinedDate();

export const resetUser = () => useUserPresistStore.getState().resetUser();
