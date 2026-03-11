import { describe, it, expect } from 'vitest';
import { Account, Category, Transaction } from '../financial';

describe('Financial Types', () => {
  it('should allow valid Account objects', () => {
    const account: Account = {
      id: '1',
      name: 'Bank',
      type: 'BANK_ACCOUNT',
      initialBalance: 0,
      currentBalance: 100,
      createdAt: '2023-10-01',
    };
    expect(account.id).toBe('1');
  });

  it('should allow valid Category objects', () => {
    const category: Category = {
      id: '1',
      name: 'Salary',
      type: 'INCOME',
      color: '#00FF00',
    };
    expect(category.name).toBe('Salary');
  });

  it('should allow valid Transaction objects', () => {
    const transaction: Transaction = {
      id: '1',
      accountId: 'acc1',
      categoryId: 'cat1',
      amount: 100,
      type: 'INCOME',
      status: 'PAID',
      date: '2023-10-01',
      description: 'Test',
      payeeOrPayer: 'Company',
      isRecurring: false,
      createdAt: '2023-10-01',
    };
    expect(transaction.amount).toBe(100);
  });
});
