import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  Card,
  Circle,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Input,
  Link,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Icon,
  Textarea,
  useColorModeValue,
  useToast,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import MetaTags from 'components/Common/MetaTags';
import HomeNav from 'components/Navbar/HomeNav';
import { FaQrcode } from 'react-icons/fa';
import { RiVisaLine } from 'react-icons/ri';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { getUserContractAddress } from 'lib/store/user';
import USDT from '../../assets/coin/usdt.png';
import ETH from '../../assets/coin/eth.png';
import USDC from '../../assets/coin/usdc.png';
import OP from '../../assets/coin/op.png';
import Image from 'next/image';
import { LuRefreshCw } from 'react-icons/lu';
import { IoMdMore } from 'react-icons/io';
import axios from 'packages/core/http/axios';
import { Http } from 'packages/core/http/http';
import { OP_SCAN_LINK } from 'packages/constants';
import { getEthBalance, getTotalBalance, getUsdcBalance, getUsdtBalance } from 'lib/store/balance';
import CustomButton from 'components/Button/CustomButton';
import { IS_MAINNET } from 'packages/constants';
import CustomIconButton from 'components/Button/CustomIconButton';
import { addition, multiply } from 'utils/number';
import { getEthPrice, getUsdcPrice, getUsdtPrice } from 'lib/store/price';

