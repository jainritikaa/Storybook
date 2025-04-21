import React from 'react';
import { Badge } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export const Primary = () => <Badge text="Primary" variant="primary" />;
export const Success = () => <Badge text="Success" variant="success" />;
export const Warning = () => <Badge text="Warning" variant="warning" />;
export const Error = () => <Badge text="Error" variant="error" />;
