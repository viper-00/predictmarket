import {
  Progress,
  Box,
  ButtonGroup,
  Button,
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
} from '@chakra-ui/react';

import axios from 'packages/core/http/axios';
import { Http } from 'packages/core/http/http';
import { DEFAULT_CHAIN_ID } from 'packages/constants';
import MetaTags from 'components/Common/MetaTags';
import HomeNav from 'components/Navbar/HomeNav';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EventOrder, EventOrderStringType, EventOrderType, EventPlayType, EventType } from 'packages/types';
import { formatTimestamp } from 'utils/format';
import { CiStar } from 'react-icons/ci';
import { FaLink } from 'react-icons/fa6';
import { FaHammer } from 'react-icons/fa';
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Event = () => {
  const {
    query: { id },
    isReady,
  } = useRouter();

  const [event, setEvent] = useState<EventType>();
  const [eventPlay, setEventPlay] = useState<EventPlayType>();
  const [eventOrder, setEventOrder] = useState<EventOrder[]>([]);
  const [currentOrder, setCurrentOrder] = useState<string>();
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number>(100);
  const [currentOrderStatus, setCurrentOrderStatus] = useState<EventOrderStringType>(EventOrderStringType.buy);

  const onChangeDec = () => {
    const value = (currentAmount as number) - 1;
    if (value >= (eventPlay?.minimumCapitalPool as number)) {
      setCurrentAmount(value);
    }
  };

  const onChangeInc = () => {
    const value = (currentAmount as number) + 1;
    if (value <= (eventPlay?.maximumCapitalPool as number)) {
      setCurrentAmount(value);
    }
  };

  useEffect(() => {
    async function init() {
      const response: any = await axios.get(Http.marketEvent, {
        params: {
          code: id,
        },
      });
      if (response.code === 10200 && response.result) {
        const eventResult = response.data.event;
        const playResult = response.data.play;
        const commentResult = response.data.comment;
        // const orderResult = response.data.order;

        // if (orderResult) {
        //   let orders: EventOrder[] = [];

        //   for (const element of orderResult) {
        //     let order: EventOrder = {
        //       amount: element.amount,
        //       orderType: element.play_value,
        //       playValue: element.order_type,
        //       userAddress: element.user_address,
        //       username: element.username,
        //     };

        //     orders.push(order);
        //   }

        //   setEventOrder(orders);
        // }

        if (eventResult) {
          let e: EventType = {
            createdTime: eventResult.created_time,
            eventLogo: eventResult.event_logo,
            eventStatus: eventResult.event_status,
            expireTime: eventResult.expire_time,
            rosolverAddress: eventResult.rosolver_address,
            settlementAddress: eventResult.settlement_address,
            title: eventResult.title,
            uniqueCode: eventResult.unique_website_code,
            playId: eventResult.play_id,
            type: eventResult.type,
          };
          setEvent(e);
        }

        if (playResult) {
          let t: EventPlayType = {
            title: playResult.title,
            introduce: playResult.introduce,
            guessNumber: playResult.guess_number,
            minimumCapitalPool: playResult.minimum_capital_pool,
            maximumCapitalPool: playResult.maximum_capital_pool,
            coin: playResult.coin,
            pledgeAmount: playResult.pledge_amount,
            values: playResult.values,
          };
          setEventPlay(t);
          setCurrentAmount(t.minimumCapitalPool);
          // setCurrentOrder(t.values[0].value);
        }

        console.log('playResult', playResult);
      }
    }
    if (id && id !== '') {
      init();
    }
  }, [id]);

  const toast = useToast();

  const handleClickPostComment = async () => {};

  const onChangeCurrentAmount = (event: any) => {
    if (
      (eventPlay?.minimumCapitalPool as number) <= event.target.value &&
      (eventPlay?.maximumCapitalPool as number) >= event.target.value
    )
      setCurrentAmount(event.target.value);
  };

  const onClickBuy = async () => {
    try {
      const response: any = await axios.post(Http.marketEventOrder, {
        event_unique_code: event?.uniqueCode,
        amount: currentAmount,
        play_value: currentOrder,
        type: EventOrderType[currentOrderStatus],
      });

      console.log('responseresponseresponse', response);

      if (response.code === 10200 && response.result) {
        toast({
          title: `Successful purchase`,
          status: 'success',
          isClosable: true,
        });
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onClickSell = async () => {};

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
                      {item.orders && item.orders.length > 0 ? (
                        <>
                          <Button colorScheme="red" size="lg" isDisabled>
                            {item.value}
                          </Button>
                          <Text fontSize={14} fontWeight={'bold'}>
                            Traded
                          </Text>
                        </>
                      ) : (
                        <>
                          <Button
                            colorScheme="teal"
                            size="lg"
                            onClick={() => {
                              setCurrentOrder(item.value);
                            }}
                          >
                            {item.value}
                          </Button>
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

              <Flex borderRadius={10} borderWidth={1} alignItems="center" px={5} mt={5} py={2}>
                <Circle size={10} borderWidth={1} backgroundColor="#f2f2f2">
                  <FaHammer size={20} />
                </Circle>
                <Box ml={4}>
                  <Text fontSize={14}>Resolver</Text>
                  <Text>{event?.rosolverAddress}</Text>
                </Box>
              </Flex>
            </Box>

            <Box mt={5}>
              <Tabs position="relative" variant="unstyled">
                <TabList borderBottomWidth={1}>
                  <Tab>Comments(142)</Tab>
                  <Tab>Activity</Tab>
                  <Tab>Related</Tab>
                </TabList>
                <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
                <TabPanels>
                  <TabPanel px={0}>
                    <InputGroup size="md">
                      <Input pr="4.5rem" type={'text'} placeholder="Add a comment" />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClickPostComment}>
                          Post
                        </Button>
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
                      <Flex>
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Box ml={4}>
                          <Flex alignItems={'center'}>
                            <Text fontWeight={'bold'}>tetrissss</Text>
                            <Text ml={2} color={'#828282'} fontSize={14}>
                              1d ago
                            </Text>
                          </Flex>
                          <Text mt={2}>Boden is MY president</Text>
                          <Flex alignItems={'center'} mt={2}>
                            <FcLikePlaceholder />
                            {/* <FcLike /> */}
                            <Text color={'#828282'} ml={2} fontSize={14}>
                              0
                            </Text>
                            <Text ml={2} color={'#828282'} fontSize={14}>
                              Reply
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                      <Flex>
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Box ml={4}>
                          <Flex>
                            <Text>tetrissss</Text>
                            <Text ml={2}>1d ago</Text>
                          </Flex>
                          <Text mt={2}>Boden is MY president</Text>
                          <Flex alignItems={'center'} mt={2}>
                            <FcLikePlaceholder />
                            {/* <FcLike /> */}
                            <Text color={'#828282'} ml={2} fontSize={14}>
                              0
                            </Text>
                            <Text ml={2} color={'#828282'} fontSize={14}>
                              Reply
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                      <Flex>
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Box ml={4}>
                          <Flex>
                            <Text>tetrissss</Text>
                            <Text ml={2}>1d ago</Text>
                          </Flex>
                          <Text mt={2}>Boden is MY president</Text>
                          <Flex alignItems={'center'} mt={2}>
                            <FcLikePlaceholder />
                            {/* <FcLike /> */}
                            <Text color={'#828282'} ml={2} fontSize={14}>
                              0
                            </Text>
                            <Text ml={2} color={'#828282'} fontSize={14}>
                              Reply
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                      <Flex>
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Box ml={4}>
                          <Flex>
                            <Text>tetrissss</Text>
                            <Text ml={2}>1d ago</Text>
                          </Flex>
                          <Text mt={2}>Boden is MY president</Text>
                          <Flex alignItems={'center'} mt={2}>
                            <FcLikePlaceholder />
                            {/* <FcLike /> */}
                            <Text color={'#828282'} ml={2} fontSize={14}>
                              0
                            </Text>
                            <Text ml={2} color={'#828282'} fontSize={14}>
                              Reply
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                      <Flex>
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Box ml={4}>
                          <Flex>
                            <Text>tetrissss</Text>
                            <Text ml={2}>1d ago</Text>
                          </Flex>
                          <Text mt={2}>Boden is MY president</Text>
                          <Flex alignItems={'center'} mt={2}>
                            <FcLikePlaceholder />
                            {/* <FcLike /> */}
                            <Text color={'#828282'} ml={2} fontSize={14}>
                              0
                            </Text>
                            <Text ml={2} color={'#828282'} fontSize={14}>
                              Reply
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                      <Flex>
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Box ml={4}>
                          <Flex>
                            <Text>tetrissss</Text>
                            <Text ml={2}>1d ago</Text>
                          </Flex>
                          <Text mt={2}>Boden is MY president</Text>
                          <Flex alignItems={'center'} mt={2}>
                            <FcLikePlaceholder />
                            {/* <FcLike /> */}
                            <Text color={'#828282'} ml={2} fontSize={14}>
                              0
                            </Text>
                            <Text ml={2} color={'#828282'} fontSize={14}>
                              Reply
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Grid>
                  </TabPanel>
                  <TabPanel px={0} pt={0}>
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
                          <Button colorScheme="blue" mr={2}>
                            Buy
                          </Button>
                          <Button colorScheme="blue">Sell</Button>
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
                          <Button colorScheme="blue" mr={2}>
                            Buy
                          </Button>
                          <Button colorScheme="blue">Sell</Button>
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
                          <Button colorScheme="blue" mr={2}>
                            Buy
                          </Button>
                          <Button colorScheme="blue">Sell</Button>
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
                          <Button colorScheme="blue" mr={2}>
                            Buy
                          </Button>
                          <Button colorScheme="blue">Sell</Button>
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
                          <Button colorScheme="blue" mr={2}>
                            Buy
                          </Button>
                          <Button colorScheme="blue">Sell</Button>
                        </Flex>
                      </Flex>
                    </Link>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>

          <GridItem colSpan={1}>
            <Box position="fixed">
              <Card maxW="sm">
                <CardBody px={0}>
                  <Flex alignItems={'center'} px={5}>
                    <Avatar size="md" name="Event logo" src={event?.eventLogo} />
                    <Text fontWeight={'bold'} ml={3}>
                      {currentOrder}
                    </Text>
                  </Flex>
                  <Flex mt={4} px={5} justifyContent="space-between" alignItems={'flex-start'} borderBottomWidth={1}>
                    <Flex alignItems={'center'}>
                      <Link
                        href="#"
                        style={{ textDecoration: 'none' }}
                        onClick={() => {
                          setCurrentOrderStatus(EventOrderStringType.buy);
                        }}
                      >
                        <Text
                          height={38}
                          fontWeight={
                            EventOrderStringType[currentOrderStatus] === EventOrderStringType.buy ? 'bold' : ''
                          }
                          borderBottomWidth={
                            EventOrderStringType[currentOrderStatus] === EventOrderStringType.buy ? 1 : 0
                          }
                          borderColor={
                            EventOrderStringType[currentOrderStatus] === EventOrderStringType.buy ? '#1652f0' : ''
                          }
                          color={EventOrderStringType[currentOrderStatus] === EventOrderStringType.buy ? '#1652f0' : ''}
                        >
                          Buy
                        </Text>
                      </Link>
                      <Link
                        href="#"
                        style={{ textDecoration: 'none' }}
                        ml={6}
                        onClick={() => {
                          setCurrentOrderStatus(EventOrderStringType.sell);
                        }}
                      >
                        <Text
                          height={38}
                          fontWeight={
                            EventOrderStringType[currentOrderStatus] === EventOrderStringType.sell ? 'bold' : ''
                          }
                          borderBottomWidth={
                            EventOrderStringType[currentOrderStatus] === EventOrderStringType.sell ? 1 : 0
                          }
                          borderColor={
                            EventOrderStringType[currentOrderStatus] === EventOrderStringType.sell ? '#1652f0' : ''
                          }
                          color={
                            EventOrderStringType[currentOrderStatus] === EventOrderStringType.sell ? '#1652f0' : ''
                          }
                        >
                          Sell
                        </Text>
                      </Link>
                    </Flex>
                    <Select variant="unstyled" width={24}>
                      <option value="option1">Market</option>
                      <option value="option1">Limit</option>
                      <option value="option1">AMM</option>
                    </Select>
                  </Flex>

                  <Box mt={4} px={5}>
                    <Flex justifyContent={'space-between'} alignItems={'center'}>
                      <Text>Amount</Text>
                      <Flex alignItems={'center'}>
                        <Text backgroundColor={'#f2f2f2'} borderRadius={10} px={2} mr={2} fontSize={14}>
                          Balance ${balance}
                        </Text>
                        <Button
                          colorScheme="gray"
                          size={'xs'}
                          onClick={() => {
                            setCurrentAmount(eventPlay?.maximumCapitalPool as number);
                          }}
                        >
                          Max
                        </Button>
                      </Flex>
                    </Flex>

                    <HStack mt={4}>
                      <Button onClick={onChangeDec}>-</Button>
                      <Input value={currentAmount} onChange={onChangeCurrentAmount} textAlign={'center'} />
                      <Button onClick={onChangeInc}>+</Button>
                    </HStack>

                    {balance < (eventPlay?.guessNumber as number) && (
                      <Text fontSize={14} color={'red'} py={2}>
                        Insufficient balance
                      </Text>
                    )}

                    {EventOrderStringType[currentOrderStatus] === EventOrderStringType.buy && (
                      <Button colorScheme="blue" mt={5} width={'100%'} onClick={onClickBuy}>
                        Buy
                      </Button>
                    )}
                    {EventOrderStringType[currentOrderStatus] === EventOrderStringType.sell && (
                      <Button colorScheme="red" mt={5} width={'100%'} onClick={onClickSell}>
                        Sell
                      </Button>
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
                </CardBody>
              </Card>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Event;
