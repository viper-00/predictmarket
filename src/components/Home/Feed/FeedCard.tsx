import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { MdNotificationsNone } from 'react-icons/md';

const FeedCard = () => {
  return (
    <Box>
      <SimpleGrid templateColumns="repeat(4, 1fr)" gap={6}>
        <Link href="#" style={{ textDecoration: 'none' }}>
          <Card>
            <CardHeader>
              <Flex justifyContent={'space-between'}>
                <MdNotificationsNone size={50} />
                <Box>
                  <Text>Integration</Text>
                  <Heading size="sm"> Customer dashboard</Heading>
                </Box>
                <MdNotificationsNone size={20} />
              </Flex>
            </CardHeader>

            <CardBody>
              <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
              <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Text>$123123123,123 Bet</Text>
                <Flex alignItems={'center'}>
                  <Flex pr={2} alignItems={'center'}>
                    <MdNotificationsNone size={16} />
                    <Text>123</Text>
                  </Flex>
                  <MdNotificationsNone size={16} />
                </Flex>
              </Flex>
            </CardFooter>
          </Card>
        </Link>
        <Link href="#" style={{ textDecoration: 'none' }}>
          <Card>
            <CardHeader>
              <Flex justifyContent={'space-between'}>
                <MdNotificationsNone size={50} />
                <Box>
                  <Text>Integration</Text>
                  <Heading size="sm"> Customer dashboard</Heading>
                </Box>
                <MdNotificationsNone size={20} />
              </Flex>
            </CardHeader>

            <CardBody>
              <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
              <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Text>$123123123,123 Bet</Text>
                <Flex alignItems={'center'}>
                  <Flex pr={2} alignItems={'center'}>
                    <MdNotificationsNone size={16} />
                    <Text>123</Text>
                  </Flex>
                  <MdNotificationsNone size={16} />
                </Flex>
              </Flex>
            </CardFooter>
          </Card>
        </Link>
        <Link href="#" style={{ textDecoration: 'none' }}>
          <Card>
            <CardHeader>
              <Flex justifyContent={'space-between'}>
                <MdNotificationsNone size={50} />
                <Box>
                  <Text>Integration</Text>
                  <Heading size="sm"> Customer dashboard</Heading>
                </Box>
                <MdNotificationsNone size={20} />
              </Flex>
            </CardHeader>

            <CardBody>
              <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
              <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Text>$123123123,123 Bet</Text>
                <Flex alignItems={'center'}>
                  <Flex pr={2} alignItems={'center'}>
                    <MdNotificationsNone size={16} />
                    <Text>123</Text>
                  </Flex>
                  <MdNotificationsNone size={16} />
                </Flex>
              </Flex>
            </CardFooter>
          </Card>
        </Link>
        <Link href="#" style={{ textDecoration: 'none' }}>
          <Card>
            <CardHeader>
              <Flex justifyContent={'space-between'}>
                <MdNotificationsNone size={50} />
                <Box>
                  <Text>Integration</Text>
                  <Heading size="sm"> Customer dashboard</Heading>
                </Box>
                <MdNotificationsNone size={20} />
              </Flex>
            </CardHeader>

            <CardBody>
              <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
              <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Text>$123123123,123 Bet</Text>
                <Flex alignItems={'center'}>
                  <Flex pr={2} alignItems={'center'}>
                    <MdNotificationsNone size={16} />
                    <Text>123</Text>
                  </Flex>
                  <MdNotificationsNone size={16} />
                </Flex>
              </Flex>
            </CardFooter>
          </Card>
        </Link>
        <Link href="#" style={{ textDecoration: 'none' }}>
          <Card>
            <CardHeader>
              <Flex justifyContent={'space-between'}>
                <MdNotificationsNone size={50} />
                <Box>
                  <Text>Integration</Text>
                  <Heading size="sm"> Customer dashboard</Heading>
                </Box>
                <MdNotificationsNone size={20} />
              </Flex>
            </CardHeader>

            <CardBody>
              <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
              <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Text>$123123123,123 Bet</Text>
                <Flex alignItems={'center'}>
                  <Flex pr={2} alignItems={'center'}>
                    <MdNotificationsNone size={16} />
                    <Text>123</Text>
                  </Flex>
                  <MdNotificationsNone size={16} />
                </Flex>
              </Flex>
            </CardFooter>
          </Card>
        </Link>
      </SimpleGrid>
      <Flex justifyContent={'center'} py={5}>
        <Button colorScheme="blue">View all</Button>
      </Flex>
    </Box>
  );
};

export default FeedCard;
