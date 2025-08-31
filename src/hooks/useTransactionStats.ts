import { useMemo } from 'react';
import { Transaction } from '../types';

interface TransactionStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  transactionCount: number;
  avgDaily: number;
}

export const useTransactionStats = (transactions: Transaction[]): TransactionStats => {
  return useMemo(() => {
    // Handle loading or empty state
    if (!transactions || transactions.length === 0) {
      return {
        totalBalance: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        savings: 0,
        transactionCount: 0,
        avgDaily: 0,
      };
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const currentMonthTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });

    const monthlyIncome = currentMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = transactions
      .reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0);

    const avgDaily = currentMonthTransactions.length > 0 
      ? (monthlyIncome + monthlyExpenses) / now.getDate()
      : 0;

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      savings: monthlyIncome - monthlyExpenses,
      transactionCount: currentMonthTransactions.length,
      avgDaily,
    };
  }, [transactions]);
};
