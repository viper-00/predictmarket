import axios from 'axios';
import { ethers } from 'ethers';
import { tokenList } from 'packages/constants/tokenList';
import { ERC20ABI } from 'packages/contracts/abi/ERC20';
import { AssetBalance, Chain, FeeData, TransactionDetail, TransactionTokenTransfer, TxStatus } from 'packages/types';
import { GetRandomRPCUrl } from 'packages/utils';

export class ETH {
  static chain = Chain.ETH;

  static web3Instance: any;

  static {
    ETH.web3Instance = new ethers.JsonRpcProvider(GetRandomRPCUrl(this.chain));
  }

  static checkAddress(address: string): boolean {
    return ethers.isAddress(address);
  }

  static async getAssetBalance(address: string): Promise<AssetBalance> {
    try {
      let items: AssetBalance = {};

      items.ETH = await this.getBalance(address);

      const tokens = tokenList.filter((item) => item.chain === Chain.ETH && item.isToken);

      const promises = tokens.map(async (token) => {
        const balance = await this.getTokenBalance(address, token.contractAddress as string);
        items[token.symbol] = balance;
      });

      await Promise.all(promises);

      return items;
    } catch (e) {
      console.error(`${Chain[this.chain]} getAssetBalance error: ${e} | address: ${address}`);
      throw e;
    }
  }

  static async getBalance(address: string, isWei?: boolean): Promise<string> {
    const balance = await ETH.web3Instance.getBalance(address);
    return isWei ? balance : ethers.formatEther(balance);
  }

  static async getTokenDecimals(contractAddress: string): Promise<number> {
    const contract = new ethers.Contract(contractAddress, ERC20ABI, ETH.web3Instance);
    const decimals = await contract.decimals();
    return decimals;
  }

  static async getTokenBalance(address: string, contractAddress: string): Promise<string> {
    const contract = new ethers.Contract(contractAddress, ERC20ABI, ETH.web3Instance);
    const balance = await contract.balanceOf(address);
    const decimals = await this.getTokenDecimals(contractAddress);
    return ethers.formatUnits(balance, decimals);
  }

  static async getTransactionStatus(hash: string): Promise<string> {
    try {
      const receipt = await ETH.web3Instance.waitForTransaction(hash);
      return TxStatus[receipt.status];
    } catch (e) {
      console.error(`${Chain[this.chain]} getTransactionStatus error: ${e} | hash: ${hash}`);
      throw e;
    }
  }

  static async getBlockTimestamp(blockHash: string): Promise<number> {
    try {
      const block = await ETH.web3Instance.getBlock(blockHash);
      if (block && block.timestamp) {
        const timestamp = new Date(block.timestamp * 1000);
        return timestamp.getTime();
      }
    } catch (e) {
      console.error(`${Chain[this.chain]} getBlockTimestamp error: ${e} | blockHash: ${blockHash}`);
      throw e;
    }

    return 0;
  }

  static async getBlockGasUsed(hash: string): Promise<number> {
    try {
      const receipt = await ETH.web3Instance.waitForTransaction(hash);
      return receipt.gasUsed;
    } catch (e) {
      console.error(`${Chain[this.chain]} getBlockGasUsed error: ${e} | hash: ${hash}`);
      throw e;
    }
  }

  static async decodeTokenTransfer(hash: string): Promise<TransactionTokenTransfer> {
    let transaction: any;
    try {
      transaction = await ETH.web3Instance.getTransaction(hash);
    } catch (e) {
      console.error(`${Chain[this.chain]} decodeTokenTransfer error: ${e} | hash: ${hash}`);
      throw e;
    }

    const tokenInfo = tokenList.find((item) => item.chain === this.chain && item.contractAddress === transaction.to);

    if (!tokenInfo) {
      // throw new Error('TokenInfo not found.');
      // contract is not support right now.
      return {
        hash: transaction.hash,
        from: transaction.from,
        to: transaction.to,
        asset: '',
        value: transaction.value,
      };
    }

    let to: string = transaction.to;
    let value: string = transaction.value;
    if (transaction.data !== '') {
      const inter = new ethers.Interface(ERC20ABI);
      const result = inter.decodeFunctionData('transfer', transaction.data);
      to = result[0];
      value = ethers.formatUnits(result[1].toString(), tokenInfo?.decimals);
    }

    return {
      hash: transaction.hash,
      from: transaction.from,
      to: to,
      asset: tokenInfo?.symbol,
      value: value,
    };
  }

