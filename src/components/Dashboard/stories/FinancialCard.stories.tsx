import type { Meta, StoryObj } from '@storybook/react';
import { FinancialCard } from '../FinancialCard';

const meta = {
  title: 'Dashboard/FinancialCard',
  component: FinancialCard,
  tags: ['autodocs'],
} satisfies Meta<typeof FinancialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
