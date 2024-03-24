import { AbsoluteCenter, Box, Button, Container, Flex, Image, Text, Center } from '@chakra-ui/react';
import CustomButton from 'components/Button/CustomButton';
import MetaTags from 'components/Common/MetaTags';
import Link from 'next/link';
import { PRED_APP_NAME } from 'packages/constants';

const Custom404 = () => {
  return (
    <>
      <MetaTags title="Not found" />
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
            <Text fontSize={30} fontWeight="bold">
              {PRED_APP_NAME}
            </Text>
          </Box>
          <Text className="text-4xl font-bold">404</Text>
          <Box className="mb-6">This page could not be found.</Box>
          <Link href="/">
            <CustomButton variant="surface" text={'Go Home'} />
          </Link>
        </Flex>
      </Center>
    </>
  );
};

export default Custom404;
