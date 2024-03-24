import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdNotificationsNone } from 'react-icons/md';
import DefaultAvatar from 'assets/images/default-avatar.svg';
import { FaFirstOrderAlt } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa6';
import { CiStar } from 'react-icons/ci';
import { formatTimestamp } from 'utils/format';
import { useEffect, useState } from 'react';

type homeEvent = {
  eventLogo: string;
  expireTime: number;
  title: string;
  uniqueCode: string;
  type: string;
  settlementTime: number;
  totalOrderAmount: number;
  commentCount: number;
};

const FeedCard = (params: homeEvent) => {
  const { eventLogo, title, uniqueCode, settlementTime, totalOrderAmount, commentCount } = params;
  const bgColor = useColorModeValue('#f2f2f2', '#2c3f4f');

  const [currentOrigin, setCurrentOrigin] = useState<string>('');


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentOrigin(window.location.origin);
    }
  }, [])
  return (
    <Link
      href={currentOrigin + '/event/' + uniqueCode}
      style={{ textDecoration: 'none' }}
      _hover={{ backgroundColor: bgColor }}
      p={5}
    >
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Flex alignItems={'center'}>
          <Avatar src={eventLogo ? eventLogo : DefaultAvatar} />
          <Text ml={5}>{title}</Text>
        </Flex>
        <Text> {formatTimestamp(new Date(settlementTime).getTime())}</Text>
      </Flex>

      <Flex alignItems={'center'} justifyContent={'space-between'} mt={5}>
        <Flex alignItems={'center'}>
          <FaFirstOrderAlt size={20} />
          {totalOrderAmount > 0 ? (
            <>
              <Text ml={2}>{totalOrderAmount}(USDT)</Text>
            </>
          ) : (
            <>
              <Text ml={2}>0 (USDT)</Text>
            </>
          )}
        </Flex>

        <Flex alignItems={'center'}>
          <Flex pr={2} alignItems={'center'}>
            <FaRegComment size={20} />
            <Text ml={2}>{commentCount}</Text>
          </Flex>
          <CiStar size={20} />
        </Flex>
      </Flex>
    </Link>
  );
};

export default FeedCard;
