import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, ProgressBarProps } from './ProgressBar';

const meta: Meta<ProgressBarProps> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100 } },
    max: { control: { type: 'number', min: 1, max: 500 } },
    showLabel: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<ProgressBarProps>;

export const Default: Story = {
  args: { value: 50 },
};

export const WithLabel: Story = {
  args: { value: 75, showLabel: true },
};
