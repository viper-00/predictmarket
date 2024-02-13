import { EmailIcon } from '@chakra-ui/icons';
import { Box, Button, Card, CardBody, Flex, Grid, SimpleGrid, Text } from '@chakra-ui/react';
import { MdNotificationsNone } from 'react-icons/md';

const HomeRecommend = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      <Card backgroundColor={'#3182ce'} color={'#fff'}>
        <CardBody>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Box>
              <Text>Deposit</Text>
              <Text mt={5}>Add funds to start trading today</Text>
              <Button colorScheme="teal" variant="outline" my={5}>
                Add funds
              </Button>
            </Box>
            <MdNotificationsNone size={50} />
          </Flex>
        </CardBody>
      </Card>
      <Card backgroundColor={'#3182ce'} color={'#fff'}>
        <CardBody>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Box>
              <Text>Deposit</Text>
              <Text mt={5}>Add funds to start trading today</Text>
              <Button colorScheme="teal" variant="outline" my={5}>
                Add funds
              </Button>
            </Box>
            <MdNotificationsNone size={50} />
          </Flex>
        </CardBody>
      </Card>
      <Card backgroundColor={'#3182ce'} color={'#fff'}>
        <CardBody>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Box>
              <Text>Deposit</Text>
              <Text mt={5}>Add funds to start trading today</Text>
              <Button colorScheme="teal" variant="outline" my={5}>
                Add funds
              </Button>
            </Box>
            <MdNotificationsNone size={50} />
          </Flex>
        </CardBody>
      </Card>
      <Card backgroundColor={'#3182ce'} color={'#fff'}>
        <CardBody>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Box>
              <Text>Deposit</Text>
              <Text mt={5}>Add funds to start trading today</Text>
              <Button colorScheme="teal" variant="outline" my={5}>
                Add funds
              </Button>
            </Box>
            <MdNotificationsNone size={50} />
          </Flex>
        </CardBody>
      </Card>
    </Grid>
  );
};

export default HomeRecommend;
