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
  useToast,
} from '@chakra-ui/react';
import { Google } from '@web3uikit/icons';
import { DEFAULT_CHAIN_ID } from 'packages/constants';
import { emailRegex } from 'packages/constants/regex';
import { Http } from 'packages/core/http/http';
import React, { useState } from 'react';
import axios from 'packages/core/http/axios';
import CustomButton from 'components/Button/CustomButton';
import MetamaskSvg from 'assets/images/metamask.svg';
import CoinbaseSvg from 'assets/images/coinbase.svg';
import WalletconnectSvg from 'assets/images/walletconnect.svg';
import Image from 'next/image';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const SignupDialog = (props: Props) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const [email, setEmail] = useState<string>('');

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const onRegister = async () => {
    if (!email || email === '') {
      toast({
        position: 'top',
        title: `Email can not be empty`,
        status: 'error',
        isClosable: true,
      });
      return;
    }
    if (!emailRegex.test(email as string)) {
      toast({
        position: 'top',
        title: `Email is incorrect`,
        status: 'error',
        isClosable: true,
      });
      return;
    }

    try {
      const response: any = await axios.post(Http.userRegister, {
        email: email,
        chain_id: DEFAULT_CHAIN_ID,
      });

      if (response.code === 10200 && response.result) {
        setEmail('');
        props.onClose();
        toast({
          position: 'top',
          title: `The certification email has been sent successfully, please go to your mailbox to check`,
          status: 'success',
          isClosable: true,
        });
      }
    } catch (e: any) {
      console.error(e);
      toast({
        position: 'top',
        title: e.message,
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
            <Text>Sign up for Predictmarket</Text>
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <CustomButton
              leftIcon={<Google />}
              colorScheme="teal"
              variant="outline"
              width={'100%'}
              text={'Continue with Google'}
            />
            <Input placeholder="Enter email" mt={5} value={email} onChange={handleEmailChange} />
            <Box mt={4}>
              <CustomButton
                textAlign={'center'}
                width={'100%'}
                text={'Sign up with email'}
                onClick={async () => {
                  onRegister()
                }}
              />
            </Box>
            <Text textAlign={'center'} py={4}>
              OR
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                fontSize="20px"
                icon={<Image src={MetamaskSvg} alt="metamask" width={30} height={30} />}
              />
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                fontSize="20px"
                icon={<Image src={CoinbaseSvg} alt="coinbase" width={30} height={30} />}
              />
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                fontSize="20px"
                icon={<Image src={WalletconnectSvg} alt="walletconnect" width={30} height={30} />}
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

export default SignupDialog;
