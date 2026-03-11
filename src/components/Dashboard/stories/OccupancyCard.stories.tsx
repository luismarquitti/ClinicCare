import type { Meta, StoryObj } from '@storybook/react';
import { OccupancyCard } from '../OccupancyCard';

const meta = {
  title: 'Dashboard/OccupancyCard',
  component: OccupancyCard,
  tags: ['autodocs'],
} satisfies Meta<typeof OccupancyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
