import {
  Box,
  Tab,
  TabIndicator,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { hydrateWallet } from 'lib/store/wallet';
import Link from 'next/link';
import { Web3 } from 'packages/core';
import { Chain, TransactionDetail } from 'packages/types';
import { useEffect, useState } from 'react';
import { formatEllipsisTxt } from 'utils/format';

const TransactionsPage = () => {
  const [txs, setTxs] = useState<TransactionDetail[]>([]);

  useEffect(() => {
    async function init() {
      const wallet = hydrateWallet();
      const txs = await Web3.getTransactionList(Chain.ETH, wallet.address);
      setTxs(txs);
    }

    init();
  }, []);
  return (
    <>
      <Text fontWeight={'bold'} fontSize={20}>
        Transaction History
      </Text>
      <Box mt={10}>
        <Tabs position="relative" variant="unstyled" isFitted>
          <TabList>
            <Tab>All</Tab>
            <Tab>Success</Tab>
            <Tab>Error</Tab>
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
          <TabPanels>
            <TabPanel>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Block Number</Th>
                      <Th>Hash</Th>
                      <Th>From</Th>
                      <Th>To</Th>
                      <Th>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {txs &&
                      txs.map((item, index) => (
                        <Tr key={index}>
                          <Td isNumeric>{item.blockNumber}</Td>
                          <Td>
                            <Link href={item.url || '#'}>{formatEllipsisTxt(item.hash)}</Link>
                          </Td>
                          <Td>{item.from}</Td>
                          <Td>{item.to}</Td>
                          <Td isNumeric>{item.value}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>

                {txs.length === 0 && (
                  <Text fontWeight={'bold'} fontSize={20} textAlign={'center'} p={10}>
                    No transaction found
                  </Text>
                )}
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Block Number</Th>
                      <Th>Hash</Th>
                      <Th>From</Th>
                      <Th>To</Th>
                      <Th>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {txs &&
                      txs.map((item, index) => (
                        <Tr key={index}>
                          <Td isNumeric>{item.blockNumber}</Td>
                          <Td>
                            <Link href={item.url || '#'}>{formatEllipsisTxt(item.hash)}</Link>
                          </Td>
                          <Td>{item.from}</Td>
                          <Td>{item.to}</Td>
                          <Td isNumeric>{item.value}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>

                {txs.length === 0 && (
                  <Text fontWeight={'bold'} fontSize={20} textAlign={'center'} p={10}>
                    No transaction found
                  </Text>
                )}
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer>
                <Text fontWeight={'bold'} fontSize={20} textAlign={'center'} p={10}>
                  No transaction found
                </Text>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default TransactionsPage;
