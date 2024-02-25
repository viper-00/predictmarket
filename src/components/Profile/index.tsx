import {
  Avatar,
  Box,
  Button,
  Circle,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import MetaTags from 'components/Common/MetaTags';
import HomeNav from 'components/Navbar/HomeNav';
import { getJoinedDate, getUserAvatarUrl, getUserContractAddress, getUsername } from 'lib/store/user';
import { useEffect, useState } from 'react';
import { IoStatsChart } from 'react-icons/io5';
import { formatEllipsisTxt, formatTimestamp } from 'utils/format';

const Profile = () => {
  const [username, setUsername] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [joinedDate, setJoinedDate] = useState<number>(0);

  const contractBgColor = useColorModeValue("#f2f2f2", "#2c3f4f")

  const toast = useToast();

  useEffect(() => {
    setContractAddress(getUserContractAddress());
    setUsername(getUsername());
    setJoinedDate(getJoinedDate());
    setAvatarUrl(getUserAvatarUrl());
  }, []);

  return (
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Profile" />
      <HomeNav />
      <Container maxWidth={["100%", "100%", "100%", "80%", "70%", "60%"]}>
        <Box mt={16}>
          <Flex justifyContent={'space-between'}>
            <Flex>
              {avatarUrl !== '' ? (
                <>
                  <Avatar size={'2xl'} src={avatarUrl} />
                </>
              ) : (
                <>
                  <Avatar size={'2xl'} src="./default-avatar.svg" />
                </>
              )}
              <Box ml={8}>
                <Heading>{username}</Heading>
                <Flex mt={5}>
                  <Text
                    background={contractBgColor}
                    px={4}
                    borderRadius={10}
                    height={6}
                    onClick={async () => {
                      await navigator.clipboard.writeText(contractAddress);

                      toast({
                        title: `Copied successfully`,
                        status: 'success',
                        isClosable: true,
                      });
                    }}
                  >
                    {formatEllipsisTxt(contractAddress)}
                  </Text>
                  {/* <Text pl={5}>Joined {Date(getJoinedDate().).toLocaleString()}</Text> */}
                  <Text pl={5}>Joined {formatTimestamp(joinedDate)}</Text>
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
