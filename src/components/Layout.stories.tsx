import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Core/Layout',
  component: Layout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
