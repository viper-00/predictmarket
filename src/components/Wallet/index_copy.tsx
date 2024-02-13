import {
  Box,
  Card,
  Checkbox,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  GridItem,
  IconButton,
  List,
  ListItem,
  SimpleGrid,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { getCryptoCoins } from 'lib/store/coin';
import Image from 'next/image';
import { TokenInfo, tokenList } from 'packages/constants/tokenList';
import { Web3 } from 'packages/core';
import { useEffect, useState } from 'react';
import { BsArrowDownLeftCircle, BsArrowUpRightCircle } from 'react-icons/bs';
import { FiMinus } from 'react-icons/fi';
import { GrAdd } from 'react-icons/gr';
import { MdOutlineSwapHoriz } from 'react-icons/md';
import { TbBuildingBridge2 } from 'react-icons/tb';
import { hydrateWallet } from 'lib/store/wallet';
import { useRouter } from 'next/router';

const WalletPage = () => {
  const [coins, setCoins] = useState<TokenInfo[]>([]);
  const [totalUSDBalance, setTotalUSDBalance] = useState<number>(0);
  const router = useRouter();
  const { colorMode } = useColorMode();

  useEffect(() => {
    async function init() {
      const wallet = hydrateWallet();
      const lists: TokenInfo[] = tokenList.filter((item) => item.chain === wallet.chain);
      const coinPrices = getCryptoCoins();
      const assetBalances = await Web3.getAssetBalance(wallet.chain, wallet.address);

      let usdBalance: number = 0;
      coinPrices.forEach((item) => {
        lists.forEach((innerItem) => {
          if (item.ids === innerItem.ids) {
            innerItem.price = item.price;
            innerItem.usd24hChange = item.usd24hChange;
            innerItem.balance = assetBalances[innerItem.symbol];
            usdBalance += Number(item.price) * Number(assetBalances[innerItem.symbol]);
            return;
          }
        });
      });
      setCoins(lists);
      setTotalUSDBalance(usdBalance);
    }

    init();
  }, []);

  return (
    <>
      <Box paddingX={20}>
        <Flex justifyContent={'space-between'}>
          <Box>
            <Text fontSize="2xl">Total Balance</Text>
            <Text fontSize="4xl">${parseFloat(String(totalUSDBalance)).toFixed(2)}</Text>
          </Box>
          <Flex>
            <Flex alignItems={'center'} flexDirection={'column'}>
              <IconButton
                isRound={true}
                aria-label=""
                icon={<BsArrowUpRightCircle size={30} />}
                bg={useColorModeValue('white', 'white')}
                color={'#000'}
                rounded={'full'}
                _hover={{
                  bg: '#fff',
                }}
                _focus={{
                  bg: '#fff',
                }}
                width={51}
                height={51}
                onClick={() => {
                  router.push('/send');
                }}
              />
              <Text>Send</Text>
            </Flex>
            <Flex alignItems={'center'} flexDirection={'column'} paddingLeft={5}>
              <IconButton
                isRound={true}
                aria-label=""
                icon={<BsArrowDownLeftCircle size={30} />}
                bg={useColorModeValue('white', 'white')}
                color={'#000'}
                rounded={'full'}
                _hover={{
                  bg: '#fff',
                }}
                _focus={{
                  bg: '#fff',
                }}
                width={51}
                height={51}
                onClick={() => {
                  router.push('/receive');
                }}
              />
              <Text>Receive</Text>
            </Flex>
            <Flex alignItems={'center'} flexDirection={'column'} paddingLeft={5}>
              <IconButton
                isRound={true}
                aria-label=""
                icon={<TbBuildingBridge2 size={30} />}
                bg={useColorModeValue('white', 'white')}
                color={'#000'}
                rounded={'full'}
                _hover={{
                  bg: '#fff',
                }}
                _focus={{
                  bg: '#fff',
                }}
                width={51}
                height={51}
                onClick={() => {
                  router.push('/bridge');
                }}
              />
              <Text>Bridge</Text>
            </Flex>
            <Flex alignItems={'center'} flexDirection={'column'} paddingLeft={5}>
              <IconButton
                isRound={true}
                aria-label=""
                icon={<MdOutlineSwapHoriz size={30} />}
                bg={useColorModeValue('white', 'white')}
                color={'#000'}
                rounded={'full'}
                _hover={{
                  bg: '#fff',
                }}
                _focus={{
                  bg: '#fff',
                }}
                width={51}
                height={51}
                onClick={() => {
                  router.push('/swap');
                }}
              />
              <Text>Swap</Text>
            </Flex>
            {/* <Flex alignItems={'center'} flexDirection={'column'} paddingLeft={5}>
              <IconButton
                isRound={true}
                aria-label=""
                icon={<GrAdd size={30} />}
                bg={useColorModeValue('white', 'white')}
                color={'#000'}
                rounded={'full'}
                _hover={{
                  bg: '#fff',
                }}
                _focus={{
                  bg: '#fff',
                }}
                width={51}
                height={51}
                onClick={() => {
                  router.push('/buy');
                }}
              />
              <Text>Buy</Text>
            </Flex>
            <Flex alignItems={'center'} flexDirection={'column'} paddingLeft={5}>
              <IconButton
                isRound={true}
                aria-label=""
                icon={<FiMinus size={30} />}
                bg={useColorModeValue('white', 'white')}
                color={'#000'}
                rounded={'full'}
                _hover={{
                  bg: '#fff',
                }}
                _focus={{
                  bg: '#fff',
                }}
                width={51}
                height={51}
                onClick={() => {
                  router.push('/sell');
                }}
              />
              <Text>Sell</Text>
            </Flex> */}
          </Flex>
        </Flex>
        <Grid templateColumns="repeat(1, 1fr)" marginY={5}>
          <GridItem w="100%" h="1" bg="blue.500" />
        </Grid>
        {/* 
        <SimpleGrid spacing={4} templateColumns="repeat(4, 4fr)">
          <Card padding={5}>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Text>$0</Text>
              <BsArrowUpRightCircle size={30} />
            </Flex>
            <Text marginTop={4}>Total Staked Rewards</Text>
          </Card>
          <Card padding={5}>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Text>$0</Text>
              <BsArrowUpRightCircle size={30} />
            </Flex>
            <Text marginTop={4}>Total Staked Balance</Text>
          </Card>
          <Card padding={5}>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Text>$0</Text>
              <BsArrowUpRightCircle size={30} />
            </Flex>
            <Text marginTop={4}>Total DeFi Rewards</Text>
          </Card>
          <Card padding={5}>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Text>$0</Text>
              <BsArrowUpRightCircle size={30} />
            </Flex>
            <Text marginTop={4}>Total DeFi Rewards</Text>
          </Card>
        </SimpleGrid> */}
        <Grid gap={5} templateColumns="repeat(5, 1fr)" mt={10}>
          <GridItem colSpan={2}>
            <Card py={5} backgroundColor={useColorModeValue('white', 'gray.900')}>
              <Flex alignItems={'center'} justifyContent={'space-between'} px={5}>
                <Text>Coins</Text>
                {/* <Box>
                  <Checkbox value="sasuke">Only Verified Coins</Checkbox>
                </Box> */}
              </Flex>

              <List mt={10}>
                {coins &&
                  coins.map((item, index) => (
                    <ListItem
                      px={5}
                      py={5}
                      backgroundColor={
                        index % 2 === 0
                          ? colorMode === 'light'
                            ? 'gray.50'
                            : 'gray.800'
                          : colorMode === 'light'
                          ? '#fff'
                          : 'gray.900'
                      }
                      key={index}
                    >
                      <Flex justifyContent={'space-between'}>
                        <Flex alignItems={'center'}>
                          <Image src={item.icon} alt="coin SVG" width={30} height={30} />
                          <Flex flexDirection={'column'} ml={5}>
                            <Text fontWeight={'bold'}>{item.symbol}</Text>
                            <Flex>
                              <Text>{parseFloat(item.price as string).toFixed(item.displayDecimals)}</Text>

                              <Text
                                color={parseFloat(item.usd24hChange as string) > 0 ? 'green' : 'red'}
                                marginLeft={2}
                              >
                                {parseFloat(item.usd24hChange as string) > 0 ? (
                                  <>+{parseFloat(item.usd24hChange as string)}%</>
                                ) : (
                                  <>{parseFloat(item.usd24hChange as string)}%</>
                                )}
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                        <Flex alignItems={'flex-end'} flexDirection={'column'}>
                          <Text fontWeight={'bold'}>
                            ${(Number(item.price) * Number(item.balance)).toFixed(item.displayDecimals)}
                          </Text>
                          <Text>{item.balance}</Text>
                        </Flex>
                      </Flex>
                    </ListItem>
                  ))}
              </List>
            </Card>
          </GridItem>

          <GridItem colSpan={3}>
            <Card py={5} backgroundColor={useColorModeValue('white', 'gray.900')}>
              <Text pl={5} mb={10}>
                Token Allocation
              </Text>
              {coins &&
                coins.map((item, index) => (
                  <Flex
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    backgroundColor={
                      index % 2 === 0
                        ? colorMode === 'light'
                          ? 'gray.50'
                          : 'gray.800'
                        : colorMode === 'light'
                        ? 'white'
                        : 'gray.900'
                    }
                    py={5}
                    px={5}
                    key={index}
                  >
                    <Flex alignItems={'center'}>
                      <Image src={item.icon} alt="coin SVG" width={30} height={30} />
                      <Text ml={2}>{item.symbol}</Text>
                    </Flex>
                    <Box width={50}>
                      <CircularProgress
                        value={Number(
                          (
                            ((parseFloat(item.price as string) * parseFloat(item.balance as string)) /
                              totalUSDBalance) *
                            100
                          ).toFixed(2),
                        )}
                        color="green.400"
                      >
                        <CircularProgressLabel>
                          <Text fontWeight={'bold'} fontSize={8}>
                            {(((Number(item.price) * Number(item.balance)) / totalUSDBalance) * 100).toFixed(2)}%
                          </Text>
                        </CircularProgressLabel>
                      </CircularProgress>
                    </Box>
                  </Flex>
                ))}
            </Card>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default WalletPage;
