import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Spinner, type SpinnerState } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral']
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    speed: {
      control: { type: 'select' },
      options: ['slow', 'normal', 'fast']
    },
    spinnerStyle: {
      control: { type: 'select' },
      options: ['classic', 'striped', 'gradient', 'pulse']
    },
    labelColor: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'neutral']
    },
    showTrack: {
      control: { type: 'boolean' }
    },
    trackColor: {
      control: { type: 'color' }
    },
    thickness: {
      control: { type: 'select' },
      options: ['thin', 'normal', 'thick']
    },
    direction: {
      control: { type: 'select' },
      options: ['clockwise', 'counter-clockwise']
    },
    state: {
      control: { type: 'select' },
      options: ['loading', 'success', 'error']
    },
    pulseColor: {
      control: { type: 'color' }
    },
    showCompletionTick: {
      control: { type: 'boolean' }
    }
  },
  args: {
    variant: 'primary',
    size: 'md',
    speed: 'normal',
    spinnerStyle: 'classic',
    showCompletionTick: true
  }
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  args: {
    label: 'Loading...'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'lg'
  }
};

export const WithTrack: Story = {
  args: {
    showTrack: true,
    trackColor: 'var(--color-neutral-100)',
    label: 'Processing data'
  }
};

export const FastSpinner: Story = {
  args: {
    speed: 'fast',
    variant: 'success',
    label: 'Quick sync'
  }
};

export const CounterClockwise: Story = {
  args: {
    direction: 'counter-clockwise',
    variant: 'warning',
    label: 'Reversing...'
  }
};


export const StripedBackground: Story = {
  args: {
    spinnerStyle: 'striped',  // Changed from 'style' to 'spinnerStyle'
    variant: 'info',
    size: 'xl',
    label: 'Analyzing'
  }
};

export const GradientStyle: Story = {
  args: {
    spinnerStyle: 'gradient',  // Changed from 'style' to 'spinnerStyle'
    variant: 'error',
    thickness: 'thick',
    label: 'Critical operation'
  }
};

export const PulseStyle: Story = {
  args: {
    spinnerStyle: 'pulse',  // Changed from 'style' to 'spinnerStyle'
    variant: 'primary',
    pulseColor: 'var(--color-primary)',
    label: 'Pulsing...'
  }
};

export const SuccessState: Story = {
  args: {
    state: 'success',
    label: 'Completed successfully!'
  }
};

export const ErrorState: Story = {
  args: {
    state: 'error',
    label: 'Operation failed!'
  }
};

export const WithoutTick: Story = {
  args: {
    state: 'success',
    showCompletionTick: false,
    label: 'Completed (no tick)'
  }
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-8 items-center">
      <Spinner size="xs" label="Extra Small" />
      <Spinner size="sm" label="Small" />
      <Spinner size="md" label="Medium" />
      <Spinner size="lg" label="Large" />
      <Spinner size="xl" label="Extra Large" />
    </div>
  )
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Spinner variant="primary" label="Primary" />
      <Spinner variant="secondary" label="Secondary" />
      <Spinner variant="success" label="Success" />
      <Spinner variant="warning" label="Warning" />
      <Spinner variant="error" label="Error" />
      <Spinner variant="info" label="Info" />
      <Spinner variant="neutral" label="Neutral" />
    </div>
  )
};

export const StateTransitions: Story = {
  render: (args) => {
    const [state, setState] = useState<SpinnerState>('loading');
    
    return (
      <div className="flex flex-col items-center space-y-4">
        <Spinner {...args} state={state} label={state === 'loading' ? 'Processing...' : state === 'success' ? 'Completed!' : 'Failed!'} />
        <div className="flex space-x-2">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setState('loading')}
          >
            Reset
          </button>
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setState('success')}
          >
            Complete
          </button>
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => setState('error')}
          >
            Error
          </button>
        </div>
      </div>
    );
  }
};