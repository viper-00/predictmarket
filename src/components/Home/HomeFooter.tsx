import {
  Box,
  Container,
  Grid,
  useColorModeValue,
  SimpleGrid,
  Stack,
  Button,
  Input,
  IconButton,
  Text,
  chakra,
  Flex,
  VisuallyHidden,
  Heading,
  Divider,
  Link,
  useColorMode,
} from '@chakra-ui/react';
import { FaTelegramPlane, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { GiSevenPointedStar } from 'react-icons/gi';
import { ReactNode } from 'react';
import LogoBlack from 'assets/images/logo_black.svg';
import LogoWhite from 'assets/images/logo_white.svg';
import Image from 'next/image';
import CustomButton from 'components/Button/CustomButton';
import OpSvg from 'assets/images/op.svg';
import MetamaskSvg from 'assets/images/metamask.svg';

const HomeFooter = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue('#007BFC', 'gray.900')} color={useColorModeValue('white', 'gray.200')}>
      <Container as={Stack} maxW="100%" p={10}>
        <SimpleGrid templateColumns="repeat(2, 1fr)" gap={6}>
          <Stack spacing={6}>
            {/* <Flex alignItems={'center'}>
              <Image src="./logo_black.svg" alt="logo" width={'auto'} height={'auto'}/>
            </Flex> */}
            <Link href="/">
              {colorMode === 'light' ? (
                <>
                  <Image src={LogoWhite} alt="logo" width={200} />
                </>
              ) : (
                <>
                  <Image src={LogoWhite} alt="logo" width={200} />
                </>
              )}
            </Link>
            <Text fontSize={'md'}>The worlds largest decentralized prediction market.</Text>
            <Flex>
              <CustomButton
                rightIcon={<Image src={OpSvg} alt="op" width={25} height={25} />}
                colorScheme="gray"
                text={'POWERED BY'}
                size={'sm'}
                onClick={async () => {
                  window.location.href = 'https://www.optimism.io/';
                }}
              />
              <Box ml={2}>
                <CustomButton
                  leftIcon={<GiSevenPointedStar color="green" />}
                  colorScheme="gray"
                  text={'ALL SYSTEMS OPERATIONAL'}
                  size={'sm'}
                />
              </Box>
            </Flex>
          </Stack>
          <Flex>
            <Stack align={'flex-start'}>
              <Text fontSize={'lg'}>Marketplace</Text>
              <Box as="a" href={'mailto:nowcoin369@gmail.com'}>
                <Text>Contract</Text>
              </Box>
              <Box as="a" href={'/learn'}>
                <Text>Learn</Text>
              </Box>
              <Box as="a" href={'/docs'}>
                <Text>Developers</Text>
              </Box>
              <Box as="a" href={'/blog'}>
                <Text>Blog</Text>
              </Box>
            </Stack>
            <Stack align={'flex-start'} pl={40}>
              <Text fontSize={'lg'}>Join the community</Text>
              <Flex>
                <Stack direction={'row'} spacing={6}>
                  <SocialButton label={'Telegram'} href={'#'}>
                    <FaTelegramPlane />
                  </SocialButton>
                  <SocialButton label={'X'} href={'#'}>
                    <FaXTwitter />
                  </SocialButton>
                  <SocialButton label={'YouTube'} href={'#'}>
                    <FaYoutube />
                  </SocialButton>
                </Stack>
              </Flex>
            </Stack>
          </Flex>
        </SimpleGrid>
        <Divider py={5} />
        <Flex alignItems={'center'} justifyContent={'space-between'} mt={5}>
          <Text fontSize={'sm'}>© 2024 Predictmarket. All rights reserved</Text>
          <Flex>
            <Link href="/privacy" mr={5}>
              <Text>Privacy Policy</Text>
            </Link>
            <Link href="/tos">
              <Text>Terms of Service</Text>
            </Link>
          </Flex>
        </Flex>
      </Container>
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

export default HomeFooter;
