import { Box, Tab, TabList, TabPanels, TabPanel, Tabs, Text, Center, Flex } from '@chakra-ui/react';
import ToolCard from 'components/ToolCard';
import { toolList, ToolListInfo, ToolTitle } from 'packages/constants/toollist';
import { useEffect, useState } from 'react';

const NFTPage = () => {
  const [info, setInfo] = useState<ToolListInfo>();
  useEffect(() => {
    const tool = toolList.find((element) => element.Title === ToolTitle.Nft);
    setInfo(tool);
  }, []);

  return (
    <>
      <Text fontWeight={'bold'} fontSize={20}>
        {info?.Title.toUpperCase()} | {info?.FullTitle}
      </Text>
      <Text fontSize={14} mt={5}>
        {info?.Descriotion}
      </Text>
      <Box mt={10}>
        <Tabs variant="soft-rounded" colorScheme="green">
          <Center>
            <TabList overflowY="auto">
              {info?.SecondTools.map((secondTool, index) => (
                <Tab width={150} key={index}>
                  {secondTool?.SecondType}
                </Tab>
              ))}
            </TabList>
          </Center>

          <TabPanels>
            {info?.SecondTools.map((secondTool, index) => (
              <TabPanel key={index}>
                <Text fontWeight={'bold'} fontSize={20}>
                  {secondTool?.Title}
                </Text>
                <Text fontSize={14}>{secondTool?.Descriotion}</Text>
                <Text fontSize={14} mt={5}>
                  {secondTool?.Tools.length} tools
                </Text>
                <Flex mt={10} flexWrap={'wrap'} flex={3}>
                  {secondTool.Tools.map((tool, index) => (
                    <Box key={index}>
                      <ToolCard tool={tool} />
                    </Box>
                  ))}
                </Flex>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default NFTPage;
