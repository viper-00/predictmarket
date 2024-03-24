import { Box, Button, Flex, Image, Text, Center } from '@chakra-ui/react';
import CustomButton from 'components/Button/CustomButton';
import MetaTags from 'components/Common/MetaTags';
import Link from 'next/link';
import { PRED_APP_NAME } from 'packages/constants';

const Custom500 = () => {
  return (
    <>
      <MetaTags title="500" />
      <Center>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Box className="mb-10">
            {/* <Image
            // src={`${STATIC_ASSETS}/images/illustrations/404.gif`}
            draggable={false}
            height={200}
            width={200}
            // alt={TAPE_APP_NAME}
          /> */}
            {/* <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" /> */}
            <Text fontSize={30} fontWeight="bold">
              {PRED_APP_NAME}
            </Text>
          </Box>
          <Text className="text-4xl font-bold">500</Text>
          <Text className="text-4xl font-bold">Looks like something went wrong!</Text>
          <Box className="mb-6">
            We track these errors automatically, but if the problem persists feel free to contact us. In the meantime,
            try refreshing.
          </Box>
          <Link href="/">
            <CustomButton variant="surface" text={'Go Home'} />
          </Link>
        </Flex>
      </Center>
    </>
  );
};

export default Custom500;
