import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react';
import CustomButton from 'components/Button/CustomButton';

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
      <AlertDescription mt={2}>Please log in to the wallet page for acquisition</AlertDescription>

      <Box mt={5}>
        <CustomButton
          colorScheme={'blue'}
          text="Get the test coin"
          onClick={async () => {
            window.location.href = '/wallet';
          }}
        />
      </Box>
    </Alert>
  );
};

export default TestnetAlert;
