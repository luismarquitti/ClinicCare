import type { Meta, StoryObj } from '@storybook/react';
import { DashboardMetrics } from '../DashboardMetrics';

const meta = {
  title: 'Financeiro/DashboardMetrics',
  component: DashboardMetrics,
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardMetrics>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    metrics: {
      totalReceitas: 50000,
      totalDespesas: 20000,
      saldoRestante: 30000,
      orcamentoMes: 45000,
      inadimplencia: 5,
    },
  },
};
