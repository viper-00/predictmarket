import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EventPerisistState {
  title: string;
  type: string;
  playType: string;
  // ruleDetails: string;
  expireTime: number;
  logo: string;
  // singleAmount: number;
  // capitalPoolAmount: number;
  settlementAddress: string;
  password: string;
  confirmPassword: string;

  setTitle: (title: string) => void;
  getTitle: () => string;
  setType: (type: string) => void;
  getType: () => string;
  setPlayType: (playType: string) => void;
  getPlayType: () => string;
  // setRuleDetails: (ruleDetails: string) => void;
  // getRuleDetails: () => string;
  setExpireTime: (expireTime: number) => void;
  getExpireTime: () => number;
  setLogo: (logo: string) => void;
  getLogo: () => string;
  // setSingleAmount: (singleAmount: number) => void;
  // getSingleAmount: () => number;
  // setCapitalPoolAmount: (capitalPoolAmount: number) => void;
  // getCapitalPoolAmount: () => number;
  setSettlementAddress: (settlementAddress: string) => void;
  getSettlementAddress: () => string;
  setPassword: (password: string) => void;
  getPassword: () => string;
  setConfirmPassword: (confirmPassword: string) => void;
  getConfirmPassword: () => string;

  resetEvent: () => void;
}

export const useEventPerisistStore = create(
  persist<EventPerisistState>(
    (set, get) => ({
      title: '',
      type: '',
      playType: '',
      // ruleDetails: '',
      expireTime: 0,
      logo: '',
      // singleAmount: 0,
      // capitalPoolAmount: 0,
      settlementAddress: '',
      password: '',
      confirmPassword: '',
      setTitle: (value) => set(() => ({ title: value })),
      getTitle: () => get().title,
      setType: (value) => set(() => ({ type: value })),
      getType: () => get().type,
      setPlayType: (value) => set(() => ({ playType: value })),
      getPlayType: () => get().playType,
      // setRuleDetails: (value) => set(() => ({ ruleDetails: value })),
      // getRuleDetails: () => get().ruleDetails,
      setExpireTime: (value) => set(() => ({ expireTime: value })),
      getExpireTime: () => get().expireTime,
      setLogo: (value) => set(() => ({ logo: value })),
      getLogo: () => get().logo,
      // setSingleAmount: (value) => set(() => ({ singleAmount: value })),
      // getSingleAmount: () => get().singleAmount,
      // setCapitalPoolAmount: (value) => set(() => ({ capitalPoolAmount: value })),
      // getCapitalPoolAmount: () => get().capitalPoolAmount,
      setSettlementAddress: (value) => set(() => ({ settlementAddress: value })),
      getSettlementAddress: () => get().settlementAddress,
      setPassword: (value) => set(() => ({ password: value })),
      getPassword: () => get().password,
      setConfirmPassword: (value) => set(() => ({ confirmPassword: value })),
      getConfirmPassword: () => get().confirmPassword,
      resetEvent: () => {
        set((state) => {
          return {
            ...state,
            title: '',
            type: '',
            playType: '',
            // ruleDetails: '',
            expireTime: 0,
            logo: '',
            // singleAmount: 0,
            // capitalPoolAmount: 0,
            settlementAddress: '',
            password: '',
            confirmPassword: '',
          };
        });
      },
    }),
    {
      name: 'predictmarket.event.store',
    },
  ),
);

export default useEventPerisistStore;

export const setEventTitle = (value: string) => useEventPerisistStore.getState().setTitle(value);
export const getEventTitle = () => useEventPerisistStore.getState().getTitle();

export const setEventType = (value: string) => useEventPerisistStore.getState().setType(value);
export const getEventType = () => useEventPerisistStore.getState().getType();

export const setEventPlayType = (value: string) => useEventPerisistStore.getState().setPlayType(value);
export const getEventPlayType = () => useEventPerisistStore.getState().getPlayType();

// export const setEventRuleDetails = (value: string) => useEventPerisistStore.getState().setRuleDetails(value);
// export const getEventRuleDetails = () => useEventPerisistStore.getState().getRuleDetails();

export const setEventExpireTime = (value: number) => useEventPerisistStore.getState().setExpireTime(value);
export const getEventExpireTime = () => useEventPerisistStore.getState().getExpireTime();

export const setEventLogo = (value: string) => useEventPerisistStore.getState().setLogo(value);
export const getEventLogo = () => useEventPerisistStore.getState().getLogo();

// export const setEventSingleAmount = (value: number) => useEventPerisistStore.getState().setSingleAmount(value);
// export const getEventSingleAmount = () => useEventPerisistStore.getState().getSingleAmount();

// export const setEventCapitalPoolAmount = (value: number) =>
//   useEventPerisistStore.getState().setCapitalPoolAmount(value);
// export const getEventCapitalPoolAmount = () => useEventPerisistStore.getState().getCapitalPoolAmount();

export const setEventSettlementAddress = (value: string) =>
  useEventPerisistStore.getState().setSettlementAddress(value);
export const getEventSettlementAddress = () => useEventPerisistStore.getState().getSettlementAddress();

export const setEventPassword = (value: string) => useEventPerisistStore.getState().setPassword(value);
export const getEventPassword = () => useEventPerisistStore.getState().getPassword();

export const setEventConfirmPassword = (value: string) => useEventPerisistStore.getState().setConfirmPassword(value);
export const getEventConfirmPassword = () => useEventPerisistStore.getState().getConfirmPassword();

export const resetEvent = () => useEventPerisistStore.getState().resetEvent();
