import { ethers } from 'ethers';

export const checkAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};
