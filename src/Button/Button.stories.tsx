import React from 'react';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export const Primary = () => <Button>Primary</Button>;
export const Secondary = () => <Button variant="secondary">Secondary</Button>;
export const Danger = () => <Button variant="danger">Danger</Button>;
export const Disabled = () => <Button disabled>Disabled</Button>;
export const WithClick = () => (
  <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
);
