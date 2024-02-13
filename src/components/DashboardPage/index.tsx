import {
  Heading,
  Container,
  Text,
  Stack,
  Input,
  InputLeftElement,
  InputGroup,
  Button,
  Image,
  Box,
  InputRightElement,
  useColorModeValue,
  Flex,
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import MetaTags from 'components/Common/MetaTags';

const DashboardPage = () => {
  return (
    <>
      <Box>
        <Text fontSize="2xl">Today&apos;s Cryptocurrency Prices</Text>

        <TableContainer>
          <Table variant="simple">
            <TableCaption>Power by the free service: coinmarketcap, coingecko.</TableCaption>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Name</Th>
                <Th isNumeric>Price</Th>
                <Th>1h %</Th>
                <Th>24h %</Th>
                <Th>7d %</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>1</Td>
                <Td>Bitcoin BTC</Td>
                <Td isNumeric>$39,150.67</Td>
                <Td>1.28%</Td>
                <Td>3.12%</Td>
                <Td>8.59%</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>#</Th>
                <Th>Name</Th>
                <Th isNumeric>Price</Th>
                <Th>1h %</Th>
                <Th>24h %</Th>
                <Th>7d %</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default DashboardPage;
