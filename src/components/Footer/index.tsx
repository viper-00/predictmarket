import {
  Box,
  Stack,
  HStack,
  VStack,
  Link,
  Divider,
  Image,
  Text,
  Button,
  IconButton,
  LinkProps,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { FaGithub } from 'react-icons/fa';
import { BsDiscord } from 'react-icons/bs';

const Footer = () => {
  return (
    <Box p={{ base: 5, md: 8 }} maxW="5xl" marginInline="auto">
      <Stack spacing={{ base: 8, md: 0 }} justifyContent="space-between" direction={{ base: 'column', md: 'row' }}>
        <Box maxW={400}>
          <Image src="./logo.png" alt="logo" width={350} height={150} />
          <Text mt={2} color="gray.500" fontSize="md">
            Building the world&apos;s best cryptocurrency wallet tool, providing developers with the finest learning
            toolkits to help reduce learning costs and facilitate knowledge acquisition.
          </Text>
        </Box>
        <HStack spacing={20} justifyContent={{ sm: 'space-between', md: 'normal' }}>
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold">
              Company
            </Text>
            <VStack spacing={2} alignItems="flex-start" color="gray.500">
              <CustomLink>About Us</CustomLink>
              <CustomLink>Contact Us</CustomLink>
              <CustomLink>Terms & Privacy</CustomLink>
            </VStack>
          </VStack>
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold">
              Support
            </Text>
            <VStack spacing={2} alignItems="flex-start" color="gray.500">
              <CustomLink>Request Form</CustomLink>
              <CustomLink>FAQ</CustomLink>
              <CustomLink>Glossary</CustomLink>
            </VStack>
          </VStack>
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold">
              Socials
            </Text>
            <VStack spacing={2} alignItems="flex-start" color="gray.500">
              <CustomLink href="mailto:predictmarket@gmail.com">Email</CustomLink>
              <CustomLink href="https://t.me/+CnSTtret4PJkYjRl">Telegram</CustomLink>
              <CustomLink href="https://discord.gg/Vw4zhCfvNP">Discord</CustomLink>
            </VStack>
          </VStack>
        </HStack>
      </Stack>

      <Divider my={4} />

      <Stack direction={{ base: 'column', md: 'row' }} spacing={3} justifyContent="space-between">
        <Text fontSize="md">
          Built by{' '}
          <Link href="/" textDecoration="underline" _hover={{ textDecoration: 'underline' }} isExternal>
            Predictmarket Teams
          </Link>
        </Text>
      </Stack>
    </Box>
  );
};

const CustomLink = ({ children, ...props }: LinkProps) => {
  return (
    <Link href="#" fontSize="sm" _hover={{ textDecoration: 'underline' }} {...props}>
      {children}
    </Link>
  );
};

export default Footer;
