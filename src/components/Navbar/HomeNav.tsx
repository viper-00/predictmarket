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
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiHome, FiMenu, FiBell } from 'react-icons/fi';
import { MdNotifications, MdNotificationsNone } from 'react-icons/md';
import { PiCopy } from 'react-icons/pi';
import { FaArrowRight } from 'react-icons/fa';
import LoginDialog from 'components/Dialog/LoginDialog';
import SignupDialog from 'components/Dialog/SignupDialog';
import Image from 'next/image';
import { IoMdBasketball } from "react-icons/io";
import { FiActivity } from "react-icons/fi";
import { AiOutlineTrophy } from "react-icons/ai";

const HomeNav = () => {
  const { isOpen: isLogInOpen, onOpen: onLogInOpen, onClose: onLogInClose } = useDisclosure();
  const { isOpen: isSignUpOpen, onOpen: onSignUpOpen, onClose: onSignUpClose } = useDisclosure();

  const [inputVal, setInputVal] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <Box pl={7} pr={3} paddingTop={3} boxShadow={'md'}>
      <Flex align="center" justify="space-between">
        <Link href="/">
          <Flex alignItems={'center'}>
          <Image src="./logo_white.svg" alt="logo" width={168} height={35}/>
          </Flex>
        </Link>
        <Stack spacing={11}>
          <InputGroup backgroundColor={useColorModeValue('white', 'gray.900')}>
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
        </Stack>
        <Flex>
          <Flex alignItems={'end'} borderRightWidth={isLogin ? 1 : 0} px={2}>
            <Link href="/markets" _hover={{ backgroundColor: '#f2f2f2' }} borderRadius={10}>
              <Flex flexDirection={'column'} alignItems={'center'} px={3} py={1}>
                <IoMdBasketball />
                <Text fontSize={14} color={'#828282'} fontWeight={'bold'}>
                  Markets
                </Text>
              </Flex>
            </Link>
            <Link href="/activity" _hover={{ backgroundColor: '#f2f2f2' }} borderRadius={10}>
              <Flex flexDirection={'column'} alignItems={'center'} px={3} py={1}>
                <FiActivity />
                <Text fontSize={14} color={'#828282'} fontWeight={'bold'}>
                  Activity
                </Text>
              </Flex>
            </Link>
            <Link href="/leaderboard" _hover={{ backgroundColor: '#f2f2f2' }} borderRadius={10}>
              <Flex flexDirection={'column'} alignItems={'center'} px={3} py={1}>
                <AiOutlineTrophy />
                <Text fontSize={14} color={'#828282'} fontWeight={'bold'}>
                  Ranks
                </Text>
              </Flex>
            </Link>
            {isLogin ? (
              <>
                <Link href="/portfolio" _hover={{ backgroundColor: '#f2f2f2' }} borderRadius={10}>
                  <Flex flexDirection={'column'} alignItems={'center'} px={3} py={1}>
                    <Text color={'#27ae60'}>$0.00</Text>
                    <Text fontSize={14} color={'#828282'} fontWeight={'bold'}>
                      Portfolio
                    </Text>
                  </Flex>
                </Link>
                <Link href="/wallet" _hover={{ backgroundColor: '#f2f2f2' }} borderRadius={10}>
                  <Flex flexDirection={'column'} alignItems={'center'} px={3} py={1}>
                    <Text color={'#27ae60'}>$0.00</Text>
                    <Text fontSize={14} color={'#828282'} fontWeight={'bold'} mt={0}>
                      Cash
                    </Text>
                  </Flex>
                </Link>
                <Flex px={3} py={1} alignItems={'center'}>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      window.location.href = '/wallet';
                    }}
                  >
                    <Text>Deposit</Text>
                  </Button>
                </Flex>
                <Popover>
                  <PopoverTrigger>
                    <Flex
                      _hover={{ backgroundColor: '#f2f2f2' }}
                      px={3}
                      height={'100%'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      borderRadius={10}
                    >
                      <MdNotificationsNone size={25} />
                    </Flex>
                  </PopoverTrigger>
                  <PopoverContent mr={10} width={400} height={350}>
                    <PopoverBody height={'100%'}>
                      <Text fontWeight={'bold'} fontSize={20}>
                        Notifications
                      </Text>
                      <Flex direction={'column'} alignItems={'center'} justifyContent={'center'} height={'100%'}>
                        <MdNotificationsNone size={30} />
                        <Text mt={1}>You do not have any notifications</Text>
                      </Flex>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <>
                <Flex height={'100%'} alignItems={'center'}>
                  <ButtonGroup spacing="2" pl={2} >
                    <Button colorScheme="blue" variant="outline" onClick={onLogInOpen} size={'sm'}>
                      <Text>Log In</Text>
                    </Button>
                    <Button colorScheme="blue" fill={'blue'} onClick={onSignUpOpen} size={'sm'}>
                      <Text>Sign Up</Text>
                    </Button>
                  </ButtonGroup>
                </Flex>
              </>
            )}
          </Flex>

          <Flex pl={isLogin ? 2 : 0}>
            <Menu>
              {isLogin ? (
                <>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                    _hover={{ backgroundColor: '#f2f2f2' }}
                    px={2}
                    rightIcon={<ChevronDownIcon />}
                  >
                    <Avatar size={'sm'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
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
                        <Avatar size={'sm'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
                        <Box pl={2}>
                          <Text fontWeight={'bold'}>viper00</Text>
                          <Flex alignItems={'center'}>
                            <Text pr={1} fontSize={14}>
                              0x222225...E1c
                            </Text>
                            <PiCopy size={18} />
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
                            <Text fontWeight={'bold'}>$0.00</Text>
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
                      <Switch id="email-alerts" ml={5} />
                    </Flex>
                  </MenuItem>
                </Box>
                {isLogin && (
                  <>
                    <MenuDivider />
                    <Box mx={2}>
                      <MenuItem py={3}>Logout</MenuItem>
                    </Box>
                  </>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>

      {/* <Link href="/" isExternal>
            <Image src="./logo.png" alt="logo" width={200} height={100} />
          </Link> */}
      {/* <NavBar /> */}
      {/* <HStack gap={'10px'}> */}
      {/* <ConnectButton /> */}
      {/* <ColorModeButton /> */}
      {/* </HStack> */}

      <Flex gap={4} mt={4}>
        <Link href="#" style={{ textDecoration: 'none' }}>
          <Text
            height={38}
            _hover={{
              borderBottomWidth: 2,
              borderBottomColor: '#000',
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
