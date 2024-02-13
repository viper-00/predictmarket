import {
  Avatar,
  Box,
  Button,
  Circle,
  Container,
  Flex,
  Grid,
  Heading,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import MetaTags from 'components/Common/MetaTags';
import HomeNav from 'components/Navbar/HomeNav';
import { IoStatsChart } from 'react-icons/io5';

const Profile = () => {
  return (
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Profile" />
      <HomeNav />
      <Container minWidth={'55%'}>
        <Box mt={16}>
          <Flex justifyContent={'space-between'}>
            <Flex>
              <Avatar src="https://bit.ly/broken-link" size={'2xl'} />
              <Box ml={8}>
                <Heading>Viper00</Heading>
                <Flex mt={5}>
                  <Text>0x25C9...cE1c</Text>
                  <Text pl={5}>Joined Feb 2024</Text>
                </Flex>
              </Box>
            </Flex>
            <Button
              variant="outline"
              onClick={() => {
                window.location.href = '/settings';
              }}
            >
              Edit Profile
            </Button>
          </Flex>
        </Box>

        <Grid templateColumns="repeat(4, 1fr)" gap={4} mt={12}>
          <Box borderWidth={1} padding={3} borderRadius={10}>
            <Circle size={10} bg="tomato" color="white">
              <IoStatsChart size={20} />
            </Circle>
            <Text mt={2}>Positions value</Text>
            <Text fontWeight={'bold'} fontSize={20}>
              $0.00
            </Text>
          </Box>
          <Box borderWidth={1} padding={3} borderRadius={10}>
            <Circle size={10} bg="tomato" color="white">
              <IoStatsChart size={20} />
            </Circle>
            <Text mt={2}>Profit/loss</Text>
            <Text fontWeight={'bold'} fontSize={20}>
              $0.00
            </Text>
          </Box>
          <Box borderWidth={1} padding={3} borderRadius={10}>
            <Circle size={10} bg="tomato" color="white">
              <IoStatsChart size={20} />
            </Circle>
            <Text mt={2}>Volume traded</Text>
            <Text fontWeight={'bold'} fontSize={20}>
              $0.00
            </Text>
          </Box>
          <Box borderWidth={1} padding={3} borderRadius={10}>
            <Circle size={10} bg="tomato" color="white">
              <IoStatsChart size={20} />
            </Circle>
            <Text mt={2}>Markets traded</Text>
            <Text fontWeight={'bold'} fontSize={20}>
              0
            </Text>
          </Box>
        </Grid>

        <Box mt={5}>
          <Tabs position="relative" variant="unstyled">
            <TabList borderBottomWidth={1}>
              <Tab>Positions</Tab>
              <Tab>Activity</Tab>
            </TabList>
            <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
            <TabPanels>
              <TabPanel>
                <Text>No positions found</Text>
              </TabPanel>
              <TabPanel>
                <Text>No positions found</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
