import React, { memo, useMemo } from 'react';
import { Text as ChakraText, TextProps } from '@chakra-ui/react';

import { TextType, TextSize } from './Text.type';
import { colors, inter } from '@/themes';

interface IProps extends TextProps {
  textType?: TextType;
  isBold?: boolean;
}

const Text = ({
  textType = 'x-small',
  isBold = false,
  children,
  ...props
}: IProps) => {
  const size = useMemo(() => {
    return TextSize[textType];
  }, [textType]);

  const fontWeight = useMemo(() => {
    return isBold || textType.indexOf('h') > -1 ? '700' : '400';
  }, [isBold, textType]);

  return (
    <ChakraText
      fontWeight={fontWeight}
      fontSize={size}
      fontFamily={inter.style.fontFamily}
      color={colors.white}
      {...props}
    >
      {children}
    </ChakraText>
  );
};

export default memo(Text);
