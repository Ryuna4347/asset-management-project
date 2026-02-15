import 'next-auth';

declare module 'next-auth' {
  interface Session {
    supabaseAccessToken?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

import 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    supabaseAccessToken?: string;
    supabaseRefreshToken?: string;
    supabaseUserId?: string;
  }
}
