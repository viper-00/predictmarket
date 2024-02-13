import { PhoneIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { getCryptoCoins } from 'lib/store/coin';
import { hydrateWallet } from 'lib/store/wallet';
import Image from 'next/image';
import { TokenInfo, tokenList } from 'packages/constants/tokenList';
import { Web3 } from 'packages/core';
import { QRCodeSVG } from 'qrcode.react';
import { Fragment, useEffect, useState } from 'react';
import { formatEllipsisTxt } from 'utils/format';

interface ArticleAttributes {
  title: string;
  link: string;
  created_at: string;
  meta: {
    reactions: number;
    comments: number;
    views: number;
  };
}

const articles: ArticleAttributes[] = [
  {
    title: 'Started 2022 by updating portfolio website',
    link: 'https://mahmad.me/blog/started-2022-by-updating-portfolio-website-1jde-temp-slug-4553258',
    created_at: '21 Jan 2022',
    meta: {
      reactions: 225,
      comments: 20,
      views: 500,
    },
  },
  {
    title: 'Create professional portfolio website with Nextjs and ChakraUI',
    link: 'https://mahmad.me/blog/create-professional-portfolio-website-with-nextjs-and-chakraui-4lkn',
    created_at: '20 Jun 2021',
    meta: {
      reactions: 400,
      comments: 25,
      views: 300,
    },
  },
  {
    title: `Find out what's new in my portfolio website`,
    link: 'https://mahmad.me/blog/what-s-new-in-my-portfolio-websitea',
    created_at: '31 Sept 2022',
    meta: {
      reactions: 5,
      comments: 15,
      views: 150,
    },
  },
];

const SendPage = () => {
  const [address, setAddress] = useState<string>('');
  const [coins, setCoins] = useState<TokenInfo[]>([]);

  // useEffect(() => {
  //   const wallet = hydrateWallet();
  //   setAddress(wallet.address);

  //   const tokens = tokenList.filter(ï(item) => item.chain === wallet.chain);
  //   setTokens(tokens);
  // }, [setTokens]);

  useEffect(() => {
    async function init() {
      const wallet = hydrateWallet();
      setAddress(wallet.address);
      const lists: TokenInfo[] = tokenList.filter((item) => item.chain === wallet.chain);
      const coinPrices = getCryptoCoins();
      const assetBalances = await Web3.getAssetBalance(wallet.chain, wallet.address);

      coinPrices.forEach((item) => {
        lists.forEach((innerItem) => {
          if (item.ids === innerItem.ids) {
            innerItem.price = item.price;
            innerItem.usd24hChange = item.usd24hChange;
            innerItem.balance = assetBalances[innerItem.symbol];
            return;
          }
        });
      });
      setCoins(lists);
    }

    init();
  }, []);

  return (
    <>
      <Flex flexDirection={'column'} alignItems={'center'} mt={10}>
        <Text fontWeight={'bold'} fontSize={20}>
          Send
        </Text>

        <Container width={500}>
          <Stack mt={10}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input type="text" placeholder="Search tokens" />
            </InputGroup>
          </Stack>
          <VStack border="1px solid" borderColor="gray.400" rounded="md" overflow="hidden" spacing={0} mt={2}>
            {coins.map((coin, index) => (
              <Fragment key={index}>
                <Flex
                  w="100%"
                  p={{ base: 2, sm: 4 }}
                  alignItems="center"
                  onClick={() => {}}
                  justifyContent={'space-between'}
                >
                  <Box gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
                    <Flex alignItems={'center'}>
                      <Image src={coin.icon} alt={'token image'} width={40} height={40} />
                      <Text marginLeft={2}>{coin.symbol}</Text>
                    </Flex>
                  </Box>
                  <Flex flexDirection={'column'} textAlign={'right'}>
                    <Text fontWeight={'bold'}>
                      ${(Number(coin.price) * Number(coin.balance)).toFixed(coin.displayDecimals)}
                    </Text>
                    <Text>{coin.balance}</Text>
                  </Flex>
                </Flex>
                {/* {articles.length - 1 !== index && <Divider m={0} />} */}
                <Divider m={0} />
              </Fragment>
            ))}
          </VStack>
        </Container>
      </Flex>
    </>
  );
};

export default SendPage;
