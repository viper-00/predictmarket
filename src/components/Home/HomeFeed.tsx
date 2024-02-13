import { Box, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import FeedCard from './Feed/FeedCard';

const HomeFeed = () => {
  return (
    <Tabs variant="soft-rounded" colorScheme="green">
      <TabList gap={6} style={{ display: '-webkit-box', overflow: 'scroll hidden', scrollbarWidth: 'none' }}>
        <Tab>Top</Tab>
        <Tab>For You</Tab>
        <Tab>New</Tab>
        <Tab>Oscars</Tab>
        <Tab>Super Bowl</Tab>
        <Tab>AAA</Tab>
        <Tab>Super Bowl</Tab>
        <Tab>Super Bowl</Tab>
        <Tab>Super Bowl</Tab>
        <Tab>Super Bowl</Tab>
        <Tab>Super Bowl</Tab>
        <Tab>Super Bowl</Tab>
        <Tab>Super Bowl</Tab>
        <Tab>Super Bowl</Tab>
      </TabList>
      <TabPanels mt={5}>
        <TabPanel>
          <Box>
            <FeedCard />
          </Box>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default HomeFeed;
