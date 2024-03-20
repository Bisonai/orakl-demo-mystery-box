import React from 'react';
import Button from '../components/components/Button';
import { colors } from '@/themes';
import Image from 'next/image';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { showSortAddress } from '@/lib/utls';

export default function ConnectWallet() {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();

  const onConnect = () => {
    if (Boolean(address)) {
      return;
    }
    return openConnectModal && openConnectModal();
  };

  const btnLabel = Boolean(address)
    ? showSortAddress(address as string)
    : 'Connect wallet';
  return (
    <Button
      border={`1px solid ${colors.darkCd4}`}
      variant="dark"
      leftIcon={
        <Image src="/default-wallet.png" width={24} height={24} alt="address" />
      }
      onClick={onConnect}
    >
      {btnLabel}
    </Button>
  );
}
