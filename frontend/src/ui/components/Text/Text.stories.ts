import type { Meta, StoryObj } from '@storybook/react';
import Text from '.';
import { colors } from '@/themes';

const meta: Meta<typeof Text> = {
  title: 'DAPP/Text',
  component: Text,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Text>;

export const H1: Story = {
  args: {
    textType: 'h1',
    children: '40 px - bold',
    color: colors.primary0B3765,
  },
};

export const H2: Story = {
  args: {
    textType: 'h2',
    children: '32px - bold',
    color: colors.primary0B3765,
  },
};

export const H3: Story = {
  args: {
    textType: 'h3',
    children: '24px - bold',
    color: colors.primary0B3765,
  },
};

export const H4: Story = {
  args: {
    textType: 'h4',
    children: '20 px - bold',
    color: colors.primary0B3765,
  },
};

export const BoldDefault: Story = {
  args: {
    textType: 'default',
    isBold: true,
    children: 'Text bold default',
    color: colors.primary0B3765,
  },
};
