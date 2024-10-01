import withAuth, { NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(function middleware(req: NextRequestWithAuth) {
  // If the user is not authenticated, redirect to the login page
  const url = req.nextUrl.clone()
  if (!req.nextauth.token) {
    url.pathname = '/auth/login?callbackUrl=' + req.nextUrl.pathname
    return NextResponse.rewrite(url)
  }
  console.log('role: ', req.nextauth.token.role)

  //admin page access control
  if (
    req.nextUrl.pathname.startsWith('/admin') &&
    req.nextauth.token.role !== 'admin'
  ) {
    url.pathname = '/unauthorized'
    return NextResponse.rewrite(url)
  }

  //instructor page access control
  if (
    req.nextUrl.pathname.startsWith('/instructor') &&
    req.nextauth.token.role !== 'instructor'
  ) {
    url.pathname = '/unauthorized'
    return NextResponse.rewrite(url)
  }

  //student page access control
  if (
    req.nextUrl.pathname.startsWith('/student') &&
    req.nextauth.token.role !== 'student'
  ) {
    url.pathname = '/unauthorized'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/instructor/:path*',
    '/student/:path*',
    '/courses/:path*',
    '/users/:path*',
    '/unauthorized',
  ],
}
