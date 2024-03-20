import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'DAPP/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    bgColor: {
      control: 'color',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Success: Story = {
  args: {
    bgColor: 'green',
    size: 'medium',
    children: 'Success',
  },
};

export const Danger: Story = {
  args: {
    bgColor: 'red',
    size: 'medium',
    children: 'Danger',
  },
};
