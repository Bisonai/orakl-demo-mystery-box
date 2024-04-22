import { BaseInterface } from './interfaces';
import { ethers } from 'ethers';
import ABI from './abis/NFT.json';
import { getRPC, isProduction } from '../utils';

export interface INFT {
  name: string;
  description: string;
  image: string;
  properties: any;
  balanceOf: number;
  id?: number;
}

export const ADDRESS = () =>
  isProduction() ? '' : '0x467d1771552f62da92242A2d183004785E7dfc48';

export default class NFTContract extends BaseInterface {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, ADDRESS(), ABI, signer);
  }

  getNfts = async (address: string) => {
    const ids = Array.from({ length: 10 }, (_, index) => index);
    const rs = await Promise.all(
      ids.map(async id => {
        const balanceOf = await this._contract.balanceOf(address, id);
        return { id, balanceOf: this._toNumber(balanceOf) };
      }),
    );
    const nftsOwner = rs.filter(p => p.balanceOf > 0);
    const nfts = await Promise.all(
      nftsOwner.map(async nft => {
        const uri = await this._contract.uri(nft.id);
        const uriMetadata = uri + nft.id + '.json';
        const rp = await fetch(uriMetadata);
        const nftResponse = (await rp.json()) as INFT;
        return { ...nftResponse, id: nft.id, balanceOf: nft.balanceOf };
      }),
    );

    return nfts;
  };
}
