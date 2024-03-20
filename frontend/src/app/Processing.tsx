'use client';
import { Flex, HStack, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

export default function Processing() {
  const isProcessing = false;
  if (!isProcessing) return <></>;
  return (
    <Flex
      flex={1}
      position="absolute"
      bgColor="rgba(0,0,0,0.8)"
      w="full"
      h="100vh"
      top={0}
      zIndex={1000}
    >
      <HStack
        position="absolute"
        w="fit-content"
        top="250px"
        left={0}
        right={0}
        mx="auto"
      >
        <Spinner color="white" size="xl" />
        <Text color="rgba(255,255,255,0.5)" ml="20px">
          Processing
        </Text>
      </HStack>
    </Flex>
  );
}