const Wallet = () => {
  const [contractAddress, setContractAddress] = useState<string>('');
  const [ethBalance, setEthBalance] = useState<string>('0');
  const [usdtBalance, setUsdtBalance] = useState<string>('0');
  const [usdcBalance, setUsdcBalance] = useState<string>('0');
  const [totalBalance, setTotalBalance] = useState<string>('0');

  const toast = useToast();

  useEffect(() => {
    setContractAddress(getUserContractAddress());
    setEthBalance(getEthBalance());
    setUsdtBalance(getUsdtBalance());
    setUsdcBalance(getUsdcBalance());
    setTotalBalance(getTotalBalance());
  }, []);

  const onClickRefreshBalance = async () => {
    try {
      const response: any = await axios.get(Http.userBalance);
      if (response.code === 10200 && response.result) {
        setEthBalance(response.data.eth);
        setUsdtBalance(response.data.usdt);
        setUsdcBalance(response.data.usdc);
        const total = addition(
          addition(multiply(response.data.eth, getEthPrice().usd), multiply(response.data.usdt, getUsdtPrice().usd)),
          multiply(response.data.usdc, getUsdcPrice().usd),
        );
        setTotalBalance(total.toFixed(2));

        toast({
          position: 'top',
          title: 'update completed',
          status: 'success',
          isClosable: true,
        });
      }
    } catch (e: any) {
      console.error(e);
      toast({
        position: 'top',
        title: e.message,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const onClickGetCoinForEth = async () => {
    try {
      const response: any = await axios.get(Http.freeCoin, {
        params: {
          coin: 'ETH',
        },
      });
      if (response.code === 10200 && response.result) {
        toast({
          position: 'top',
          title: 'Successfully obtain test coin',
          status: 'success',
          isClosable: true,
        });
      }
    } catch (e: any) {
      console.error(e);
      toast({
        position: 'top',
        title: e.message,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const onClickGetCoinForUsdt = async () => {
    try {
      const response: any = await axios.get(Http.freeCoin, {
        params: {
          coin: 'USDT',
        },
      });
      if (response.code === 10200 && response.result) {
        toast({
          position: 'top',
          title: 'Successfully obtain test coin',
          status: 'success',
          isClosable: true,
        });
      }
    } catch (e: any) {
      console.error(e);
      toast({
        position: 'top',
        title: e.message,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const onClickGetCoinForUsdc = async () => {
    try {
      const response: any = await axios.get(Http.freeCoin, {
        params: {
          coin: 'USDC',
        },
      });
      if (response.code === 10200 && response.result) {
        toast({
          position: 'top',
          title: 'Successfully obtain test coin',
          status: 'success',
          isClosable: true,
        });
      }
    } catch (e: any) {
      console.error(e);
      toast({
        position: 'top',
        title: e.message,
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Wallet" />
      <HomeNav />
      <Container maxWidth={['100%', '100%', '100%', '80%', '75%', '60%']} mt={10}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            <Box borderWidth={1} borderRadius={10} p={5}>
              <Flex>
                <Text backgroundColor={useColorModeValue('#2b6cb0', '#2c3f4f')} color={'#fff'} fontSize={12} fontWeight="bold" px={1}>
                  EASIEST METHOD
                </Text>
                <Text ml={5} fontSize={14}>
                  1 MINUTE - FREE
                </Text>
              </Flex>
              <Flex mt={5} alignItems={'center'}>
                <Text fontWeight={'bold'}>Deposit USDC/USDT(Optimism)</Text>
                <Circle size={10} color="white" ml={2} borderWidth={1}>
                  <Image alt="coin" src={ETH} width={30} height={30} />
                </Circle>
                <Circle size={10} color="white" ml={2} borderWidth={1}>
                  <Image alt="coin" src={USDC} width={30} height={30} />
                </Circle>
                <Circle size={10} color="white" ml={2} borderWidth={1}>
                  <Image alt="coin" src={USDT} width={30} height={30} />
                </Circle>
              </Flex>
              <Flex mt={5} alignItems={'center'}>
                <Circle size={8} backgroundColor={useColorModeValue('#f2f2f2', '#2c3f4f')}>
                  <Text>1</Text>
                </Circle>
                <Text fontSize={'14'} ml={2}>
                  Buy USDC/USDT on Coinbase, Binance or another exchange.
                </Text>
              </Flex>
              <Flex mt={5} alignItems={'center'}>
                <Circle size={8} backgroundColor={useColorModeValue('#f2f2f2', '#2c3f4f')}>
                  <Text>2</Text>
                </Circle>
                <Flex>
                  <Text ml={2} fontSize={'14'}>
                    Send/withdraw USDC/USDT to the address below and select Optimism as the network.
                  </Text>
                </Flex>
              </Flex>
              <Flex mt={5}>
                <Flex
                  width={'100%'}
                  backgroundColor={useColorModeValue('#f2f2f2', '#2c3f4f')}
                  borderRadius={10}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  px={5}
                >
                  <Box
                    onClick={async () => {
                      await navigator.clipboard.writeText(contractAddress);

                      toast({
                        position: 'top',
                        title: `Copied successfully`,
                        status: 'success',
                        isClosable: true,
                      });
                    }}
                  >
                    <Text>{contractAddress}</Text>
                  </Box>
                  <Box onClick={async () => {}}>
                    <FaQrcode />
                  </Box>
                </Flex>
                <Box ml={2}>
                  <CustomButton
                    text={'Copy'}
                    size={'lg'}
                    onClick={async () => {
                      await navigator.clipboard.writeText(contractAddress);
                      toast({
                        position: 'top',
                        title: `Copied successfully`,
                        status: 'success',
                        isClosable: true,
                      });
                    }}
                  />
                </Box>
              </Flex>
            </Box>

            <Box position="relative" py={8}>
              <Divider />
              <AbsoluteCenter backgroundColor={useColorModeValue('#f2f2f2', '#2c3f4f')} px="4">
                OTHER METHODS
              </AbsoluteCenter>
            </Box>

            <Box backgroundColor={useColorModeValue('#f2f2f2', '#2c3f4f')} p={3} borderRadius={10}>
              <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Flex alignItems={'center'}>
                  <Text fontWeight={'bold'} fontSize={16}>
                    No crypto?
                  </Text>
                  <Box ml={2}>
                    <CustomButton colorScheme="blue" size={'sm'} text={'Buy USDC/USDT'} />
                  </Box>
                </Flex>
                <Flex>
                  <Box mr={5}>
                    <RiVisaLine size={40} />
                  </Box>
                  <Box mr={5}>
                    <RiVisaLine size={40} />
                  </Box>
                  <Box mr={5}>
                    <RiVisaLine size={40} />
                  </Box>
                  <Box>
                    <RiVisaLine size={40} />
                  </Box>
                </Flex>
              </Flex>
            </Box>
            <Grid templateColumns="repeat(4, 1fr)" gap={4} mt={5}>
              <Flex direction={'column'}>
                <Flex borderRadius={10} borderWidth={1} p={5} alignItems={'center'} direction={'column'} mb={5}>
                  <Circle size={10} color="white" ml={2} borderWidth={1}>
                    <Image alt="coin" src={ETH} width={30} height={30} />
                  </Circle>
                  <Text mt={2} fontWeight={'bold'}>
                    ETH(OP)
                  </Text>
                </Flex>
                {contractAddress !== '' && !IS_MAINNET && (
                  <CustomButton
                    colorScheme={'teal'}
                    variant={'outline'}
                    text={'Get the coin'}
                    textAlign={'center'}
                    onClick={onClickGetCoinForEth}
                  />
                )}
              </Flex>
              <Flex direction={'column'}>
                <Flex borderRadius={10} borderWidth={1} p={5} alignItems={'center'} direction={'column'} mb={5}>
                  <Circle size={10} color="white" ml={2} borderWidth={1}>
                    <Image alt="coin" src={USDT} width={30} height={30} />
                  </Circle>
                  <Text mt={2} fontWeight={'bold'}>
                    USDT(OP)
                  </Text>
                </Flex>
                {contractAddress !== '' && !IS_MAINNET && (
                  <CustomButton
                    colorScheme={'teal'}
                    variant={'outline'}
                    text={'Get the coin'}
                    textAlign={'center'}
                    onClick={onClickGetCoinForUsdt}
                  />
                )}
              </Flex>
              <Flex direction={'column'}>
                <Flex borderRadius={10} borderWidth={1} p={5} alignItems={'center'} direction={'column'} mb={5}>
                  <Circle size={10} color="white" ml={2} borderWidth={1}>
                    <Image alt="coin" src={USDC} width={30} height={30} />
                  </Circle>
                  <Text mt={2} fontWeight={'bold'}>
                    USDC(OP)
                  </Text>
                </Flex>
                {contractAddress !== '' && !IS_MAINNET && (
                  <CustomButton
                    colorScheme={'teal'}
                    variant={'outline'}
                    text={'Get the coin'}
                    textAlign={'center'}
                    onClick={onClickGetCoinForUsdc}
                  />
                )}
              </Flex>

              <Flex direction={'column'}>
                <Flex borderRadius={10} borderWidth={1} p={5} alignItems={'center'} direction={'column'} mb={5}>
                  <Circle size={10} color="white" ml={2} borderWidth={1}>
                    <Image alt="coin" src={OP} width={30} height={30} />
                  </Circle>
                  <Text mt={2} fontWeight={'bold'}>
                    Other
                  </Text>
                </Flex>
              </Flex>
            </Grid>
          </GridItem>
          <GridItem colSpan={1}>
            <Box borderWidth={1} borderRadius={10} p={5}>
              <Text fontSize={12}>BALANCE</Text>
              <Flex mt={1} justifyContent={'space-between'}>
                <Text fontWeight={'bold'} fontSize={30}>
                  ${totalBalance}
                </Text>
                <Flex>
                  <Box mr={2}>
                    <CustomIconButton
                      colorScheme={'teal'}
                      variant={'outline'}
                      icon={<LuRefreshCw />}
                      textAlign={'center'}
                      borderRadius={50}
                      onClick={onClickRefreshBalance}
                    />
                  </Box>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<IoMdMore />}
                      borderRadius={50}
                      variant="outline"
                    ></MenuButton>
                    <MenuList>
                      <MenuItem>Export private key</MenuItem>
                      <MenuItem>
                        <Link
                          href={`${OP_SCAN_LINK}/${contractAddress}`}
                          target={'_blank'}
                          style={{ textDecoration: 'none' }}
                        >
                          Optimismscan
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
              <Box mt={2}>
                <Flex alignItems={'center'}>
                  <Circle size={10} color="white" borderWidth={1}>
                    <Image alt="coin" src={ETH} width={30} height={30} />
                  </Circle>
                  <Text fontWeight={'bold'} fontSize={20} ml={2}>
                    {ethBalance}
                  </Text>
                </Flex>
                <Flex alignItems={'center'} mt={3}>
                  <Circle size={10} color="white" borderWidth={1}>
                    <Image alt="coin" src={USDT} width={30} height={30} />
                  </Circle>
                  <Text fontWeight={'bold'} fontSize={20} ml={2}>
                    {usdtBalance}
                  </Text>
                </Flex>
                <Flex alignItems={'center'}  mt={3}>
                  <Circle size={10} color="white" borderWidth={1}>
                    <Image alt="coin" src={USDC} width={30} height={30} />
                  </Circle>
                  <Text fontWeight={'bold'} fontSize={20} ml={2}>
                    {usdcBalance}
                  </Text>
                </Flex>
              </Box>
            </Box>
            <Box mt={5}>
              <CustomButton
                text={'Chat with a human'}
                width={'100%'}
                leftIcon={<IoChatboxEllipsesOutline />}
                colorScheme="teal"
                variant="outline"
              />
            </Box>

            <Box borderWidth={1} borderRadius={10} p={5} mt={5}>
              <Text fontSize={'14'}>TUTORIALS</Text>
              <Box mt={2}>
                <Link href="">
                  <Text fontSize={16}>Coinbase</Text>
                </Link>
                <Link href="">
                  <Text fontSize={16}>Robinhood</Text>
                </Link>
                <Link href="">
                  <Text fontSize={16}>Paypal</Text>
                </Link>
                <Link href="">
                  <Text fontSize={16}>ETH</Text>
                </Link>
                <Link href="">
                  <Text>I dont have any crypto</Text>
                </Link>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Wallet;
