import { Avatar, Button, HStack, Text, useToast } from '@chakra-ui/react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { formatEllipsisTxt } from 'utils/format';
import { hydrateWallet, setWalletAddress, setWalletChain } from 'lib/store/wallet';
import { Web3 } from 'packages/core';
import { useRouter } from 'next/router';

const ConnectButton = () => {
  const { connectAsync } = useConnect({ connector: new InjectedConnector() });
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const toast = useToast();
  const router = useRouter();
  const wallet = hydrateWallet();

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }
    try {
      const { account, chain } = await connectAsync();

      if (!chain.unsupported && (await Web3.checkAddress(chain.id, account))) {
        setWalletChain({ chain: chain.id });
        setWalletAddress({ address: account });
        router.push('/portfolio');
      }
    } catch (e) {
      toast({
        title: 'Oops, something went wrong...',
        description: (e as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const handleDisconnect = async () => {
    await disconnectAsync();
  };

  if (wallet?.address) {
    return (
      <HStack onClick={handleDisconnect} cursor={'pointer'}>
        {/* <Avatar size="xs" /> */}
        {/* <Text fontWeight="medium">{formatEllipsisTxt(data.user.address)}</Text> */}
      </HStack>
    );
  }

  return (
    <Button size="lg" onClick={handleAuth} colorScheme="blue">
      Connect Wallet
    </Button>
  );
};

export default ConnectButton;
