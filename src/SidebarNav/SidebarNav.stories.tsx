import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SidebarNav from './SidebarNav';

const meta: Meta<typeof SidebarNav> = {
  title: 'Navigation/Sidebar',
  component: SidebarNav,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Color theme for the sidebar',
    },
    collapsed: {
      control: 'boolean',
      description: 'Collapsed state of the sidebar',
    },
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'default',
      values: [
        { 
          name: 'default', 
          value: 'var(--color-background)' 
        },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof SidebarNav>;

export const Default: Story = {
  args: {
    theme: 'dark',
    collapsed: false,
  },
};

export const LightTheme: Story = {
  args: {
    theme: 'light',
    collapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    theme: 'dark',
    collapsed: true,
  },
};

export const Interactive: Story = {
  args: {
    theme: 'dark',
    collapsed: false,
  },
  render: (args) => {
    const [collapsed, setCollapsed] = React.useState(args.collapsed);
    
    return (
      <div className="h-screen relative">
        <SidebarNav {...args} collapsed={collapsed} />
        <div className={`transition-all duration-300 ${
          collapsed ? 'ml-20' : 'ml-64'
        } p-8`}>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="px-4 py-2 bg-[--color-primary] text-[--color-surface] rounded-lg hover:bg-[--color-primary-hover] transition-colors"
          >
            Toggle Sidebar
          </button>
          <h1 className="mt-8 text-3xl font-bold text-[--color-neutral-900] dark:text-[--color-neutral-100]">
            Application Content
          </h1>
          <p className="mt-4 text-[--color-neutral-500]">
            This area represents your main application content. The sidebar can be toggled to provide more space.
          </p>
        </div>
      </div>
    );
  },
};