import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  FormControl,
  FormLabel,
  Switch,
  Stack,
  chakra,
  VisuallyHidden,
  Button,
  Select,
  Tooltip,
  Link,
  Center,
} from '@chakra-ui/react';
import { FiHome, FiMenu, FiBell } from 'react-icons/fi';
import { BsArrowUpRightCircle } from 'react-icons/bs';
import { TbBuildingBridge2 } from 'react-icons/tb';
import {
  MdOutlineSwapHoriz,
  MdOutlineEmail,
  MdSecurity,
  MdOutlineSdStorage,
  MdOutlineAccountBalanceWallet,
  MdBalcony,
  MdCommit,
} from 'react-icons/md';
import { FaDiscord, FaRedditAlien, FaTelegramPlane } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { FC, ReactNode, useEffect, useState } from 'react';
import { chainList, ChainListInfo } from 'packages/constants/chainlist';
import { formatEllipsisTxt } from 'utils/format';
import { useRouter } from 'next/router';
import { hydrateWallet, resetWallet } from 'lib/store/wallet';
import { Chain } from 'packages/types';
import { useColorMode } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { LuNewspaper } from 'react-icons/lu';
import { SiXdadevelopers } from 'react-icons/si';
import { DiTechcrunch } from 'react-icons/di';
import { RiGuideFill } from 'react-icons/ri';

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const MainLinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiHome, link: '/dashboard' },
  // { name: 'Portfolio', icon: FiHome, link: '/portfolio' },
  // { name: 'Card', icon: FiCreditCard, link: '/card' },
  // { name: 'DeFi', icon: FiActivity, link: '/defi' },
  // { name: 'NFT', icon: RiNftFill, link: '/nft' },
  // { name: 'Transactions', icon: AiOutlineTransaction, link: '/transactions' },
];

const ActionLinkItems: Array<LinkItemProps> = [
  // { name: 'Send', icon: BsArrowUpRightCircle, link: '/send' },
  // { name: 'Receive', icon: BsArrowDownLeftCircle, link: '/receive' },
  { name: 'Swap', icon: MdOutlineSwapHoriz, link: '/swap' },
  { name: 'Bridge', icon: TbBuildingBridge2, link: '/bridge' },
  // { name: 'Buy', icon: RiAddFill, link: '/buy' },
  // { name: 'Sell', icon: FiMinus, link: '/sell' },
];

