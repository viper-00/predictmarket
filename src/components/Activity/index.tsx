import { Box, Card, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import MetaTags from 'components/Common/MetaTags';
import HomeNav from 'components/Navbar/HomeNav';

const Activity = () => {
  return (
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Activity" />
      <HomeNav />
      <Container maxW={'50%'}></Container>
    </Box>
  );
};

export default Activity;
