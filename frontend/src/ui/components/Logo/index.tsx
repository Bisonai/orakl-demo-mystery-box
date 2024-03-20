import { HStack, Image } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import Text from '../Text';

export default function Logo() {
  return (
    <Link href="/">
      <HStack>
        <Image src="/box.png" w="80px" alt="" />
        <Text textType="h3">Mystery Box</Text>
      </HStack>
    </Link>
  );
}
