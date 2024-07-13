import { UseToastOptions } from '@chakra-ui/react';

export * from './getEnv';

export const getToast = (
  description: string,
  status: UseToastOptions['status'] = 'error',
  title = 'Error',
): UseToastOptions => {
  return { title, status, position: 'top-right', description, duration: 1000 };
};
