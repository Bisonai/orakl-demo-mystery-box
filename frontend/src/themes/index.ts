import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
import { Inter } from 'next/font/google';

export const MAX_CONTENT_WIDTH = 960;

export const TRANSITION = 'all 0.2s ease 0.1s';

export const inter = Inter({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export const colors = {
  liner: 'linear-gradient(315deg, #0A7CFF 0%, #90E0EE 100%)',
  linerGreenToRed:
    'linear-gradient(90deg, #26EAAC 0%, #FFCD1D 48.32%, #FD4560 100%)',

  primaryCp1: '#0A89FF',
  primary49A1FD: '#49A1FD',
  primary77B9FD: '#77B9FD',
  primary115397: '#115397',
  primary0B3765: '#0B3765',

  secondaryEC2152: '#EC2152',
  secondary11CA92: '#11CA92',

  white: '#fff',
  gray: '#A5ADCF',
  gray5D6588: '#5D6588',

  darkCd2: '#1E1F25',
  darkCd1: '#141518',
  darkCd3: '#22242C',
  darkCd4: '#34384C',
};

const Text: ComponentStyleConfig = {
  variants: {
    'with-400': {
      fontSize: '14px',
      fontWeight: '400',
      color: colors.liner,
    },
  },
};

export const TextVariants = {
  WITH_400: 'with-400',
};

const components = {
  Text,
};

const theme = extendTheme({
  fonts: {
    body: inter.style.fontFamily,
  },
  components,
});

export default theme;
