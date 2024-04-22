import { UseToastOptions } from '@chakra-ui/react';
import moment from 'moment';
export * as rem from './remCalc';

export * from './getEnv';

export const showSortAddress = (address: string): string => {
  return `${address?.substring(0, 4)}...${address?.substring(
    address.length - 4,
    address.length - 1,
  )}`;
};

export const getToast = (
  description: string,
  status: UseToastOptions['status'] = 'error',
  title = 'Error',
): UseToastOptions => {
  return { title, status, position: 'top-right', description, duration: 1000 };
};
