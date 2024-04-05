import { NextRequest, NextResponse } from 'next/server';

const authRoutes = ['/signin', '/signup', '/onboarding'];

const devenv = false;

export default function middleware(req: NextRequest) {
  let loggedin = req.cookies.get('access_token');
  const { pathname } = req.nextUrl;

  if(devenv) return NextResponse.next();

  if (loggedin && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!loggedin && !authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};