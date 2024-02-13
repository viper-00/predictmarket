import { Chain, ChainIdToName } from 'packages/types';

export type ToolListInfo = {
  Title: string;
  FullTitle: string;
  Descriotion: string;
  SecondTools: SecondToolList[];
};

export type SecondToolList = {
  SecondType: string;
  Title: string;
  Descriotion: string;
  Tools: MainToolList[];
};

export type MainToolList = {
  Title: string;
  Website: string;
  Descriotion: string;
  Icon: any;
  Socials: SocialToolList[];
  Networks: string[];
};

export type SocialToolList = {
  Title: string;
  Link: string;
};

export const ToolTitle = {
  DeFi: 'DeFi',
  Nft: 'Nft',
  Daos: 'Daos',
  Wallet: 'Wallet',
  BlockExplorers: 'Block explorers',
  Storage: 'Storage',
  Security: 'Security',
  Tech: 'Tech',
  Developer: 'Developer',
  News: 'News',

  DEX: 'DEX',
  CEX: 'CEX',
  Derivatives: 'Derivatives',
  Bridge: 'Bridge',
  Lending: 'Lending & Borrowing',
  Insurance: 'Insurance',
  Yield: 'Yield Farming',
  Airdrops: 'Airdrops',

  NFTMarketplace: 'NFT Marketplace',
  Governance: 'Governance & Voting',
  Marketplace: 'Marketplace',
  HardwareWallets: 'Hardware Wallets',
  Web3Wallets: 'Web3 Wallets',

  X: 'X',
  Discord: 'Discord',
  Mirror: 'Mirror',
  Github: 'Github',
  Telegram: 'Telegram',
  Medium: 'Medium',
  Reddit: 'Reddit',
};

