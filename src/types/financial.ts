export interface Account {
    id: string;
    name: string;
    type: 'BANK_ACCOUNT' | 'CREDIT_CARD' | 'CASH';
    initialBalance: number;
    currentBalance: number;
    createdAt: string;
}

export interface Category {
    id: string;
    name: string;
    type: 'INCOME' | 'EXPENSE';
    color: string;
}

export interface Transaction {
    id: string;
    accountId: string;
    categoryId: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    status: 'PAID' | 'PENDING' | 'OVERDUE';
    date: string;
    description: string;
    payeeOrPayer: string;
    isRecurring: boolean;
    recurringGroupId?: string;
    createdAt: string;
}
