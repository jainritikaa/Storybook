import React from 'react';
import { StoryObj, Meta } from '@storybook/react';

const ColorSwatch = ({ name, color }: { name: string; color: string }) => (
  <div className="flex flex-col items-center mb-4">
    <div
      className="w-24 h-24 rounded-md shadow-md mb-2 border border-neutral-200 dark:border-neutral-700"
      style={{ backgroundColor: color }}
    />
    <div className="text-sm font-medium text-center">
      <div>{name}</div>
      <div className="text-neutral-500 dark:text-neutral-400">{color}</div>
    </div>
  </div>
);

const ColorScale = ({ name, colors }: { name: string; colors: Record<string, string> }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-4">{name}</h3>
    <div className="grid grid-cols-5 gap-4">
      {Object.entries(colors).map(([key, value]) => (
        <ColorSwatch key={key} name={`${name}-${key}`} color={value} />
      ))}
    </div>
  </div>
);

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        component: `
## Color Tokens

Our design system uses a comprehensive color token system that supports:
- Primary, Secondary, Tertiary color scales
- Neutral grayscale
- Semantic colors (success, warning, error, info)
- Light and dark theme support
- WCAG-compliant contrast ratios

### Usage Guidelines
- Use \`primary-500\` as your main brand color
- Use semantic colors appropriately for their intended purposes
- Text colors automatically adjust for light/dark themes
- Always check contrast ratios when pairing colors

### Accessibility
All colors have been tested to meet WCAG 2.1 AA contrast requirements when used appropriately. Text on colored backgrounds should use:
- \`text-neutral-50\` for dark colors (500+)
- \`text-neutral-900\` for light colors (100-400)
        `,
      },
    },
  },
};

export default meta;

export const PrimaryColors: StoryObj = {
  render: () => (
    <ColorScale
      name="primary"
      colors={{
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      }}
    />
  ),
};

export const SecondaryColors: StoryObj = {
  render: () => (
    <ColorScale
      name="secondary"
      colors={{
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
      }}
    />
  ),
};

export const SemanticColors: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <ColorScale
        name="success"
        colors={{
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }}
      />
      <ColorScale
        name="warning"
        colors={{
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }}
      />
      <ColorScale
        name="error"
        colors={{
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }}
      />
      <ColorScale
        name="info"
        colors={{
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }}
      />
    </div>
  ),
};