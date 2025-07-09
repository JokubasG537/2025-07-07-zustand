const API_BASE = 'http://localhost:3000';

 async function apiFetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API error: ${response.status} - ${errorBody}`);
  }
  return response.json();
}

export default apiFetcher;