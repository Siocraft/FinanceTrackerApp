export type TransactionType = 'income' | 'expense';

export type IncomeCategory = 
  | 'salary'
  | 'freelance'
  | 'investment'
  | 'gift'
  | 'other_income';

export type ExpenseCategory = 
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'bills'
  | 'health'
  | 'education'
  | 'other_expense';

export type TransactionCategory = IncomeCategory | ExpenseCategory;

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
  date: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTransactionDto {
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
}

export interface UpdateTransactionDto {
  amount?: number;
  description?: string;
  category?: string;
  type?: TransactionType;
}

export interface MonthlyStats {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  transactionCount: number;
  averageDaily: number;
}

export interface CategoryStats {
  category: TransactionCategory;
  amount: number;
  percentage: number;
  transactionCount: number;
}

export interface FinancialSummary {
  currentBalance: number;
  monthlyStats: MonthlyStats;
  categoryBreakdown: CategoryStats[];
  recentTransactions: Transaction[];
}

export interface Budget {
  id: string;
  category: ExpenseCategory;
  limit: number;
  spent: number;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: 'savings' | 'investment' | 'purchase' | 'debt';
  description?: string;
}