import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Google } from '@web3uikit/icons';
import React, { useState } from 'react';
import { emailRegex } from 'packages/constants/regex';
import { Http } from 'packages/core/http/http';
import axios from 'packages/core/http/axios';
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
import CustomButton from 'components/Button/CustomButton';
import MetamaskSvg from 'assets/images/metamask.svg';
import CoinbaseSvg from 'assets/images/coinbase.svg';
import WalletconnectSvg from 'assets/images/walletconnect.svg';
import Image from 'next/image';
import CustomIconButton from 'components/Button/CustomIconButton';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { checkAddress } from 'utils/address';
import { DEFAULT_CHAIN_ID } from 'packages/constants';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const LoginDialog = (props: Props) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const [email, setEmail] = useState<string>('');
  const [emailcode, setEmailCode] = useState<string>('');

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleEmailCodeChange = (event: any) => {
    setEmailCode(event.target.value);
  };

  const onLogin = async () => {
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
      const response: any = await axios.post(Http.userLogin, {
        email: email,
      });

      if (response.code === 10200 && response.result) {
        toast({
          position: 'top',
          title: `sent successful`,
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

  const onLoginByCode = async () => {
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

    if (!emailcode || emailcode === '') {
      toast({
        position: 'top',
        title: `Email code can not be empty`,
        status: 'error',
        isClosable: true,
      });
      return;
    }

    try {
      const response: any = await axios.post(Http.userLoginByCode, {
        email: email,
        code: emailcode,
      });

      if (response.code === 10200 && response.result) {
        if (response.data.auth != '') {
          setEmail('');

          const auth = response.data.auth;
          const address = response.data.address;
          const contractAddress = response.data.contract_address;
          const chainId = response.data.chain_id;
          const username = response.data.username;
          const bio = response.data.bio;
          const avatarUrl = response.data.avatar_url;
          const joinedDate = response.data.joined_date;
          const email = response.data.email;
          if (!auth || auth === '') {
            toast({
              position: 'top',
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
            position: 'top',
            title: `login successful`,
            status: 'success',
            isClosable: true,
          });

          window.location.href = '/';
        } else {
          toast({
            position: 'top',
            title: `Login failed, please confirm that the account has been registered`,
            status: 'error',
            isClosable: true,
          });
        }
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

  const onClickMetamask = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    try {
      const { account, chain } = await connectAsync({ chainId: DEFAULT_CHAIN_ID });

      if (!chain.unsupported) {
        toast({
          position: 'top',
          title: 'The network is not supported, please switch to the correct network',
          status: 'error',
          isClosable: true,
        });
        return;
      }

      if (!checkAddress(account)) {
        toast({
          position: 'top',
          title: 'The address is not supported, please switch to the valid address',
          status: 'error',
          isClosable: true,
        });
        return;
      }

      if (chain.id !== DEFAULT_CHAIN_ID) {
        toast({
          position: 'top',
          title: 'The network is not supported, please switch to the correct network',
          status: 'error',
          isClosable: true,
        });
        return;
      }

      console.log('chain', chain.id, account);

      const response: any = await axios.post(Http.userLoginByWallet, {
        chain_id: chain.id,
        address: account,
      });

      if (response.code === 10200 && response.result) {
        if (response.data.auth != '') {
          const auth = response.data.auth;
          const address = response.data.address;
          const contractAddress = response.data.contract_address;
          const chainId = response.data.chain_id;
          const username = response.data.username;
          const bio = response.data.bio;
          const avatarUrl = response.data.avatar_url;
          const joinedDate = response.data.joined_date;
          const email = response.data.email;
          if (!auth || auth === '') {
            toast({
              position: 'top',
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
            position: 'top',
            title: `login successful`,
            status: 'success',
            isClosable: true,
          });

          window.location.href = '/';
        } else {
          toast({
            position: 'top',
            title: `Login failed, please confirm that the account has been registered`,
            status: 'error',
            isClosable: true,
          });
        }
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
            <Text>Log in to Predictmarket</Text>
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <CustomButton
              leftIcon={<Google />}
              colorScheme={'teal'}
              variant={'outline'}
              text={'Continue with Google'}
              textAlign={'center'}
              width={'100%'}
              isDisabled={true}
            ></CustomButton>
            <InputGroup mt={5}>
              <Input pr="4.5rem" placeholder="Enter email" value={email} onChange={handleEmailChange} />
              <InputRightElement width="5rem" pr={2}>
                <CustomButton
                  size={'sm'}
                  onClick={async () => {
                    onLogin();
                  }}
                  text={'Get Code'}
                />
              </InputRightElement>
            </InputGroup>
            <Input placeholder="Enter email code" mt={5} value={emailcode} onChange={handleEmailCodeChange} />
            <Box mt={4}>
              <CustomButton
                width={'100%'}
                colorScheme="blue"
                textAlign={'center'}
                onClick={async () => {
                  onLoginByCode();
                }}
                text={'Log in with email'}
              />
            </Box>
            <Text textAlign={'center'} py={4}>
              OR
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <CustomIconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                icon={<Image src={MetamaskSvg} alt="metamask" width={30} height={30} />}
                onClick={onClickMetamask}
              />
              <CustomIconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                icon={<Image src={CoinbaseSvg} alt="coinbase" width={30} height={30} />}
                isDisabled={true}
              />
              <CustomIconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                icon={<Image src={WalletconnectSvg} alt="walletconnect" width={30} height={30} />}
                isDisabled={true}
              />
            </Grid>
            <Flex justifyContent={'center'} alignItems={'center'} py={5}>
              <Link href="/privacy">
                <Text>Privacy</Text>
              </Link>
              <Text px={1}>-</Text>
              <Link href="/tos">
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
