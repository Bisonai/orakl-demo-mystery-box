import { Erc721 } from './interfaces';
import { ethers } from 'ethers';
import ABI from './abis/MysteryBox.json';
import { RPC_URL, MYSTERY_BOX_ADDRESS } from '../utils';
import { TransactionResponse } from '@ethersproject/abstract-provider';

export default class MysteryContract extends Erc721 {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);
    super(rpcProvider, MYSTERY_BOX_ADDRESS, ABI, signer);
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
