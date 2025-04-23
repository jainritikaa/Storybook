import type { Meta, StoryObj } from '@storybook/react';
import { Timeline , type TimelineItem} from './Timeline';
import { fn, userEvent, within, expect } from '@storybook/test';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['vertical', 'horizontal'],
    },
    showConnectors: {
      control: 'boolean',
    },
    connectorStyle: {
      control: { type: 'radio' },
      options: ['solid', 'dashed'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'compact'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Timeline>;

const sampleItems: TimelineItem[] = [
    {
      id: '1',
      title: 'Project Kickoff',
      description: 'Initial meeting with stakeholders to define project scope',
      date: 'Jan 15, 2023',
      status: 'success', // explicitly typed as one of the allowed values
    },
    {
      id: '2',
      title: 'Design Phase',
      description: 'UI/UX design and wireframe approval',
      date: 'Feb 10, 2023',
      status: 'success',
    },
    {
      id: '3',
      title: 'Development Started',
      description: 'Frontend and backend development begins',
      date: 'Mar 1, 2023',
      status: 'info',
    },
    {
      id: '4',
      title: 'QA Testing',
      description: 'Quality assurance and bug fixing phase',
      date: 'Apr 15, 2023',
      status: 'warning',
    },
    {
      id: '5',
      title: 'Launch',
      description: 'Production deployment and go-live',
      date: 'May 1, 2023',
      status: 'default',
    },
  ];
export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const Horizontal: Story = {
  args: {
    items: sampleItems,
    orientation: 'horizontal',
  },
};

export const Compact: Story = {
  args: {
    items: sampleItems,
    variant: 'compact',
  },
};

export const NoConnectors: Story = {
  args: {
    items: sampleItems,
    showConnectors: false,
  },
};

export const DashedConnectors: Story = {
  args: {
    items: sampleItems,
    connectorStyle: 'dashed',
  },
};

export const WithStatuses: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Completed Step',
        description: 'This step was successfully completed',
        date: 'Jan 1',
        status: 'success',
      },
      {
        id: '2',
        title: 'Current Step',
        description: 'This step is in progress',
        date: 'Feb 1',
        status: 'info',
      },
      {
        id: '3',
        title: 'Pending Approval',
        description: 'Waiting for client approval',
        date: 'Mar 1',
        status: 'warning',
      },
      {
        id: '4',
        title: 'Blocked Step',
        description: 'This step is blocked by dependencies',
        date: 'Apr 1',
        status: 'error',
      },
    ],
  },
};

export const AccessibilityTest: Story = {
  args: {
    items: sampleItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check all items are rendered
    const items = await canvas.findAllByRole('listitem');
    await expect(items.length).toBe(sampleItems.length);
    
    // Check first item's title is visible
    const firstTitle = await canvas.findByText('Project Kickoff');
    await expect(firstTitle).toBeInTheDocument();
  },
};