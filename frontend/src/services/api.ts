// Core API wrapper with interceptors and base configuration
// This replaces Axios to better support Next.js App Router's extended fetch API

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { requireAuth = true, headers, ...customConfig } = options;

  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // If endpoint requires auth, append the token
  if (requireAuth && typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred while fetching data');
    }

    return data as T;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}
