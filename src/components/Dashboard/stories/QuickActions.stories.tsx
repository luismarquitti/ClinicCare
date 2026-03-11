import type { Meta, StoryObj } from '@storybook/react';
import { QuickActions } from '../QuickActions';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Dashboard/QuickActions',
  component: QuickActions,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof QuickActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
