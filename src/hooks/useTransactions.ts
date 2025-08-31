import { useState, useEffect, useCallback } from 'react';
import { Transaction, CreateTransactionDto, UpdateTransactionDto } from '../types/financial';
import { apiService, ApiError, PaginatedResponse, PaginationParams } from '../services/api';

interface UseTransactionsOptions {
  pagination?: PaginationParams;
  autoRefresh?: boolean;
}

interface UseTransactionsResult {
  transactions: Transaction[];
  pagination?: PaginatedResponse<Transaction>['pagination'];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createTransaction: (data: CreateTransactionDto) => Promise<void>;
  updateTransaction: (id: string, data: UpdateTransactionDto) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

export const useTransactions = (options: UseTransactionsOptions = {}): UseTransactionsResult => {
  const { pagination, autoRefresh = true } = options;
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [paginationMeta, setPaginationMeta] = useState<PaginatedResponse<Transaction>['pagination'] | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (pagination && (pagination.page || pagination.limit)) {
        // Use paginated endpoint
        const response = await apiService.getPaginatedTransactions(pagination);
        setTransactions(response.data);
        setPaginationMeta(response.pagination);
      } else {
        // Use non-paginated endpoint
        const response = await apiService.getAllTransactions();
        setTransactions(response);
        setPaginationMeta(undefined);
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to fetch transactions';
      console.log('Transaction fetch error:', errorMessage);
      setError(errorMessage);
      setTransactions([]);
      setPaginationMeta(undefined);
    } finally {
      setLoading(false);
    }
  }, [pagination]);

  const createTransaction = useCallback(async (data: CreateTransactionDto) => {
    try {
      setError(null);
      await apiService.createTransaction(data);
      if (autoRefresh) {
        await fetchTransactions();
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to create transaction';
      setError(errorMessage);
      throw err;
    }
  }, [fetchTransactions, autoRefresh]);

  const updateTransaction = useCallback(async (id: string, data: UpdateTransactionDto) => {
    try {
      setError(null);
      await apiService.updateTransaction(id, data);
      if (autoRefresh) {
        await fetchTransactions();
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to update transaction';
      setError(errorMessage);
      throw err;
    }
  }, [fetchTransactions, autoRefresh]);

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      setError(null);
      await apiService.deleteTransaction(id);
      if (autoRefresh) {
        await fetchTransactions();
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to delete transaction';
      setError(errorMessage);
      throw err;
    }
  }, [fetchTransactions, autoRefresh]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    pagination: paginationMeta,
    loading,
    error,
    refresh: fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};