import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Input,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import MetaTags from 'components/Common/MetaTags';
import HomeNav from 'components/Navbar/HomeNav';
import { MdPhotoCamera } from 'react-icons/md';

const Settings = () => {
  return (
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Settings" />
      <HomeNav />
      <Container minWidth={'50%'}>
        <Box mt={10}>
          <Tabs variant="unstyled" orientation="vertical">
            <TabList>
              <Tab _selected={{ color: '#000', bg: '#f2f2f2' }} borderRadius={10} width={150}>
                Profile
              </Tab>
              <Tab _selected={{ color: '#000', bg: '#f2f2f2' }} borderRadius={10} width={150}>
                Notifications
              </Tab>
            </TabList>
            <TabPanels ml={10}>
              <TabPanel p={0}>
                <Text fontWeight={'bold'} fontSize={20}>
                  Profile Settings
                </Text>
                <Flex alignItems={'center'} mt={5}>
                  <Avatar src="https://bit.ly/broken-link" size={'lg'} />
                  <Button leftIcon={<MdPhotoCamera />} colorScheme="gray" size={'sm'} ml={5} borderRadius={'50'}>
                    Upload
                  </Button>
                </Flex>
                <Box mt={5}>
                  <Text fontWeight={'bold'}>Email</Text>
                  <Text>aur-014@hotmail.com</Text>
                </Box>
                <Box mt={5}>
                  <Text fontWeight={'bold'}>Username</Text>
                  <Input placeholder="Name" />
                </Box>
                <Box mt={5}>
                  <Text fontWeight={'bold'}>Bio</Text>
                  <Textarea placeholder="Bio" />
                </Box>
                <Button colorScheme="messenger" size="lg" mt={5}>
                  Save changes
                </Button>
              </TabPanel>
              <TabPanel p={0}>
                <Text fontWeight={'bold'} fontSize={20}>
                  Notifications Settings
                </Text>
                <Card mt={5} p={5}>
                  <Text fontWeight={'bold'}>Email</Text>
                  <Flex alignItems={'center'} justifyContent={'space-between'} mt={5}>
                    <Flex>
                      <Text>Market updates</Text>
                      <Text ml={5}>市场动态</Text>
                    </Flex>
                    <Switch size="md" />
                  </Flex>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default Settings;
