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
import { IoLogoUsd } from 'react-icons/io';
import { FaQrcode } from 'react-icons/fa';
import { RiVisaLine } from 'react-icons/ri';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { getUserAuthorization, getUserContractAddress } from 'lib/store/user';
import USDT from '../../assets/coin/usdt.png';
import USDC from '../../assets/coin/usdc.png';
import Image from 'next/image';
import { LuRefreshCw } from 'react-icons/lu';
import { IoMdMore } from 'react-icons/io';
import axios from 'packages/core/http/axios';
import { Http } from 'packages/core/http/http';
import { UserCoinBalance } from 'packages/types';
import { OP_SCAN_LINK } from 'packages/constants';
import { getEthBalance, getUsdcBalance, getUsdtBalance } from 'lib/store/balance';

const Wallet = () => {
  const [contractAddress, setContractAddress] = useState<string>('');
  const [ethBalance, setEthBalance] = useState<string>('0');
  const [usdtBalance, setUsdtBalance] = useState<string>('0');

  const toast = useToast();

  useEffect(() => {
    setContractAddress(getUserContractAddress());
    setEthBalance(getEthBalance())
    setUsdtBalance(getUsdtBalance())
  }, []);

  return (
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Wallet" />
      <HomeNav />
      <Container maxWidth={['100%', '100%', '100%', '80%', '75%', '60%']} mt={10}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            <Box borderWidth={1} borderRadius={10} p={5}>
              <Flex>
                <Text backgroundColor={'#2b6cb0'} color={'#fff'} fontSize={12} fontWeight="bold" px={1}>
                  EASIEST METHOD
                </Text>
                <Text ml={5} fontSize={14}>
                  1 MINUTE - FREE
                </Text>
              </Flex>
              <Flex mt={5} alignItems={'center'}>
                <Text fontWeight={'bold'}>Deposit USDC/USDT(Optimism)</Text>
                <Circle size={10} color="white" ml={2} borderWidth={1}>
                  <Image alt="coin" src={USDC} width={30} height={30} />
                </Circle>
                <Circle size={10} color="white" ml={2} borderWidth={1}>
                  <Image alt="coin" src={USDT} width={30} height={30} />
                </Circle>
              </Flex>
              <Flex mt={5} alignItems={'center'}>
                <Circle size={8} bg="#2e5cff1a" color="black">
                  <Text>1</Text>
                </Circle>
                <Text fontSize={'14'} ml={2}>
                  Buy USDC/USDT on Coinbase, Binance or another exchange.
                </Text>
              </Flex>
              <Flex mt={5} alignItems={'center'}>
                <Circle size={8} bg="#2e5cff1a" color="black">
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
                  backgroundColor={'#f2f2f2'}
                  borderRadius={10}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  px={5}
                >
                  <Box
                    onClick={async () => {
                      await navigator.clipboard.writeText(contractAddress);

                      toast({
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
                <Button
                  colorScheme="blue"
                  size={'lg'}
                  ml={2}
                  onClick={async () => {
                    await navigator.clipboard.writeText(contractAddress);

                    toast({
                      title: `Copied successfully`,
                      status: 'success',
                      isClosable: true,
                    });
                  }}
                >
                  Copy
                </Button>
              </Flex>
            </Box>

            <Box position="relative" py={8}>
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                OTHER METHODS
              </AbsoluteCenter>
            </Box>

            <Box backgroundColor={'#eef1f5'} p={3} borderRadius={10}>
              <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Flex alignItems={'center'}>
                  <Text fontWeight={'bold'} fontSize={16}>
                    No crypto?
                  </Text>
                  <Button colorScheme="blue" borderRadius={30} ml={3} size={'sm'}>
                    Buy USDC/USDT
                  </Button>
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
              <Flex borderRadius={10} borderWidth={1} alignItems={'center'} direction={'column'} p={5}>
                <Circle size={10} color="white" ml={2} borderWidth={1}>
                  <Image alt="coin" src={USDC} width={30} height={30} />
                </Circle>
                <Text mt={2} fontWeight={'bold'}>
                  USDC(OP)
                </Text>
              </Flex>
              <Flex borderRadius={10} borderWidth={1} alignItems={'center'} direction={'column'} p={5}>
                <Circle size={10} color="white" ml={2} borderWidth={1}>
                  <Image alt="coin" src={USDT} width={30} height={30} />
                </Circle>
                <Text mt={2} fontWeight={'bold'}>
                  USDT(OP)
                </Text>
              </Flex>
              <Flex borderRadius={10} borderWidth={1} alignItems={'center'} direction={'column'} p={5}>
                <Circle size={10} color="white" ml={2} borderWidth={1}>
                  <Image alt="coin" src={USDT} width={30} height={30} />
                </Circle>
                <Text mt={2} fontWeight={'bold'}>
                  Other
                </Text>
              </Flex>
              <Flex borderRadius={10} borderWidth={1} alignItems={'center'} direction={'column'} p={5}>
                <Circle size={10} color="white" ml={2} borderWidth={1}>
                  <Image alt="coin" src={USDT} width={30} height={30} />
                </Circle>
                <Text mt={2} fontWeight={'bold'}>
                  P2P
                </Text>
              </Flex>
            </Grid>
          </GridItem>
          <GridItem colSpan={1}>
            <Box borderWidth={1} borderRadius={10} p={5}>
              <Text fontSize={12}>BALANCE</Text>
              <Flex mt={1} justifyContent={'space-between'}>
                <Text fontWeight={'bold'} fontSize={30}>
                  $0.00
                </Text>
                <Flex>
                  <IconButton
                    aria-label="refresh wallet"
                    icon={<LuRefreshCw />}
                    mr={2}
                    borderRadius={50}
                    variant="outline"
                    onClick={() => {}}
                  />
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
              <Flex mt={2}>
                <Box>
                  <Text fontWeight={'bold'} fontSize={20}>
                    (ETH)
                  </Text>
                  <Text fontWeight={'bold'} fontSize={20}>
                    (USDT)
                  </Text>
                  {/* <Text fontWeight={'bold'} fontSize={20}>
                    (USDC)
                  </Text> */}
                </Box>
                <Box ml={2}>
                  <Text fontWeight={'bold'} fontSize={20}>
                    {ethBalance}
                  </Text>
                  <Text fontWeight={'bold'} fontSize={20}>
                    {usdtBalance}
                  </Text>
                  {/* <Text fontWeight={'bold'} fontSize={20}>
                    {getUsdcBalance()}
                  </Text> */}
                </Box>
              </Flex>
            </Box>
            <Button
              mt={5}
              width={'100%'}
              leftIcon={<IoChatboxEllipsesOutline />}
              colorScheme="teal"
              variant="outline"
              borderWidth={1}
              borderRadius={10}
            >
              Chat with a human
            </Button>

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
