import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnLoginPage = req.nextUrl.pathname === '/login';

  if (isOnLoginPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/accounts/:path*',
    '/assets/:path*',
    '/transactions/:path*',
    '/portfolio/:path*',
    '/login',
  ],
};
