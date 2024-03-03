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
import { useState } from 'react';
import {
  getEventCapitalPoolAmount,
  getEventConfirmPassword,
  getEventExpireTime,
  getEventLogo,
  getEventPassword,
  getEventPlayType,
  getEventRuleDetails,
  getEventSettlementAddress,
  getEventSingleAmount,
  getEventTitle,
  getEventType,
  setEventCapitalPoolAmount,
  setEventConfirmPassword,
  setEventExpireTime,
  setEventLogo,
  setEventPassword,
  setEventPlayType,
  setEventRuleDetails,
  setEventSettlementAddress,
  setEventSingleAmount,
  setEventTitle,
  setEventType,
} from 'lib/store/event';

const Form1 = () => {
  const [title, setTitle] = useState<string>(getEventTitle());
  const [type, setType] = useState<string>(getEventType());
  const [playType, setPlayType] = useState<string>(getEventPlayType());
  const [ruleDetails, setRuleDetails] = useState<string>(getEventRuleDetails());
  const [exipreTime, setExipreTime] = useState<number>(getEventExpireTime());

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

  const onChangeRoleDetails = (event: any) => {
    setRuleDetails(event.target.value);
    setEventRuleDetails(event.target.value);
  };

  const onChangeExpireTime = (event: any) => {
    setExipreTime(event.target.value);
    setEventExpireTime(event.target.value);
  };

  return (
    <>
      <Heading textAlign={'center'} fontWeight="normal" mb="b">
        Post an event
      </Heading>
      <FormControl mt="2">
        <FormLabel htmlFor="title" fontWeight={'normal'}>
          Title
        </FormLabel>
        <Input id="title" type="text" onChange={onChangeTitle} value={title} />
        {/* <FormHelperText>We&apos;ll never share your email.</FormHelperText> */}
      </FormControl>

      <FormControl mt="2">
        <FormLabel htmlFor="type" fontWeight={'normal'}>
          Type
        </FormLabel>
        <Select placeholder="Select type" value={type} onChange={onChangeType}>
          <option value="option1">Type 1</option>
          <option value="option2">Type 2</option>
          <option value="option3">Type 3</option>
        </Select>
      </FormControl>

      <FormControl mt="2">
        <FormLabel htmlFor="play" fontWeight={'normal'}>
          Play Type
        </FormLabel>
        <Select placeholder="Select play" value={playType} onChange={onChangePlayType}>
          <option value="option1">Play 1</option>
          <option value="option2">Play 2</option>
          <option value="option3">Play 3</option>
        </Select>
      </FormControl>

      <FormControl mt="2">
        <FormLabel htmlFor="ruleDetails" fontWeight={'normal'}>
          Rule Details
        </FormLabel>
        <Textarea placeholder="" value={ruleDetails} onChange={onChangeRoleDetails} />
      </FormControl>
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

  const [logo, setLogo] = useState<string>();
  const [settlementAddress, setSettlementAddress] = useState<string>(getEventSettlementAddress());
  const [singleAmount, setSingleAmount] = useState<number>(getEventSingleAmount());
  const [capitalPoolAmount, setCapitalPoolAmount] = useState<number>(getEventCapitalPoolAmount());
  const [password, setPassword] = useState<string>(getEventPassword());
  const [confirmPassword, setConfirmPassword] = useState<string>(getEventConfirmPassword());

  const onChangeLogo = (event: any) => {
    setLogo(event.target.value);
    setEventLogo(event.target.value);
  };

  const onChangeSingleAmount = (value: any) => {
    setSingleAmount(value);
    setEventSingleAmount(value);
  };

  const onChangeCapitalPoolAmount = (value: any) => {
    setCapitalPoolAmount(value);
    setEventCapitalPoolAmount(value);
  };

  const onChangeSettlementAddress = (event: any) => {
    setSettlementAddress(event.target.value);
    setEventSettlementAddress(event.target.value);
  };

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
            <Input size="md" type="file" onChange={onChangeLogo} value={logo} />
          </GridItem>
          <GridItem colSpan={4} ml={10}>
            <Avatar size="lg" name="Prosper Otemuyiwa" src={logo} />
          </GridItem>
        </SimpleGrid>
      </FormControl>

      <FormControl mt="2">
        <FormLabel htmlFor="singleAmount" fontWeight={'normal'}>
          Single amount
        </FormLabel>
        <NumberInput defaultValue={15} min={1} value={singleAmount} onChange={onChangeSingleAmount}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl mt="2">
        <FormLabel htmlFor="capitalPoolAmount" fontWeight={'normal'}>
          Capital Pool Amount
        </FormLabel>
        <NumberInput defaultValue={15} min={10} value={capitalPoolAmount} onChange={onChangeCapitalPoolAmount}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl mt="2">
        <FormLabel htmlFor="settlementAddress" fontWeight={'normal'}>
          Settlement Address
        </FormLabel>
        <Input id="settlementAddress" type="text" value={settlementAddress} onChange={onChangeSettlementAddress} />
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
            <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
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
            <Button h="1.75rem" size="sm" onClick={handleClickConfirmPassword}>
              {showConfirmPassword ? 'Hide' : 'Show'}
            </Button>
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
      <Box mt={5}>
        <SimpleGrid templateColumns="repeat(4, 1fr)" spacing={1} mt={2}>
          <Text>Title</Text>
          <Text>{getEventTitle()}</Text>
        </SimpleGrid>
        <SimpleGrid templateColumns="repeat(4, 1fr)" spacing={1} mt={2}>
          <Text>Type</Text>
          <Text>{getEventType()}</Text>
        </SimpleGrid>
        <SimpleGrid templateColumns="repeat(4, 1fr)" spacing={1} mt={2}>
          <Text>Play Type</Text>
          <Text>{getEventPlayType()}</Text>
        </SimpleGrid>
        <SimpleGrid templateColumns="repeat(4, 1fr)" spacing={1} mt={2}>
          <Text>Rule Details</Text>
          <Text>{getEventRuleDetails()}</Text>
        </SimpleGrid>
        <SimpleGrid templateColumns="repeat(4, 1fr)" spacing={1} mt={2}>
          <Text>Expire Time</Text>
          <Text>{getEventExpireTime().toLocaleString()}</Text>
        </SimpleGrid>
        <SimpleGrid templateColumns="repeat(4, 1fr)" spacing={1} mt={2}>
          <Text>Logo</Text>
          <Text>{getEventLogo()}</Text>
        </SimpleGrid>
        <SimpleGrid templateColumns="repeat(4, 1fr)" spacing={1} mt={2}>
          <Text>Single amount</Text>
          <Text>{getEventSingleAmount()}</Text>
        </SimpleGrid>
        <SimpleGrid templateColumns="repeat(4, 1fr)" spacing={1} mt={2}>
          <Text>Capital Pool Amount</Text>
          <Text>{getEventCapitalPoolAmount()}</Text>
        </SimpleGrid>
        <SimpleGrid templateColumns="repeat(4, 1fr)" spacing={1} mt={2}>
          <Text>Settlement Address</Text>
          <Text>{getEventSettlementAddress()}</Text>
        </SimpleGrid>
        <SimpleGrid templateColumns="repeat(4, 1fr)" spacing={1} mt={2}>
          <Text>Password</Text>
          <Text>{getEventPassword()}</Text>
        </SimpleGrid>
      </Box>
    </>
  );
};

const Post = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

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
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    setProgress(progress - 33.33);
                  }}
                  isDisabled={step === 1}
                  colorScheme="teal"
                  variant="solid"
                  w="7rem"
                  mr="5%"
                >
                  Back
                </Button>
                <Button
                  w="7rem"
                  isDisabled={step === 3}
                  onClick={() => {
                    setStep(step + 1);
                    if (step === 3) {
                      setProgress(100);
                    } else {
                      setProgress(progress + 33.33);
                    }
                  }}
                  colorScheme="teal"
                  variant="outline"
                >
                  Next
                </Button>
              </Flex>
              {step === 3 ? (
                <Button
                  w="7rem"
                  colorScheme="green"
                  variant="solid"
                  onClick={() => {
                    toast({
                      title: 'Account created.',
                      description: "We've created your account for you.",
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                >
                  Submit
                </Button>
              ) : null}
            </Flex>
          </ButtonGroup>
        </Box>
      </Container>
    </Box>
  );
};

export default Post;