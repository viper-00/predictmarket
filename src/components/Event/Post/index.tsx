import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Container,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Avatar,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import MetaTags from 'components/Common/MetaTags';
import HomeNav from 'components/Navbar/HomeNav';
import { useEffect, useRef, useState } from 'react';
import {
  // getEventCapitalPoolAmount,
  getEventConfirmPassword,
  getEventExpireTime,
  getEventLogo,
  getEventPassword,
  getEventPlayType,
  // getEventRuleDetails,
  getEventSettlementAddress,
  // getEventSingleAmount,
  getEventTitle,
  getEventType,
  resetEvent,
  // setEventCapitalPoolAmount,
  setEventConfirmPassword,
  setEventExpireTime,
  setEventLogo,
  setEventPassword,
  setEventPlayType,
  // setEventRuleDetails,
  setEventSettlementAddress,
  // setEventSingleAmount,
  setEventTitle,
  setEventType,
} from 'lib/store/event';
import axios from 'packages/core/http/axios';
import { Http } from 'packages/core/http/http';
import { EventPlayType } from 'packages/types';
import { DEFAULT_CHAIN_ID } from 'packages/constants';
import { getUserContractAddress } from 'lib/store/user';
import CustomButton from 'components/Button/CustomButton';

const Form1 = () => {
  const [title, setTitle] = useState<string>(getEventTitle());
  const [type, setType] = useState<string>(getEventType());
  const [playType, setPlayType] = useState<string>(getEventPlayType());
  const [typeList, setTypeList] = useState<string[]>([]);
  const [playTypeList, setPlayTypeList] = useState<EventPlayType[]>([]);
  // const [ruleDetails, setRuleDetails] = useState<string>(getEventRuleDetails());
  const [exipreTime, setExipreTime] = useState<number>(getEventExpireTime());

  const toast = useToast();

  const onChangeTitle = (event: any) => {
    setTitle(event.target.value);
    setEventTitle(event.target.value);
  };

  const onChangeType = (event: any) => {
    setType(event.target.value);
    setEventType(event.target.value);
  };

  const onChangePlayType = (event: any) => {
    setPlayType(event.target.value);
    setEventPlayType(event.target.value);
  };

  // const onChangeRoleDetails = (event: any) => {
  //   setRuleDetails(event.target.value);
  //   setEventRuleDetails(event.target.value);
  // };

  const onChangeExpireTime = (event: any) => {
    setExipreTime(event.target.value);
    setEventExpireTime(event.target.value);
  };

  useEffect(() => {
    async function getEventType() {
      try {
        const response: any = await axios.get(Http.marketEventType);
        if (response.code === 10200 && response.result) {
          setTypeList(response.data);
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
    }

    async function getEventPlayType() {
      try {
        const response: any = await axios.get(Http.marketEventPlay);
        if (response.code === 10200 && response.result) {
          let plays: EventPlayType[] = [];
          response.data.forEach((item: any) => {
            plays.push({
              title: item.title,
              introduce: item.introduce,
              guessNumber: item.guess_number,
              minimumCapitalPool: item.minimum_capital_pool,
              maximumCapitalPool: item.maximum_capital_pool,
              coin: item.coin,
              pledgeAmount: item.pledge_amount,
              values: [],
            });
          });
          setPlayTypeList(plays);
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
    }

    getEventType();
    getEventPlayType();
  }, []);

  return (
    <>
      <Heading textAlign={'center'} fontWeight="normal" mb="b">
        Post an event
      </Heading>
      <FormControl mt="2">
        <FormLabel htmlFor="title" fontWeight={'normal'}>
          Title
        </FormLabel>
        <Input id="title" type="text" onChange={onChangeTitle} value={title} placeholder="Enter title" />
        {/* <FormHelperText>We&apos;ll never share your email.</FormHelperText> */}
      </FormControl>

      <FormControl mt="2">
        <FormLabel htmlFor="type" fontWeight={'normal'}>
          Type
        </FormLabel>
        <Select placeholder="Select type" value={type} onChange={onChangeType}>
          {typeList &&
            typeList.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
        </Select>
      </FormControl>

      <FormControl mt="2">
        <FormLabel htmlFor="play" fontWeight={'normal'}>
          Play Type
        </FormLabel>
        <Select placeholder="Select play" value={playType} onChange={onChangePlayType}>
          {playTypeList &&
            playTypeList.map((item, index) => (
              <option value={item.title} key={index}>
                {item.title}
              </option>
            ))}
        </Select>
      </FormControl>

      {/* <FormControl mt="2">
        <FormLabel htmlFor="ruleDetails" fontWeight={'normal'}>
          Rule Details
        </FormLabel>
        <Textarea placeholder="" value={ruleDetails} onChange={onChangeRoleDetails} />
      </FormControl> */}
      <FormControl mt="2">
        <FormLabel htmlFor="date" fontWeight={'normal'}>
          Expire Time
        </FormLabel>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="datetime-local"
          value={exipreTime}
          onChange={onChangeExpireTime}
        />
      </FormControl>
    </>
  );
};

const Form2 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickPassword = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const [logo, setLogo] = useState<string>(getEventLogo());
  const [resolverAddress, setResolverAddress] = useState<string>(getUserContractAddress());
  // const [singleAmount, setSingleAmount] = useState<number>(getEventSingleAmount());
  // const [capitalPoolAmount, setCapitalPoolAmount] = useState<number>(getEventCapitalPoolAmount());
  const [password, setPassword] = useState<string>(getEventPassword());
  const [confirmPassword, setConfirmPassword] = useState<string>(getEventConfirmPassword());
  const toast = useToast();

  const onChangeLogo = async (event: any) => {
    const fileInput = event.target.files[0];
    const formData = new FormData();
    formData.append('file', fileInput);

    try {
      const response: any = await axios.post(Http.fileUpload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.code === 10200 && response.result) {
        setLogo(response.data.file_url);
        setEventLogo(response.data.file_url);
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

  // const onChangeSingleAmount = (value: any) => {
  //   setSingleAmount(value);
  //   setEventSingleAmount(value);
  // };

  // const onChangeCapitalPoolAmount = (value: any) => {
  //   setCapitalPoolAmount(value);
  //   setEventCapitalPoolAmount(value);
  // };

  // const onChangeSettlementAddress = (event: any) => {
  //   setSettlementAddress(event.target.value);
  //   setEventSettlementAddress(event.target.value);
  // };

  const onChangePassword = (event: any) => {
    setPassword(event.target.value);
    setEventPassword(event.target.value);
  };

  const onChangeConfirmPassword = (event: any) => {
    setConfirmPassword(event.target.value);
    setEventConfirmPassword(event.target.value);
  };

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Even Details
      </Heading>
      <FormControl mt="2">
        <FormLabel htmlFor="logo" fontWeight={'normal'}>
          Logo
        </FormLabel>
        <SimpleGrid templateColumns="repeat(5, 1fr)">
          <GridItem colSpan={1}>
            <Input size="md" type="file" onChange={onChangeLogo} />
          </GridItem>
          <GridItem colSpan={4} ml={10}>
            <Avatar size="lg" name="Prosper Otemuyiwa" src={logo} />
          </GridItem>
        </SimpleGrid>
      </FormControl>
      <FormControl mt="2">
        <FormLabel htmlFor="resolverAddress" fontWeight={'normal'}>
          Resolver Address
        </FormLabel>
        <Input
          id="resolverAddress"
          type="text"
          value={resolverAddress}
          // onChange={onChangeSettlementAddress}
          disabled={true}
        />
      </FormControl>

      <FormControl mt="2">
        <FormLabel htmlFor="enterPassword" fontWeight={'normal'}>
          Enter Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={onChangePassword}
          />
          <InputRightElement width="4.5rem">
            <CustomButton
              size="sm"
              onClick={async () => {
                handleClickPassword()
              }}
              text={showPassword ? 'Hide' : 'Show'}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl mt="2">
        <FormLabel htmlFor="confirmPassword" fontWeight={'normal'}>
          Confirm Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Enter confirm password"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
          <InputRightElement width="4.5rem">
            <CustomButton
              size="sm"
              onClick={async () => {
                handleClickConfirmPassword()
              }}
              text={showConfirmPassword ? 'Hide' : 'Show'}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};

const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Confirm Event
      </Heading>
      <Flex mt={5} alignItems={'flex-start'}>
        <Box>
          <Text height={100}>Logo</Text>
          <Text height={70}>Title</Text>
          <Text height={70}>Type</Text>
          <Text height={70}>Play Type</Text>
          <Text height={70}>Expire Time</Text>
          <Text height={70}>Resolver Address</Text>
          <Text height={70}>Password</Text>
        </Box>

        <Box ml={10}>
          <Box height={100}>
            <Avatar size="md" name="Prosper Otemuyiwa" src={getEventLogo()} />
          </Box>
          <Text height={70}>{getEventTitle()}</Text>
          <Text height={70}>{getEventType()}</Text>
          <Text height={70}>{getEventPlayType()}</Text>
          <Text height={70}>{getEventExpireTime().toLocaleString()}</Text>
          <Text height={70}>{getUserContractAddress()}</Text>
          <Text height={70}>{getEventPassword()}</Text>
        </Box>
      </Flex>
    </>
  );
};

const Post = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const onClickPostEvent = async () => {
    try {
      const response: any = await axios.post(Http.marketEventEvent, {
        title: getEventTitle(),
        expire_time: new Date(getEventExpireTime()).getTime(),
        type: getEventType(),
        play_type: getEventPlayType(),
        event_logo: getEventLogo(),
        resolver_address: getUserContractAddress(),
        password: getEventPassword(),
      });

      if (response.code === 10200 && response.result) {
        toast({
          position: 'top',
          title: `Successfully create`,
          status: 'success',
          isClosable: true,
        });
        resetEvent();
        window.location.href = '/event/' + response.data.unique_code;
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
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Post" />
      <HomeNav />
      <Container maxWidth={['100%', '100%', '100%', '80%', '75%', '60%']} mt={10}>
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          p={6}
          m="10px auto"
          as="form"
        >
          <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
          {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
          <ButtonGroup mt="5%" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <Flex>
                <Box mr={5}>
                  <CustomButton
                    text={'Back'}
                    onClick={async () => {
                      setStep(step - 1);
                      setProgress(progress - 33.33);
                    }}
                    isDisabled={step === 1}
                    colorScheme="teal"
                  />
                </Box>
                <CustomButton
                  text={'Next'}
                  isDisabled={step === 3}
                  onClick={async () => {
                    setStep(step + 1);
                    if (step === 3) {
                      setProgress(100);
                    } else {
                      setProgress(progress + 33.33);
                    }
                  }}
                  colorScheme="teal"
                  variant="outline"
                />
              </Flex>
              {step === 3 ? (
                <CustomButton
                  text="Submit"
                  colorScheme="green"
                  onClick={async () => {
                    onClickPostEvent()
                  }}
                />
              ) : null}
            </Flex>
          </ButtonGroup>
        </Box>
      </Container>
    </Box>
  );
};

export default Post;
