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
} from '@chakra-ui/react';
import { FaInstagram, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { MdCall } from 'react-icons/md';
import { ReactNode } from 'react';
import Image from 'next/image';

const HomeFooter = () => {
  return (
    <Box bg={useColorModeValue('#007BFC', 'gray.900')} color={useColorModeValue('white', 'gray.200')}>
      <Container as={Stack} maxW="100%" p={10}>
        <SimpleGrid templateColumns="repeat(2, 1fr)" gap={6}>
          <Stack spacing={6}>
            <Flex alignItems={'center'}>
              <Image src="./logo_black.svg" alt="logo" width={168} height={35} />
            </Flex>
            <Text fontSize={'md'}>The worlds largest decentralized prediction market.</Text>
            <Flex>
              <Button rightIcon={<MdCall />} colorScheme="gray">
                <Text>POWERED BY</Text>
              </Button>
              <Button leftIcon={<MdCall />} colorScheme="gray" ml={4}>
                <Text>ALL SYSTEMS OPERATIONAL</Text>
              </Button>
            </Flex>
          </Stack>
          <Flex>
            <Stack align={'flex-start'}>
              <Text fontSize={'lg'}>Marketplace</Text>
              <Box as="a" href={'#'}>
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
                  <SocialButton label={'Twitter'} href={'#'}>
                    <FaTwitter />
                  </SocialButton>
                  <SocialButton label={'YouTube'} href={'#'}>
                    <FaYoutube />
                  </SocialButton>
                  <SocialButton label={'Instagram'} href={'#'}>
                    <FaInstagram />
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
