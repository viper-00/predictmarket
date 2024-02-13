import { LinkIcon } from '@chakra-ui/icons';
import { Heading, Avatar, Box, Center, Flex, Text, Stack, Button, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { MainToolList } from 'packages/constants/toollist';
import { FC } from 'react';

type Props = {
  tool: MainToolList;
};

const ToolCard: FC<Props> = (props) => {
  const tool = props.tool;

  const socialColorModeValue = useColorModeValue('gray.900', 'green.400');
  const networkColorModeValue = useColorModeValue('#151f21', 'gray.800');

  return (
    <Box
      width={500}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
      p={6}
      mx={3}
      my={5}
    >
      <Flex>
        <Box borderRadius={10} overflow={'hidden'}>
          <Image src={tool?.Icon} alt="image" width={70} height={70} />
        </Box>
        <Flex flexDirection={'column'} ml={5}>
          <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'} mb={2}>
            {tool?.Title}
          </Heading>
          <Link href={tool?.Website}>
            <Flex alignItems={'center'} color={useColorModeValue('gray.900', 'green.400')}>
              <LinkIcon boxSize={3} />
              <Text fontSize={'12'} ml={1} fontWeight={'bold'}>
                Website
              </Text>
            </Flex>
          </Link>
        </Flex>
      </Flex>

      <Box>
        <Stack spacing={0} mt={5}>
          <Text color={useColorModeValue('', 'gray.100')}>{tool?.Descriotion}</Text>
        </Stack>

        <Stack>
          <Text my={3} color={'gray.500'} fontWeight="bold">
            Social
          </Text>
          <Flex>
            {tool?.Socials?.map((element, index) => (
              <Link href={element.Link} key={index}>
                <Flex alignItems={'center'} mr={5} color={socialColorModeValue}>
                  <LinkIcon boxSize={3} />
                  <Text ml={1} fontSize={12}>
                    {element.Title}
                  </Text>
                </Flex>
              </Link>
            ))}
          </Flex>
          <Text my={3} color={'gray.500'} fontWeight="bold">
            Network
          </Text>
          <Flex flexWrap={'wrap'}>
            {tool.Networks.map((item, index) => (
              <Flex
                width={100}
                height={6}
                borderRadius={5}
                bg={networkColorModeValue}
                alignItems={'center'}
                justifyContent={'center'}
                mr={2}
                mb={2}
                key={index}
              >
                <Text color={'white'} fontSize={12}>
                  {item}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Stack>

        <Button
          w={'full'}
          mt={8}
          bg={useColorModeValue('#151f21', 'gray.800')}
          color={'white'}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          onClick={() => {
            window.location.href = tool.Website;
          }}
        >
          View
        </Button>
      </Box>
    </Box>
  );
};

export default ToolCard;
