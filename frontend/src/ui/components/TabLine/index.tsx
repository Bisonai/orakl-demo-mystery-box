'use client';
import { colors } from '@/themes';
import { Flex, FlexProps } from '@chakra-ui/react';
import React, { memo } from 'react';
import Text from '../Text';

interface IProps extends FlexProps {
  value: string | number;
  tabs: Array<{ label: string; value: string | number }>;
  onTabSelect?: (value: string | number) => void;
}

const TabLine = ({ value, tabs, onTabSelect, ...props }: IProps) => {
  return (
    <Flex borderBottom={`1px solid ${colors.darkCd4}`} {...props}>
      {tabs.map(tab => {
        const isActive = tab.value === value;
        const color = isActive ? colors.white : colors.gray5D6588;
        return (
          <Flex
            cursor="pointer"
            w="fit-content"
            p="8px 12px"
            position="relative"
            justifyContent="center"
            key={tab.value}
            mr="20px"
            onClick={() => onTabSelect && onTabSelect(tab.value)}
          >
            <Text textType="default" isBold color={color}>
              {tab.label}
            </Text>
            {isActive && (
              <Flex
                position="absolute"
                w="full"
                h="2px"
                bg={colors.liner}
                bottom={0}
              />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default memo(TabLine);
