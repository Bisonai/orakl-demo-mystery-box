import { colors } from '@/themes';
import { Button as ButtonChakra, ButtonProps } from '@chakra-ui/react';
import React from 'react';

const bgColors = {
  noBorder: 'transparent',
  outline: 'transparent',
  blueLight: '#0A89FF',
  blueDark: 'rgba(10, 137, 255, 0.20)',
  dark: '#22242C',
  red: 'rgba(236, 33, 82, 0.40)',
  green: 'rgba(17, 202, 146, 0.40)',
};

const hovers = {
  noBorder: 'transparent',
  outline: '#34384C',
  blueLight: 'linear-gradient(315deg, #0A7CFF 0%, #90E0EE 100%)',
  blueDark: '#34384C',
  dark: '#34384C',
  green: '#11CA92',
  red: '#EC2152',
};

interface IProps extends ButtonProps {
  variant:
    | 'noBorder'
    | 'outline'
    | 'blueLight'
    | 'blueDark'
    | 'dark'
    | 'green'
    | 'red';
}

export default function Button({ variant, children, ...props }: IProps) {
  return (
    <ButtonChakra
      borderRadius="12px"
      bgColor={bgColors[variant]}
      _hover={{
        bgColor: hovers[variant],
      }}
      color="white"
      p="8px 16px"
      gap="8px"
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      iconSpacing="unset"
      fontSize={{ lg: '14px', '2xl': '16px' }}
      _disabled={{
        bgColor: colors.darkCd3,
        color: colors.darkCd4,
      }}
      {...props}
    >
      {children}
    </ButtonChakra>
  );
}
