import { CheckCircleIcon, ChevronDownIcon, CopyIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Circle,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import MetaTags from 'components/Common/MetaTags';
import HomeNav from 'components/Navbar/HomeNav';
import { IoStatsChart } from 'react-icons/io5';

const Affiliate = () => {
  return (
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Affiliate" />
      <HomeNav />
      <Container minWidth={'60%'}>
        <Box mt={10}>
          <Text fontWeight={'bold'} fontSize={'35'}>
            Affiliate
          </Text>
          <Text>
            Our affiliate program is coming soon. Every user you refer now with your affiliate code will be included in
            your future earnings.
          </Text>
          <Grid templateColumns="repeat(4, 1fr)" gap={4} mt={5}>
            <GridItem colSpan={1}>
              <Box borderWidth={1} borderRadius={10} p={5}>
                <Text>LIFETIME EARNINGS</Text>
                <Text fontWeight={'bold'} fontSize={20}>
                  $0.00
                </Text>
                <Text mt={10}>AVAILABLE TO WITHDRAW</Text>
                <Text fontWeight={'bold'} fontSize={20}>
                  $0.00
                </Text>
                <Button backgroundColor={'#000'} color={'#fff'} width={'100%'} mt={5}>
                  Withdraw
                </Button>
              </Box>
            </GridItem>
            <GridItem colSpan={3}>
              <Box borderWidth={1} borderRadius={10} p={5} pb={12}>
                <Text fontSize={12}>1. GENERATE URL WITH CODE</Text>
                <InputGroup size="md" mt={2}>
                  <Input pr="4.5rem" placeholder="Set your own affiliate code" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => {}}>
                      Set
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Flex alignItems={'center'}>
                  <CheckCircleIcon />
                  <Text fontSize={14} ml={1}>
                    Code is available
                  </Text>
                </Flex>

                <Box mt={7}>
                  <Text fontSize={12}>2. SHARE YOUR LINK</Text>
                  <Flex alignItems={'center'} mt={2}>
                    <Text width={'100%'} backgroundColor={'#f2f2f2'} py={2} borderRadius={10} px={4} mr={2}>
                      https://www.predictmarket.xyz/?ref=
                    </Text>
                    <Button leftIcon={<CopyIcon />} backgroundColor={'#000'} color={'#fff'} px={8}>
                      Copy Link
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Box>

        <Box mt={10} borderRadius={10} borderWidth={1} p={5}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'} fontSize={20}>
              Earnings
            </Text>
            <Menu>
              <MenuButton
                px={8}
                py={2}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: 'gray.400' }}
                _expanded={{ bg: 'blue.400' }}
                _focus={{ boxShadow: 'outline' }}
              >
                Week <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem>Month</MenuItem>
                <MenuItem>Week</MenuItem>
                <MenuItem>Day</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Box p={10} textAlign={'center'}>
            <Text>No data yet</Text>
          </Box>
          <Grid templateColumns="repeat(8, 1fr)" gap={4}>
            <Box>
              <Text fontSize={12}>SIGN UPS</Text>
              <Text fontSize={24} fontWeight={'bold'} mt={2}>
                0
              </Text>
            </Box>
            <Box>
              <Text fontSize={12}>FEES GENERATED</Text>
              <Text fontSize={24} fontWeight={'bold'} mt={2}>
                $0.00
              </Text>
            </Box>
            <Box>
              <Text fontSize={12}>COMISSION</Text>
              <Text fontSize={24} fontWeight={'bold'} mt={2}>
                0%
              </Text>
            </Box>
            <Box>
              <Text fontSize={12}>TOTAL EARNINGS</Text>
              <Text fontSize={24} fontWeight={'bold'} mt={2}>
                $0.00
              </Text>
            </Box>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Affiliate;
