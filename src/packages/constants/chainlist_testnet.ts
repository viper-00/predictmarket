import { ChainListInfo } from './chainlist';

export const chainList: ChainListInfo[] = [
  {
    name: 'Ethereum Testnet Goerli',
    chain: 'ETH',
    rpc: [
      'https://rpc.goerli.mudit.blog/',
      'https://ethereum-goerli.publicnode.com',
      'wss://ethereum-goerli.publicnode.com',
      'https://goerli.gateway.tenderly.co',
      'wss://goerli.gateway.tenderly.co',
    ],
    shortName: 'gor',
    chainId: 5,
    networkId: 5,
    icon: '',
  },
];
