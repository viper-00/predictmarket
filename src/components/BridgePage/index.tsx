import { Box, Center, Flex, Text, useColorMode } from '@chakra-ui/react';

const BridgePage = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Center flexDirection={'column'} mt={10}>
        <Text fontWeight={'bold'} fontSize={20}>
          Bridge
        </Text>
        <Box mt={10} width={450} borderWidth={1}>
          {/* @ts-ignore */}
          <stargate-widget
            theme={colorMode === 'light' ? 'light' : 'dark'}
            // partnerId="105"
            feeCollector="0xef17173f36dfd945bab44e60688f33efd2890706"
            tenthBps="10"
          />
        </Box>
      </Center>
    </>
  );
};

export default BridgePage;
