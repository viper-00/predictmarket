import { ChevronDownIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Link,
  Text,
  Stack,
  InputGroup,
  useColorModeValue,
  InputLeftElement,
  Input,
  Button,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuItem,
  MenuDivider,
  Switch,
  LinkBox,
  ButtonGroup,
  IconButton,
  useDisclosure,
  PopoverBody,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Popover,
  Heading,
  Grid,
  useColorMode,
  AbsoluteCenter,
  GridItem,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiHome, FiMenu, FiBell } from 'react-icons/fi';
import { MdNotifications, MdNotificationsNone } from 'react-icons/md';
import { PiCopy } from 'react-icons/pi';
import { FaArrowRight } from 'react-icons/fa';
import LoginDialog from 'components/Dialog/LoginDialog';
import SignupDialog from 'components/Dialog/SignupDialog';
import { IoMdBasketball } from 'react-icons/io';
import { FiActivity } from 'react-icons/fi';
import { AiOutlineTrophy } from 'react-icons/ai';
import { getUserAuthorization, getUserContractAddress, getUsername, resetUser, getUserAvatarUrl } from 'lib/store/user';
import { formatEllipsisTxt, formatTimestamp } from 'utils/format';
import { Http } from 'packages/core/http/http';
import axios from 'packages/core/http/axios';
import { UserNotification } from 'packages/types';
import DefaultAvatar from 'assets/images/default-avatar.svg';
import LogoBlack from 'assets/images/logo_black.svg';
import LogoWhite from 'assets/images/logo_white.svg';
import Image from 'next/image';
import { getUsdtBalance } from 'lib/store/balance';

const HomeNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { isOpen: isLogInOpen, onOpen: onLogInOpen, onClose: onLogInClose } = useDisclosure();
  const { isOpen: isSignUpOpen, onOpen: onSignUpOpen, onClose: onSignUpClose } = useDisclosure();

  const toast = useToast();

  const [inputVal, setInputVal] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const textColor = useColorModeValue('#828282', '#fff');
  const bgColor = useColorModeValue('#f2f2f2', '#2c3f4f');

  const [username, setUsername] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [notification, setNotification] = useState<UserNotification[]>([]);
  const [usdtBalance, setUsdtBalance] = useState<string>('0')

  useEffect(() => {
    setUsername(getUsername());
    setContractAddress(getUserContractAddress());
    setAvatarUrl(getUserAvatarUrl());
    setUsdtBalance(getUsdtBalance())
  }, []);

  useEffect(() => {
    const auth = getUserAuthorization();
    if (auth && auth !== '') {
      setIsLogin(true);
    }
  }, []);

  const updateNotification = async () => {
    if (getUserAuthorization() !== '') {
      try {
        const response: any = await axios.get(Http.userNotification);
        if (response.code === 10200 && response.result) {
          const nos: UserNotification[] = response.data.map((element: any) => ({
            chainId: element.chain_id,
            title: element.title,
            content: element.content,
            createdTime: new Date(element.created_time).getTime(),
            description: element.description,
            hash: element.hash,
            isRead: element.is_read,
            notificationType: element.notification_type,
          }));
          setNotification(nos);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    async function prepare() {
      updateNotification();
    }

    prepare();

    const notifyTime = setInterval(() => {
      updateNotification();
    }, 5000);

    return () => {
      clearInterval(notifyTime);
    };
  }, []);

  const onLogout = () => {
    resetUser();
    window.location.href = '/';
  };

  return (
    <Box pl={7} pr={3} paddingTop={5} borderTopWidth={1} borderBottomWidth={1}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={2}>
          <Flex alignItems={'center'}>
            <Link href="/">
              {colorMode === 'light' ? (
                <>
                  <Image src={LogoBlack} alt="logo"/>
                </>
              ) : (
                <>
                  <Image src={LogoWhite} alt="logo" />
                </>
              )}
            </Link>
            <InputGroup backgroundColor={useColorModeValue('white', 'gray.900')} ml={5}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color={useColorModeValue('black', 'white')} />
              </InputLeftElement>
              <Input
                htmlSize={100}
                type="search"
                placeholder="Search markets"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                }}
              />
            </InputGroup>
          </Flex>
        </GridItem>

        <GridItem colSpan={1}>
          <Flex height={'100%'} justifyContent="right">
            <Flex borderRightWidth={isLogin ? 1 : 0} px={2} height="100%">
              <Link href="/markets" _hover={{ backgroundColor: bgColor }} borderRadius={10} px={3}>
                <Flex flexDirection={'column'} alignItems={'center'}>
                  <IoMdBasketball size={20} />
                  <Text fontSize={13} color={textColor} fontWeight={'bold'}>
                    Markets
                  </Text>
                </Flex>
              </Link>
              <Link href="/activity" _hover={{ backgroundColor: bgColor }} borderRadius={10} px={3}>
                <Flex flexDirection={'column'} alignItems={'center'}>
                  <FiActivity size={20} />
                  <Text fontSize={13} color={textColor} fontWeight={'bold'}>
                    Activity
                  </Text>
                </Flex>
              </Link>
              <Link href="/leaderboard" _hover={{ backgroundColor: bgColor }} borderRadius={10} px={3}>
                <Flex flexDirection={'column'} alignItems={'center'}>
                  <AiOutlineTrophy size={20} />
                  <Text fontSize={13} color={textColor} fontWeight={'bold'}>
                    Ranks
                  </Text>
                </Flex>
              </Link>

              {isLogin ? (
                <>
                  <Link href="/portfolio" _hover={{ backgroundColor: bgColor }} borderRadius={10} px={3}>
                    <Flex flexDirection={'column'} alignItems={'center'}>
                      <Text fontSize={14} color={'#27ae60'}>
                        $0.00
                      </Text>
                      <Text fontSize={13} color={textColor} fontWeight={'bold'}>
                        Portfolio
                      </Text>
                    </Flex>
                  </Link>
                  <Link href="/wallet" _hover={{ backgroundColor: bgColor }} borderRadius={10} px={3}>
                    <Flex flexDirection={'column'} alignItems={'center'}>
                      <Text fontSize={14} color={'#27ae60'}>
                        {usdtBalance}
                      </Text>
                      <Text fontSize={13} color={textColor} fontWeight={'bold'}>
                        Cash
                      </Text>
                    </Flex>
                  </Link>
                  <Box mx={2}>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        window.location.href = '/wallet';
                      }}
                    >
                      <Text>Deposit</Text>
                    </Button>
                  </Box>
                  <Box mx={2}>
                    <Button
                      colorScheme="green"
                      onClick={() => {
                        window.location.href = '/event/post';
                      }}
                    >
                      <Text>Post</Text>
                    </Button>
                  </Box>
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        _hover={{ backgroundColor: bgColor }}
                        variant="outline"
                        borderWidth={0}
                        aria-label="MdNotificationsNone"
                        icon={<MdNotificationsNone size={20} />}
                      />
                    </PopoverTrigger>
                    <PopoverContent mr={10} width={400} height={500} overflow="auto">
                      <PopoverBody height={'100%'}>
                        <Text fontWeight={'bold'} fontSize={20}>
                          Notifications
                        </Text>
                        {notification.length > 0 ? (
                          <Box pb={4}>
                            {notification &&
                              notification.map((item, index) => (
                                <Link href="#" key={index} style={{ textDecoration: 'none' }}>
                                  <Box pb={4} _hover={{ backgroundColor: bgColor }} py={4} px={2} borderRadius={10}>
                                    <Text fontSize={14} fontWeight={'bold'}>
                                      {item.title}
                                    </Text>
                                    <Text fontSize={12}>{item.content}</Text>
                                    <Text fontSize={12} mt={2}>
                                      {formatTimestamp(item.createdTime)}
                                    </Text>
                                  </Box>
                                </Link>
                              ))}
                          </Box>
                        ) : (
                          <>
                            <Flex direction={'column'} alignItems={'center'} justifyContent={'center'} height={'100%'}>
                              <MdNotificationsNone size={30} />
                              <Text mt={1}>You do not have any notifications</Text>
                            </Flex>
                          </>
                        )}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </>
              ) : (
                <>
                  <ButtonGroup spacing="2" ml={2}>
                    <Button colorScheme="blue" variant="outline" onClick={onLogInOpen}>
                      <Text>Log In</Text>
                    </Button>
                    <Button colorScheme="blue" fill={'blue'} onClick={onSignUpOpen}>
                      <Text>Sign Up</Text>
                    </Button>
                  </ButtonGroup>
                </>
              )}
            </Flex>
            <Box pl={isLogin ? 2 : 0} height="100%">
              <Menu autoSelect={false}>
                {isLogin ? (
                  <>
                    <MenuButton
                      height="100%"
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                      _hover={{ backgroundColor: bgColor }}
                      px={3}
                      rightIcon={<ChevronDownIcon />}
                    >
                      {avatarUrl !== '' ? (
                        <>
                          <Avatar size={'sm'} src={avatarUrl} />
                        </>
                      ) : (
                        <>
                          <Avatar size={'sm'} src={DefaultAvatar} />
                        </>
                      )}
                    </MenuButton>
                  </>
                ) : (
                  <>
                    <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
                  </>
                )}
                <MenuList alignItems={'center'}>
                  {isLogin ? (
                    <>
                      <Box px={4}>
                        <Flex alignItems={'center'}>
                          {avatarUrl !== '' ? (
                            <>
                              <Avatar size={'sm'} src={avatarUrl} />
                            </>
                          ) : (
                            <>
                              <Avatar size={'sm'} src={DefaultAvatar} />
                            </>
                          )}
                          <Box pl={2}>
                            <Text fontWeight={'bold'}>{username}</Text>
                            <Flex alignItems={'center'}>
                              <Text pr={1} fontSize={14}>
                                {formatEllipsisTxt(contractAddress)}
                              </Text>
                              <IconButton
                                isRound={true}
                                ml={2}
                                size="xs"
                                aria-label="copy"
                                fontSize={18}
                                onClick={async () => {
                                  await navigator.clipboard.writeText(contractAddress);

                                  toast({
                                    title: `Copied successfully`,
                                    status: 'success',
                                    isClosable: true,
                                  });
                                }}
                                icon={<PiCopy />}
                              />
                            </Flex>
                          </Box>
                        </Flex>
                        <Flex py={2}>
                          <Link href="/portfolio">
                            <Flex flexDirection={'column'}>
                              <Text fontWeight={'bold'}>$0.00</Text>
                              <Flex alignItems={'center'}>
                                <Text pr={1}>Portfolio</Text>
                                <FaArrowRight />
                              </Flex>
                            </Flex>
                          </Link>
                          <Link href="/wallet" ml={2}>
                            <Flex flexDirection={'column'} pl={2}>
                              <Text fontWeight={'bold'}>{usdtBalance}</Text>
                              <Flex alignItems={'center'}>
                                <Text pr={1}>Cash</Text>
                                <FaArrowRight />
                              </Flex>
                            </Flex>
                          </Link>
                        </Flex>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box px={2}>
                        <MenuItem py={3} onClick={onLogInOpen}>
                          Log In
                        </MenuItem>
                        <MenuItem py={3} onClick={onSignUpOpen}>
                          Sign Up
                        </MenuItem>
                      </Box>
                    </>
                  )}

                  <MenuDivider />
                  <Box mx={2}>
                    {isLogin && (
                      <>
                        <MenuItem as="a" href="/profile" py={3}>
                          Profile
                        </MenuItem>
                        <MenuItem as="a" href="/settings" py={3}>
                          Settings
                        </MenuItem>
                      </>
                    )}

                    <MenuItem as="a" href="/rewards" py={3}>
                      Rewards
                    </MenuItem>
                    <MenuItem as="a" href="/contests" py={3}>
                      Contests
                    </MenuItem>
                    {isLogin && (
                      <>
                        <MenuItem as="a" href="/affiliate" py={3}>
                          Affiliate
                        </MenuItem>
                      </>
                    )}
                    <MenuItem as="a" href="/learn" py={3}>
                      Learn
                    </MenuItem>
                    <MenuItem as="a" href="/blog" py={3}>
                      Blog
                    </MenuItem>
                    {isLogin && (
                      <>
                        <MenuItem py={3}>Help Center</MenuItem>
                      </>
                    )}
                    <MenuItem as="a" href="/docs" py={3}>
                      Documentation
                    </MenuItem>
                    <MenuItem py={3} closeOnSelect={false}>
                      <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                        <Text>Dark mode</Text>
                        <Switch ml={5} isChecked={colorMode === 'light' ? false : true} onChange={toggleColorMode} />
                      </Flex>
                    </MenuItem>
                  </Box>
                  {isLogin && (
                    <>
                      <MenuDivider />
                      <Box mx={2}>
                        <MenuItem py={3} onClick={onLogout}>
                          Logout
                        </MenuItem>
                      </Box>
                    </>
                  )}
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </GridItem>
      </Grid>

      <Flex gap={6} mt={4}>
        <Link href="#" style={{ textDecoration: 'none' }}>
          <Text
            height={38}
            _hover={{
              borderBottomWidth: 2,
              borderBottomColor: useColorModeValue('#000', '#fff'),
            }}
          >
            All
          </Text>
        </Link>
        <Link href="#" style={{ textDecoration: 'none' }}>
          <Text
            height={38}
            _hover={{
              borderBottomWidth: 2,
              borderBottomColor: '#000',
            }}
          >
            New
          </Text>
        </Link>
        <Link href="#" style={{ textDecoration: 'none' }}>
          <Text
            height={38}
            _hover={{
              borderBottomWidth: 2,
              borderBottomColor: '#000',
            }}
          >
            Volumn
          </Text>
        </Link>
        <Link href="#" style={{ textDecoration: 'none' }} width={50}>
          <Text
            height={38}
            _hover={{
              borderBottomWidth: 2,
              borderBottomColor: '#000',
            }}
          >
            Crypto
          </Text>
        </Link>
        <Link href="#" style={{ textDecoration: 'none' }} width={50}>
          <Text
            height={38}
            _hover={{
              borderBottomWidth: 2,
              borderBottomColor: '#000',
            }}
          >
            Crypto
          </Text>
        </Link>
        <Link href="#" style={{ textDecoration: 'none' }} width={50}>
          <Text
            height={38}
            _hover={{
              borderBottomWidth: 2,
              borderBottomColor: '#000',
            }}
          >
            Crypto
          </Text>
        </Link>
        <Link href="#" style={{ textDecoration: 'none' }} width={50}>
          <Text
            height={38}
            _hover={{
              borderBottomWidth: 2,
              borderBottomColor: '#000',
            }}
          >
            Crypto
          </Text>
        </Link>
        <Link href="#" style={{ textDecoration: 'none' }} width={50}>
          <Text
            height={38}
            _hover={{
              borderBottomWidth: 2,
              borderBottomColor: '#000',
            }}
          >
            Crypto
          </Text>
        </Link>
        <Link href="#" style={{ textDecoration: 'none' }} width={50}>
          <Text
            height={38}
            _hover={{
              borderBottomWidth: 2,
              borderBottomColor: '#000',
            }}
          >
            Crypto
          </Text>
        </Link>
        <Link href="#" style={{ textDecoration: 'none' }} width={50}>
          <Text
            height={38}
            _hover={{
              borderBottomWidth: 2,
              borderBottomColor: '#000',
            }}
          >
            Crypto
          </Text>
        </Link>
      </Flex>

      <LoginDialog onClose={onLogInClose} onOpen={onLogInOpen} isOpen={isLogInOpen} />
      <SignupDialog onClose={onSignUpClose} onOpen={onSignUpOpen} isOpen={isSignUpOpen} />
    </Box>
  );
};

export default HomeNav;