export const toolList: ToolListInfo[] = [
  {
    Title: ToolTitle.DeFi,
    FullTitle: 'Decentralized finance',
    Descriotion:
      'Decentralized finance offers financial instruments without relying on intermediaries such as brokerages, exchanges, or banks by using smart contracts on a blockchain',
    SecondTools: [
      {
        SecondType: ToolTitle.DEX,
        Title: 'Decentralised Exchanges',
        Descriotion: 'Decentralised exchanges let you trade any tokens without intermediaries.',
        Tools: [
          {
            Title: 'Uniswap',
            Website: 'https://app.uniswap.org/',
            Descriotion: 'Uniswap is a protocol for trading and automated liquidity provision on ethereum.',
            Icon: require('../../assets/tools/uniswap.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/Uniswap',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/FCfyBSbCU5',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/Uniswap',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.CELO],
            ],
          },
          {
            Title: 'SushiSwap',
            Website: 'https://app.sushi.com/',
            Descriotion: 'A community-built open-source ecosystem of all the DeFi tools you need',
            Icon: require('../../assets/tools/sushiswap.png'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/sushiswap',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/sushiswap',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://sushichef.medium.com/',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.AVALANCHE],
              ChainIdToName[Chain.FANTOM],
              ChainIdToName[Chain.MOONRIVER],
              ChainIdToName[Chain.TELOS],
              ChainIdToName[Chain.FUSE],
              ChainIdToName[Chain.HECO],
              ChainIdToName[Chain.PALM],
            ],
          },
          {
            Title: 'PancakeSwap',
            Website: 'https://pancakeswap.finance/',
            Descriotion: 'Decentralized trading protocol on Binance Smart Chain',
            Icon: require('../../assets/tools/pancakeswap.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/pancakeswap',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/pancakeswap',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/pancakeswap',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://reddit.com/r/pancakeswap',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/pancakeswap/',
              },
            ],
            Networks: [ChainIdToName[Chain.BSC]],
          },
          {
            Title: 'Curve',
            Website: 'https://curve.fi/',
            Descriotion: 'Creating deep on-chain liquidity using advanced bonding curves',
            Icon: require('../../assets/tools/curvefinance.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/CurveFinance',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/9uEHakc',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/curvefi',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/curvefi/curve-contract',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.AVALANCHE],
              ChainIdToName[Chain.FANTOM],
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.HARMONY],
            ],
          },
          {
            Title: 'SyncSwap',
            Website: 'https://syncswap.xyz/',
            Descriotion: 'Powerful and seamless decentralized AMM exchange on zkSync',
            Icon: require('../../assets/tools/syncswap.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/syncswap',
              },
              {
                Title: ToolTitle.Mirror,
                Link: 'https://mirror.xyz/0x000002c34bAE6DD7BeC72AcbA6aAAC1e01A359De',
              },
            ],
            Networks: [ChainIdToName[Chain.ZKSYNC]],
          },
          {
            Title: '1inch',
            Website: 'https://app.1inch.io/',
            Descriotion:
              'The 1inch Network unites decentralized protocols whose synergy enables the most lucrative, fastest and protected operations in the DeFi space.',
            Icon: require('../../assets/tools/1inch.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/1inch',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.com/invite/1inch',
              },
              {
                Title: ToolTitle.Reddit,
                Link: 'https://www.reddit.com/r/1inch/',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/OneInchNetwork',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.BSC],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.AVALANCHE],
            ],
          },
          {
            Title: 'CowSwap',
            Website: 'https://cowswap.exchange/#/swap',
            Descriotion: 'CoWs (Coincidence of Wants) for MEV protected trades.',
            Icon: require('../../assets/tools/cowswap.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/mevprotection',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/gnosis/gp-swap-ui',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
        ],
      },
      {
        SecondType: ToolTitle.CEX,
        Title: 'Centralised Exchanges',
        Descriotion:
          'Centralized cryptocurrency exchanges, or CEXs, are online platforms that act as intermediaries between buyers and sellers of digital assets.',
        Tools: [
          {
            Title: 'BINANCE',
            Website: 'https://www.binance.com/en',
            Descriotion:
              'Binance cryptocurrency exchange - We operate the worlds biggest bitcoin exchange and altcoin crypto exchange in the world by volume',
            Icon: require('../../assets/tools/binance.png'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/binance',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/jE4wt8g2H2',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://www.binance.com/en/community',
              },
              {
                Title: ToolTitle.Reddit,
                Link: 'https://www.reddit.com/r/binance',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.AVALANCHE],
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.BTC],
              ChainIdToName[Chain.LTC],
              ChainIdToName[Chain.BSC],
            ],
          },
          {
            Title: 'OKX',
            Website: 'https://www.okx.com/web3',
            Descriotion: "Discover crypto, on top of one of the world's most reliable crypto trading & web3 apps.",
            Icon: require('../../assets/tools/okx.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/okx',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/e6EyvM5QwM',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/OKXOfficial_English',
              },
              {
                Title: ToolTitle.Reddit,
                Link: 'https://www.reddit.com/r/OKX',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.AVALANCHE],
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.BTC],
              ChainIdToName[Chain.LTC],
              ChainIdToName[Chain.BSC],
            ],
          },
        ],
      },
      {
        SecondType: ToolTitle.Derivatives,
        Title: 'Derivatives',
        Descriotion: 'Trade perpetuals and options on decentralised exchanges.',
        Tools: [
          {
            Title: 'Lyra',
            Website: 'https://www.lyra.finance/',
            Descriotion: 'Lyra’s decentralized exchange is the easiest place to buy and sell options on crypto.',
            Icon: require('../../assets/tools/lyra.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/lyrafinance',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/P49mj6UbmC',
              },
            ],
            Networks: [ChainIdToName[Chain.OPTIMISM]],
          },
          {
            Title: 'Ribbon',
            Website: 'https://www.ribbon.finance/',
            Descriotion:
              'The Ribbon Protocol uses derivatives like options to generate sustainable, risk-adjusted yield. Users just deposit their assets, and let the smart contracts do the rest.',
            Icon: require('../../assets/tools/ribbon.png'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/ribbonfinance',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.com/invite/aevo',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/ribbon-finance',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.BSC],
              ChainIdToName[Chain.SOLANA],
              ChainIdToName[Chain.AVALANCHE],
            ],
          },
        ],
      },
      {
        SecondType: ToolTitle.Bridge,
        Title: 'Bridges',
        Descriotion: 'Bridges allows you to transfer tokens across multiple chains.',
        Tools: [
          {
            Title: 'Orbiter Finance',
            Website: 'https://www.orbiter.finance/',
            Descriotion: 'A decentralized cross-rollup bridge, which is the infrastructure of Layer 2 ',
            Icon: require('../../assets/tools/orbiterfinance.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/Orbiter_Finance',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://orbiter-finance.medium.com/',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.com/invite/hJJvXP7C73',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/Orbiter-Finance',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.ZKSYNC],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.BSC],
            ],
          },
          {
            Title: 'Stargate',
            Website: 'https://stargate.finance/transfer',
            Descriotion:
              'Stargate is a fully composable liquidity transport protocol that lives at the heart of omnichain DeFi.',
            Icon: require('../../assets/tools/stargate.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/StargateFinance',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://medium.com/stargate-official',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://stargate.finance/discord',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/joinchat/LEM0ELklmO1kODdh',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.BSC],
              ChainIdToName[Chain.AVALANCHE],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.FANTOM],
            ],
          },
          {
            Title: 'LayerSwap',
            Website: 'https://www.layerswap.io/',
            Descriotion: 'Save 10x on fees when moving crypto from Coinbase, Binance, Huobi or FTX US to Optimism',
            Icon: require('../../assets/tools/layerswap.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/layerswap',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.com/invite/KhwYN35sHy',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/layerswap/layerswapapp',
              },
            ],
            Networks: [
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.ZKSYNC],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.POLYGON],
            ],
          },
          {
            Title: 'Hop Protocol',
            Website: 'https://app.hop.exchange/',
            Descriotion:
              'A protocol for sending tokens across rollups and their shared layer-1 network in a quick and trustless manner',
            Icon: require('../../assets/tools/hopprotocol.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/HopProtocol',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://medium.com/hop-protocol',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/PwCF88emV4',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/hop-protocol',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.ARBITRUM_ONE],
            ],
          },
          {
            Title: 'Multichain',
            Website: 'https://app.multichain.org/',
            Descriotion:
              'Previously known as Anyswap, Multichain is a cross-chain router protocol, envisioned to be the ultimate router for Web3.',
            Icon: require('../../assets/tools/multichain.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/MultichainOrg',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://multichainorg.medium.com/',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/anyswap',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/anyswap',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.BSC],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.AVALANCHE],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.CELO],
            ],
          },
          {
            Title: 'Celer Network Bridge',
            Website: 'https://cbridge.celer.network/',
            Descriotion: 'Building the best inter-blockchain and cross-layer communication platform.',
            Icon: require('../../assets/tools/celernetwork.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/CelerNetwork',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.com/invite/uGx4fjQ',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/celer-network',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/celernetwork',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.BSC],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.AVALANCHE],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.FANTOM],
              ChainIdToName[Chain.CELO],
              ChainIdToName[Chain.MOONRIVER],
            ],
          },
          {
            Title: 'Connext',
            Website: 'https://bridge.connext.network/',
            Descriotion: 'Fast, trustless communication between chains and rollups.',
            Icon: require('../../assets/tools/connext.png'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/ConnextNetwork',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/connext',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/CoinHippo-Labs/connext-bridge',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.BSC],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.AVALANCHE],
            ],
          },
          {
            Title: 'Synapse Protocol',
            Website: 'https://synapseprotocol.com/',
            Descriotion: 'ACross-chain layer ∞ blockchain - bridge assets across all chains.',
            Icon: require('../../assets/tools/synapseprotocol.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/SynapseProtocol',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/synapseprotocol',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/synapsecns',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/synapseprotocol',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.AVALANCHE],
              ChainIdToName[Chain.BSC],
            ],
          },
        ],
      },
      {
        SecondType: ToolTitle.Lending,
        Title: 'Lending & Borrowing',
        Descriotion: 'Lend and borrow stablecoins and other tokens and earn yields on your deposits.',
        Tools: [
          {
            Title: 'Aave',
            Website: 'https://aave.com/',
            Descriotion: 'Aave is an open source and non-custodial liquidity protocol.',
            Icon: require('../../assets/tools/aave.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/aave',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/Aavesome',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://aave.com/discord',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/aave/aave-protocol',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH], ChainIdToName[Chain.POLYGON], ChainIdToName[Chain.AVALANCHE]],
          },
          {
            Title: 'Compound',
            Website: 'https://compound.finance/',
            Descriotion:
              'Compound is an algorithmic, autonomous interest rate protocol built for developers, to unlock a universe of open financial applications.',
            Icon: require('../../assets/tools/compoundfinance.png'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/compoundfinance',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://medium.com/compound-finance',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://compound.finance/discord',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/compound-finance/compound-protocol',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
          {
            Title: 'Bastion',
            Website: 'https://app.bastionprotocol.com/',
            Descriotion: 'Decentralized lending on Aurora',
            Icon: require('../../assets/tools/bastion.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/BastionProtocol',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://bastionprotocol.medium.com/',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/bastionprotocol',
              },
            ],
            Networks: [ChainIdToName[Chain.AURORA]],
          },
        ],
      },
      {
        SecondType: ToolTitle.Insurance,
        Title: 'Insurance',
        Descriotion: 'Insure your deposits against hacks or protocol failures.',
        Tools: [
          {
            Title: 'Bridge Mutual',
            Website: 'https://bridgemutual.io/',
            Descriotion: 'Risk coverage platform for stablecoins, protocols, smart contracts, exchanges & more.',
            Icon: require('../../assets/tools/bridgemutual.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/bridge_mutual',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/bridge_mutual',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/bmi',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://bridgemutual.medium.com/',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/Bridge-Mutual',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
          {
            Title: 'Nexus Mutual',
            Website: 'https://nexusmutual.io/',
            Descriotion: 'Comprehensive coverage for your productive assets in DeFi & CeFi.',
            Icon: require('../../assets/tools/nexusmutual.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/NexusMutual',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/aQjkzW5',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/joinchat/K_g-fA-3CmFwXumCKQUXkw',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://medium.com/nexus-mutual',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/NexusMutual',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
        ],
      },
      {
        SecondType: ToolTitle.Yield,
        Title: 'Yield Farming',
        Descriotion: 'The best yield farming opportunities and protocols.',
        Tools: [
          {
            Title: 'Beefy Finance',
            Website: 'https://beefy.finance/',
            Descriotion:
              'Beefy is THE Multichain Yield Optimizer that focuses on safety and autocompounds crypto assets for the best APYs.',
            Icon: require('../../assets/tools/beefyfinance.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/beefyfinance',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/yq8wfHd',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/beefyfinance',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://medium.com/beefyfinance',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/beefyfinance',
              },
              {
                Title: ToolTitle.Reddit,
                Link: 'https://www.reddit.com/r/Beefy/',
              },
            ],
            Networks: [
              ChainIdToName[Chain.BSC],
              ChainIdToName[Chain.AVALANCHE],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.CELO],
              ChainIdToName[Chain.MOONRIVER],
            ],
          },
          {
            Title: 'vfat',
            Website: 'https://vfat.tools/',
            Descriotion:
              'A set of no-frills tools for yield farming with a dashboard and farming calculator that allows you to find the most popular farms and their yields.',
            Icon: require('../../assets/tools/vfat.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/vfat0',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/vfat',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/vfat-tools/vfat-tools',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
        ],
      },
      {
        SecondType: ToolTitle.Airdrops,
        Title: 'Airdrops',
        Descriotion:
          'Airdrops are tokens distributed to users of certain services as a reward or marketing campaign strategies.',
        Tools: [],
      },
    ],
  },
  {
    Title: ToolTitle.Nft,
    FullTitle: 'Non-fungible token',
    Descriotion: 'All the best places to browse, buy and sell NFTs.',
    SecondTools: [
      {
        SecondType: ToolTitle.NFTMarketplace,
        Title: 'NFT Marketplace',
        Descriotion: 'All the best places to browse, buy and sell NFTs.',
        Tools: [
          {
            Title: 'Opensea',
            Website: 'https://opensea.io/',
            Descriotion: 'The largest NFT marketplace. Buy, sell, & discover the internet of goods.',
            Icon: require('../../assets/tools/opensea.png'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/opensea',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/opensea',
              },
              {
                Title: ToolTitle.Reddit,
                Link: 'https://reddit.com/r/opensea',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH], ChainIdToName[Chain.POLYGON]],
          },
          {
            Title: 'Looksrare',
            Website: 'https://looksrare.org/',
            Descriotion: 'LooksRare is the community-first NFT marketplace with rewards for participating.',
            Icon: require('../../assets/tools/looksrare.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/looksrarenft',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/looksrare',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
          {
            Title: 'Rarible',
            Website: 'https://rarible.com/',
            Descriotion: 'Multi-chain community-centric NFT marketplace. Create, sell and collect digital items.',
            Icon: require('../../assets/tools/rarible.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/rarible',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/cdaFbV5',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://medium.com/@rarible',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/rarible',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
        ],
      },
    ],
  },
  {
    Title: ToolTitle.Daos,
    FullTitle: 'Decentralized autonomous organization',
    Descriotion:
      'A DAO is a decentralized autonomous organization, a type of bottom-up entity structure with no central authority.',
    SecondTools: [
      {
        SecondType: ToolTitle.Governance,
        Title: 'Governance & Voting',
        Descriotion: 'Manage your DAO voting and proposals',
        Tools: [
          {
            Title: 'Snapshot',
            Website: 'https://snapshot.org/#/',
            Descriotion:
              'In short, Snapshot is an off-chain gasless multi-governance client with easy to verify and hard to contest results.',
            Icon: require('../../assets/tools/snapshot.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/SnapshotLabs',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.com/invite/snapshot',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/snapshot-labs',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/snapshotlabs',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.BSC],
              ChainIdToName[Chain.AVALANCHE],
              ChainIdToName[Chain.ARBITRUM_ONE],
            ],
          },
          {
            Title: 'Tally',
            Website: 'https://www.withtally.com/',
            Descriotion:
              'Tally empowers user owned governance through a voting dashboard, governance tooling, real time research and analysis, and an evergreen wiki.',
            Icon: require('../../assets/tools/tally.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/voteWithTally',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.com/invite/sCGnpWH3m4',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/withtally/',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
          {
            Title: 'Sybil',
            Website: 'https://sybil.org/',
            Descriotion: 'Sybil is a governance tool for discovering delegates.',
            Icon: require('../../assets/tools/sybil.svg'),
            Socials: [
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/Uniswap/sybil-list',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
          {
            Title: 'Boardroom',
            Website: 'https://www.boardroom.info/',
            Descriotion:
              'Boardroom is a DAO discovery and governance platform, home to communities shaping the future of the ownership economy.',
            Icon: require('../../assets/tools/boardroom.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/boardroom_info',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/CEZ8WfuK8s',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
        ],
      },
    ],
  },
  {
    Title: ToolTitle.Wallet,
    FullTitle: 'Wallets',
    Descriotion: 'Wallets for specific blockchain styles.',
    SecondTools: [
      {
        SecondType: ToolTitle.HardwareWallets,
        Title: 'Hardware wallets',
        Descriotion: 'The best and more secure solution for storing digital assets.',
        Tools: [
          {
            Title: 'Ledger',
            Website: 'https://www.ledger.com/',
            Descriotion:
              'Ledger`s the smartest way to secure, buy, exchange and grow your crypto assets and trusted by 4 million customers',
            Icon: require('../../assets/tools/ledger.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/Ledger',
              },
              {
                Title: ToolTitle.Reddit,
                Link: 'https://www.reddit.com/r/ledgerwallet/',
              },
            ],
            Networks: [],
          },
          {
            Title: 'Coldcard',
            Website: 'https://coldcard.com/',
            Descriotion:
              'Coldcard is an easy to use, ultra-secure, open-source and affordable hardware wallet that is easy to back up via an encrypted microSD card.',
            Icon: require('../../assets/tools/coldcard.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/COLDCARDwallet',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/coldcard',
              },
            ],
            Networks: [],
          },
          {
            Title: 'SeedSigner',
            Website: 'https://seedsigner.com/',
            Descriotion:
              'Build a secure Bitcoin signing device for about $50 (all software, specs & designs are FOSS).',
            Icon: require('../../assets/tools/seedsigner.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/SeedSigner',
              },
            ],
            Networks: [ChainIdToName[Chain.BTC]],
          },
          {
            Title: 'Trezor',
            Website: 'https://trezor.io/',
            Descriotion:
              'Trezor is an hardware walllet with a simple and intuitive interface audited by security researchers.',
            Icon: require('../../assets/tools/trezor.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/trezor',
              },
              {
                Title: ToolTitle.Reddit,
                Link: 'https://www.reddit.com/r/TREZOR/',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/trezor',
              },
            ],
            Networks: [],
          },
          {
            Title: 'KeepKey',
            Website: 'https://shapeshift.com/keepkey',
            Descriotion:
              'Protect your cryptocurrencies, store your private keys offline, and safeguard your assets from hackers.',
            Icon: require('../../assets/tools/keepkey.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/ShapeShift_io',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/shapeshiftofficial',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/shapeshift',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://medium.com/shapeshift-stories',
              },
            ],
            Networks: [],
          },
          {
            Title: 'BitBox',
            Website: 'https://shiftcrypto.ch/',
            Descriotion:
              'Boardroom is a DAO discovery and governance platform, home to communities shaping the future of the ownership economy.',
            Icon: require('../../assets/tools/bitbox.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/boardroom_info',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/bitboxwallet',
              },
            ],
            Networks: [],
          },
          {
            Title: 'Opendime',
            Website: 'https://opendime.com/',
            Descriotion:
              'Opendime is a small USB stick that allows you to spend Bitcoin like a dollar bill. Pass it along multiple times. Connect to any USB to check balance. Unseal anytime to spend online. Trust no one.',
            Icon: require('../../assets/tools/opendime.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/OPENDIME',
              },
            ],
            Networks: [],
          },
        ],
      },
      {
        SecondType: ToolTitle.Web3Wallets,
        Title: 'Web3 wallets',
        Descriotion: 'Wallets for specific blockchain styles.',
        Tools: [
          {
            Title: 'Metamask',
            Website: 'https://metamask.io/',
            Descriotion:
              'Metamask is one of the most widely used wallet to interact with Ethereum and other EVM copatible chains and trusted by over 21 million users worldwide.',
            Icon: require('../../assets/tools/metamask.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/metamask/',
              },
              {
                Title: ToolTitle.Medium,
                Link: 'https://medium.com/metamask/',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/MetaMask/metamask-extension/',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
          {
            Title: 'Phantom',
            Website: 'https://phantom.app/',
            Descriotion:
              'Phantom makes it safe & easy for you to store, buy, send, receive, swap tokens and collect NFTs on the Solana blockchain.',
            Icon: require('../../assets/tools/phantom.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/phantom',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discordapp.com/invite/GWSyrHg',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/argentlabs/',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
          {
            Title: 'Uniswap Wallet',
            Website: 'https://wallet.uniswap.org/',
            Descriotion: 'Uniswap in your pocket. Safe, simple swapping & self-custody.',
            Icon: require('../../assets/tools/uniswap.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/Uniswap',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.com/invite/FCfyBSbCU5',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.AVALANCHE],
              ChainIdToName[Chain.BSC],
              ChainIdToName[Chain.CELO],
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.POLYGON],
            ],
          },
          {
            Title: 'Coinbase Wallet',
            Website: 'https://www.coinbase.com/wallet',
            Descriotion:
              'The easiest and most secure crypto wallet and dapp browser. Your gateway to the decentralized web',
            Icon: require('../../assets/tools/coinbase.png'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/coinbasewallet',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.AVALANCHE],
              ChainIdToName[Chain.BSC],
              ChainIdToName[Chain.CELO],
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.SOLANA],
            ],
          },
          {
            Title: 'OKX Wallet',
            Website: 'https://www.okx.com/web3',
            Descriotion: "Discover crypto, on top of one of the world's most reliable crypto trading & web3 apps.",
            Icon: require('../../assets/tools/okx.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/okx',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/OKXOfficial_English',
              },
              {
                Title: ToolTitle.Discord,
                Link: 'https://discord.gg/e6EyvM5QwM',
              },
              {
                Title: ToolTitle.Reddit,
                Link: 'https://www.reddit.com/r/OKX',
              },
            ],
            Networks: [
              ChainIdToName[Chain.ETH],
              ChainIdToName[Chain.ARBITRUM_ONE],
              ChainIdToName[Chain.AVALANCHE],
              ChainIdToName[Chain.BSC],
              ChainIdToName[Chain.CELO],
              ChainIdToName[Chain.OPTIMISM],
              ChainIdToName[Chain.POLYGON],
              ChainIdToName[Chain.SOLANA],
            ],
          },
          {
            Title: 'Rabby',
            Website: 'https://rabby.io/',
            Descriotion:
              'Rabby is an open-source wallet extension that improves on a lot of features creating a better experience for DeFi users.',
            Icon: require('../../assets/tools/rabby.jpg'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/Rabby_io',
              },
              {
                Title: ToolTitle.Telegram,
                Link: 'https://t.me/rabby_io',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
          {
            Title: 'Rainbow',
            Website: 'https://rainbow.me/',
            Descriotion:
              'The fun, simple, & secure way to explore Web3, NFTs, & Ethereum available for iOS and Android',
            Icon: require('../../assets/tools/rainbow.png'),
            Socials: [
              {
                Title: ToolTitle.X,
                Link: 'https://twitter.com/rainbowdotme',
              },
              {
                Title: ToolTitle.Github,
                Link: 'https://github.com/rainbow-me/rainbow',
              },
            ],
            Networks: [ChainIdToName[Chain.ETH]],
          },
        ],
      },
    ],
  },
  {
    Title: ToolTitle.BlockExplorers,
    FullTitle: 'Block Explorers',
    Descriotion: 'Block Explorers for Web3 developers.',
    SecondTools: [],
  },
  {
    Title: ToolTitle.Storage,
    FullTitle: 'Web3 Storage',
    Descriotion: 'Web3 Storage for Web3 developers.',
    SecondTools: [],
  },
  {
    Title: ToolTitle.Security,
    FullTitle: 'Web3 Security',
    Descriotion: 'Web3 Security for Web3 developers.',
    SecondTools: [],
  },
  {
    Title: ToolTitle.Tech,
    FullTitle: 'Technology',
    Descriotion: 'Tools for Web3 developers.',
    SecondTools: [],
  },
  {
    Title: ToolTitle.Developer,
    FullTitle: 'Developer',
    Descriotion: 'Tools for Web3 developers.',
    SecondTools: [],
  },
  {
    Title: ToolTitle.News,
    FullTitle: 'News',
    Descriotion: 'News for Web3 developers.',
    SecondTools: [],
  },
];
