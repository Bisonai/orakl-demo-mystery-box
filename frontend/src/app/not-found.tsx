import AppWrapper from '@/ui/components/AppWrapper';
import { Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <AppWrapper
      justifyContent="center"
      alignItems="center"
      flex={1}
      minH="80vh"
      gap="30px"
    >
      <Text fontSize="50px">Not Found</Text>
      <Text>Could not find requested resource</Text>
      <Link href="/">
        <Button>
          <Text>Return Home</Text>
        </Button>
      </Link>
    </AppWrapper>
  );
}
