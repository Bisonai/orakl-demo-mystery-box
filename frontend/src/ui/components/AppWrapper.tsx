import { MAX_CONTENT_WIDTH } from '@/themes';
import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';
interface IProps extends FlexProps {
  wrapStyle?: FlexProps;
}

export default function AppWrapper({ wrapStyle, children, ...props }: IProps) {
  return (
    <Flex
      w="full"
      justifyContent="flex-start"
      flexDirection="column"
      alignItems="center"
      {...wrapStyle}
    >
      <Flex
        w={`${MAX_CONTENT_WIDTH}px`}
        maxW={`${MAX_CONTENT_WIDTH}px`}
        flexDirection="column"
        {...props}
      >
        {children}
      </Flex>
    </Flex>
  );
}
