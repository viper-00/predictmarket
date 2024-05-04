import { Container, Box, useColorModeValue } from '@chakra-ui/react';
import HomeNav from 'components/Navbar/HomeNav';
import MetaTags from 'components/Common/MetaTags';
import HomeFeed from './HomeFeed';
import HomeFooter from './HomeFooter';
import RecentActivity from './RecentActivity';
import { IS_MAINNET } from '../../packages/constants/general';
import TestnetAlert from './TestnetAlert';
import { useEffect, useState } from 'react';
import { getUserContractAddress } from 'lib/store/user';

const Home = () => {
  const [contractAddress, setContractAddress] = useState<string>('');
  
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

  useEffect(() => {
    setContractAddress(getUserContractAddress());
  }, [])

  return (
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Home" />
      <HomeNav />
      <Container maxWidth={{ base: '99%', md: '95%', lg: '90%' }}>
        {contractAddress !== "" && !IS_MAINNET && (
          <Box mt={10}>
            <TestnetAlert />
          </Box>
        )}
        <Box mt={10}>
          <HomeFeed />
        </Box>
        <Box mt={20} mb={20}>
          <RecentActivity />
        </Box>
      </Container>
      <Box>
        <HomeFooter />
      </Box>
    </Box>
  );
};

export default Home;
