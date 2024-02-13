import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { extendTheme } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

const Web3Provider = dynamic(() => import('./Web3Provider'));

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({ config });
/*  */
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary>
      <Web3Provider>
        <ChakraProvider resetCSS theme={theme}>
          {/* <WagmiConfig config={client}> */}
          {/* <SessionProvider session={pageProps.session} refetchInterval={0}> */}
          {children}
          {/* </SessionProvider> */}
          {/* </WagmiConfig> */}
        </ChakraProvider>
      </Web3Provider>
    </ErrorBoundary>
  );
};

export default Providers;
