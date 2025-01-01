import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};


const secret = process.env.NEXTAUTH_SECRET
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  console.log("JWT response: ", token);
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')
  ) {
    console.log("user already succesfuly authenticated...redirecting to dashbaord");
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard')) {
    console.log("token is not present.....not succesfully authenticated...redirecting to sign-in page");
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}