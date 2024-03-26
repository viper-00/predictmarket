import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react';

const TestnetAlert = () => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      py={10}
    >
      <AlertIcon />
      <AlertTitle mt={2}>You are currently using the test network of sepolia!</AlertTitle>
      <AlertDescription mt={2}>You can play by receiving testnet coins and online transaction fees.</AlertDescription>
    </Alert>
  );
};

export default TestnetAlert;
