import { Container, Box, useColorModeValue } from '@chakra-ui/react';
import HomeNav from 'components/Navbar/HomeNav';
import { useState } from 'react';
import { Chain } from 'packages/types';
import { useRouter } from 'next/router';
import MetaTags from 'components/Common/MetaTags';
import HomeRecommend from './HomeRecommend';
import HomeFeed from './HomeFeed';
import HomeFooter from './HomeFooter';
import RecentActivity from './RecentActivity';

const Home = () => {
  const router = useRouter();

  const [address, setAddress] = useState<string>();
  const [inputVal, setInputVal] = useState<string>('');
  const [chain, setChain] = useState<Chain>(Chain.ETH);
  const [checkStatus, setCheckStatus] = useState<boolean>();

  // const wallet = hydrateWallet();

  // useEffect(() => {
  //   setAddress(wallet.address);
  //   setInputVal(wallet.address);
  //   setChain(Chain.ETH);
  // }, [wallet.address]);

  // useEffect(() => {
  //   async function init() {
  //     if (await Web3.checkAddress(chain, wallet.address)) {
  //       router.push('/dashboard');
  //     }
  //   }
  //   init();
  // }, [chain, wallet.address, router]);

  // useEffect(() => {
  //   async function checkInputStatus() {
  //     if (await Web3.checkAddress(chain, inputVal)) {
  //       setCheckStatus(true);
  //     } else {
  //       setCheckStatus(false);
  //     }
  //   }
  //   checkInputStatus();
  // }, [inputVal, chain]);

  // const handleEnterKeyPress = async (e: any) => {
  //   if (e.key === 'Enter') {
  //     if (await Web3.checkAddress(chain, inputVal)) {
  //       setAddress(inputVal);
  //       setWalletAddress({ address: inputVal });
  //       router.push('/dashboard');
  //     }
  //   }
  // };
  return (
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Home" />
      <HomeNav />
      <Container maxWidth={{ base: '99%', md: '95%', lg: '90%' }}>
        {/* <Box pt={5}>
          <HomeRecommend />
        </Box> */}
        <Box pt={10}>
          <HomeFeed />
        </Box>
        <Box pt={10} pb={20}>
          <RecentActivity />
        </Box>
      </Container>
      <Box>
        <HomeFooter />
      </Box>
      {/* <Container centerContent>
        <Heading marginBottom={6} lineHeight="tall" fontSize={30}>
          Explore all of Web3 in one place
        </Heading>
        <Text fontSize={20}>Discover, share, create or learn about cryptocurrency</Text>

        <Stack spacing={11} mt={10}>
          <InputGroup backgroundColor={useColorModeValue('white', 'gray.900')}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color={useColorModeValue('black', 'white')} />
            </InputLeftElement>
            <Input
              htmlSize={100}
              type="search"
              placeholder="Search everything you want to know about the web3"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
          </InputGroup>
        </Stack> */}

      {/* <Stack spacing={11} mt={10}>
          <InputGroup backgroundColor={useColorModeValue('white', 'gray.900')}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color={useColorModeValue('black', 'white')} />
            </InputLeftElement>
            <Input
              htmlSize={100}
              type="search"
              placeholder="Track any EVM or Cosmos address or ENS name"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
              onKeyPress={(e) => {
                handleEnterKeyPress(e);
              }}
            />

            {inputVal && (
              <>
                {checkStatus ? (
                  <InputRightElement>
                    <CheckIcon color="green.500" />
                  </InputRightElement>
                ) : (
                  <InputRightElement>
                    <CloseIcon color="red.500" />
                  </InputRightElement>
                )}
              </>
            )}
          </InputGroup>
        </Stack> */}
      {/* <Text mt={5}>Or</Text>

        <Box mt={5}>
          <ConnectButton />
          <Button
            colorScheme="teal"
            size="lg"
            onClick={() => {
              router.push('/dashboard');
            }}
          >
            Enter Page
          </Button>
        </Box>

        <Box width={1000} mt={20}>
          <Image src="./home.png" alt="Home Page" />
        </Box>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box> */}
    </Box>

    // <VStack w={'full'}>

    //   <List spacing={3}>
    //     <ListItem>
    //       <ListIcon as={CheckCircleIcon} color="green.500" />
    //     </ListItem>
    //     <ListItem>
    //       <ListIcon as={CheckCircleIcon} color="green.500" />
    //       Display Transactions
    //     </ListItem>
    //     <ListItem>
    //       <ListIcon as={CheckCircleIcon} color="green.500" />
    //       Display ERC20 transfers
    //     </ListItem>
    //     <ListItem>
    //       <ListIcon as={CheckCircleIcon} color="green.500" />
    //       Display ERC20 balances
    //     </ListItem>
    //     <ListItem>
    //       <ListIcon as={CheckCircleIcon} color="green.500" />
    //       Display NFT balances
    //     </ListItem>
    //     <ListItem>
    //       <ListIcon as={CheckCircleIcon} color="green.500" />
    //       Display NFT transfers
    //     </ListItem>
    //     <ListItem>
    //       <ListIcon as={CheckCircleIcon} color="green.500" />
    //       Multichain Support
    //     </ListItem>
    //     <ListItem>
    //       <ListIcon as={CheckCircleIcon} color="green.500" />
    //     </ListItem>
    //     <ListItem>
    //       <ListIcon as={SettingsIcon} color="green.500" />
    //       Adding explorer links to balances, transactions ...
    //     </ListItem>
    //     <ListItem>
    //       <ListIcon as={SettingsIcon} color="green.500" />
    //       Better responsive design
    //     </ListItem>
    //     <ListItem>
    //       <ListIcon as={SettingsIcon} color="green.500" />
    //       Rainbowkit integration
    //     </ListItem>
    //     <ListItem>
    //       <ListIcon as={SettingsIcon} color="green.500" />
    //       ... and more
    //     </ListItem>
    //   </List>
    // </VStack>
  );
};

export default Home;
