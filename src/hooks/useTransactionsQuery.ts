import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import {
  Transaction,
  CreateTransactionDto,
  UpdateTransactionDto,
} from '../types/financial';
import {
  apiService,
  ApiError,
  PaginatedResponse,
  PaginationParams,
} from '../services/api';

// Query Keys - centralized for consistency
export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (params?: PaginationParams) =>
    [...transactionKeys.lists(), params] as const,
  details: () => [...transactionKeys.all, 'detail'] as const,
  detail: (id: string) => [...transactionKeys.details(), id] as const,
};

// Hook for fetching transactions with optional pagination
interface UseTransactionsQueryOptions {
  pagination?: PaginationParams;
  enabled?: boolean;
}

export const useTransactionsQuery = (
  options: UseTransactionsQueryOptions = {}
): UseQueryResult<Transaction[], ApiError> => {
  const { pagination, enabled = true } = options;

  return useQuery<Transaction[], ApiError>({
    queryKey: transactionKeys.list(pagination),
    queryFn: async (): Promise<Transaction[]> => {
      if (pagination && (pagination.page || pagination.limit)) {
        // Use paginated endpoint
        const response = await apiService.getPaginatedTransactions(pagination);
        return response.data;
      } else {
        // Use simple endpoint
        return apiService.getAllTransactions();
      }
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for fetching paginated transactions (returns full pagination response)
export const usePaginatedTransactionsQuery = (
  params: PaginationParams,
  options: { enabled?: boolean } = {}
): UseQueryResult<PaginatedResponse<Transaction>, ApiError> => {
  return useQuery<PaginatedResponse<Transaction>, ApiError>({
    queryKey: transactionKeys.list(params),
    queryFn: async (): Promise<PaginatedResponse<Transaction>> => {
      return apiService.getPaginatedTransactions(params);
    },
    enabled: options.enabled ?? true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for fetching a single transaction
export const useTransactionQuery = (
  id: string,
  options: { enabled?: boolean } = {}
): UseQueryResult<Transaction, ApiError> => {
  return useQuery<Transaction, ApiError>({
    queryKey: transactionKeys.detail(id),
    queryFn: async (): Promise<Transaction> => {
      return apiService.getTransaction(id);
    },
    enabled: options.enabled ?? Boolean(id),
    staleTime: 10 * 60 * 1000, // 10 minutes for individual transactions
  });
};

// Hook for creating transactions
export const useCreateTransactionMutation = (): UseMutationResult<
  Transaction,
  ApiError,
  CreateTransactionDto
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.createTransaction,
    onSuccess: newTransaction => {
      // Invalidate and refetch all transaction lists
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });

      // Optionally add the new transaction to existing cache
      queryClient.setQueryData<Transaction[]>(transactionKeys.list(), old =>
        old ? [newTransaction, ...old] : [newTransaction]
      );
    },
    onError: error => {
      console.error('Failed to create transaction:', error);
    },
  });
};

// Hook for updating transactions
export const useUpdateTransactionMutation = (): UseMutationResult<
  Transaction,
  ApiError,
  { id: string; data: UpdateTransactionDto }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => apiService.updateTransaction(id, data),
    onSuccess: (updatedTransaction, { id }) => {
      // Update the individual transaction in cache
      queryClient.setQueryData(transactionKeys.detail(id), updatedTransaction);

      // Update the transaction in all list caches
      queryClient.setQueriesData<Transaction[]>(
        { queryKey: transactionKeys.lists() },
        old => {
          if (!old) return old;
          return old.map(transaction =>
            transaction.id === id ? updatedTransaction : transaction
          );
        }
      );

      // Invalidate paginated queries to ensure consistency
      queryClient.invalidateQueries({
        queryKey: transactionKeys.lists(),
        refetchType: 'all',
      });
    },
    onError: error => {
      console.error('Failed to update transaction:', error);
    },
  });
};

// Hook for deleting transactions
export const useDeleteTransactionMutation = (): UseMutationResult<
  void,
  ApiError,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.deleteTransaction,
    onSuccess: (_, deletedId) => {
      // Remove transaction from all list caches
      queryClient.setQueriesData<Transaction[]>(
        { queryKey: transactionKeys.lists() },
        old => {
          if (!old) return old;
          return old.filter(transaction => transaction.id !== deletedId);
        }
      );

      // Remove individual transaction from cache
      queryClient.removeQueries({
        queryKey: transactionKeys.detail(deletedId),
      });

      // Invalidate lists to ensure pagination counts are correct
      queryClient.invalidateQueries({
        queryKey: transactionKeys.lists(),
      });
    },
    onError: error => {
      console.error('Failed to delete transaction:', error);
    },
  });
};

// Health check hook
export const useHealthQuery = (): UseQueryResult<
  { status: string; timestamp: string },
  ApiError
> => {
  return useQuery<{ status: string; timestamp: string }, ApiError>({
    queryKey: ['health'],
    queryFn: async (): Promise<{ status: string; timestamp: string }> => {
      return apiService.healthCheck();
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};
