import React, { useState, useEffect } from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    value: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
### Progress Indicator

Displays an indicator showing the completion progress of a task.

#### When to Use
- To show the progress of a file upload
- To indicate the completion percentage of a process
- To visualize the steps in a multi-step workflow

#### Accessibility
- Uses \`role="progressbar"\`
- Includes \`aria-valuenow\`, \`aria-valuemin\`, and \`aria-valuemax\` attributes
- High contrast colors for visibility
        `,
      },
    },
  },
};

export default meta;

export const Primary: StoryObj<typeof Progress> = {
  args: {
    value: 45,
    variant: 'primary',
  },
};

export const Sizes: StoryObj<typeof Progress> = {
  render: (args) => (
    <div className="space-y-4">
      <Progress value={20} size="sm" />
      <Progress value={40} size="md" />
      <Progress value={60} size="lg" />
    </div>
  ),
};

export const Variants: StoryObj<typeof Progress> = {
  render: (args) => (
    <div className="space-y-4">
      <Progress value={15} variant="primary" />
      <Progress value={30} variant="secondary" />
      <Progress value={45}variant="tertiary" />
      <Progress value={60} variant="success" />
      <Progress value={75} variant="warning" />
      <Progress value={90} variant="error" />
      <Progress value={100} variant="info" />
    </div>
  ),
};

export const WithValue: StoryObj<typeof Progress> = {
  args: {
    value: 65,
    showValue: true,
  },
};

export const Striped: StoryObj<typeof Progress> = {
  args: {
    value: 75,
    striped: true,
  },
};

export const Animated: StoryObj<typeof Progress> = {
  args: {
    value: 85,
    striped: true,
    animated: true,
  },
};

export const DynamicExample: StoryObj<typeof Progress> = {
  render: (args) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
      }, 800);
      return () => clearInterval(timer);
    }, []);

    return <Progress value={progress} showValue striped animated />;
  },
};