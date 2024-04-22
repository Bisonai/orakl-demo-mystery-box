import { Erc721 } from './interfaces';
import { ethers } from 'ethers';
import ABI from './abis/MysteryBox.json';
import { getRPC, isProduction } from '../utils';
import { TransactionResponse } from '@ethersproject/abstract-provider';

export const ADDRESS = () =>
  isProduction() ? '' : '0x9ff696Bd74Bb009404cC897bC0B7ffb2d6957f3B';

export default class MysteryContract extends Erc721 {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, ADDRESS(), ABI, signer);
  }

  async safeMint() {
    const rp: TransactionResponse = await this._contract.safeMint(this._option);
    return this._handleTransactionResponse(rp);
  }

  async tokenOfOwnerByIndex(index: number, walletAddress: string) {
    const rp = await this._contract.tokenOfOwnerByIndex(walletAddress, index);
    return this._toNumber(rp);
  }

  async openBox(tokenId: number) {
    const rp: TransactionResponse = await this._contract.openBox(
      tokenId,
      this._option,
    );
    return this._handleTransactionResponse(rp);
  }
}
