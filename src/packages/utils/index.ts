import { chainList } from 'packages/constants/chainlist';
import { ETH } from 'packages/core/eth';
import { Chain } from 'packages/types';

export const GetRandomRPCUrl = (chain: Chain): string => {
  const lists = chainList.find((item) => item.chainId === chain);

  if (!lists?.rpc) {
    return '';
  }

  return lists?.rpc[Math.floor(Math.random() * lists.rpc.length)];
};