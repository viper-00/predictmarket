import { Box, Card, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import MetaTags from 'components/Common/MetaTags';
import HomeNav from 'components/Navbar/HomeNav';

const Tos = () => {
  return (
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Terms of Service" />
      <HomeNav />
      <Container maxW={'50%'}>
        <Card mt={5}>
          <Box px={100} py={10} style={{ display: 'block', overflow: 'auto', scrollbarWidth: 'auto', maxHeight: 800 }}>
            <VStack spacing="2" alignItems="flex-start">
              <Text fontSize={20} fontWeight={'bold'}>
                Terms of Use
              </Text>
              <Text fontSize={16}>Last Updated: January 11, 2022</Text>
              <Text fontSize={16} fontWeight={'bold'}>
                Introduction
              </Text>
              <Text as="p" fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam arcu, eu tempus tortor
                molestie at. Vestibulum pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed imperdiet.
                Mauris quis erat consequat, commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere.
                Curabitur neque tortor, mattis nec lacus non, placerat congue elit.
              </Text>
              <Text as="p" fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam arcu, eu tempus tortor
                molestie at. Vestibulum pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed imperdiet.
                Mauris quis erat consequat, commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere.
                Curabitur neque tortor, mattis nec lacus non, placerat congue elit.
              </Text>
              <Text as="p" fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam arcu, eu tempus tortor
                molestie at. Vestibulum pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed imperdiet.
                Mauris quis erat consequat, commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere.
                Curabitur neque tortor, mattis nec lacus non, placerat congue elit.
              </Text>
              <Text as="p" fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam arcu, eu tempus tortor
                molestie at. Vestibulum pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed imperdiet.
                Mauris quis erat consequat, commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere.
                Curabitur neque tortor, mattis nec lacus non, placerat congue elit.
              </Text>
              <Text as="p" fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam arcu, eu tempus tortor
                molestie at. Vestibulum pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed imperdiet.
                Mauris quis erat consequat, commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere.
                Curabitur neque tortor, mattis nec lacus non, placerat congue elit.
              </Text>
              <Text as="p" fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam arcu, eu tempus tortor
                molestie at. Vestibulum pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed imperdiet.
                Mauris quis erat consequat, commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere.
                Curabitur neque tortor, mattis nec lacus non, placerat congue elit.
              </Text>
            </VStack>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Tos;
