import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Core/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
