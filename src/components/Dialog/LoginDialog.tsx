import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Input,
  Link,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Google } from '@web3uikit/icons';
import React, { useState } from 'react';
import { MdPhone } from 'react-icons/md';
import { emailRegex } from 'packages/constants/regex';
import { Http } from 'packages/core/http';
import axios from 'axios';
import {
  setJoinedDate,
  setUserAddress,
  setUserAuthorization,
  setUserAvatarUrl,
  setUserChainId,
  setUserContractAddress,
  setUsername,
  setUserEmail,
  setUserBio,
} from 'lib/store/user';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const LoginDialog = (props: Props) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const [email, setEmail] = useState<string>();

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const onLogin = async () => {
    if (!email || email === '') {
      toast({
        title: `Email can not be empty`,
        status: 'error',
        isClosable: true,
      });
      return;
    }
    if (!emailRegex.test(email as string)) {
      toast({
        title: `Email is incorrect`,
        status: 'error',
        isClosable: true,
      });
      return;
    }

    const response = await axios.post(Http.userLogin, {
      email: email,
    });

    if (response.data.code === 10200) {
      setEmail('');

      const auth = response.data.data.auth;
      const address = response.data.data.address;
      const contractAddress = response.data.data.contract_address;
      const chainId = response.data.data.chain_id;
      const username = response.data.data.username;
      const bio = response.data.data.bio;
      const avatarUrl = response.data.data.avatar_url;
      const joinedDate = response.data.data.joined_date;
      const email = response.data.data.email;
      if (!auth || auth === '') {
        toast({
          title: `Login failed, please confirm that the account has been registered`,
          status: 'error',
          isClosable: true,
        });
        return;
      }
      setUserAuthorization(auth);
      setUserAddress(address);
      setUserContractAddress(contractAddress);
      setUserChainId(chainId);
      setUsername(username);
      setUserAvatarUrl(avatarUrl);
      setJoinedDate(joinedDate);
      setUserEmail(email);
      setUserBio(bio);

      props.onClose();
      toast({
        title: `login successful`,
        status: 'success',
        isClosable: true,
      });

      window.location.href = '/';
    } else {
      toast({
        title: `Login failed, please confirm that the account has been registered`,
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={props.onClose}
        isOpen={props.isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader textAlign={'center'}>
            <Text>Log in to Predictmarket</Text>
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Button leftIcon={<Google />} colorScheme="teal" variant="outline" width={'100%'}>
              <Text>Continue with Google</Text>
            </Button>
            <Input placeholder="Enter email" mt={5} value={email} onChange={handleEmailChange} />
            <Button colorScheme="blue" textAlign={'center'} width={'100%'} mt={5} onClick={onLogin}>
              <Text>Log in with email</Text>
            </Button>
            <Text textAlign={'center'} py={4}>
              OR
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                fontSize="20px"
                icon={<MdPhone />}
              />
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                fontSize="20px"
                icon={<MdPhone />}
              />
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                fontSize="20px"
                icon={<MdPhone />}
              />
            </Grid>
            <Flex justifyContent={'center'} alignItems={'center'} py={5}>
              <Link href="#">
                <Text>Privacy</Text>
              </Link>
              <Text px={1}>-</Text>
              <Link href="#">
                <Text>Terms</Text>
              </Link>
            </Flex>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default LoginDialog;
