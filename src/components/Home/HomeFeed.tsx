import { Box, Card, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { Http } from 'packages/core/http/http';
import axios from 'packages/core/http/axios';
import { useEffect, useState } from 'react';
import FeedCard from './Feed/FeedCard';
import { HomeEventType } from 'packages/types';

const HomeFeed = () => {
  const [eventType, setEventType] = useState<string[]>([]);
  const [event, setEvent] = useState<HomeEventType[]>([]);

  const toast = useToast();

  async function getEvent(eventType: string) {
    try {
      const response: any = await axios.get(Http.homeEvent, {
        params: {
          type: eventType,
        },
      });
      if (response.code === 10200 && response.result) {
        const results = response.data;
        var e: HomeEventType[] = [];
        for (const element of results) {
          let t: HomeEventType = {
            eventLogo: element.event_logo,
            expireTime: element.expire_time,
            title: element.title,
            uniqueCode: element.unique_code,
            type: element.type,
            settlementTime: element.settlement_time,
            totalOrderAmount: element.total_order_amount,
            commentCount: element.comment_count,
          };
          e.push(t);
        }
        setEvent(e);
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

  async function getEventType() {
    try {
      const response: any = await axios.get(Http.homeEventType);
      if (response.code === 10200 && response.result) {
        setEventType(response.data);
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
    async function init() {
      await getEventType();
      // await getEvent(eventType[0]);
    }

    init();
  }, []);
  return (
    <Tabs variant="soft-rounded" colorScheme="green">
      <TabList gap={6} style={{ display: '-webkit-box', overflow: 'scroll hidden', scrollbarWidth: 'none' }}>
        {eventType && eventType.map((item, index) => <Tab key={index}>{item}</Tab>)}
      </TabList>
      <TabPanels mt={5}>
        <TabPanel>
          <Card>
            {event &&
              event.map((item, index) => (
                <FeedCard
                  key={index}
                  eventLogo={item.eventLogo}
                  expireTime={item.expireTime}
                  title={item.title}
                  uniqueCode={item.uniqueCode}
                  type={item.type}
                  settlementTime={item.settlementTime}
                  totalOrderAmount={item.totalOrderAmount}
                  commentCount={item.commentCount}
                />
              ))}
          </Card>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default HomeFeed;
