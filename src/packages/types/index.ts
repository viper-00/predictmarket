import { TokenInfo } from 'packages/constants/tokenList';

export enum Chain {
  ETH = 1,
  BTC = 2,
  TRON = 3,
  ETH_GOR = 5,
  OPTIMISM = 10,
  LTC = 11,
  TELOS = 40,
  BSC = 56,
  FUSE = 122,
  HECO = 128,
  POLYGON = 137,
  FANTOM = 250,
  ZKSYNC = 324,
  MOONRIVER = 1285,
  ARBITRUM_ONE = 42161,
  ARBITRUM_NOVA = 42170,
  CELO = 42220,
  AVALANCHE = 43114,
  AURORA = 1313161554,
  SOLANA = 1399811149,
  HARMONY = 1666600000,
  PALM = 11297108109,
}

export enum WalletStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
  UNKNOWN = 'unknown',
}

export const ChainIdToName: { [key in Chain]: string } = {
  [Chain.ETH]: 'Ethereum',
  [Chain.BTC]: 'Bitcoin',
  [Chain.TRON]: 'Tron',
  [Chain.ETH_GOR]: 'Ethereum Testnet Goerli',
  [Chain.OPTIMISM]: 'Optimism',
  [Chain.LTC]: 'Litecoin',
  [Chain.TELOS]: 'Telos',
  [Chain.BSC]: 'BNB Smart Chain',
  [Chain.FUSE]: 'Fuse',
  [Chain.HECO]: 'Heco',
  [Chain.POLYGON]: 'Polygon',
  [Chain.FANTOM]: 'Fantom',
  [Chain.ZKSYNC]: 'Zksync',
  [Chain.MOONRIVER]: 'Moonriver',
  [Chain.ARBITRUM_ONE]: 'Arbitrum',
  [Chain.ARBITRUM_NOVA]: 'Arbitrum Nova',
  [Chain.CELO]: 'Celo',
  [Chain.AVALANCHE]: 'Avalanche',
  [Chain.SOLANA]: 'Solana',
  [Chain.HARMONY]: 'Harmony',
  [Chain.PALM]: 'Paml',
  [Chain.AURORA]: "Aurora",
};

export enum TxStatus {
  Failed = 0,
  Success = 1,
  Pending = 2,
}

export type TransactionDetail = {
  blockHash?: string;
  blockNumber: number;
  chainId: number;

  blockTimestamp?: number;
  hash: string;
  from: string;
  to: string;
  status?: string;
  value: string;
  gasPrice?: number;
  gasLimit?: number;
  maxFeePerGas?: number;
  maxPriorityFeePerGas?: number;
  nonce?: number;
  type?: number;
  gasUsed?: number;
  isContract?: boolean;
  url?: string;
  fee?: string;
};

export type TransactionTokenTransfer = {
  hash: string;
  from: string;
  to: string;
  asset: string;
  value: string;
};

export type FeeData = {
  gasPrice: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
};

export type AssetBalance = {
  [key: string]: string;
};
