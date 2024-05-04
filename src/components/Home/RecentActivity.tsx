import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdNotificationsNone } from 'react-icons/md';
import DefaultAvatar from 'assets/images/default-avatar.svg';
import CustomButton from 'components/Button/CustomButton';
import { HomeRecentActivity, HomeTopVolumn } from 'packages/types';

import axios from 'packages/core/http/axios';
import { Http } from 'packages/core/http/http';
import { formatTimestamp } from 'utils/format';
import { addition, ConvertTargetCryptoToFiatBalance, multiply } from 'utils/number';
import { getEthPrice, getUsdcPrice, getUsdtPrice } from 'lib/store/price';

const RecentActivity = () => {
  const [activity, setActivity] = useState<HomeRecentActivity[]>([]);
  const [volumn, setVolumn] = useState<HomeTopVolumn[]>([]);

  const toast = useToast();

  async function getActivity() {
    try {
      const response: any = await axios.get(Http.homeActivity);
      if (response.code === 10200 && response.result) {
        const activityResult = response.data;
        if (activityResult) {
          var activitys: HomeRecentActivity[] = [];
          for (const element of activityResult) {
            let a: HomeRecentActivity = {
              eventLogo: element.event_logo,
              title: element.title,
              uniqueCode: element.unique_code,
              createdTime: element.created_time,
              avatarUrl: element.avatar_url,
              amount: element.amount,
              orderType: element.order_type,
              username: element.username,
              playValue: element.play_value,
              usdAmount: ConvertTargetCryptoToFiatBalance(element.coin, element.amount),
            };
            activitys.push(a);
          }
          setActivity(activitys);
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

  async function getTopVolumn() {
    try {
      const response: any = await axios.get(Http.homeTopVolumn);
      if (response.code === 10200 && response.result) {
        const volumnResult = response.data;
        if (volumnResult) {
          var volumns: HomeTopVolumn[] = [];
          for (const element of volumnResult) {
            const totalUsdBalance = addition(
              addition(
                multiply(element.eth_balance, getEthPrice().usd),
                multiply(element.usdt_balance, getUsdtPrice().usd),
              ),
              multiply(element.usdc_balance, getUsdcPrice().usd),
            );

            let v: HomeTopVolumn = {
              avatarUrl: element.avatar_url,
              username: element.username,
              contractAddress: element.user_address,
              totalUsdAmount: parseFloat(totalUsdBalance.toFixed(2)),
            };
            volumns.push(v);
          }
          setVolumn(volumns);
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

  useEffect(() => {
    async function init() {
      await getActivity();
      await getTopVolumn();
    }

    init();
  }, []);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <Box>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Text fontWeight={'bold'} fontSize={20}>
            Recent Activity
          </Text>
          <CustomButton text="See all" colorScheme="teal" variant="outline" size="sm" />
        </Flex>
        <Box mt={5}>
          {activity &&
            activity.map((item, index) => (
              <RecentActivityLink
                key={index}
                eventLogo={item.eventLogo}
                title={item.title}
                uniqueCode={item.uniqueCode}
                createdTime={item.createdTime}
                avatarUrl={item.avatarUrl}
                amount={item.amount}
                orderType={item.orderType}
                username={item.username}
                playValue={item.playValue}
                usdAmount={item.usdAmount}
              />
            ))}
        </Box>
      </Box>

      <Box>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Text fontWeight={'bold'} fontSize={20}>
            Top Volume This Week
          </Text>
          <CustomButton text="See all" colorScheme="teal" variant="outline" size="sm" />
        </Flex>

        <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={5}>
          {volumn &&
            volumn.map((item, index) => (
              <TopVolumnLink
                key={index}
                username={item.username}
                avatarUrl={item.avatarUrl}
                totalUsdAmount={item.totalUsdAmount}
                contractAddress={item.contractAddress}
              />
            ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default RecentActivity;

const RecentActivityLink = (params: HomeRecentActivity) => {
  const { eventLogo, title, uniqueCode, createdTime, avatarUrl, amount, orderType, username, playValue, usdAmount } =
    params;
  const [currentOrigin, setCurrentOrigin] = useState<string>('');

  const bgColor = useColorModeValue('#f2f2f2', '#2c3f4f');

  async function init() {
    if (typeof window !== 'undefined') {
      setCurrentOrigin(window.location.origin);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Card p={3} _hover={{ backgroundColor: bgColor }} mb={1} boxShadow={'none'}>
      <Link href={currentOrigin + '/event/' + uniqueCode} style={{ textDecoration: 'none' }}>
        <Flex alignItems={'center'} justifyContent={'space-between'} mt={2}>
          <Flex alignItems={'center'}>
            <Avatar src={eventLogo ? eventLogo : DefaultAvatar} />
            <Box pl={4}>
              <Text>{title}</Text>
              <Flex alignItems={'center'} mt={2}>
                <Avatar src={avatarUrl ? avatarUrl : DefaultAvatar} size={'sm'} />
                <Text fontWeight={'bold'} pl={2}>
                  {username}
                </Text>
                <Text pl={1}>{orderType}</Text>
                <Text pl={1} fontWeight={'bold'}>
                  {playValue}
                </Text>
                <Text pl={1}>at</Text>
                <Text pl={1} fontWeight={'bold'}>
                  ${usdAmount}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Text>{formatTimestamp(createdTime)}</Text>
        </Flex>
      </Link>
    </Card>
  );
};

const TopVolumnLink = (params: HomeTopVolumn) => {
  const { avatarUrl, username, totalUsdAmount, contractAddress } = params;

  const bgColor = useColorModeValue('#f2f2f2', '#2c3f4f');
  const [currentOrigin, setCurrentOrigin] = useState<string>('');

  async function init() {
    if (typeof window !== 'undefined') {
      setCurrentOrigin(window.location.origin);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Card p={3} _hover={{ backgroundColor: bgColor }} boxShadow={'none'} mb={1}>
      <Link href={currentOrigin + '/profile/' + contractAddress} style={{ textDecoration: 'none' }}>
        <Flex alignItems={'center'}>
          <Avatar src={avatarUrl ? avatarUrl : DefaultAvatar} />
          <Box pl={4}>
            <Text fontWeight={'bold'}>{username}</Text>
            <Text fontSize={14}>${totalUsdAmount}</Text>
          </Box>
        </Flex>
      </Link>
    </Card>
  );
};
