import { useToast } from '@chakra-ui/react';
import React from 'react';
import { getToast } from '../utils';

export default function useToastCustom() {
  const toast = useToast();

  const onErrorToast = (des = 'Something wen wrong!', title?: string) =>
    toast(getToast(des, 'error', title));
  const onSuccessToast = (des: string, title?: string) =>
    toast(getToast(des, 'success', title || 'Success'));
  const onWarningToast = (des: string, title?: string) =>
    toast(getToast(des, 'warning', title || 'Warning'));

  return {
    onErrorToast,
    onSuccessToast,
    onWarningToast,
  };
}
