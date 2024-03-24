import {
  Progress,
  Box,
  ButtonGroup,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Container,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Avatar,
  Grid,
  IconButton,
  Circle,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  TabPanel,
  TabPanels,
  Card,
  CardBody,
  Image,
  Stack,
  Divider,
  CardFooter,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  useNumberInput,
  useToast,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
} from '@chakra-ui/react';

import axios from 'packages/core/http/axios';
import { Http } from 'packages/core/http/http';
import { DEFAULT_CHAIN_ID } from 'packages/constants';
import MetaTags from 'components/Common/MetaTags';
import HomeNav from 'components/Navbar/HomeNav';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  EventCommentType,
  EventOrder,
  EventOrderStringType,
  EventOrderType,
  EventPlayType,
  EventPlayValueType,
  EventType,
} from 'packages/types';
import { formatTimestamp, formatEllipsisTxt } from 'utils/format';
import { CiStar } from 'react-icons/ci';
import { FaLink } from 'react-icons/fa6';
import { FaHammer } from 'react-icons/fa';
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';
import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { getUserAuthorization, getUserContractAddress, setUserContractAddress } from 'lib/store/user';
import { getUsdtBalance } from 'lib/store/balance';
import CustomButton from 'components/Button/CustomButton';

const Event = () => {
  const {
    query: { id },
    isReady,
  } = useRouter();

  const [event, setEvent] = useState<EventType>();
  const [eventPlay, setEventPlay] = useState<EventPlayType>();
  const [eventComment, setEventComment] = useState<EventCommentType[]>([]);
  const [currentEventPlay, setCurrentEventPlay] = useState<EventPlayValueType>();
  // const [currentOrder, setCurrentOrder] = useState<string>();
  const [currentAmount, setCurrentAmount] = useState<string>('');
  const [currentOrderStatus, setCurrentOrderStatus] = useState<EventOrderStringType>(EventOrderStringType.buy);
  const [usdtBalance, setUsdtBalance] = useState<string>('0');
  const [payLoading, setPayLoading] = useState<boolean>(false);
  const [sellLoading, setSellLoading] = useState<boolean>(false);
  const [userAddress, setUserAddress] = useState<string>('');
  const [isSettlement, setIsSettlement] = useState<boolean>(false);
  const [currentOrigin, setCurrentOrigin] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const onChangeComment = (event: any) => {
    setComment(event.target.value);
  };

  const onChangeDec = () => {
    const value = parseFloat(currentAmount) - 1;
    if (value >= (eventPlay?.minimumCapitalPool as number)) {
      setCurrentAmount(value.toString());
    }
  };

  const onChangeInc = () => {
    const value = parseFloat(currentAmount) + 1;
    if (value <= (eventPlay?.maximumCapitalPool as number)) {
      setCurrentAmount(value.toString());
    }
  };

  async function init() {
    if (typeof window !== 'undefined') {
      setCurrentOrigin(window.location.origin);
    }

    setUsdtBalance(getUsdtBalance());
    setUserAddress(getUserContractAddress());

    const response: any = await axios.get(Http.marketEvent, {
      params: {
        code: id,
      },
    });
    if (response.code === 10200 && response.result) {
      const eventResult = response.data.event;
      const playResult = response.data.play;
      const commentResult = response.data.comment;
      setIsSettlement(response.data.is_settlement);

      if (eventResult) {
        let e: EventType = {
          createdTime: eventResult.created_time,
          eventLogo: eventResult.event_logo,
          eventStatus: eventResult.event_status,
          expireTime: eventResult.expire_time,
          rosolverAddress: eventResult.rosolver_address,
          title: eventResult.title,
          uniqueCode: eventResult.unique_website_code,
          playId: eventResult.play_id,
          type: eventResult.type,
          settlementTime: eventResult.settlement_time,
          settlementHash: eventResult.settlement_hash,
        };
        setEvent(e);
      }

      if (commentResult) {
        var comments: EventCommentType[] = [];
        for (const element of commentResult) {
          let c: EventCommentType = {
            username: element.username,
            avatarUrl: element.avatar_url,
            content: element.content,
            commentId: element.comment_id,
            createdTime: element.created_time,
            userAddress: element.user_address,
            likeCount: element.like_count,
            ownLikeStatus: element.own_like_status,
          };
          comments.push(c);
        }
        setEventComment(comments);
      }

      if (playResult) {
        let values: EventPlayValueType[] = [];

        if (playResult.values) {
          for (const element of playResult.values) {
            let e: EventPlayValueType = {
              value: element.value,
              orders: [],
            };

            var orders: EventOrder[] = [];

            if (element.orders && element.orders.length > 0) {
              for (const orderElement of element.orders) {
                let order: EventOrder = {
                  amount: orderElement.amount,
                  orderType: orderElement.order_type,
                  userAddress: orderElement.user_address,
                  username: orderElement.username,
                  createdTime: orderElement.created_time,
                  hash: orderElement.hash,
                };

                orders.push(order);
              }
            }

            e.orders = orders;

            values.push(e);
          }
        }

        let t: EventPlayType = {
          title: playResult.title,
          introduce: playResult.introduce,
          guessNumber: playResult.guess_number,
          minimumCapitalPool: playResult.minimum_capital_pool,
          maximumCapitalPool: playResult.maximum_capital_pool,
          coin: playResult.coin,
          pledgeAmount: playResult.pledge_amount,
          values: values,
        };
        setEventPlay(t);
        setCurrentAmount(t.minimumCapitalPool.toString());
      }
    }
  }

  useEffect(() => {
    if (id && id !== '') {
      init();
    }
  }, [id]);

  const toast = useToast();

  const handleClickPostComment = async () => {
    try {
      const response: any = await axios.post(Http.marketEventComment, {
        code: event?.uniqueCode,
        content: comment,
        reply_id: 0,
      });

      if (response.code === 10200 && response.result) {
        await init();

        setComment('');
        toast({
          position: 'top',
          title: `Sent successfully`,
          status: 'success',
          isClosable: true,
        });
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
  };

  const onChangeCurrentAmount = (event: any) => {
    // if (
    //   (eventPlay?.minimumCapitalPool as number) <= event.target.value &&
    //   (eventPlay?.maximumCapitalPool as number) >= event.target.value
    // ) {
    // }
    setCurrentAmount(event.target.value);
  };

  const onClickBuy = async () => {
    try {
      setPayLoading(true);
      const response: any = await axios.post(Http.marketEventOrder, {
        event_unique_code: event?.uniqueCode,
        amount: parseFloat(currentAmount),
        play_value: currentEventPlay?.value,
        type: EventOrderType[currentOrderStatus],
      });

      if (response.code === 10200 && response.result) {
        toast({
          position: 'top',
          title: `Successful purchase`,
          status: 'success',
          isClosable: true,
        });
        window.location.reload();
      }
    } catch (e: any) {
      console.error(e);
      toast({
        position: 'top',
        title: e.message,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setPayLoading(false);
    }
  };

  const onClickSell = async () => {
    try {
      setSellLoading(true);
      const response: any = await axios.post(Http.marketEventOrder, {
        event_unique_code: event?.uniqueCode,
        play_value: currentEventPlay?.value,
        type: EventOrderType[currentOrderStatus],
      });

      if (response.code === 10200 && response.result) {
        toast({
          position: 'top',
          title: `Successfully sell`,
          status: 'success',
          isClosable: true,
        });
        window.location.reload();
      }
    } catch (e: any) {
      console.error(e);
      toast({
        position: 'top',
        title: e.message,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setSellLoading(false);
    }
  };

  return (
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Event" />
      <HomeNav />
      <Container maxWidth={['100%', '100%', '100%', '100%', '90%', '60%']} mt={10}>
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          <GridItem colSpan={2}>
            <Flex justifyContent={'space-between'}>
              <Flex>
                <Avatar size="lg" name="Event logo" src={event?.eventLogo} />
                <Box ml={5}>
                  <Flex>
                    <Text backgroundColor={'#f2f2f2'} fontSize={14} px={2} py={1}>
                      {event?.type}
                    </Text>
                    <Text ml={4}>{formatTimestamp(new Date(event?.expireTime as number).getTime())}</Text>
                  </Flex>
                  <Text fontWeight={'bold'} fontSize={20} mt={2}>
                    {event?.title}
                  </Text>
                </Box>
              </Flex>
              <Flex>
                <IconButton icon={<CiStar />} aria-label="collect" mr={2} />
                <IconButton
                  icon={<FaLink />}
                  aria-label="link"
                  onClick={async () => {
                    await navigator.clipboard.writeText(window.location.href);

                    toast({
                      position: 'top',
                      title: `Copied successfully`,
                      status: 'success',
                      isClosable: true,
                    });
                  }}
                />
              </Flex>
            </Flex>
            <Box mt={10}>
              <Grid templateColumns="repeat(4, 1fr)" gap={2} rowGap={8} textAlign="center">
                {eventPlay?.values &&
                  eventPlay.values.map((item, index) => (
                    <GridItem colSpan={1} key={index}>
                      {item.orders &&
                      item.orders.length > 0 &&
                      item.orders[0].orderType === EventOrderStringType.buy ? (
                        <>
                          <CustomButton
                            text={item.value}
                            colorScheme="red"
                            size="lg"
                            isDisabled={
                              item.orders[0].userAddress === userAddress && event?.eventStatus === 1 ? false : true
                            }
                            onClick={async () => {
                              setCurrentEventPlay(item);
                              if (item.orders[0].userAddress === userAddress) {
                                if (item.orders[0].orderType === EventOrderStringType.buy) {
                                  setCurrentOrderStatus(EventOrderStringType.sell);
                                  setCurrentAmount(item.orders[0].amount.toString());
                                } else if (item.orders[0].orderType === EventOrderStringType.sell) {
                                  setCurrentOrderStatus(EventOrderStringType.buy);
                                }
                              }
                            }}
                          />

                          <Link href={currentOrigin + '/profile/' + item.orders[0].userAddress}>
                            <Text fontSize={14} fontWeight={'bold'}>
                              {item.orders[0].username} || USDT({item.orders[0].amount})
                            </Text>
                          </Link>
                        </>
                      ) : (
                        <>
                          <CustomButton
                            colorScheme="teal"
                            size="lg"
                            text={item.value}
                            onClick={async () => {
                              setCurrentEventPlay(item);
                              setCurrentOrderStatus(EventOrderStringType.buy);
                            }}
                          />
                        </>
                      )}
                    </GridItem>
                  ))}
              </Grid>
            </Box>
            <Box mt={10}>
              <Text fontSize={20} fontWeight="bold">
                Rules
              </Text>

              <Text mt={2}>{eventPlay?.introduce}</Text>

              <Flex
                borderRadius={10}
                borderWidth={1}
                alignItems="center"
                px={5}
                mt={5}
                py={2}
                justifyContent="space-between"
              >
                <Flex>
                  <Circle size={10} borderWidth={1} backgroundColor="#f2f2f2">
                    <FaHammer size={20} />
                  </Circle>
                  <Box ml={4}>
                    <Text fontSize={14}>Resolver</Text>
                    <Link href={currentOrigin + '/profile/' + event?.rosolverAddress}>
                      <Text>{event?.rosolverAddress}</Text>
                    </Link>
                  </Box>
                </Flex>
                ·
                <Box>
                  {event?.eventStatus === 1 && isSettlement && <PasswordModel code={event?.uniqueCode as string} />}
                </Box>
              </Flex>
            </Box>

            <Box mt={5} mb={10}>
              <Tabs position="relative" variant="unstyled">
                <TabList borderBottomWidth={1}>
                  {eventComment.length > 0 ? <Tab>Comments({eventComment.length})</Tab> : <Tab>Comments</Tab>}
                  {/* <Tab>Activity</Tab>
                  <Tab>Related</Tab> */}
                </TabList>
                <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
                <TabPanels>
                  <TabPanel px={0}>
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        type={'text'}
                        placeholder="Add a comment"
                        value={comment}
                        onChange={onChangeComment}
                      />
                      <InputRightElement width="4.5rem">
                        <CustomButton
                          size="sm"
                          onClick={async () => {
                            handleClickPostComment();
                          }}
                          text={'Post'}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <Flex alignItems={'center'} mt={5}>
                      <Text fontSize={16} color={'#828282'}>
                        Sort by
                      </Text>
                      <Select width={150} ml={3}>
                        <option value="option1">Newwest</option>
                        <option value="option2">Likes</option>
                      </Select>
                    </Flex>

                    <Grid rowGap={6} mt={6}>
                      {eventComment &&
                        eventComment.map((item, index) => (
                          <EventComment
                            key={index}
                            content={item.content}
                            avatarUrl={item.avatarUrl}
                            username={item.username}
                            createTime={item.createdTime}
                            likeCount={item.likeCount}
                            ownLikeStatus={item.ownLikeStatus}
                            commentId={item.commentId}
                            init={init}
                          />
                        ))}
                    </Grid>
                  </TabPanel>
                  {/* <TabPanel px={0} pt={0}>
                    <Flex alignItems={'center'} justifyContent="space-between" py={5} borderBottomWidth={1}>
                      <Flex alignItems={'center'}>
                        <Avatar size="sm" name="Event logo" src={event?.eventLogo} />
                        <Text pl={4}>Skip-Earthwax</Text>
                        <Text pl={1}>sold</Text>
                        <Text pl={1}>399</Text>
                        <Text pl={1}>Yes</Text>
                        <Text pl={1}>for</Text>
                        <Text pl={1}>Joe Biden</Text>
                        <Text pl={1}>at</Text>
                        <Text pl={1}>33.0¢</Text>
                        <Text>($132)</Text>
                      </Flex>
                      <Text>10m ago</Text>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent="space-between" py={5} borderBottomWidth={1}>
                      <Flex alignItems={'center'}>
                        <Avatar size="sm" name="Event logo" src={event?.eventLogo} />
                        <Text pl={4}>Skip-Earthwax</Text>
                        <Text pl={1}>sold</Text>
                        <Text pl={1}>399</Text>
                        <Text pl={1}>Yes</Text>
                        <Text pl={1}>for</Text>
                        <Text pl={1}>Joe Biden</Text>
                        <Text pl={1}>at</Text>
                        <Text pl={1}>33.0¢</Text>
                        <Text>($132)</Text>
                      </Flex>
                      <Text>10m ago</Text>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent="space-between" py={5} borderBottomWidth={1}>
                      <Flex alignItems={'center'}>
                        <Avatar size="sm" name="Event logo" src={event?.eventLogo} />
                        <Text pl={4}>Skip-Earthwax</Text>
                        <Text pl={1}>sold</Text>
                        <Text pl={1}>399</Text>
                        <Text pl={1}>Yes</Text>
                        <Text pl={1}>for</Text>
                        <Text pl={1}>Joe Biden</Text>
                        <Text pl={1}>at</Text>
                        <Text pl={1}>33.0¢</Text>
                        <Text>($132)</Text>
                      </Flex>
                      <Text>10m ago</Text>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent="space-between" py={5} borderBottomWidth={1}>
                      <Flex alignItems={'center'}>
                        <Avatar size="sm" name="Event logo" src={event?.eventLogo} />
                        <Text pl={4}>Skip-Earthwax</Text>
                        <Text pl={1}>sold</Text>
                        <Text pl={1}>399</Text>
                        <Text pl={1}>Yes</Text>
                        <Text pl={1}>for</Text>
                        <Text pl={1}>Joe Biden</Text>
                        <Text pl={1}>at</Text>
                        <Text pl={1}>33.0¢</Text>
                        <Text>($132)</Text>
                      </Flex>
                      <Text>10m ago</Text>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent="space-between" py={5} borderBottomWidth={1}>
                      <Flex alignItems={'center'}>
                        <Avatar size="sm" name="Event logo" src={event?.eventLogo} />
                        <Text pl={4}>Skip-Earthwax</Text>
                        <Text pl={1}>sold</Text>
                        <Text pl={1}>399</Text>
                        <Text pl={1}>Yes</Text>
                        <Text pl={1}>for</Text>
                        <Text pl={1}>Joe Biden</Text>
                        <Text pl={1}>at</Text>
                        <Text pl={1}>33.0¢</Text>
                        <Text>($132)</Text>
                      </Flex>
                      <Text>10m ago</Text>
                    </Flex>
                  </TabPanel>
                  <TabPanel px={0} pt={0}>
                    <Link href="#" style={{ textDecoration: 'none' }}>
                      <Flex
                        alignItems={'center'}
                        px={1}
                        py={3}
                        _hover={{
                          backgroundColor: '#f2f2f2',
                        }}
                        borderBottomWidth={1}
                      >
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Box ml={4}>
                          <Text fontSize={14} fontWeight={'bold'}>
                            Market icon [Single Market] Will Donald J. Trump win the U.S. 2024 Republican presidential
                            nomination?
                          </Text>
                          <Text mt={1} fontSize={14} color={'#808080'}>
                            $1,011,470 Bet
                          </Text>
                        </Box>
                        <Flex>
                          <Box mr={2}>
                            <CustomButton text="Buy" />
                          </Box>
                          <CustomButton text="Sell" />
                        </Flex>
                      </Flex>
                    </Link>
                    <Link href="#" style={{ textDecoration: 'none' }}>
                      <Flex
                        alignItems={'center'}
                        px={1}
                        py={3}
                        _hover={{
                          backgroundColor: '#f2f2f2',
                        }}
                        borderBottomWidth={1}
                      >
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Box ml={4}>
                          <Text fontSize={14} fontWeight={'bold'}>
                            Market icon [Single Market] Will Donald J. Trump win the U.S. 2024 Republican presidential
                            nomination?
                          </Text>
                          <Text mt={1} fontSize={14} color={'#808080'}>
                            $1,011,470 Bet
                          </Text>
                        </Box>
                        <Flex>
                          <Box mr={2}>
                            <CustomButton text="Buy" />
                          </Box>
                          <CustomButton text="Sell" />
                        </Flex>
                      </Flex>
                    </Link>
                    <Link href="#" style={{ textDecoration: 'none' }}>
                      <Flex
                        alignItems={'center'}
                        px={1}
                        py={3}
                        _hover={{
                          backgroundColor: '#f2f2f2',
                        }}
                        borderBottomWidth={1}
                      >
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Box ml={4}>
                          <Text fontSize={14} fontWeight={'bold'}>
                            Market icon [Single Market] Will Donald J. Trump win the U.S. 2024 Republican presidential
                            nomination?
                          </Text>
                          <Text mt={1} fontSize={14} color={'#808080'}>
                            $1,011,470 Bet
                          </Text>
                        </Box>
                        <Flex>
                          <Box mr={2}>
                            <CustomButton text="Buy" />
                          </Box>
                          <CustomButton text="Sell" />
                        </Flex>
                      </Flex>
                    </Link>
                    <Link href="#" style={{ textDecoration: 'none' }}>
                      <Flex
                        alignItems={'center'}
                        px={1}
                        py={3}
                        _hover={{
                          backgroundColor: '#f2f2f2',
                        }}
                        borderBottomWidth={1}
                      >
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Box ml={4}>
                          <Text fontSize={14} fontWeight={'bold'}>
                            Market icon [Single Market] Will Donald J. Trump win the U.S. 2024 Republican presidential
                            nomination?
                          </Text>
                          <Text mt={1} fontSize={14} color={'#808080'}>
                            $1,011,470 Bet
                          </Text>
                        </Box>
                        <Flex>
                          <Box mr={2}>
                            <CustomButton text="Buy" />
                          </Box>
                          <CustomButton text="Sell" />
                        </Flex>
                      </Flex>
                    </Link>
                    <Link href="#" style={{ textDecoration: 'none' }}>
                      <Flex
                        alignItems={'center'}
                        px={1}
                        py={3}
                        _hover={{
                          backgroundColor: '#f2f2f2',
                        }}
                        borderBottomWidth={1}
                      >
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Box ml={4}>
                          <Text fontSize={14} fontWeight={'bold'}>
                            Market icon [Single Market] Will Donald J. Trump win the U.S. 2024 Republican presidential
                            nomination?
                          </Text>
                          <Text mt={1} fontSize={14} color={'#808080'}>
                            $1,011,470 Bet
                          </Text>
                        </Box>
                        <Flex>
                          <Box mr={2}>
                            <CustomButton text="Buy" />
                          </Box>
                          <CustomButton text="Sell" />
                        </Flex>
                      </Flex>
                    </Link>
                  </TabPanel> */}
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>

          {event?.eventStatus === 1 && (
            <>
              <GridItem colSpan={1} display={currentEventPlay ? 'block' : 'none'}>
                <Box position="fixed">
                  <Card maxW="sm">
                    <CardBody px={0}>
                      <Box>
                        <Flex alignItems={'center'} px={5}>
                          <Avatar size="md" name="Event logo" src={event?.eventLogo} />
                          <Text fontWeight={'bold'} ml={3}>
                            {currentEventPlay?.value}
                          </Text>
                        </Flex>
                        <Flex
                          mt={4}
                          px={5}
                          justifyContent="space-between"
                          alignItems={'flex-start'}
                          borderBottomWidth={1}
                        >
                          <Flex alignItems={'center'}>
                            {currentOrderStatus === EventOrderStringType.buy ? (
                              <>
                                <Link
                                  href="#"
                                  style={{ textDecoration: 'none' }}
                                  onClick={() => {
                                    setCurrentOrderStatus(EventOrderStringType.buy);
                                  }}
                                >
                                  <Text
                                    height={38}
                                    fontWeight={currentOrderStatus === EventOrderStringType.buy ? 'bold' : ''}
                                    borderBottomWidth={currentOrderStatus === EventOrderStringType.buy ? 1 : 0}
                                    borderColor={currentOrderStatus === EventOrderStringType.buy ? '#1652f0' : ''}
                                    color={currentOrderStatus === EventOrderStringType.buy ? '#1652f0' : ''}
                                  >
                                    Buy
                                  </Text>
                                </Link>
                              </>
                            ) : (
                              <>
                                <Link
                                  href="#"
                                  style={{ textDecoration: 'none' }}
                                  onClick={() => {
                                    setCurrentOrderStatus(EventOrderStringType.sell);
                                  }}
                                >
                                  <Text
                                    height={38}
                                    fontWeight={currentOrderStatus === EventOrderStringType.sell ? 'bold' : ''}
                                    borderBottomWidth={currentOrderStatus === EventOrderStringType.sell ? 1 : 0}
                                    borderColor={currentOrderStatus === EventOrderStringType.sell ? '#1652f0' : ''}
                                    color={currentOrderStatus === EventOrderStringType.sell ? '#1652f0' : ''}
                                  >
                                    Sell
                                  </Text>
                                </Link>
                              </>
                            )}
                          </Flex>
                          {/* <Select variant="unstyled" width={24}>
                      <option value="option1">Market</option>
                      <option value="option1">Limit</option>
                      <option value="option1">AMM</option>
                    </Select> */}
                        </Flex>
                        <Box mt={4} px={5}>
                          <Flex justifyContent={'space-between'} alignItems={'center'}>
                            <Text>{currentOrderStatus === EventOrderStringType.buy ? 'Amount' : 'Handles'}</Text>
                            <Flex alignItems={'center'}>
                              {currentOrderStatus === EventOrderStringType.buy ? (
                                <>
                                  <Text backgroundColor={'#f2f2f2'} borderRadius={10} px={2} mr={2} fontSize={14}>
                                    Balance {usdtBalance}
                                  </Text>
                                </>
                              ) : (
                                <>
                                  <Text backgroundColor={'#f2f2f2'} borderRadius={10} px={2} mr={2} fontSize={14}>
                                    You already hold {currentEventPlay?.orders[0].amount}
                                  </Text>
                                </>
                              )}

                              {currentOrderStatus === EventOrderStringType.buy && (
                                <>
                                  <CustomButton
                                    text="Max"
                                    colorScheme="gray"
                                    size="xs"
                                    onClick={async () => {
                                      setCurrentAmount((eventPlay?.maximumCapitalPool as number).toString());
                                    }}
                                  />
                                </>
                              )}
                            </Flex>
                          </Flex>

                          <HStack mt={4}>
                            <CustomButton
                              text="-"
                              isDisabled={currentOrderStatus === EventOrderStringType.sell && true}
                              onClick={async () => {
                                onChangeDec;
                              }}
                            />
                            <Input value={currentAmount} onChange={onChangeCurrentAmount} textAlign={'center'} />
                            <CustomButton
                              text="+"
                              isDisabled={currentOrderStatus === EventOrderStringType.sell && true}
                              onClick={async () => {
                                onChangeInc;
                              }}
                            />
                          </HStack>

                          {Number(usdtBalance) < (eventPlay?.guessNumber as number) && (
                            <Text fontSize={14} color={'red'} py={2}>
                              Insufficient balance
                            </Text>
                          )}

                          {EventOrderStringType[currentOrderStatus] === EventOrderStringType.buy && (
                            <Box mt={5}>
                              <CustomButton
                                text={'Buy'}
                                width={'100%'}
                                onClick={async () => {
                                  onClickBuy();
                                }}
                                isDisabled={Number(usdtBalance) < (eventPlay?.guessNumber as number) ? true : false}
                              />
                            </Box>
                          )}
                          {EventOrderStringType[currentOrderStatus] === EventOrderStringType.sell && (
                            <Box mt={5}>
                              <CustomButton
                                colorScheme="red"
                                text={'Sell'}
                                width={'100%'}
                                onClick={async () => {
                                  onClickSell();
                                }}
                              />
                            </Box>
                          )}

                          {currentOrderStatus === EventOrderStringType.sell && (
                            <>
                              <Text color={'red'} fontSize={12} textAlign={'center'} mt={5}>
                                (Your fund will return it to you during the settlement)
                              </Text>
                            </>
                          )}

                          <Box mt={6}>
                            <Flex justifyContent={'space-between'}>
                              <Text fontSize={14} color={'#828282'}>
                                Avg price
                              </Text>
                              <Text>
                                {eventPlay?.guessNumber} {eventPlay?.coin}
                              </Text>
                            </Flex>
                            <Flex justifyContent={'space-between'}>
                              <Text fontSize={14} color={'#828282'}>
                                Minimum Capital Pool
                              </Text>
                              <Text>
                                {eventPlay?.minimumCapitalPool} {eventPlay?.coin}
                              </Text>
                            </Flex>
                            <Flex justifyContent={'space-between'}>
                              <Text fontSize={14} color={'#828282'}>
                                Maximum Capital Pool
                              </Text>
                              <Text>
                                {eventPlay?.maximumCapitalPool} {eventPlay?.coin}
                              </Text>
                            </Flex>
                            <Flex justifyContent={'space-between'}>
                              <Text fontSize={14} color={'#828282'}>
                                Pledge amount
                              </Text>
                              <Text>
                                {eventPlay?.pledgeAmount} {eventPlay?.coin}
                              </Text>
                            </Flex>
                          </Box>
                        </Box>
                      </Box>
                    </CardBody>
                  </Card>
                </Box>
              </GridItem>
            </>
          )}

          {event?.eventStatus === 2 && (
            <GridItem colSpan={1}>
              <Box position="fixed">
                <Card maxW="sm">
                  <CardBody>
                    <Flex direction={'column'} alignItems={'center'} px={16} py={5}>
                      <Circle size={10} color="white" ml={2} borderWidth={1} textAlign={'center'}>
                        <CheckIcon color="green.500" />
                      </Circle>
                      <Text color={'#1652f0'} fontSize={20} mt={2} fontWeight={'bold'}>
                        Settled
                      </Text>
                      <Text mt={2}>{formatTimestamp(new Date(event?.settlementTime as number).getTime())}</Text>
                      <Link href="#" mt={2}>
                        <Text>{formatEllipsisTxt(event?.settlementHash)}</Text>
                      </Link>
                    </Flex>
                  </CardBody>
                </Card>
              </Box>
            </GridItem>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Event;

const PasswordModel = (params: any) => {
  const { code } = params;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = React.useRef(null);
  const [password, setPassword] = useState<string>('');
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [settlementLoading, setSettlementLoading] = useState<boolean>(false);

  const onChangePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const handleClickSettlement = async () => {
    if (!code || code === '') {
      return;
    }

    try {
      setSettlementLoading(true);
      const response: any = await axios.post(Http.marketEventOrderSettle, {
        event_unique_code: code,
        password: password,
      });
      if (response.code === 10200 && response.result) {
        toast({
          position: 'top',
          title: `Successfully settlement`,
          status: 'success',
          isClosable: true,
        });
        window.location.reload();
      }
    } catch (e: any) {
      toast({
        position: 'top',
        title: e.message,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setSettlementLoading(false);
    }
  };

  return (
    <>
      <CustomButton
        onClick={async () => {
          onOpen;
        }}
        text={'Settlement'}
      />
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Enter your password</FormLabel>
              <InputGroup size="md">
                <Input pr="4.5rem" type={show ? 'text' : 'password'} value={password} onChange={onChangePassword} />
                <InputRightElement width="4.5rem">
                  <CustomButton
                    size="sm"
                    onClick={async () => {
                      handleClick;
                    }}
                    text={show ? 'Hide' : 'Show'}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Box mr={3}>
              <CustomButton
                onClick={async () => {
                  handleClickSettlement;
                }}
                text={'confirm'}
              />
            </Box>
            <CustomButton
              onClick={async () => {
                onClose;
              }}
              text={'Cancel'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

type EventCommentProps = {
  avatarUrl: string;
  username: string;
  createTime: number;
  content: string;
  likeCount: number;
  ownLikeStatus: number;
  commentId: number;
  init: () => void;
};

const EventComment = (params: EventCommentProps) => {
  const { avatarUrl, username, createTime, content, likeCount, ownLikeStatus, commentId, init } = params;

  const toast = useToast();

  const onClickLike = async () => {
    try {
      const response: any = await axios.post(Http.marketEventCommentLike, {
        comment_id: commentId,
      });

      if (response.code === 10200 && response.result) {
        await init();

        toast({
          position: 'top',
          title: `Update successfully`,
          status: 'success',
          isClosable: true,
        });
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
  };

  return (
    <Flex>
      <Avatar name="user avatar" src={avatarUrl} />
      <Box ml={4}>
        <Flex alignItems={'center'}>
          <Text fontWeight={'bold'}>{username}</Text>
          <Text ml={2} color={'#828282'} fontSize={14}>
            {formatTimestamp(new Date(createTime).getTime())}
          </Text>
        </Flex>
        <Text mt={2}>{content}</Text>
        <Flex alignItems={'center'} mt={2}>
          <IconButton
            aria-label="like"
            icon={ownLikeStatus == 1 ? <FcLike /> : <FcLikePlaceholder />}
            isRound={true}
            onClick={onClickLike}
          />
          <Text color={'#828282'} ml={2} fontSize={14}>
            {likeCount}
          </Text>
          {/* <Text ml={2} color={'#828282'} fontSize={14}>
            Reply
          </Text> */}
        </Flex>
      </Box>
    </Flex>
  );
};
