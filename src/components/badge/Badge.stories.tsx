// src/components/badge/Badge.stories.tsx
import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { Badge, BadgeVariant, BadgeSize } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      options: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'error',
        'info',
        'outline',
        'subtle',
      ] as BadgeVariant[],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'] as BadgeSize[],
      control: { type: 'select' },
    },
  },
  args: {
    children: 'Badge',
    variant: 'primary',
    size: 'md',
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="tertiary">Tertiary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="subtle">Subtle</Badge>
    </div>
  ),
};