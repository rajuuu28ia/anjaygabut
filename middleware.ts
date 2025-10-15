import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('admin_session');

  // Check if the request is for admin dashboard
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!sessionCookie || !(await verifyToken(sessionCookie.value))) {
      // Redirect to login if not authenticated or token invalid
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Allow login page without authentication
  if (request.nextUrl.pathname === '/admin/login') {
    // If already logged in with valid token, redirect to dashboard
    if (sessionCookie && (await verifyToken(sessionCookie.value))) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
