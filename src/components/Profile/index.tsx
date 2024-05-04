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
  Link,
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
import { useRouter } from 'next/router';
import axios from 'packages/core/http/axios';
import { Http } from 'packages/core/http/http';
import { UserProfile, EventType, EventOrder, EventComment, EventOrderType, EventOrderStringType } from 'packages/types';
import CustomButton from 'components/Button/CustomButton';
import { ConvertTargetCryptoToFiatBalance } from 'utils/number';

const Profile = () => {
  const {
    query: { id },
    isReady,
  } = useRouter();

  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [events, setEvents] = useState<EventType[]>([]);
  const [orders, setOrders] = useState<EventOrder[]>([]);
  const [comments, setComments] = useState<EventComment[]>([]);
  const [contractAddress, setContractAddress] = useState<string>('');

  const generalBgColor = useColorModeValue('#f2f2f2', '#2c3f4f');

  const toast = useToast();

  useEffect(() => {
    async function init() {
      try {
        const response: any = await axios.get(Http.userProfile, {
          params: {
            address: id,
          },
        });
        if (response.code === 10200 && response.result) {
          const profileResult = response.data.profile;
          const eventResult = response.data.event;
          const orderResult = response.data.order;
          const commentResult = response.data.comment;

          if (profileResult) {
            let profile: UserProfile = {
              avatarUrl: response.data.profile.avatar_url,
              bio: response.data.profile.bio,
              contractAddress: response.data.profile.contract_address,
              createdTime: response.data.profile.created_time,
              email: response.data.profile.email,
              invitationCode: response.data.profile.invitation_code,
              username: response.data.profile.username,
            };
            setUserProfile(profile);
          }

          if (eventResult && eventResult.length > 0) {
            let events: EventType[] = [];

            for (const element of eventResult) {
              let e: EventType = {
                createdTime: element.created_time,
                eventLogo: element.event_logo,
                eventStatus: element.event_status,
                expireTime: element.expire_time,
                rosolverAddress: element.rosolver_address,
                title: element.title,
                uniqueCode: element.unique_website_code,
                playId: element.play_id,
                type: element.type,
                settlementTime: element.settlement_time,
                settlementHash: element.settlement_hash,
              };
              events.push(e);
            }
            setEvents(events);
          }

          if (orderResult && orderResult.length > 0) {
            var orders: EventOrder[] = [];

            for (const element of orderResult) {
              let order: EventOrder = {
                amount: element.amount,
                orderType: element.order_type,
                userAddress: element.user_address,
                username: element.username,
                createdTime: element.created_time,
                hash: element.hash,
                coin: element.coin,
                usdAmount: ConvertTargetCryptoToFiatBalance(element.coin, element.amount)
              };

              orders.push(order);
            }
            setOrders(orders);
          }
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
    }

    if (id && id !== '') {
      init();
    }

    setContractAddress(getUserContractAddress());
  }, [id]);

  return (
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Profile" />
      <HomeNav />
      <Container maxWidth={['100%', '100%', '100%', '80%', '70%', '60%']}>
        <Box mt={16}>
          <Flex justifyContent={'space-between'}>
            <Flex>
              {userProfile?.avatarUrl !== '' ? (
                <>
                  <Avatar size={'2xl'} src={userProfile?.avatarUrl} />
                </>
              ) : (
                <>
                  <Avatar size={'2xl'} src="./default-avatar.svg" />
                </>
              )}
              <Box ml={8}>
                <Heading>{userProfile?.username}</Heading>
                <Flex mt={5}>
                  <Text
                    background={generalBgColor}
                    px={4}
                    borderRadius={10}
                    height={6}
                    onClick={async () => {
                      await navigator.clipboard.writeText(userProfile?.contractAddress as string);

                      toast({
                        position: 'top',
                        title: `Copied successfully`,
                        status: 'success',
                        isClosable: true,
                      });
                    }}
                  >
                    {formatEllipsisTxt(userProfile?.contractAddress)}
                  </Text>
                  <Text pl={5}>Joined {formatTimestamp(userProfile?.createdTime as number)}</Text>
                </Flex>
              </Box>
            </Flex>
            {contractAddress && id && contractAddress === id && (
              <CustomButton
                variant="outline"
                onClick={async () => {
                  window.location.href = '/settings';
                }}
                text={'Edit Profile'}
              />
            )}
          </Flex>
        </Box>

        <Grid templateColumns="repeat(4, 1fr)" gap={4} mt={12}>
          <Box borderWidth={1} padding={3} borderRadius={10}>
            <Circle size={10} bg="tomato" color="white">
              <IoStatsChart size={20} />
            </Circle>
            <Text mt={2}>Profit/loss</Text>
            <Text fontWeight={'bold'} fontSize={20}>
              $0
            </Text>
          </Box>
          <Box borderWidth={1} padding={3} borderRadius={10}>
            <Circle size={10} bg="tomato" color="white">
              <IoStatsChart size={20} />
            </Circle>
            <Text mt={2}>Events traded</Text>
            <Text fontWeight={'bold'} fontSize={20}>
              {events.length}
            </Text>
          </Box>
          <Box borderWidth={1} padding={3} borderRadius={10}>
            <Circle size={10} bg="tomato" color="white">
              <IoStatsChart size={20} />
            </Circle>
            <Text mt={2}>Orders traded</Text>
            <Text fontWeight={'bold'} fontSize={20}>
              {orders.length}
            </Text>
          </Box>
          <Box borderWidth={1} padding={3} borderRadius={10}>
            <Circle size={10} bg="tomato" color="white">
              <IoStatsChart size={20} />
            </Circle>
            <Text mt={2}>Comments traded</Text>
            <Text fontWeight={'bold'} fontSize={20}>
              {comments.length}
            </Text>
          </Box>
        </Grid>

        <Box mt={5} pb={10}>
          <Tabs position="relative" variant="unstyled">
            <TabList borderBottomWidth={1}>
              {/* <Tab>Activity</Tab> */}
              <Tab>Events</Tab>
              <Tab>Orders</Tab>
              <Tab>Comments</Tab>
            </TabList>
            <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
            <TabPanels>
              <TabPanel p={0}>
                {events && events.length > 0 ? (
                  events.map((item, index) => (
                    <Link
                      href={window.location.origin + '/event/' + item.uniqueCode}
                      style={{ textDecoration: 'none' }}
                      key={index}
                    >
                      <Flex
                        alignItems={'center'}
                        px={1}
                        py={3}
                        _hover={{
                          backgroundColor: generalBgColor,
                        }}
                        borderBottomWidth={1}
                      >
                        <Avatar name="Dan Abrahmov" src={item.eventLogo} />
                        <Box ml={4}>
                          <Flex alignItems={'center'}>
                            <Text
                              mt={1}
                              fontSize={14}
                              color={'#808080'}
                              background={generalBgColor}
                              px={4}
                              borderRadius={10}
                            >
                              {item.type}
                            </Text>
                            <Text fontSize={14} ml={2}>
                              {formatTimestamp(new Date(item?.expireTime as number).getTime())}
                            </Text>
                          </Flex>

                          <Flex mt={2} alignItems={'center'}>
                            <Text fontSize={14} fontWeight={'bold'}>
                              {item.title}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Link>
                  ))
                ) : (
                  <Text>No events found</Text>
                )}
              </TabPanel>
              <TabPanel p={0}>
                {orders && orders.length > 0 ? (
                  orders.map((item, index) => (
                    <Link href={'#'} style={{ textDecoration: 'none' }} key={index}>
                      <Box
                        alignItems={'center'}
                        px={1}
                        py={3}
                        _hover={{
                          backgroundColor: generalBgColor,
                        }}
                        borderBottomWidth={1}
                      >
                        <Flex alignItems={'center'}>
                          <Text
                            mt={1}
                            fontSize={14}
                            color={'#808080'}
                            background={generalBgColor}
                            px={4}
                            borderRadius={10}
                            fontWeight={'bold'}
                          >
                            {item.orderType.toUpperCase()}
                          </Text>
                          <Text fontSize={14} ml={2}>
                            {formatTimestamp(item?.createdTime)}
                          </Text>
                        </Flex>
                        <Text fontSize={16} mt={2}>
                          Amount: ${item?.usdAmount}
                        </Text>
                        {item?.orderType === EventOrderStringType.buy && (
                          <Text fontSize={16} mt={1}>
                            Hash: {formatEllipsisTxt(item?.hash)}
                          </Text>
                        )}
                      </Box>
                    </Link>
                  ))
                ) : (
                  <Text>No orders found</Text>
                )}
              </TabPanel>
              <TabPanel>
                <Text>No comments found</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
