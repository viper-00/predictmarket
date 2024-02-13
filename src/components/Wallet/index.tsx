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
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import MetaTags from 'components/Common/MetaTags';
import HomeNav from 'components/Navbar/HomeNav';
import { IoLogoUsd } from 'react-icons/io';
import { FaQrcode } from 'react-icons/fa';
import { RiVisaLine } from 'react-icons/ri';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';

const Wallet = () => {
  return (
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Wallet" />
      <HomeNav />
      <Container minWidth={'60%'} mt={10}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            <Box borderWidth={1} borderRadius={10} p={5}>
              <Flex>
                <Text as="mark">EASIEST METHOD</Text>
                <Text ml={5} fontSize={14}>
                  1 MINUTE * FREE
                </Text>
              </Flex>
              <Flex mt={5} alignItems={'center'}>
                <Text fontWeight={'bold'}>Deposit USDC/USDT(Polygon)</Text>
                <Circle size={10} bg="tomato" color="white" ml={2}>
                  <IoLogoUsd />
                </Circle>
              </Flex>
              <Flex mt={5} alignItems={'center'}>
                <Circle size={10} bg="tomato" color="white">
                  <Text>1</Text>
                </Circle>
                <Text fontSize={'16'} ml={2}>
                  Buy USDC/USDT on Coinbase, Binance or another exchange.
                </Text>
              </Flex>
              <Flex mt={5} alignItems={'center'} justifyContent={'center'}>
                <Circle size={10} bg="tomato" color="white">
                  <Text>2</Text>
                </Circle>
                <Text ml={2} fontSize={'16'}>
                  Send/withdraw USDC/USDT to the address below and select
                </Text>
                <Button size={'sm'}>Polygon</Button>
                <Text>as the network.</Text>
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
                    onClick={() => {
                      console.log('123');
                    }}
                  >
                    <Text>0x25C9eDd260F7c6b382f3Fcdf7EB82188910ccE1c</Text>
                  </Box>
                  <Box
                    onClick={() => {
                      console.log('456');
                    }}
                  >
                    <FaQrcode />
                  </Box>
                </Flex>
                <Button colorScheme="blue" size={'lg'} ml={2}>
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
                  <Text>No crypto?</Text>
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
                <Circle size={8} bg="tomato" color="white">
                  <Text>1</Text>
                </Circle>
                <Text mt={2} fontWeight={'bold'}>
                  USDC(ETH)
                </Text>
              </Flex>
              <Flex borderRadius={10} borderWidth={1} alignItems={'center'} direction={'column'} p={5}>
                <Circle size={8} bg="tomato" color="white">
                  <Text>1</Text>
                </Circle>
                <Text mt={2} fontWeight={'bold'}>
                  USDC(ETH)
                </Text>
              </Flex>
              <Flex borderRadius={10} borderWidth={1} alignItems={'center'} direction={'column'} p={5}>
                <Circle size={8} bg="tomato" color="white">
                  <Text>1</Text>
                </Circle>
                <Text mt={2} fontWeight={'bold'}>
                  USDC(ETH)
                </Text>
              </Flex>
              <Flex borderRadius={10} borderWidth={1} alignItems={'center'} direction={'column'} p={5}>
                <Circle size={8} bg="tomato" color="white">
                  <Text>1</Text>
                </Circle>
                <Text mt={2} fontWeight={'bold'}>
                  USDC(ETH)
                </Text>
              </Flex>
            </Grid>
          </GridItem>
          <GridItem colSpan={1}>
            <Box borderWidth={1} borderRadius={10} p={5}>
              <Text>BALANCE</Text>
              <Flex mt={1} justifyContent={'space-between'}>
                <Text fontWeight={'bold'} fontSize={25}>
                  $0.00
                </Text>
                <Flex>
                  <Circle size={8} bg="tomato" color="white" mr={2}>
                    <Text>1</Text>
                  </Circle>
                  <Circle size={8} bg="tomato" color="white">
                    <Text>1</Text>
                  </Circle>
                </Flex>
              </Flex>
              <Text mt={3}>Claim</Text>
            </Box>
            <Box borderWidth={1} borderRadius={10} p={2} mt={5}>
              <Flex alignItems={'center'} justifyContent={'center'}>
                <IoChatboxEllipsesOutline size={20} />
                <Text fontWeight={'bold'} ml={2}>
                  Chat with a human
                </Text>
              </Flex>
            </Box>

            <Box borderWidth={1} borderRadius={10} p={5} mt={5}>
              <Text fontSize={'14'}>TUTORIALS</Text>
              <Box mt={2}>
                <Link href="">
                  <Text>Coinbase</Text>
                </Link>
                <Link href="">
                  <Text>Robinhood</Text>
                </Link>
                <Link href="">
                  <Text>Paypal</Text>
                </Link>
                <Link href="">
                  <Text>ETH</Text>
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
