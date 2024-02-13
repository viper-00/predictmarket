import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Input,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Google } from '@web3uikit/icons';
import React from 'react';
import { MdPhone } from 'react-icons/md';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const LoginDialog = (props: Props) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Box>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={props.onClose}
        isOpen={props.isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader textAlign={'center'}>
            <Text>Log in to Predictmarket</Text>
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Button leftIcon={<Google />} colorScheme="teal" variant="outline" width={'100%'}>
              <Text>Continue with Google</Text>
            </Button>
            <Input placeholder="Enter email" mt={5} />
            <Button colorScheme="blue" textAlign={'center'} width={'100%'} mt={5}>
              <Text>Log in with email</Text>
            </Button>
            <Text textAlign={'center'} py={4}>
              OR
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                fontSize="20px"
                icon={<MdPhone />}
              />
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                fontSize="20px"
                icon={<MdPhone />}
              />
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                fontSize="20px"
                icon={<MdPhone />}
              />
            </Grid>
            <Flex justifyContent={'center'} alignItems={'center'} py={5}>
              <Link href="#">
                <Text>Privacy</Text>
              </Link>
              <Text px={1}>-</Text>
              <Link href="#">
                <Text>Terms</Text>
              </Link>
            </Flex>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default LoginDialog;