const ToolsLinkItems: Array<LinkItemProps> = [
  { name: 'DeFi', icon: RiGuideFill, link: '/tools/defi' },
  { name: 'Nft', icon: MdCommit, link: '/tools/nft' },
  { name: 'Daos', icon: MdBalcony, link: '/tools/daos' },
  { name: 'Wallet', icon: MdOutlineAccountBalanceWallet, link: '/tools/wallet' },
  { name: 'Block explorers', icon: BsArrowUpRightCircle, link: '/tools/blockexplorer' },
  { name: 'Storage', icon: MdOutlineSdStorage, link: '/tools/storage' },
  { name: 'Security', icon: MdSecurity, link: '/tools/security' },
  { name: 'Tech', icon: DiTechcrunch, link: '/tools/tech' },
  { name: 'Developer', icon: SiXdadevelopers, link: '/tools/developer' },
  { name: 'News', icon: LuNewspaper, link: '/tools/news' },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'Gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
      overflowX="auto"
    >
      <Flex flexDirection={'column'} height={'100%'} justifyContent={'space-between'}>
        <Flex flexDirection={'column'}>
          <Flex alignItems="center" mx="8" justifyContent="space-between" my="2">
            <Link href="/" isExternal>
              <Image src="/logo.png" alt="logo" width={160} height={0} />
            </Link>

            <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
          </Flex>

          {MainLinkItems.map((item) => (
            <NavItem
              marginBottom={1}
              backgroundColor={router.pathname === item.link ? '#0bc5ea' : ''}
              color={router.pathname === item.link ? 'white' : ''}
              key={item.name}
              icon={item.icon}
              onClick={() => {
                router.push(item.link);
              }}
            >
              {item.name}
            </NavItem>
          ))}

          <Flex
            h="20"
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              ml: 8,
            }}
          >
            <Text>Action</Text>
          </Flex>

          {ActionLinkItems.map((item) => (
            <NavItem
              marginBottom={1}
              backgroundColor={router.pathname === item.link ? '#0bc5ea' : ''}
              color={router.pathname === item.link ? 'white' : ''}
              key={item.name}
              icon={item.icon}
              onClick={() => {
                router.push(item.link);
              }}
            >
              {item.name}
            </NavItem>
          ))}

          <Flex
            h="20"
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              ml: 8,
            }}
          >
            <Text>Tools</Text>
          </Flex>

          {ToolsLinkItems.map((item) => (
            <NavItem
              marginBottom={1}
              backgroundColor={router.pathname === item.link ? '#0bc5ea' : ''}
              color={router.pathname === item.link ? 'white' : ''}
              key={item.name}
              icon={item.icon}
              onClick={() => {
                router.push(item.link);
              }}
            >
              {item.name}
            </NavItem>
          ))}
        </Flex>

        <Box pb={5}>
          <Flex justifyContent={'center'} mt={10}>
            <Box>
              <FormControl display="flex" alignItems="center">
                <Switch
                  id="mode-switch"
                  size="md"
                  isChecked={colorMode === 'light' ? false : true}
                  onChange={toggleColorMode}
                />
                <FormLabel htmlFor="mode-switch" mb="0" ml={3}>
                  {colorMode.toUpperCase()}
                </FormLabel>
              </FormControl>
            </Box>
          </Flex>

          <Flex justifyContent={'center'} mt={5}>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Email'} href={'mailto:predictmarket@gmail.com'}>
                <MdOutlineEmail />
              </SocialButton>
              <SocialButton label={'Discord'} href={'https://discord.gg/Vw4zhCfvNP'}>
                <FaDiscord />
              </SocialButton>
              <SocialButton label={'Telegram'} href={'https://t.me/+CnSTtret4PJkYjRl'}>
                <FaTelegramPlane />
              </SocialButton>
            </Stack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box as="a" href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [address, setAddress] = useState<string>('');
  const [chain, setChain] = useState<Chain>();
  const [chainInfo, setChainInfo] = useState<ChainListInfo>();

  const router = useRouter();

  useEffect(() => {
    const wallet = hydrateWallet();
    setAddress(wallet.address);
    setChain(wallet.chain);

    setChainInfo(chainList.find((item) => item.chainId === wallet.chain));
  }, []);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('#f4f5fe', 'Gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
      overflowY="auto"
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box width={'100%'}>
        <Flex alignItems={'center'}>
          <Box borderWidth={1} ml={2}>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                backgroundColor={useColorModeValue('white', 'gray.900')}
              >
                <Flex alignItems={'center'}>
                  {chainInfo?.icon && <Image src={chainInfo?.icon} alt={'chain icon'} width={20} height={20} />}
                  <Text ml={2}>{chainInfo?.name}</Text>
                </Flex>
              </MenuButton>
              <MenuList borderWidth={1}>
                {chainList.map((item) => (
                  <MenuItem minH="48px" key={item.chainId} value={item.chainId}>
                    <Image src={item.icon} alt={'chain icon'} width={30} height={30} />
                    <Text ml={2}>{item.name}</Text>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>

          {/* <Box ml={4}>
            <Tooltip label="Copy">
              <Button
                px={4}
                fontSize={'sm'}
                rounded={'full'}
                bg={useColorModeValue('White', 'Gray.900')}
                color={useColorModeValue('Gray.900', 'White')}
                borderWidth={1}
                leftIcon={<FiBell />}
                rightIcon={<FiCopy />}
                onClick={async () => {
                  await navigator.clipboard.writeText(address);
                }}
                _hover={{
                  bg: useColorModeValue('White', 'Gray.900'),
                }}
                _focus={{
                  bg: useColorModeValue('White', 'Gray.900'),
                }}
              >
                <Text color={useColorModeValue('Gray.900', 'White')}>{formatEllipsisTxt(address)}</Text>
              </Button>
            </Tooltip>
          </Box> */}
        </Flex>
      </Box>

      <HStack spacing={{ base: '0', md: '6' }}>
        {/* <IconButton
          aria-label=""
          icon={<AiOutlineEye />}
          bg={useColorModeValue('White', 'Gray.900')}
          px={4}
          rounded={'full'}
          borderWidth={1}
          _hover={{
            bg: useColorModeValue('White', 'Gray.900'),
          }}
          _focus={{
            bg: useColorModeValue('White', 'Gray.900'),
          }}
        /> */}
        <Button
          px={4}
          ml={2}
          fontSize={'sm'}
          rounded={'full'}
          bg={useColorModeValue('White', 'Gray.900')}
          color={useColorModeValue('Gray.900', 'White')}
          borderWidth={1}
          leftIcon={<FiBell />}
          _hover={{
            bg: useColorModeValue('White', 'Gray.900'),
          }}
          _focus={{
            bg: useColorModeValue('White', 'Gray.900'),
          }}
          onClick={() => {
            resetWallet();
            router.push('/');
          }}
        >
          <Text color={useColorModeValue('Gray.900', 'White')}>Logout</Text>
        </Button>
        {/* <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'Gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex> */}
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader: FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box minH="100vh" bg={useColorModeValue('White', 'Gray.900')}>
        <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
      </Box>
    </>
  );
};

export default SidebarWithHeader;
