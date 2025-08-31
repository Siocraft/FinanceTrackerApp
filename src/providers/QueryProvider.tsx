import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { env } from '../config/env';
import { ApiError } from '../services/apiClient';

// Configure React Query client
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Stale time: how long data is considered fresh
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Cache time: how long to keep unused data in cache
        gcTime: 10 * 60 * 1000, // 10 minutes
        // Retry failed requests
        retry: (failureCount, error: Error) => {
          // Don't retry on 4xx errors (client errors)
          if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
            return false;
          }
          // Retry up to 3 times for other errors
          return failureCount < 3;
        },
        // Retry delay with exponential backoff
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Refetch on window focus in development only
        refetchOnWindowFocus: env.DEBUG,
        // Refetch on reconnect
        refetchOnReconnect: true,
      },
      mutations: {
        // Retry failed mutations
        retry: (failureCount, error: Error) => {
          // Don't retry on 4xx errors (client errors)
          if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
            return false;
          }
          // Retry up to 2 times for mutations
          return failureCount < 2;
        },
        // Retry delay for mutations
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      },
    },
  });
};

// Create a singleton instance
const queryClient = createQueryClient();

// Development tools
if (env.DEBUG) {
  // Log query client events
  queryClient.getQueryCache().subscribe((event) => {
    console.log('🔍 Query Cache Event:', {
      type: event.type,
      queryKey: event.query?.queryKey,
      queryHash: event.query?.queryHash,
    });
  });

  queryClient.getMutationCache().subscribe((event) => {
    console.log('🔄 Mutation Cache Event:', {
      type: event.type,
      mutationKey: event.mutation?.options.mutationKey,
    });
  });
}

// Query Provider component
interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

// Export query client for direct access if needed
export { queryClient };