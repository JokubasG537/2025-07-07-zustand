
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
  UseMutationOptions,
} from '@tanstack/react-query';
import { apiFetcher } from '../api/fetcher';

type QueryKeyType = readonly unknown[];

interface QueryOptions {
  enabled?: boolean;
  params?: Record<string, string | number | boolean>;
}

export function useApiQuery<T>(
  key: QueryKeyType,
  endpoint: string,
  options?: QueryOptions
): UseQueryResult<T> {
  const { enabled = true, params } = options || {};

  const url = params
    ? `${endpoint}?${new URLSearchParams(params as Record<string, string>)}`
    : endpoint;

  return useQuery<T>({
    queryKey: key,
    queryFn: () => apiFetcher<T>(url),
    enabled,
  });
}

export function useApiMutation<TData, TVariables = unknown>(
  endpoint: string,
  method: 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  invalidateKey?: QueryKeyType,
  options?: Omit<
    UseMutationOptions<TData, unknown, TVariables>,
    'mutationFn'
  >
): UseMutationResult<TData, unknown, TVariables> {
  const queryClient = useQueryClient();

  return useMutation<TData, unknown, TVariables>({
    mutationFn: (data: TVariables) =>
      apiFetcher<TData>(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: (...args) => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
      options?.onSuccess?.(...args);
    },
    ...options,
  });
}