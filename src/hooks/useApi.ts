import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

interface ApiResponse<T> {
  data: T;
  status: number;
}

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiRequestConfig {
  method?: ApiMethod;
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
}

/**
 * Custom hook for making API requests with React Query
 * @param endpoint API endpoint
 * @param options Query options
 * @returns Query result
 */
export function useApiQuery<T>(
  endpoint: string,
  options?: Omit<UseQueryOptions<ApiResponse<T>, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ApiResponse<T>, ApiError>({
    queryKey: [endpoint],
    queryFn: async () => {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          message: errorData.message || 'An error occurred',
          code: errorData.code,
          status: response.status,
        };
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
      };
    },
    ...options,
  });
}

/**
 * Custom hook for making API mutations with React Query
 * @param endpoint API endpoint
 * @param options Mutation options
 * @returns Mutation result
 */
export function useApiMutation<T, V>(
  endpoint: string,
  options?: Omit<UseMutationOptions<ApiResponse<T>, ApiError, V>, 'mutationFn'>
) {
  return useMutation<ApiResponse<T>, ApiError, V>({
    mutationFn: async (variables) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(variables),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          message: errorData.message || 'An error occurred',
          code: errorData.code,
          status: response.status,
        };
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
      };
    },
    ...options,
  });
}

/**
 * Custom hook for making API requests with fetch
 * @param endpoint API endpoint
 * @param config Request configuration
 * @returns Loading, error, and data states
 */
export function useFetch<T>(
  endpoint: string,
  config?: ApiRequestConfig
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(endpoint, {
        method: config?.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
        body: config?.body ? JSON.stringify(config.body) : undefined,
        signal: config?.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          message: errorData.message || 'An error occurred',
          code: errorData.code,
          status: response.status,
        };
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, config]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

/**
 * Custom hook for making API requests with AbortController
 * @param endpoint API endpoint
 * @param config Request configuration
 * @returns Loading, error, and data states
 */
export function useFetchWithAbort<T>(
  endpoint: string,
  config?: Omit<ApiRequestConfig, 'signal'>
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    // Abort previous request if it exists
    if (abortController) {
      abortController.abort();
    }

    // Create new AbortController
    const controller = new AbortController();
    setAbortController(controller);

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(endpoint, {
        method: config?.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
        body: config?.body ? JSON.stringify(config.body) : undefined,
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          message: errorData.message || 'An error occurred',
          code: errorData.code,
          status: response.status,
        };
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err.name === 'AbortError') {
        // Request was aborted, do nothing
        return;
      }
      setError(err as ApiError);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, config, abortController]);

  useEffect(() => {
    fetchData();

    // Cleanup function to abort request on unmount
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [fetchData, abortController]);

  return { data, isLoading, error, refetch: fetchData };
} 