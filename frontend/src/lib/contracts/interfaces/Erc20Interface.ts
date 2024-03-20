import { ethers } from 'ethers';
import BaseInterface from './BaseInterface';
import { TransactionResponse } from '@ethersproject/abstract-provider';

class Erc20 extends BaseInterface {
  constructor(
    provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
    address: string,
    abi: ethers.ContractInterface,
    signer?: ethers.providers.JsonRpcSigner,
  ) {
    super(provider, address, abi, signer);
  }

  async decimals() {
    const decimal = await this._contract.decimals();
    return decimal;
  }

  async balanceOf(walletAddress: string): Promise<number> {
    const balance = await this._contract.balanceOf(walletAddress);
    const decimal = await this.decimals();
    return this._toNumberBalance(balance, decimal);
  }

  async owner(): Promise<string> {
    return this._contract.owner();
  }

  async totalSupply(): Promise<number> {
    const total = await this._contract.totalSupply();
    const decimal = await this.decimals();
    return this._toNumber(total) / Math.pow(10, decimal);
  }

  async name(): Promise<string> {
    return this._contract.name();
  }

  async symbol(): Promise<string> {
    return this._contract.symbol();
  }

  async approve(address: string, amount: number) {
    const decimal = await this.decimals();
    const wei = ethers.utils.parseUnits(amount.toString(), decimal);
    await this._contract.approve(address, wei, this._option);
  }

  async transfer(
    toAddress: string,
    balance: number,
  ): Promise<string | ethers.utils.Result> {
    const decimal = await this.decimals();
    const tx: TransactionResponse = await this._contract.transfer(
      toAddress,
      balance * Math.pow(10, decimal),
      this._option,
    );
    return this._handleTransactionResponse(tx);
  }
}

export default Erc20;
