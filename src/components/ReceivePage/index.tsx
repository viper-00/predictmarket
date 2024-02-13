import { Button, Card, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { hydrateWallet } from 'lib/store/wallet';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { formatEllipsisTxt } from 'utils/format';

const ReceivePage = () => {
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    const wallet = hydrateWallet();
    setAddress(wallet.address);
  }, []);
  return (
    <>
      <Flex flexDirection={'column'} alignItems={'center'} mt={10}>
        <Text fontWeight={'bold'} fontSize={20}>
          Receive
        </Text>

        <Card
          width={700}
          alignItems={'center'}
          justifyContent={'center'}
          padding={30}
          backgroundColor={useColorModeValue('blank', 'gray.900')}
          mt={10}
        >
        </Card>

        <Flex mt={20}>
          <QRCodeSVG value={address} size={200} />
        </Flex>

        <Flex alignItems={'center'} mt={10}>
          <Text fontWeight={'bold'} fontSize={20}>
            {formatEllipsisTxt(address)}
          </Text>
          <Button
            colorScheme="yellow"
            ml={5}
            onClick={async () => {
              await navigator.clipboard.writeText(address);
            }}
          >
            COPY
          </Button>
        </Flex>

        <Flex mt={10}>
          <Text>{address}</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default ReceivePage;
