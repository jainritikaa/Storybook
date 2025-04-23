import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { Tabs } from './Tabs';
import { FileText, Settings, User, Mail, Bell } from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
### Tabs Component

A set of layered sections of content that can be toggled between.

#### When to Use
- To organize content into multiple sections that users can switch between
- When you want to conserve space by hiding content behind tabs
- For settings panels with multiple sections

#### Accessibility
- Uses \`role="tablist"\`, \`role="tab"\`, and \`role="tabpanel"\`
- Keyboard navigable with arrow keys
- ARIA attributes for selected state
- Focus styles for keyboard users
        `,
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Tabs> = {
  args: {
    items: [
      { value: 'account', label: 'Account' },
      { value: 'notifications', label: 'Notifications' },
      { value: 'settings', label: 'Settings' },
    ],
  },
};

export const WithIcons: StoryObj<typeof Tabs> = {
  args: {
    items: [
      { value: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
      { value: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
      { value: 'messages', label: 'Messages', icon: <Mail className="w-4 h-4" /> },
      { value: 'alerts', label: 'Alerts', icon: <Bell className="w-4 h-4" /> },
      { value: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    ],
  },
};

export const PrimaryVariant: StoryObj<typeof Tabs> = {
  args: {
    variant: 'primary',
    items: [
      { value: 'overview', label: 'Overview' },
      { value: 'analytics', label: 'Analytics' },
      { value: 'reports', label: 'Reports' },
      { value: 'settings', label: 'Settings' },
    ],
  },
};

export const SecondaryVariant: StoryObj<typeof Tabs> = {
  args: {
    variant: 'secondary',
    items: [
      { value: 'dashboard', label: 'Dashboard' },
      { value: 'team', label: 'Team' },
      { value: 'projects', label: 'Projects' },
      { value: 'calendar', label: 'Calendar' },
    ],
  },
};

export const DisabledTab: StoryObj<typeof Tabs> = {
  args: {
    items: [
      { value: 'active', label: 'Active' },
      { value: 'disabled', label: 'Disabled', disabled: true },
      { value: 'another', label: 'Another' },
    ],
  },
};

export const DifferentSizes: StoryObj<typeof Tabs> = {
  render: (args) => (
    <div className="space-y-8">
      <Tabs {...args} size="sm" />
      <Tabs {...args} size="md" />
      <Tabs {...args} size="lg" />
    </div>
  ),
  args: {
    items: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ],
  },
};

export const ControlledTabs: StoryObj<typeof Tabs> = {
    render: (args) => {
      const [value, setValue] = React.useState('profile');
  
      return (
        <div className="space-y-4">
          <Tabs
            {...args}
            value={value}
            onValueChange={setValue}
            items={[
              { value: 'profile', label: 'Profile' },
              { value: 'settings', label: 'Settings' },
              { value: 'billing', label: 'Billing' },
            ]}
          />
          <div className="p-4 border rounded-md">
            {value === 'profile' && <p>Profile content goes here</p>}
            {value === 'settings' && <p>Settings content goes here</p>}
            {value === 'billing' && <p>Billing content goes here</p>}
          </div>
        </div>
      );
    },
  };