'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { authenticatedFetch } from '@/utils/api';

import type { AuthResponse } from './types';

export const useAuthUser = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authenticatedFetch<AuthResponse>('/auth/me'),
    enabled: !!session?.supabaseAccessToken,
    staleTime: 5 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
