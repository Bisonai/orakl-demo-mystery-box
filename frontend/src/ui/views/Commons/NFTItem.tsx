import { INFT } from '@/lib/contracts/NFTContract';
import { colors } from '@/themes';
import { Card, Text } from '@/ui/components';
import { Flex, HStack, Spacer } from '@chakra-ui/react';
import React from 'react';

interface IProps {
  nft: INFT;
}
export default function NFTItem({ nft }: IProps) {
  return (
    <Card>
      <Flex
        bgImage={nft.image}
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition="center"
        h="200px"
        w="full"
        border={`1px solid ${colors.darkCd4}`}
        borderRadius="6px"
      />
      <Spacer />
      <Text textType="h4">{nft.name}</Text>
      <HStack>
        <Text textType="default" color={colors.gray}>
          amount:
        </Text>
        <Spacer />
        <Text textType="default" isBold>
          {nft.balanceOf}
        </Text>
      </HStack>
    </Card>
  );
}
