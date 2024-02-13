import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { SupportedLocale, SUPPORTED_LOCALES, lightTheme, darkTheme } from '@uniswap/widgets';

import { Chain } from 'packages/types';
import { GetRandomRPCUrl } from 'packages/utils';
import { useCallback, useRef, useState } from 'react';
import { useActiveProvider } from './connectors';
import { useColorMode } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const SwapPage = () => {
  const { colorMode } = useColorMode();

  //   const JSON_RPC_URL = GetRandomRPCUrl(Chain.ETH);
  const TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org';
  const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
  const [locale, setLocale] = useState<SupportedLocale>('en-US');

  const connectors = useRef<HTMLDivElement>(null);
  const focusConnectors = useCallback(() => connectors.current?.focus(), []);

  const provider = useActiveProvider();

  const SwapWidget = dynamic(
    async () => {
      const res = await import('@uniswap/widgets');
      return res.SwapWidget;
    },
    { ssr: false },
  );

  return (
    <>
      <Center flexDirection={'column'} mt={10}>
        <Text fontWeight={'bold'} fontSize={20}>
          Swap
        </Text>
        <Box mt={10}>
          <Flex>
            <SwapWidget
              tokenList={TOKEN_LIST}
              provider={provider}
              locale={locale}
              onConnectWalletClick={focusConnectors}
              defaultInputTokenAddress="NATIVE"
              defaultInputAmount="1"
              defaultOutputTokenAddress={UNI}
              theme={colorMode === 'light' ? lightTheme : darkTheme}
              width={400}
              brandedFooter={false}
              convenienceFee={100}
              convenienceFeeRecipient={'0xef17173f36dfd945bab44e60688f33efd2890706'}
              defaultChainId={1}
            />
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export default SwapPage;
