import React, { memo } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import { colors } from '@/themes';

const bgColors = {
  dark: colors.darkCd1,
  light: colors.darkCd2,
};

interface IProps extends FlexProps {
  isBorder?: boolean;
  type?: 'dark' | 'light';
}
const Card = ({ type = 'dark', isBorder, children, ...props }: IProps) => {
  return (
    <Flex
      flexDir="column"
      bgColor={bgColors[type]}
      p="24px"
      gap="24px"
      borderRadius="12px"
      flex-shrink={0}
      border={`${isBorder ? 1 : 0}px solid ${colors.darkCd4}`}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default memo(Card);