  static async getTransactionDetail(hash: string): Promise<TransactionDetail> {
    try {
      const transaction = await ETH.web3Instance.getTransaction(hash);
      if (transaction) {
        const gasUsed = await this.getBlockGasUsed(hash);
        const gasPrice = transaction.gasPrice;
        const fee = ethers.formatEther(BigInt(gasUsed) * BigInt(gasPrice));
        const isContract = transaction.data !== '' ? true : false;

        let to: string = transaction.to;
        let value: string = ethers.formatEther(transaction.value);
        if (isContract) {
          const transferResult = await this.decodeTokenTransfer(hash);
          if (!transferResult) {
            throw new Error('Transaction data not found.');
          }

          to = transferResult.to;
          value = transferResult.value;
        }

        const transactionDetail: TransactionDetail = {
          blockHash: transaction.blockHash,
          blockNumber: transaction.blockNumber,
          hash: transaction.hash,
          chainId: transaction.chainId,
          from: transaction.from,
          to: to,
          value: value,
          gasPrice: gasPrice,
          gasLimit: transaction.gasLimit,
          blockTimestamp: await this.getBlockTimestamp(transaction.blockHash),
          status: await this.getTransactionStatus(hash),
          maxFeePerGas: transaction.maxFeePerGas,
          maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
          nonce: transaction.nonce,
          type: transaction.type,
          gasUsed: gasUsed,
          isContract: isContract,
          url: 'https://etherscan.io/tx/' + hash,
          fee: fee,
        };

        return transactionDetail;
      } else {
        throw new Error('Transaction not found.');
      }
    } catch (error) {
      throw new Error('Failed to retrieve transaction details.' + error);
    }
  }

  static async getFeeData(): Promise<FeeData> {
    try {
      const feeData = await ETH.web3Instance.getFeeData();
      return {
        gasPrice: feeData.gasPrice.toString(),
        maxFeePerGas: feeData.maxFeePerGas.toString(),
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas.toString(),
      };
    } catch (e) {
      console.error(`${Chain[this.chain]} getFeeData error: ${e}`);
      throw e;
    }
  }

  static async getGasLimit(contractAddress: string): Promise<number> {
    if (contractAddress !== '') {
      return 96000;
    }

    return 21000;
  }

  // ------

  static async createTransaction(): Promise<any> {}

  static async getFee(): Promise<any> {}

  static async sendTransaction(): Promise<any> {}

  static async getAssetTransactions(address: string): Promise<TransactionDetail[]> {
    try {
      const apiKey = 'YAlZobalfJSKjWMz3UvAFd9iRfvIuB6I';
      const url = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
      const body = {
        id: 1,
        jsonrpc: '2.0',
        method: 'alchemy_getAssetTransfers',
        params: [
          {
            fromBlock: '0x0',
            toBlock: 'latest',
            withMetadata: false,
            excludeZeroValue: true,
            maxCount: '0x3e8',
            fromAddress: address,
            category: ['external', 'internal', 'erc20'],
            order: 'desc',
          },
        ],
      };
      const response = await axios.post(url, body, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
      });

      let txs: TransactionDetail[] = [];

      if (response.data && response.data.result.transfers && response.data.result.transfers.length > 0) {
        response.data.result.transfers.forEach(async (item: any) => {
          // const tx = await this.getTransactionDetail(item.hash);
          const tx: TransactionDetail = {
            hash: item.hash,
            from: item.from,
            to: item.to,
            value: item.value,
            blockNumber: parseInt(item.blockNum),
            chainId: this.chain,
            url: 'https://etherscan.io/tx/' + item.hash,
          };
          txs.push(tx);
        });
      }
      return txs;
    } catch (e) {
      throw e;
    }
  }
}
