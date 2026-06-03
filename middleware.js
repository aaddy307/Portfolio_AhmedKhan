import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin/dashboard')) {
    const cookieToken = request.cookies.get('admin_token')?.value;
    const urlToken = request.nextUrl.searchParams.get('token');

    const token = cookieToken || urlToken;

    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);

      // If token was from URL (first-time login), set cookie and strip token from URL
      if (urlToken) {
        const cleanUrl = new URL(request.url);
        cleanUrl.searchParams.delete('token');
        const response = NextResponse.redirect(cleanUrl);
        response.cookies.set('admin_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60,
          path: '/',
        });
        return response;
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
