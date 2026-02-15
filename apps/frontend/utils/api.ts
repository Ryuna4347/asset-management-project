import { getSession } from 'next-auth/react';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function authenticatedFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const session = await getSession();

  if (!session?.supabaseAccessToken) {
    window.location.href = '/login';
    throw new Error('인증이 필요합니다.');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'x-supabase-token': session.supabaseAccessToken,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    window.location.href = '/login';
    throw new Error('인증이 만료되었습니다.');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || '요청에 실패했습니다.');
  }

  return response.json();
}
