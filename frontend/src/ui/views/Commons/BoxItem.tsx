'use client';
import useMysteryContract from '@/lib/hooks/useMysteryNFTContract';
import { Card, Text } from '@/ui/components';
import Button from '@/ui/components/Button';
import { FlexProps, Image, Spacer, useDisclosure } from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import React from 'react';
import { useAccount } from 'wagmi';

interface IProps extends FlexProps {
  btnLabel?: string;
  disableName?: boolean;
  isOpenBox?: boolean;
}
export default function BoxItem({
  btnLabel = 'Claim',
  isOpenBox = false,
  disableName = false,
  ...props
}: IProps) {
  const { isConnected } = useAccount();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { openConnectModal } = useConnectModal();
  const { claimBoxMutation, openBoxMutation, getListBoxQuery } =
    useMysteryContract();

  const onHandleClaim = async () => {
    if (!isConnected) {
      openConnectModal && openConnectModal();
    } else {
      onOpen();

      try {
        if (!isOpenBox) {
          await claimBoxMutation();
        } else {
          const balanceOf = await getListBoxQuery();
          if (balanceOf) {
            await openBoxMutation();
          }
        }
      } catch (ex) {}
      onClose();
    }
  };

  return (
    <Card alignItems="center">
      <Image src="/box.png" />
      {!disableName && <Text textType="h4">Mystery Box</Text>}
      <Spacer />
      <Button
        variant="blueLight"
        w="full"
        isLoading={isOpen}
        onClick={onHandleClaim}
      >
        {btnLabel}
      </Button>
    </Card>
  );
}
