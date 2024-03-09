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
import { EventPlayType, EventType } from 'packages/types';
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
  const [currentOrder, setCurrentOrder] = useState<string>();

  useEffect(() => {
    async function play() {
      const response: any = await axios.get(Http.marketEventPlay, {
        params: {},
      });
    }
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
          };
          setEventPlay(t);
        }
      }
    }
    if (id && id !== '') {
      init();
    }
  }, [id]);

  const toast = useToast();

  const handleClickPostComment = async () => {};

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    // step: 0.01,
    defaultValue: eventPlay?.guessNumber,
    // min: 1,
    // max: 6,
    // precision: 2,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const items = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

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
                    <Text ml={4}>{event?.expireTime as number}</Text>
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
                {items &&
                  items.map((item, index) => (
                    <GridItem colSpan={1} key={index}>
                      <Button
                        colorScheme="teal"
                        size="lg"
                        onClick={() => {
                          setCurrentOrder(item);
                        }}
                      >
                        {item}
                      </Button>
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
                      <Link href="#" style={{ textDecoration: 'none' }}>
                        <Text
                          height={38}
                          fontWeight="bold"
                          borderBottomWidth={1}
                          borderColor={'#1652f0'}
                          color={'#1652f0'}
                        >
                          Buy
                        </Text>
                      </Link>
                      <Link href="#" style={{ textDecoration: 'none' }} ml={6}>
                        <Text height={38}>Sell</Text>
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
                          Balance $0.00
                        </Text>
                        <Button colorScheme="gray" size={'xs'}>
                          Max
                        </Button>
                      </Flex>
                    </Flex>

                    <HStack mt={4}>
                      <Button {...dec}>-</Button>
                      <Input {...input} value={eventPlay?.guessNumber} />
                      <Button {...inc}>+</Button>
                    </HStack>
                    <Text fontSize={14} color={'red'} py={2}>
                      Insufficient balance
                    </Text>
                    <Button colorScheme="blue" mt={2} width={'100%'}>
                      Buy
                    </Button>

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
