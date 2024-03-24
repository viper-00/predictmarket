import { Box, Button, Card, Center, Container, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import MetaTags from 'components/Common/MetaTags';
import { useRouter } from 'next/router';
import { Http } from 'packages/core/http/http';
import axios from 'packages/core/http/axios';
import CustomButton from 'components/Button/CustomButton';

const Confirm = () => {
  const router = useRouter();
  const { code } = router.query;

  const toast = useToast();

  const onClickVerify = async () => {
    if (!code || code === '') {
      toast({
        position: 'top',
        title: `An unknown exception occurred`,
        status: 'error',
        isClosable: true,
      });
      return;
    }
    try {
      const response: any = await axios.get(Http.userVerifyInvitation, {
        params: {
          code: code,
        },
      });
      if (response.code === 10200 && response.result) {
        toast({
          position: 'top',
          title: `Account verification successful, please go to the log in`,
          status: 'success',
          isClosable: true,
        });
      } else {
        toast({
          position: 'top',
          title: `Verification failed, please register an account again`,
          status: 'error',
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
    <>
      <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
        <MetaTags title="Email Confirm" />
        <Container alignItems={'center'}>
          <Card py={5} px={10}>
            <Center>
              <Text>Verify Email</Text>
            </Center>
            <Center mt={2}>
              <Text>Clike Verify to create your account.</Text>
            </Center>

            <Box mt={4}>
              <CustomButton colorScheme="blue" onClick={onClickVerify} text={'Verify'} />
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Confirm;
