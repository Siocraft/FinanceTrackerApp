import {
  Transaction,
  CreateTransactionDto,
  UpdateTransactionDto,
} from '../types/financial';
import { apiRequest, ApiError } from './apiClient';

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'amount' | 'description' | 'category' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

class ApiService {
  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return apiRequest.get('/health');
  }

  // Get all transactions (backward compatible)
  async getAllTransactions(): Promise<Transaction[]> {
    const result = await apiRequest.get<Transaction[]>('/transactions');
    return Array.isArray(result) ? result : [];
  }

  // Get paginated transactions
  async getPaginatedTransactions(
    params: PaginationParams
  ): Promise<PaginatedResponse<Transaction>> {
    const queryParams: Record<string, string> = {};

    if (params.page) queryParams.page = params.page.toString();
    if (params.limit) queryParams.limit = params.limit.toString();
    if (params.sortBy) queryParams.sortBy = params.sortBy;
    if (params.sortOrder) queryParams.sortOrder = params.sortOrder;

    const result = await apiRequest.get<any>('/transactions', queryParams);

    // If it's a paginated response, return it as is
    if (
      result &&
      typeof result === 'object' &&
      'data' in result &&
      'pagination' in result
    ) {
      return result as PaginatedResponse<Transaction>;
    }

    // If it's a simple array (backward compatibility), wrap it
    const transactions = Array.isArray(result) ? result : [];
    return {
      data: transactions,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: transactions.length,
        itemsPerPage: transactions.length,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }

  // Get single transaction
  async getTransaction(id: string): Promise<Transaction> {
    return apiRequest.get(`/transactions/${id}`);
  }

  // Create transaction
  async createTransaction(data: CreateTransactionDto): Promise<Transaction> {
    return apiRequest.post('/transactions', data);
  }

  // Update transaction
  async updateTransaction(
    id: string,
    data: UpdateTransactionDto
  ): Promise<Transaction> {
    return apiRequest.put(`/transactions/${id}`, data);
  }

  // Delete transaction
  async deleteTransaction(id: string): Promise<void> {
    return apiRequest.delete(`/transactions/${id}`);
  }
}

export const apiService = new ApiService();
export {
  ApiError,
  type PaginationMeta,
  type PaginatedResponse,
  type PaginationParams,
};
