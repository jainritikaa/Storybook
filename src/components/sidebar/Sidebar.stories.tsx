import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { Sidebar } from './Sidebar';
import {
  Home,
  Users,
  Settings,
  FileText,
  Calendar,
  Mail,
  Star,
} from 'lucide-react';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags:['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    collapsible: {
      control: 'boolean',
    },
    defaultCollapsed: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// Icons moved outside the render to avoid re-creating them on every render
const icons = {
  dashboard: <Home className="w-5 h-5" />,
  team: <Users className="w-5 h-5" />,
  projects: <FileText className="w-5 h-5" />,
  calendar: <Calendar className="w-5 h-5" />,
  messages: <Mail className="w-5 h-5" />,
  favorites: <Star className="w-5 h-5" />,
};

const Template: StoryObj<typeof Sidebar> = {
  render: (args) => {
    const [activeItem, setActiveItem] = React.useState('dashboard');

    const items = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: icons.dashboard,
        active: activeItem === 'dashboard',
        onClick: () => setActiveItem('dashboard'),
      },
      {
        id: 'team',
        label: 'Team',
        icon: icons.team,
        active: activeItem === 'team',
        onClick: () => setActiveItem('team'),
      },
      {
        id: 'projects',
        label: 'Projects',
        icon: icons.projects,
        active: activeItem === 'projects',
        onClick: () => setActiveItem('projects'),
      },
      {
        id: 'calendar',
        label: 'Calendar',
        icon: icons.calendar,
        active: activeItem === 'calendar',
        onClick: () => setActiveItem('calendar'),
      },
      {
        id: 'messages',
        label: 'Messages',
        icon: icons.messages,
        active: activeItem === 'messages',
        onClick: () => setActiveItem('messages'),
      },
      {
        id: 'favorites',
        label: 'Favorites',
        icon: icons.favorites,
        active: activeItem === 'favorites',
        onClick: () => setActiveItem('favorites'),
      },
    ];

    const footer = (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
          JD
        </div>
        <div>
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Admin
          </p>
        </div>
      </div>
    );

    return (
      <div className="flex h-[500px]">
        <Sidebar
          {...args}
          items={items}
          footer={footer}
          logo={<div className="font-bold text-lg">Acme Inc</div>}
        />
        <main className="flex-1 p-8 bg-neutral-50 dark:bg-neutral-900">
          <h1 className="text-2xl font-bold mb-4">
            {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)} Page
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            This is the {activeItem} page content.
          </p>
        </main>
      </div>
    );
  },
};

export const Default = {
  ...Template,
  args: {
    size: 'md',
    collapsible: true,
    defaultCollapsed: false,
  },
};

export const CollapsedByDefault = {
  ...Template,
  args: {
    size: 'md',
    collapsible: true,
    defaultCollapsed: true,
  },
};

export const NotCollapsible = {
  ...Template,
  args: {
    size: 'md',
    collapsible: false,
    defaultCollapsed: false,
  },
};

export const SmallSize = {
  ...Template,
  args: {
    size: 'sm',
    collapsible: true,
    defaultCollapsed: false,
  },
};

export const LargeSize = {
  ...Template,
  args: {
    size: 'lg',
    collapsible: true,
    defaultCollapsed: false,
  },
};
