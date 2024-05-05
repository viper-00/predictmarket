import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
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
  useToast,
} from '@chakra-ui/react';
import MetaTags from 'components/Common/MetaTags';
import HomeNav from 'components/Navbar/HomeNav';
import { MdPhotoCamera } from 'react-icons/md';
import { useEffect, useState } from 'react';
import axios from 'packages/core/http/axios';
import { Http } from 'packages/core/http/http';
import { UserNotificationSetting, UserProfile } from 'packages/types';
import CustomButton from 'components/Button/CustomButton';
import { setUserAvatarUrl, setUserBio, setUsername } from 'lib/store/user';

const Settings = () => {
  const toast = useToast();
  const [profile, setProfile] = useState<UserProfile>();
  const [noSetting, setNoSetting] = useState<UserNotificationSetting>();

  async function init() {
    try {
      const response: any = await axios.get(Http.userSetting);
      if (response.code === 10200 && response.result) {
        const setting = response.data.setting;
        if (setting) {
          const p: UserProfile = {
            avatarUrl: setting.avatar_url,
            bio: setting.bio,
            contractAddress: setting.contract_Address,
            createdTime: setting.created_time,
            email: setting.email,
            invitationCode: setting.invitation_code,
            username: setting.username,
          };
          setProfile(p);

          const n: UserNotificationSetting = {
            emailUpdate: setting.email_update,
            dailyUpdate: setting.daily_update,
            incomingUpdate: setting.incoming_update,
            outgoingUpdate: setting.outgoing_update,
            eventUpdate: setting.event_update,
            orderUpdate: setting.order_update,
            cryptoPriceUpdate: setting.crypto_price_update,
          };
          setNoSetting(n);
        }
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

  useEffect(() => {
    init();
  }, []);

  const onChangeNotificationUpdate = async (str: string, status: number) => {
    try {
      const response: any = await axios.put(Http.userNotificationSetting, {
        type: str,
        status: status,
      });
      if (response.code === 10200 && response.result) {
        init();

        toast({
          position: 'top',
          title: `Update completed`,
          status: 'success',
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

  const onChangeAvatar = async (event: any) => {
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
        setProfile((prevProfile: any) => ({
          ...prevProfile,
          avatarUrl: response.data.file_url,
        }));
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

  const onSaveChanges = async () => {
    try {
      const response: any = await axios.put(Http.userSetting, {
        username: profile?.username,
        bio: profile?.bio,
        avatar_url: profile?.avatarUrl,
      });
      if (response.code === 10200 && response.result) {
        init();

        if (profile?.username) {
          setUsername(profile?.username);
        }

        if (profile?.bio) {
          setUserBio(profile?.bio);
        }

        if (profile?.avatarUrl) {
          setUserAvatarUrl(profile?.avatarUrl);
        }

        toast({
          position: 'top',
          title: `Update completed`,
          status: 'success',
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
    <Box minW={'100%'} backgroundColor={useColorModeValue('white', 'gray.800')}>
      <MetaTags title="Settings" />
      <HomeNav />
      <Container maxWidth={['100%', '100%', '100%', '80%', '70%', '50%']}>
        <Box mt={10}>
          <Tabs variant="unstyled" orientation="vertical">
            <TabList>
              <Tab _selected={{ bg: useColorModeValue('#f2f2f2', '#2c3f4f') }} borderRadius={10} width={150}>
                Profile
              </Tab>
              <Tab _selected={{ bg: useColorModeValue('#f2f2f2', '#2c3f4f') }} borderRadius={10} width={150}>
                Notifications
              </Tab>
            </TabList>
            <TabPanels ml={10}>
              <TabPanel p={0}>
                <Text fontWeight={'bold'} fontSize={20}>
                  Profile Settings
                </Text>
                <Flex alignItems={'center'} mt={5}>
                  {profile?.avatarUrl !== '' ? (
                    <>
                      <Avatar size={'lg'} src={profile?.avatarUrl} />
                    </>
                  ) : (
                    <>
                      <Avatar size={'lg'} src="./default-avatar.svg" />
                    </>
                  )}

                  <Box ml={5}>
                    <Input size="md" type="file" onChange={onChangeAvatar} />
                  </Box>
                </Flex>
                <Box mt={5}>
                  <Text fontWeight={'bold'}>Email</Text>
                  {profile?.email ? (
                    <Text>{profile?.email}</Text>
                  ) : (
                    <Text>You haven't set the email address yet</Text>
                  )}
                </Box>
                <Box mt={5}>
                  <Text fontWeight={'bold'}>Username</Text>
                  <Input
                    placeholder="Name"
                    value={profile?.username || ''}
                    onChange={(event: any) => {
                      setProfile((prevProfile: any) => ({
                        ...prevProfile,
                        username: event.target.value as string,
                      }));
                    }}
                  />
                </Box>
                <Box mt={5}>
                  <Text fontWeight={'bold'}>Bio</Text>
                  <Textarea
                    placeholder="Bio"
                    value={profile?.bio || ''}
                    onChange={(event: any) => {
                      setProfile((prevProfile: any) => ({
                        ...prevProfile,
                        bio: event.target.value as string,
                      }));
                    }}
                  />
                </Box>
                <Box mt={5}>
                  <CustomButton
                    text={'Save changes'}
                    colorScheme="messenger"
                    size="lg"
                    onClick={async () => {
                      onSaveChanges();
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel p={0}>
                <Text fontWeight={'bold'} fontSize={20}>
                  Notifications Settings
                </Text>
                <Card mt={5} p={5}>
                  <Text fontWeight={'bold'}>Email</Text>
                  <Grid rowGap={4}>
                    <Flex alignItems={'center'} justifyContent={'space-between'} mt={5}>
                      <Text>Email updates</Text>
                      <Switch
                        size="md"
                        isChecked={noSetting?.emailUpdate === 1 ? true : false}
                        onChange={() => {
                          const status = noSetting?.emailUpdate === 1 ? 2 : 1;
                          onChangeNotificationUpdate('email', status);
                        }}
                      />
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} mt={5}>
                      <Text>Daily updates</Text>
                      <Switch
                        size="md"
                        isChecked={noSetting?.dailyUpdate === 1 ? true : false}
                        onChange={() => {
                          const status = noSetting?.dailyUpdate === 1 ? 2 : 1;
                          onChangeNotificationUpdate('daily', status);
                        }}
                      />
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} mt={5}>
                      <Text>Incoming updates</Text>
                      <Switch
                        size="md"
                        isChecked={noSetting?.incomingUpdate === 1 ? true : false}
                        onChange={() => {
                          const status = noSetting?.incomingUpdate === 1 ? 2 : 1;
                          onChangeNotificationUpdate('incoming', status);
                        }}
                      />
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} mt={5}>
                      <Text>Outgoing updates</Text>
                      <Switch
                        size="md"
                        isChecked={noSetting?.outgoingUpdate === 1 ? true : false}
                        onChange={() => {
                          const status = noSetting?.outgoingUpdate === 1 ? 2 : 1;
                          onChangeNotificationUpdate('outgoing', status);
                        }}
                      />
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} mt={5}>
                      <Text>Event updates</Text>
                      <Switch
                        size="md"
                        isChecked={noSetting?.eventUpdate === 1 ? true : false}
                        onChange={() => {
                          const status = noSetting?.eventUpdate === 1 ? 2 : 1;
                          onChangeNotificationUpdate('event', status);
                        }}
                      />
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} mt={5}>
                      <Text>Order updates</Text>
                      <Switch
                        size="md"
                        isChecked={noSetting?.orderUpdate === 1 ? true : false}
                        onChange={() => {
                          const status = noSetting?.orderUpdate === 1 ? 2 : 1;
                          onChangeNotificationUpdate('order', status);
                        }}
                      />
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} mt={5}>
                      <Text>Crypto Price updates</Text>
                      <Switch
                        size="md"
                        isChecked={noSetting?.cryptoPriceUpdate === 1 ? true : false}
                        onChange={() => {
                          const status = noSetting?.cryptoPriceUpdate === 1 ? 2 : 1;
                          onChangeNotificationUpdate('crypto', status);
                        }}
                      />
                    </Flex>
                  </Grid>
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
