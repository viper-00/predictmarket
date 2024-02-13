import type { Web3Provider } from '@ethersproject/providers'
import { getPriorityConnector } from '@web3-react/core'
import { Connector } from '@web3-react/types'

import metaMask, { isMetaMask } from './metaMask'

export type { Web3Connector } from './utils'

export function getConnectorName(connector: Connector): string {
  if (isMetaMask(connector)) {
    return 'MetaMask'
  } else {
    throw new Error('Unknown Connector')
  }
}

export const connectors = [metaMask]

export function useActiveProvider(): Web3Provider | undefined {
  return getPriorityConnector(...connectors).usePriorityProvider() as Web3Provider
}
