import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { createClient } from '@supabase/supabase-js';

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        );

        const { data } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: account.id_token!,
        });

        if (data.session) {
          token.supabaseAccessToken = data.session.access_token;
          token.supabaseRefreshToken = data.session.refresh_token;
          token.supabaseUserId = data.user?.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.supabaseAccessToken = token.supabaseAccessToken as string;
      session.user.id = token.supabaseUserId as string;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const nextAuth = NextAuth(authConfig);

export const handlers = nextAuth.handlers;
export const auth = nextAuth.auth;
export const signIn = nextAuth.signIn;
export const signOut = nextAuth.signOut;
