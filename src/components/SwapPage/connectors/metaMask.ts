import { initializeConnector } from '@web3-react/core';
import { MetaMask, MetaMaskConstructorArgs } from '@web3-react/metamask';
import { Connector } from '@web3-react/types';
import { toWeb3Connector } from './utils';

export function isMetaMask(connector: Connector) {
  return connector instanceof MetaMask;
}

const connector = initializeConnector<MetaMask>((actions: any) => new MetaMask(actions as MetaMaskConstructorArgs));
export default toWeb3Connector(connector);
