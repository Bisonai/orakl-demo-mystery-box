import React, { useEffect } from 'react';
import { getEthersSigner } from './useEtherSigner';
import useToastCustom from './useToastCustom';
import MysteryContract from '../contracts/MysteryContract';
import { useAccount } from 'wagmi';
import { useAppDispatch } from '../reduxs/hooks';
import {
  setBoxBalanceOfAction,
  setNftsAction,
} from '../reduxs/accounts/account.slices';
import NFTContract from '../contracts/NFTContract';

export default function useMysteryNFTContract() {
  const dispatch = useAppDispatch();
  const { address } = useAccount();
  const { onErrorToast, onSuccessToast } = useToastCustom();
  const claimBoxMutation = async () => {
    const signer = await getEthersSigner();
    if (!signer) {
      onErrorToast('Please connect your wallet');
      return;
    }

    const contract = new MysteryContract(signer);
    const rp = await contract.safeMint();
    await getListBoxQuery();
    return rp;
  };

  const openBoxMutation = async () => {
    const signer = await getEthersSigner();
    if (!signer || !address) {
      onErrorToast('Please connect your wallet');
      return;
    }
    try {
      const contract = new MysteryContract(signer);
      const tokenId = await contract.tokenOfOwnerByIndex(0, address);
      const rp = await contract.openBox(tokenId);
      await getListBoxQuery();
      await fetchNfts();
      onSuccessToast('Open Box success');
      return rp;
    } catch (ex) {
      onErrorToast();
    }
  };

  const getListBoxQuery = async () => {
    if (!address) return;
    const contract = new MysteryContract();
    const balanceOf = await contract.balanceOf(address);
    dispatch(setBoxBalanceOfAction(balanceOf));
    return balanceOf;
  };

  const fetchNfts = async () => {
    if (!address) return;
    const contract = new NFTContract();
    const nfts = await contract.getNfts(address);
    dispatch(setNftsAction(nfts));
  };

  useEffect(() => {
    getListBoxQuery();
    fetchNfts();
  }, [address]);

  return {
    claimBoxMutation,
    openBoxMutation,
    getListBoxQuery,
  };
}
