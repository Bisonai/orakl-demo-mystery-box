import React from 'react';
import { Flex } from '@chakra-ui/react';
import AppWrapper from '../components/AppWrapper';
import Logo from '../components/Logo';
import Button from '../components/components/Button';
import { colors } from '@/themes';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <AppWrapper alignItems="center" justifyContent="center" flexDirection="row">
      <Flex
        w="full"
        h="83px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Logo />
        <ConnectButton />
      </Flex>
    </AppWrapper>
  );
}
