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
  [Chain.AURORA]: 'Aurora',
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

export type UserNotification = {
  chainId: number;
  title: string;
  content: string;
  createdTime: number;
  description: string;
  hash: string;
  isRead: number;
  notificationType: string;
};

export type UserCoinBalance = {
  eth: string;
  usdt: string;
  usdc: string;
};

export type EventCommentType = {
  username: string;
  avatarUrl: string;
  content: string;
  commentId: number;
  createdTime: number;
  userAddress: string;
  likeCount: number;
  ownLikeStatus: number;
};

export type EventPlayType = {
  title: string;
  introduce: string;
  guessNumber: number;
  minimumCapitalPool: number;
  maximumCapitalPool: number;
  coin: string;
  pledgeAmount: number;
  values: EventPlayValueType[];
};

export type EventPlayValueType = {
  value: string;
  orders: EventOrder[];
};

export type EventType = {
  createdTime: number;
  eventLogo: string;
  eventStatus: number;
  expireTime: number;
  playId: number;
  rosolverAddress: string;
  title: string;
  uniqueCode: string;
  type: string;
  settlementTime: number;
  settlementHash: string;
};

export enum EventOrderType {
  buy = 1,
  sell = 2,
}

export enum EventOrderStringType {
  buy = 'buy',
  sell = 'sell',
}

export type EventOrder = {
  amount: number;
  orderType: string;
  userAddress: string;
  username: string;
  createdTime: number;
  hash: string;
  coin: string;
  usdAmount: number;
};

export type EventComment = {
  content: string;
  eventUniqueCode: string;
  replyId: number;
};

export type UserProfile = {
  avatarUrl: string;
  bio: string;
  contractAddress: string;
  createdTime: number;
  email: string;
  invitationCode: string;
  username: string;
};

export type UserNotificationSetting = {
  emailUpdate: number;
  dailyUpdate: number;
  incomingUpdate: number;
  outgoingUpdate: number;
  eventUpdate: number;
  orderUpdate: number;
  cryptoPriceUpdate: number;
};

export type HomeEventType = {
  eventLogo: string;
  expireTime: number;
  title: string;
  uniqueCode: string;
  type: string;
  settlementTime: number;
  totalOrderAmount: number;
  commentCount: number;
  totalUsdAmount: number;
};

export type HomeTopVolumn = {
  avatarUrl: string;
  username: string;
  contractAddress: string;
  totalUsdAmount: number;
};

export type HomeRecentActivity = {
  eventLogo: string;
  title: string;
  uniqueCode: string;
  createdTime: number;
  avatarUrl: string;
  amount: number;
  orderType: string;
  playValue: string;
  username: string;
  usdAmount: number;
};
